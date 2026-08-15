import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.timeout = 60000 // 60s — Render cold start can take 30-50s

//STORE MY GLOBAL STATES AND FUNCTIONS
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

export const AppProvider = ({ children })=>{

    const [isAdmin, setIsAdmin] = useState(false)
    const [events, setEvents] = useState([])
    const [favoriteEvents, setFavoriteEvents] = useState([])
    const [isEventsLoading, setIsEventsLoading] = useState(true)
    const [eventsError, setEventsError] = useState(false)
    const navigate = useNavigate()

    const { user } = useUser()
    const {getToken}= useAuth()
    const location = useLocation()

    //executed when we open the homepage
    const fetchIsAdmin = async ()=> {
        try{
            const {data} = await axios.get('/api/admin/is-admin', {headers: {Authorization: `Bearer ${await getToken()}`}})
            setIsAdmin(data.isAdmin)

            if(!data.isAdmin && location.pathname.startsWith('/admin')){
                navigate('/')
                // eslint-disable-next-line no-undef
                toast.error('You are not authorized to access admin dashboard')
            }
        }catch (error){
            console.error(error)
        }
    }

    const fetchEvents = async (isRetry = false)=> {
        try{
            setIsEventsLoading(true)
            setEventsError(false)
            const {data} = await axios.get('/api/event/all', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if(data.success){
                setEvents(data.events)
                setIsEventsLoading(false)
            } else{
                // eslint-disable-next-line no-undef
                toast.error(data.message)
                setIsEventsLoading(false)
            }
        } catch(error){
            console.error(error)
            if(!isRetry){
                // Likely a Render cold start timeout — retry once after a short delay
                setTimeout(() => fetchEvents(true), 2000)
            } else {
                setIsEventsLoading(false)
                setEventsError(true)
            }
        }
    }

    const fetchFavoriteEvents = async ()=> {
        try {
            const {data} = await axios.get('/api/user/favorites', {headers: {Authorization: `Bearer ${await getToken()}`}})

            if(data.success){
                setFavoriteEvents(data.events)
            }else{
                // eslint-disable-next-line no-undef
                toast.error(data.message)
            }
         }catch (error){
            console.error(error)
        }
    }

    useEffect (()=> {
        fetchEvents()
    },[])

    useEffect(()=> {
        if(user){
            fetchIsAdmin()
            fetchFavoriteEvents()
        }
    },[user])

    const value ={
        axios,
        fetchIsAdmin,user,getToken,navigate,isAdmin,events,favoriteEvents,fetchFavoriteEvents,
        isEventsLoading, eventsError, fetchEvents
    }

    return (
        <AppContext.Provider value ={value}>
            { children }
        </AppContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext)