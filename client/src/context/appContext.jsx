import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

//STORE MY GLOBAL STATES AND FUNCTIONS
export const AppContext = createContext()

export const AppProvider = ({ children })=>{

    const [isAdmin, setIsAdmin] = useState(false)
    const [events, setEvents] = useState([])
    const [favoriteEvents, setFavoriteEvents] = useState([])
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
                toast.error('You are not authorized to access admin dashboard')
            }
        }catch (error){
            console.error(error)
        }
    }

    const fetchEvents = async ()=> {
        try{
            const {data} = await axios.get('/api/event/all', {
                headers: { Authorization: `Bearer ${await getToken()}` }   // ✅ added auth header
            })
            if(data.success){
                setEvents(data.events)
            } else{
                toast.error(data.message)
            }
        } catch(error){
            console.error(error)
        }
    }

    const fetchFavoriteEvents = async ()=> {
        try {
            const {data} = await axios.get('/api/user/favorites', {headers: {Authorization: `Bearer ${await getToken()}`}})

            if(data.success){
                setFavoriteEvents(data.events)
            }else{
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
    },[])

    const value ={
        axios,
        fetchIsAdmin,user,getToken,navigate,isAdmin,events,favoriteEvents,fetchFavoriteEvents
    }

    return (
        <AppContext.Provider value ={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
