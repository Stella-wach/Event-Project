import axios from 'axios';
import Booking from '../models/booking.js';
import EventDetails from '../models/EventDetails.js';

// M-Pesa Configuration
const MPESA_CONFIG = {
  CONSUMER_KEY: process.env.DARAJA_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.DARAJA_CONSUMER_SECRET,
  BUSINESS_SHORT_CODE: process.env.DARAJA_SHORTCODE,
  PASSKEY: process.env.DARAJA_PASSKEY,
  CALLBACK_URL: process.env.CALLBACK_BASE_URL + '/api/mpesa/callback',
  ENVIRONMENT: 'sandbox'
};

// Debug M-Pesa config on startup
console.log("M-Pesa Config Check:");
console.log("CONSUMER_KEY:", MPESA_CONFIG.CONSUMER_KEY ? "Set" : "Missing");
console.log("CONSUMER_SECRET:", MPESA_CONFIG.CONSUMER_SECRET ? "Set" : "Missing");
console.log("BUSINESS_SHORT_CODE:", MPESA_CONFIG.BUSINESS_SHORT_CODE || "Missing");
console.log("PASSKEY:", MPESA_CONFIG.PASSKEY ? "Set" : "Missing");
console.log("CALLBACK_URL:", MPESA_CONFIG.CALLBACK_URL);

// M-Pesa API URLs
const MPESA_URLS = {
  sandbox: {
    auth: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    stkPush: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    query: 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
  },
  production: {
    auth: 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    stkPush: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    query: 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query'
  }
};

// Generate M-Pesa access token - FIXED VERSION
const generateAccessToken = async () => {
  try {
    console.log("Generating M-Pesa access token...");
    const auth = Buffer.from(`${MPESA_CONFIG.CONSUMER_KEY}:${MPESA_CONFIG.CONSUMER_SECRET}`).toString('base64');
    
    console.log("Auth string created");
    console.log("Calling auth URL:", MPESA_URLS[MPESA_CONFIG.ENVIRONMENT].auth);
    
    const response = await fetch(MPESA_URLS[MPESA_CONFIG.ENVIRONMENT].auth, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Auth response not OK:', response.status, errorData);
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log("Auth response:", data);
    
    if (!data.access_token) {
      throw new Error('No access token in response');
    }
    
    console.log("Access token generated successfully!");
    return data.access_token;
  } catch (error) {
    console.error('Error generating access token:', error.message);
    throw new Error(`Failed to generate M-Pesa access token: ${error.message}`);
  }
};

// Generate M-Pesa password
const generatePassword = () => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(`${MPESA_CONFIG.BUSINESS_SHORT_CODE}${MPESA_CONFIG.PASSKEY}${timestamp}`).toString('base64');
  console.log("Generated timestamp:", timestamp);
  console.log("Password generated successfully");
  return { password, timestamp };
};

