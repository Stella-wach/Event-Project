import logo from '../assets/logo3.png'
import eventLogo from '../assets/quickevents_logo.svg'
import googlePlay from './googlePlay.svg'
import appStore from './appStore.svg'
import screenImage from './screenImage.svg'
import profile from './profile.png'

export const assets = {
    logo,
    eventLogo,
    googlePlay,
    appStore,
    screenImage,
    profile
}

export const dummyEventMedia = [
    {
        image: "https://i.pinimg.com/736x/75/43/ae/7543aeb5f45bd95c10bd458636597a23.jpg",
        videoUrl:"https://www.youtube.com/embed/anLdzZI4AUU?si=ul6y6RuuHTWgkFOX" 
    },
    {
        image: "https://i.pinimg.com/736x/4a/55/c3/4a55c3cd09453de8ef82b1b361018372.jpg",
        videoUrl:  "https://www.youtube.com/embed/GiWAAdg50Is?si=Q94ca9eqJGB-yfVZ"

    },
    {
        image: "https://i.pinimg.com/736x/fd/43/c8/fd43c8535ea3c7573bf1c6a094b493e1.jpg",
        videoUrl: "https://www.youtube.com/embed/T1becfC1nNk?si=wi7z-A5Gcc3b1qau"
    },
    {
        image: "https://i.pinimg.com/736x/0f/df/9c/0fdf9c1fa6285a41f0e86feb127f7cec.jpg",
        videoUrl: "https://www.youtube.com/embed/PAnpc9GOrnw?si=E0s6SrBOmMNacjGG"
    },
]

