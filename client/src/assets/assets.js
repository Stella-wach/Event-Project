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
        image: "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=WpW36ldAqnM'
    },
    {
        image: "https://img.youtube.com/vi/-sAOWhvheK8/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=-sAOWhvheK8'
    },
    {
        image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y'
    },
    {
        image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=umiKiW4En9g'
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
        "poster_path": "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
        "categories": [
            { "id": 1, "name": "Technology" },
            { "id": 2, "name": "Business" },
            { "id": 3, "name": "Networking" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-02-27",
        "location": "Convention Center, Nairobi",
        "tagline": "Shaping tomorrow's technology today.",
        "rating": 4.6,
        "attendee_count": 1500,
        "duration": 480, // minutes (8 hours)
    },
    {
        "_id": "1232546",
        "id": 1232546,
        "title": "Midnight Horror Experience",
        "description": "A spine-chilling immersive horror experience featuring live actors, escape rooms, and psychological thrills. Test your courage in this unforgettable night of terror and mystery.",
        "poster_path": "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
        "categories": [
            { "id": 4, "name": "Entertainment" },
            { "id": 5, "name": "Immersive Experience" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-04-23",
        "location": "Haunted Manor, Karen",
        "tagline": "Face your fears in the dark.",
        "rating": 4.4,
        "attendee_count": 200,
        "duration": 180, // minutes (3 hours)
    },
    {
        "_id": "552524",
        "id": 552524,
        "title": "Family Fun Festival",
        "description": "A delightful family-friendly festival featuring games, live performances, food trucks, and activities for all ages. Create lasting memories with entertainment that brings families together.",
        "poster_path": "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
        "categories": [
            { "id": 6, "name": "Family" },
            { "id": 7, "name": "Festival" },
            { "id": 8, "name": "Entertainment" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-05-17",
        "location": "Uhuru Park, Nairobi",
        "tagline": "Fun for the whole family.",
        "rating": 4.8,
        "attendee_count": 3000,
        "duration": 360, // minutes (6 hours)
    },
    {
        "_id": "668489",
        "id": 668489,
        "title": "Urban Action Sports Championship",
        "description": "Witness jaw-dropping stunts and athletic prowess as top athletes compete in skateboarding, BMX, and parkour competitions. High-energy action meets urban culture.",
        "poster_path": "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
        "categories": [
            { "id": 9, "name": "Sports" },
            { "id": 10, "name": "Competition" },
            { "id": 11, "name": "Urban Culture" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-04-25",
        "location": "Skate Park, Westlands",
        "tagline": "Where skill meets street.",
        "rating": 4.7,
        "attendee_count": 800,
        "duration": 300, // minutes (5 hours)
    },
    {
        "_id": "950387",
        "id": 950387,
        "title": "Digital Creators Workshop",
        "description": "Learn from expert content creators and digital artists in this hands-on workshop. Discover the secrets of successful YouTube channels, Instagram growth, and digital art techniques.",
        "poster_path": "https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
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
        "rating": 4.5,
        "attendee_count": 150,
        "duration": 420, // minutes (7 hours)
    },
    {
        "_id": "575265",
        "id": 575265,
        "title": "Entrepreneurship Summit: The Final Chapter",
        "description": "The ultimate entrepreneurship event featuring successful business leaders sharing their journeys, failures, and victories. Network with investors, mentors, and fellow entrepreneurs in this game-changing summit.",
        "poster_path": "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg",
        "categories": [
            { "id": 16, "name": "Business" },
            { "id": 17, "name": "Entrepreneurship" },
            { "id": 18, "name": "Networking" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-05-17",
        "location": "KICC, Nairobi",
        "tagline": "Your success story starts here.",
        "rating": 4.9,
        "attendee_count": 2000,
        "duration": 600, // minutes (10 hours)
    },
    {
        "_id": "986056",
        "id": 986056,
        "title": "Wellness & Mindfulness Retreat",
        "description": "Escape the hustle and bustle for a transformative wellness experience. Join expert practitioners for yoga, meditation, nutrition workshops, and holistic healing sessions.",
        "poster_path": "https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
        "categories": [
            { "id": 19, "name": "Wellness" },
            { "id": 20, "name": "Mindfulness" },
            { "id": 21, "name": "Health" }
        ],
        "speakers": dummySpeakersData,
        "event_date": "2025-04-30",
        "location": "Serenity Gardens, Karen",
        "tagline": "Restore your mind, body, and soul.",
        "rating": 4.8,
        "attendee_count": 500,
        "duration": 540, // minutes (9 hours)
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
    "totalBookings": 14,
    "totalRevenue": 1517,
    "totalUsers": 5,
    "activeEvents": [
        {
            "_id": "68352363e96d99513e4221a4",
            "event": dummyEventsData[0],
            "eventDateTime": "2025-06-30T02:30:00.000Z",
            "ticketPrice": 59,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "C1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "6835238fe96d99513e4221a8",
            "event": dummyEventsData[1],
            "eventDateTime": "2025-06-30T15:30:00.000Z",
            "ticketPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221a9",
            "event": dummyEventsData[2],
            "eventDateTime": "2025-06-30T03:30:00.000Z",
            "ticketPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221aa",
            "event": dummyEventsData[3],
            "eventDateTime": "2025-07-15T16:30:00.000Z",
            "ticketPrice": 81,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A4": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "683682072b5989c29fc6dc0d",
            "event": dummyEventsData[4],
            "eventDateTime": "2025-06-05T15:30:00.000Z",
            "ticketPrice": 49,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
            "__v": 0
        },
        {
            "_id": "68380044686d454f2116b39a",
            "event": dummyEventsData[5],
            "eventDateTime": "2025-06-20T16:00:00.000Z",
            "ticketPrice": 79,
            "occupiedSeats": {
                "A1": "user_2xl7eCSUHddibk5lRxfOtw9RMwX",
                "A2": "user_2xl7eCSUHddibk5lRxfOtw9RMwX"
            }
        }
    ]
}

export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "event": {
            _id: "68352363e96d99513e4221a4",
            event: dummyEventsData[0],
            eventDateTime: "2025-06-30T02:30:00.000Z",
            ticketPrice: 59,
        },
        "amount": 98,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17296",
        "user": { "name": "GreatStack", },
        "event": {
            _id: "68352363e96d99513e4221a4",
            event: dummyEventsData[0],
            eventDateTime: "2025-06-30T02:30:00.000Z",
            ticketPrice: 59,
        },
        "amount": 49,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17297",
        "user": { "name": "GreatStack", },
        "event": {
            _id: "68352363e96d99513e4221a4",
            event: dummyEventsData[0],
            eventDateTime: "2025-06-30T02:30:00.000Z",
            ticketPrice: 59,
        },
        "amount": 147,
        "bookedSeats": ["A1", "A2","A3"],
        "isPaid": true,
    },
]