// Initiate STK Push for existing booking
export const initiateSTKPush = async (req, res) => {
  try {
    const { bookingId, phoneNumber } = req.body;
    const userId = req.auth.userId;

    console.log("STK Push request:", { bookingId, phoneNumber, userId });

    // Validate input
    if (!bookingId || !phoneNumber) {
      return res.json({
        success: false,
        message: "Booking ID and phone number are required"
      });
    }

    // Validate phone number format (Kenyan format)
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    let formattedPhone;
    
    if (cleanPhoneNumber.startsWith('254')) {
      formattedPhone = cleanPhoneNumber;
    } else if (cleanPhoneNumber.startsWith('0')) {
      formattedPhone = '254' + cleanPhoneNumber.substring(1);
    } else if (cleanPhoneNumber.startsWith('7') || cleanPhoneNumber.startsWith('1')) {
      formattedPhone = '254' + cleanPhoneNumber;
    } else {
      return res.json({
        success: false,
        message: "Invalid phone number format. Use format: 0712345678 or 254712345678"
      });
    }

    // Find the booking
    const booking = await Booking.findOne({ _id: bookingId, user: userId })
      .populate({
        path: 'event',
        populate: {
          path: 'eventId',
          model: 'Event'
        }
      });

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found or unauthorized"
      });
    }

    if (booking.isPaid) {
      return res.json({
        success: false,
        message: "Booking is already paid"
      });
    }

    // Generate access token and password
    const accessToken = await generateAccessToken();
    const { password, timestamp } = generatePassword();

    // STK Push payload
    const stkPushPayload = {
      BusinessShortCode: MPESA_CONFIG.BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: booking.amount,
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.BUSINESS_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: MPESA_CONFIG.CALLBACK_URL,
      AccountReference: `TICKET-${booking._id}`,
      TransactionDesc: `Ticket payment for ${booking.event.eventId?.title || 'Event'}`
    };

    console.log("STK Push payload:", stkPushPayload);

    // Send STK Push request
    const stkResponse = await axios.post(
      MPESA_URLS[MPESA_CONFIG.ENVIRONMENT].stkPush,
      stkPushPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("STK Push response:", stkResponse.data);

    if (stkResponse.data.ResponseCode === "0") {
      // Update booking with checkout request ID
      await Booking.findByIdAndUpdate(bookingId, {
        paymentLink: stkResponse.data.CheckoutRequestID,
        status: 'pending'
      });

      res.json({
        success: true,
        message: "Payment request sent to your phone. Please enter your M-Pesa PIN to complete the payment.",
        checkoutRequestId: stkResponse.data.CheckoutRequestID,
        merchantRequestId: stkResponse.data.MerchantRequestID
      });
    } else {
      res.json({
        success: false,
        message: "Failed to initiate payment. Please try again."
      });
    }

  } catch (error) {
    console.error("STK Push error:", error.response?.data || error.message);
    res.json({
      success: false,
      message: "Payment initiation failed. Please try again."
    });
  }
};

// Handle M-Pesa callback
export const mpesaCallback = async (req, res) => {
  try {
    console.log("M-Pesa callback received:", JSON.stringify(req.body, null, 2));

    const callbackData = req.body.Body?.stkCallback;
    
    if (!callbackData) {
      console.error("Invalid callback data structure");
      return res.status(400).json({ message: "Invalid callback data" });
    }

    const { CheckoutRequestID, ResultCode, ResultDesc } = callbackData;

    // Find booking by checkout request ID
    const booking = await Booking.findOne({ paymentLink: CheckoutRequestID });
    
    if (!booking) {
      console.error("Booking not found for CheckoutRequestID:", CheckoutRequestID);
      return res.status(404).json({ message: "Booking not found" });
    }

    if (ResultCode === 0) {
      // Payment successful
      const callbackMetadata = callbackData.CallbackMetadata?.Item || [];
      const mpesaReceiptNumber = callbackMetadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = callbackMetadata.find(item => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = callbackMetadata.find(item => item.Name === 'PhoneNumber')?.Value;

      // Update booking status
      await Booking.findByIdAndUpdate(booking._id, {
        isPaid: true,
        status: 'confirmed',
        paymentDetails: {
          mpesaReceiptNumber,
          transactionDate,
          phoneNumber,
          amount: booking.amount
        }
      });

      console.log("Payment successful for booking:", booking._id);
      console.log("M-Pesa Receipt:", mpesaReceiptNumber);

    } else {
      // Payment failed or cancelled
      await Booking.findByIdAndUpdate(booking._id, {
        status: 'pending',
        paymentError: ResultDesc
      });

      console.log("Payment failed for booking:", booking._id, "Reason:", ResultDesc);
    }

    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ message: "Callback processed successfully" });

  } catch (error) {
    console.error("Callback processing error:", error.message);
    res.status(500).json({ message: "Callback processing failed" });
  }
};

// Check payment status
export const checkPaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.auth.userId;

    const booking = await Booking.findOne({ _id: bookingId, user: userId });
    
    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      payment: {
        isPaid: booking.isPaid,
        status: booking.status,
        paymentDetails: booking.paymentDetails || null,
        paymentError: booking.paymentError || null
      }
    });

  } catch (error) {
    console.error("Payment status check error:", error.message);
    res.json({
      success: false,
      message: "Failed to check payment status"
    });
  }
};