const dummySpeakersData = [
    { "name": "Sarah Johnson", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", "role": "Keynote Speaker" },
    { "name": "Michael Chen", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", "role": "Tech Evangelist" },
    { "name": "Emily Rodriguez", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", "role": "Industry Expert" },
    { "name": "David Park", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", "role": "Panel Moderator" },
    { "name": "Lisa Thompson", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg", "role": "Workshop Leader" },
    { "name": "James Wilson", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg", "role": "Performance Artist" },
    { "name": "Maria Garcia", "profile_path": "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg", "role": "Event Host" },
    { "name": "Robert Anderson", "profile_path": "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg", "role": "Guest Speaker" },
    { "name": "Anna Kowalski", "profile_path": "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg", "role": "DJ" },
    { "name": "Tom Mitchell", "profile_path": "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg", "role": "Comedian" },
    { "name": "Sophie Laurent", "profile_path": "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg", "role": "Musical Artist" },
    { "name": "Alex Turner", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", "role": "Entrepreneur" },
    { "name": "Rachel Green", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg", "role": "Motivational Speaker" },
    { "name": "Chris Evans", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", "role": "Chef" },
    { "name": "Nina Petrov", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", "role": "Fitness Instructor" },
    { "name": "Lucas Silva", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg", "role": "Artist" },
    { "name": "Grace Kim", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", "role": "Business Coach" }
]

export const dummyEventsData = [
    {
    "_id": "324544",
    "id": 324544,
    "title": "Tech Innovation Summit 2025",
    "description": "Join industry leaders and innovators for a day of cutting-edge technology discussions, networking, and future-focused presentations. Discover the latest trends in AI, blockchain, and sustainable tech solutions.",
    "poster_path": "https://i.pinimg.com/736x/a6/57/5d/a6575d1a90c41afd34181f20585c6f5d.jpg",
    "backdrop_path": "https://i.pinimg.com/736x/98/37/f8/9837f8a4c755926bfa94795c315ad1b0.jpg",
    
"ticketPrices": {
    "advance": 2000,
    "vip": 5000,
    "student": 1000
  },

    "categories": [
        { "id": 1, "name": "Technology" },
        { "id": 2, "name": "Business" },
        { "id": 3, "name": "Networking" }
    ],
        "speakers": dummySpeakersData,
        "event_date": "2025-02-27",
        "location": "Convention Center, Nairobi",
        "tagline": "Shaping tomorrow's technology today.",
        "price": "KSH 2000",
        "rating": 4.6,
        "attendee_count": 15000,
        "duration": 480
    },
    {
        "_id": "1232546",
        "id": 1232546,
        "title": "Midnight Horror Experience",
        "description": "A spine-chilling immersive horror experience featuring live actors, escape rooms, and psychological thrills. Test your courage in this unforgettable night of terror and mystery.",
        "poster_path": "https://i.pinimg.com/736x/a2/78/55/a2785594ca2414f0fbb66b684db2bd18.jpg",
        "backdrop_path": "https://i.pinimg.com/1200x/6d/e9/71/6de971cf441662f3c94ffed2b17085aa.jpg",
       "ticketPrices": {
    "advance": 2500,
    "vip": 5000,
    "student": 1500
  },
       
        "categories": [
            { "id": 4, "name": "Entertainment" },
            { "id": 5, "name": "Immersive Experience" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-04-23",
        "location": "Haunted Manor, Karen",
        "tagline": "Face your fears in the dark.",
         "price": "KSH 2500",
        "rating": 4.4,
        "attendee_count": 26000,
        "duration": 180
    },
    {
        "_id": "552524",
        "id": 552524,
        "title": "Family Fun Festival",
        "description": "A delightful family-friendly festival featuring games, live performances, food trucks, and activities for all ages. Create lasting memories with entertainment that brings families together.",
        "poster_path": "https://i.pinimg.com/1200x/4e/72/67/4e7267bb9b716f7963c87b30a9ba61f8.jpg",
        "backdrop_path": "https://i.pinimg.com/1200x/79/74/62/79746255b6e34fab648f792ed0537f1f.jpg",
        "ticketPrices": {
    "advance": 1500,
    "vip": 3000,
    "student": 1000
  },
        
        "categories": [
            { "id": 6, "name": "Family" },
            { "id": 7, "name": "Festival" },
            { "id": 8, "name": "Entertainment" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-05-17",
        "location": "Uhuru Park, Nairobi",
        "tagline": "Fun for the whole family.", 
        "price": "KSH 1500",
        "rating": 4.8,
        "attendee_count": 38000,
        "duration": 360
    },
    {
        "_id": "668489",
        "id": 668489,
        "title": "Urban Action Sports Championship",
        "description": "Witness jaw-dropping stunts and athletic prowess as top athletes compete in skateboarding, BMX, and parkour competitions. High-energy action meets urban culture.",
        "poster_path": "https://i.pinimg.com/736x/4e/0e/b1/4e0eb159cd3aae3933f87ebb1ff621e8.jpg",
        "backdrop_path": "https://i.pinimg.com/1200x/41/e5/1c/41e51c5ec99876b4dc7c3dc9f69c5c19.jpg",
       "ticketPrices": {
    "advance": 2000,
    "vip": 5000,
    "student": 1000
  },
       
        "categories": [
            { "id": 9, "name": "Sports" },
            { "id": 10, "name": "Competition" },
            { "id": 11, "name": "Urban Culture" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-04-25",
        "location": "Skate Park, Westlands",
        "tagline": "Where skill meets street.",
        "price": "KSH 2000",
        "rating": 4.7,
        "attendee_count": 80880,
        "duration": 300
    },
    {
        "_id": "950387",
        "id": 950387,
        "title": "Digital Creators Workshop",
        "description": "Learn from expert content creators and digital artists in this hands-on workshop. Discover the secrets of successful YouTube channels, Instagram growth, and digital art techniques.",
        "poster_path": "https://i.pinimg.com/736x/3e/8b/a4/3e8ba4ff99ac869558917de0003c3ff7.jpg",
        "backdrop_path": "https://i.pinimg.com/1200x/5b/39/fa/5b39fac2f14d0c93d12a32a1222e862f.jpg",
        "ticketPrices": {
    "advance": 3000,
    "vip": 5000,
    "student": 1800
  },
        
        "categories": [
            { "id": 12, "name": "Workshop" },
            { "id": 13, "name": "Digital Art" },
            { "id": 14, "name": "Social Media" },
            { "id": 15, "name": "Creative" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-03-31",
        "location": "Creative Hub, Kilimani",
        "tagline": "Build your digital empire.",
        "price": "KSH 3000",
        "rating": 4.5,
        "attendee_count": 19050,
        "duration": 420
    },
    {
        "_id": "575265",
        "id": 575265,
        "title": "Entrepreneurship Summit: The Final Chapter",
        "description": "The ultimate entrepreneurship event featuring successful business leaders sharing their journeys, failures, and victories. Network with investors, mentors, and fellow entrepreneurs in this game-changing summit.",
        "poster_path": "https://i.pinimg.com/1200x/81/c2/8c/81c28cb75d7d47a916f5da3f0ac34ea4.jpg",
        "backdrop_path": "https://i.pinimg.com/736x/15/72/43/1572439a1279bbf3326fafb5816feac2.jpg",
        "ticketPrices": {
    "advance": 4000,
    "vip": 6000,
    "student": 2500
  },
        
        "categories": [
            { "id": 16, "name": "Business" },
            { "id": 17, "name": "Entrepreneurship" },
            { "id": 18, "name": "Networking" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-05-17",
        "location": "KICC, Nairobi",
        "tagline": "Your success story starts here.",
        "price": "KSH 4000",
        "rating": 4.9,
        "attendee_count": 209000,
        "duration": 600
    },
    {
        "_id": "986056",
        "id": 986056,
        "title": "Wellness & Mindfulness Retreat",
        "description": "Escape the hustle and bustle for a transformative wellness experience. Join expert practitioners for yoga, meditation, nutrition workshops, and holistic healing sessions.",
        "poster_path": "https://i.pinimg.com/736x/3a/60/e1/3a60e137b8d6ddc414ac263ed770663f.jpg",
        "backdrop_path": "https://i.pinimg.com/736x/e4/8d/3f/e48d3f0bf339c854cc010a071340f5a9.jpg",
        "ticketPrices": {
    "advance": 3500,
    "vip": 5000,
    "student": 1000
  },
        
        "categories": [
            { "id": 19, "name": "Wellness" },
            { "id": 20, "name": "Mindfulness" },
            { "id": 21, "name": "Health" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-04-30",
        "location": "Serenity Gardens, Karen",
        "tagline": "Restore your mind, body, and soul.",
        "price": "KSH 3500",
        "rating": 4.8,
        "attendee_count": 50000,
        "duration": 540
    }
]


export const dummyDateTimeData = {
    "2025-07-24": [
        { "time": "2025-07-24T01:00:00.000Z", "eventId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-07-24T03:00:00.000Z", "eventId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-07-24T05:00:00.000Z", "eventId": "68395b407f6329be2bb45bd3" }
    ],
    "2025-07-25": [
        { "time": "2025-07-25T01:00:00.000Z", "eventId": "68395b407f6329be2bb45bd4" },
        { "time": "2025-07-25T03:00:00.000Z", "eventId": "68395b407f6329be2bb45bd5" },
        { "time": "2025-07-25T05:00:00.000Z", "eventId": "68395b407f6329be2bb45bd6" }
    ],
    "2025-07-26": [
        { "time": "2025-07-26T01:00:00.000Z", "eventId": "68395b407f6329be2bb45bd7" },
        { "time": "2025-07-26T03:00:00.000Z", "eventId": "68395b407f6329be2bb45bd8" },
        { "time": "2025-07-26T05:00:00.000Z", "eventId": "68395b407f6329be2bb45bd9" }
    ],
    "2025-07-27": [
        { "time": "2025-07-27T01:00:00.000Z", "eventId": "68395b407f6329be2bb45bda" },
        { "time": "2025-07-27T03:00:00.000Z", "eventId": "68395b407f6329be2bb45bdb" },
        { "time": "2025-07-27T05:00:00.000Z", "eventId": "68395b407f6329be2bb45bdc" }
    ]
}

export const dummyDashboardData = {
  totalBookings: 14,
  totalRevenue: 1517,
  totalUsers: 5,
  activeEvents: [
    {
      _id: "68352363e96d99513e4221a4",
      event: dummyEventsData[0],
      eventDateTime: "2025-06-30T02:30:00.000Z",
      ticketPrice: 2500,
      ticketTypes: {
        advance: 3,
        vip: 1,
        student: 0,
      },
    },
    {
      _id: "6835238fe96d99513e4221a8",
      event: dummyEventsData[1],
      eventDateTime: "2025-06-30T15:30:00.000Z",
      ticketPrice: 2500,
      ticketTypes: {
        advance: 0,
        vip: 0,
        student: 0,
      },
    },
    {
      _id: "6835238fe96d99513e4221a9",
      event: dummyEventsData[2],
      eventDateTime: "2025-06-30T03:30:00.000Z",
      ticketPrice: 3500,
      ticketTypes: {
        advance: 1,
        vip: 2,
        student: 1,
      },
    },
    {
      _id: "6835238fe96d99513e4221aa",
      event: dummyEventsData[3],
      eventDateTime: "2025-07-15T16:30:00.000Z",
      ticketPrice: 1500,
      ticketTypes: {
        advance: 2,
        vip: 0,
        student: 2,
      },
    },
    {
      _id: "683682072b5989c29fc6dc0d",
      event: dummyEventsData[4],
      eventDateTime: "2025-06-05T15:30:00.000Z",
      ticketPrice: 2000,
      ticketTypes: {
        advance: 4,
        vip: 1,
        student: 1,
      },
    },
    {
      _id: "68380044686d454f2116b39a",
      event: dummyEventsData[5],
      eventDateTime: "2025-06-20T16:00:00.000Z",
      ticketPrice: 3500,
      ticketTypes: {
        advance: 0,
        vip: 2,
        student: 0,
      },
    },
  ],
};




export const dummyBookingData = [
  {
    _id: "68396334fb83252d82e17295",
    user: { name: "Gracious" },
    event: {
      _id: "68352363e96d99513e4221a4",
      event: {
        ...dummyEventsData[0],
        ticketPrices: {
          advance: 3500,
          vip: 3000,
          student: 800
        }
      },
      eventDateTime: "2025-06-30T06:30:00.000Z"
    },
    ticketTypes: {
      advance: 2,
      vip: 0,
      student: 1
    },
    amount: 7000,
    isPaid: false
  },
  {
    _id: "68396334fb83252d82e17296",
    user: { name: "Gracious" },
    event: {
      _id: "68352363e96d99513e4221a4",
      event: {
        ...dummyEventsData[0],
        ticketPrices: {
          advance: 500,
          vip: 3000,
          student: 800
        }
      },
      eventDateTime: "2025-06-30T06:30:00.000Z"
    },
    ticketTypes: {
      advance: 1,
      vip: 1,
      student: 0
    },
    amount: 3500,
    isPaid: true
  },
  {
    _id: "68396334fb83252d82e17297",
    user: { name: "Gracious" },
    event: {
      _id: "68352363e96d99513e4221a4",
      event: {
        ...dummyEventsData[0],
        ticketPrices: {
          advance: 1500,
          vip: 3000,
          student: 800
        }
      },
      eventDateTime: "2025-06-30T06:30:00.000Z"
    },
    ticketTypes: {
      advance: 3,
      vip: 2,
      student: 5
    },
    amount: 12700,
    isPaid: true
  }
];


