import express from 'express';
import {
  initiateSTKPush,
  mpesaCallback,
  checkPaymentStatus,
  queryTransactionStatus,
  createEventBookingWithMpesa
} from '../controllers/mpesaController.js';
import { requireAuth } from '@clerk/express';

const mpesaRouter = express.Router();

// Test route to check M-Pesa credentials
mpesaRouter.get('/test-auth', async (req, res) => {
  try {
    console.log("Testing M-Pesa auth...");
    
    // Import the generateAccessToken function
    const CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY;
    const CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET;
    
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      return res.json({ 
        success: false, 
        error: "Consumer key or secret not set" 
      });
    }
    
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
    
    const data = await response.json();
    console.log("Auth test response:", data);
    
    if (response.ok && data.access_token) {
      res.json({ 
        success: true, 
        message: "M-Pesa credentials are working!", 
        tokenReceived: true 
      });
    } else {
      res.json({ 
        success: false, 
        error: "Invalid credentials", 
        details: data 
      });
    }
  } catch (error) {
    res.json({ 
      success: false, 
      error: error.message 
    });
  }
});

// M-Pesa payment routes (using Clerk auth)
mpesaRouter.post('/stk-push', requireAuth(), initiateSTKPush);
mpesaRouter.post('/callback', mpesaCallback); // No auth required for M-Pesa callbacks
mpesaRouter.get('/payment-status/:bookingId', requireAuth(), checkPaymentStatus);
mpesaRouter.post('/query-status', requireAuth(), queryTransactionStatus);

// Enhanced booking with M-Pesa
mpesaRouter.post('/book-with-payment', requireAuth(), createEventBookingWithMpesa);

export default mpesaRouter;