// Query transaction status (optional - for manual verification)
export const queryTransactionStatus = async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;

    if (!checkoutRequestId) {
      return res.json({
        success: false,
        message: "Checkout Request ID is required"
      });
    }

    const accessToken = await generateAccessToken();
    const { password, timestamp } = generatePassword();

    const queryPayload = {
      BusinessShortCode: MPESA_CONFIG.BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    };

    const response = await axios.post(MPESA_URLS[MPESA_CONFIG.ENVIRONMENT].query, queryPayload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error("Transaction query error:", error.response?.data || error.message);
    res.json({
      success: false,
      message: "Failed to query transaction status"
    });
  }
};

// Create booking with immediate M-Pesa payment option
export const createEventBookingWithMpesa = async (req, res) => {
  console.log("=== M-PESA BOOKING ENDPOINT HIT ===");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  console.log("Auth object:", req.auth);
  
  try {
    const userId = req.auth.userId;
    const { eventDetailId, ticketTypes, amount, phoneNumber, autoPayment = false } = req.body;

    console.log("=== BOOKING REQUEST DATA ===");
    console.log("User ID:", userId);
    console.log("Event Detail ID:", eventDetailId);
    console.log("Ticket Types:", ticketTypes);
    console.log("Amount:", amount);
    console.log("Phone Number:", phoneNumber);
    console.log("Auto Payment:", autoPayment);

    // Validate input
    if (!eventDetailId || !ticketTypes || !amount) {
      console.log("Validation failed: Missing required fields");
      return res.json({
        success: false, 
        message: "Missing required booking information"
      });
    }

    // Get the EventDetails and populate the Event
    console.log("Fetching event details...");
    const eventDetail = await EventDetails.findById(eventDetailId).populate('eventId');
    if (!eventDetail) {
      console.log("Event detail not found");
      return res.json({
        success: false, 
        message: "Event schedule not found"
      });
    }

    console.log("Event detail found:", eventDetail.eventId.title);

    // Check if event is still in the future
    const eventDateTime = new Date(eventDetail.eventDateTime);
    const currentDateTime = new Date();
    if (eventDateTime <= currentDateTime) {
      console.log("Event has already passed");
      return res.json({
        success: false, 
        message: "This event time has already passed"
      });
    }

    // Calculate total tickets being booked
    const totalTickets = Object.values(ticketTypes).reduce((sum, count) => sum + count, 0);
    console.log("Total tickets:", totalTickets);
    
    if (totalTickets === 0) {
      console.log("No tickets selected");
      return res.json({
        success: false, 
        message: "Please select at least one ticket"
      });
    }

    if (totalTickets > 10) {
      console.log("Too many tickets selected");
      return res.json({
        success: false, 
        message: "Maximum 10 tickets can be booked per transaction"
      });
    }

    // Create the booking
    console.log("Creating booking...");
    const booking = await Booking.create({
      user: userId,
      event: eventDetail._id,
      eventDetail: eventDetail._id,
      ticketTypes: ticketTypes,
      amount: amount,
      isPaid: false,
      status: 'pending',
      bookingDate: new Date()
    });

    console.log("Booking created with ID:", booking._id);

    // If autoPayment is true and phoneNumber is provided, initiate M-Pesa payment
    let paymentResponse = null;
    if (autoPayment && phoneNumber) {
      console.log("=== STARTING M-PESA PAYMENT PROCESS ===");
      console.log("Phone number received:", phoneNumber);
      console.log("Amount to charge:", amount);
      
      try {
        // Validate phone number format
        const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
        console.log("Cleaned phone number:", cleanPhoneNumber);
        
        let formattedPhone;
        
        if (cleanPhoneNumber.startsWith('254')) {
          formattedPhone = cleanPhoneNumber;
        } else if (cleanPhoneNumber.startsWith('0')) {
          formattedPhone = '254' + cleanPhoneNumber.substring(1);
        } else if (cleanPhoneNumber.startsWith('7') || cleanPhoneNumber.startsWith('1')) {
          formattedPhone = '254' + cleanPhoneNumber;
        } else {
          console.log("Invalid phone number format");
          throw new Error("Invalid phone number format");
        }
        
        console.log("Formatted phone number:", formattedPhone);

        // Check M-Pesa config before proceeding
        if (!MPESA_CONFIG.CONSUMER_KEY || !MPESA_CONFIG.CONSUMER_SECRET) {
          console.log("M-Pesa credentials missing");
          throw new Error("M-Pesa credentials not configured");
        }

        // Generate access token and password
        console.log("Generating M-Pesa access token...");
        const accessToken = await generateAccessToken();
        console.log("Access token obtained successfully!");
        
        const { password, timestamp } = generatePassword();

        // STK Push payload
        const stkPushPayload = {
          BusinessShortCode: MPESA_CONFIG.BUSINESS_SHORT_CODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: formattedPhone,
          PartyB: MPESA_CONFIG.BUSINESS_SHORT_CODE,
          PhoneNumber: formattedPhone,
          CallBackURL: MPESA_CONFIG.CALLBACK_URL,
          AccountReference: `TICKET-${booking._id}`,
          TransactionDesc: `Ticket payment for ${eventDetail.eventId.title}`
        };

        console.log("=== STK PUSH PAYLOAD ===");
        console.log(JSON.stringify(stkPushPayload, null, 2));

        // Send STK Push request
        console.log("Sending STK Push request to M-Pesa...");
        console.log("STK Push URL:", MPESA_URLS[MPESA_CONFIG.ENVIRONMENT].stkPush);
        
        const stkResponse = await axios.post(
          MPESA_URLS[MPESA_CONFIG.ENVIRONMENT].stkPush,
          stkPushPayload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 second timeout
          }
        );

        console.log("=== STK PUSH RESPONSE ===");
        console.log("Status:", stkResponse.status);
        console.log("Data:", JSON.stringify(stkResponse.data, null, 2));

        if (stkResponse.data.ResponseCode === "0") {
          console.log("STK Push successful! Updating booking...");
          
          // Update booking with checkout request ID
          await Booking.findByIdAndUpdate(booking._id, {
            paymentLink: stkResponse.data.CheckoutRequestID
          });

          paymentResponse = {
            paymentInitiated: true,
            checkoutRequestId: stkResponse.data.CheckoutRequestID,
            merchantRequestId: stkResponse.data.MerchantRequestID,
            message: "Payment request sent to your phone. Please enter your M-Pesa PIN."
          };
          
          console.log("Payment response set:", paymentResponse);
        } else {
          console.log("STK Push failed with response code:", stkResponse.data.ResponseCode);
          console.log("Response description:", stkResponse.data.ResponseDescription);
          
          paymentResponse = {
            paymentInitiated: false,
            message: `M-Pesa error: ${stkResponse.data.ResponseDescription || 'Failed to initiate payment'}`
          };
        }

      } catch (paymentError) {
        console.error("=== M-PESA PAYMENT ERROR ===");
        console.error("Error type:", paymentError.constructor.name);
        console.error("Error message:", paymentError.message);
        console.error("Error code:", paymentError.code);
        
        if (paymentError.response) {
          console.error("Response status:", paymentError.response.status);
          console.error("Response data:", JSON.stringify(paymentError.response.data, null, 2));
          console.error("Response headers:", paymentError.response.headers);
        }
        
        if (paymentError.request) {
          console.error("Request details:", paymentError.request);
        }
        
        paymentResponse = {
          paymentInitiated: false,
          message: `Payment failed: ${paymentError.message}. You can pay later from your bookings.`
        };
      }
    } else {
      console.log("No auto payment requested or no phone number provided");
    }

    // Format response with event information
    const bookingResponse = {
      id: booking._id,
      eventTitle: eventDetail.eventId.title,
      eventDate: eventDetail.eventDateTime,
      eventVenue: eventDetail.eventId.venue || "Venue TBD",
      eventPoster: eventDetail.eventId.poster_path,
      ticketTypes: ticketTypes,
      totalTickets: totalTickets,
      amount: booking.amount,
      isPaid: booking.isPaid,
      status: booking.status,
      bookingDate: booking.createdAt,
      payment: paymentResponse
    };

    console.log("=== FINAL RESPONSE ===");
    console.log("Booking ID:", booking._id);
    console.log("Payment initiated:", paymentResponse?.paymentInitiated || false);
    console.log("Sending response to frontend...");

    res.json({
      success: true,
      message: `Successfully created booking for ${totalTickets} ticket(s)`,
      booking: bookingResponse
    });

  } catch (error) {
    console.error("=== BOOKING ERROR ===");
    console.error("Error message:", error.message);
    console.error("Stack trace:", error.stack);
    
    res.json({
      success: false, 
      message: "An error occurred while processing your booking. Please try again."
    });
  }
};