import { createContext, useState } from 'react'
import { useContext } from 'react'
import { LocalStorageContext } from '../utils/LocalStorage'
import axios from 'axios'

const AuthContext = createContext()
// const BASE_URL = "http://localhost:5000/api/users"
const BASE_URL = "https://mern-auth-s472.onrender.com"

const AuthContextProvider = ({children}) => {
   const [ currentUser, setcurrentUser ] = useState({})
   const {saveToken, removeToken, token } = useContext(LocalStorageContext) 

   const login = async (credential) => {
      try {
        const response = await axios.post(`${BASE_URL}/login`, credential, {
            withCredentials: true,
            credentials: 'include',
          })
          saveToken("damn")  
          getUser(response.data._id)
         return response
      } catch (error) {
         return error
      }
      
   }

   const register = async (values) => {
      try {
        const response = await axios.post(`${BASE_URL}/register`, values, {
            withCredentials: true,
            credentials: 'include',
          })
         saveToken(response.data)
         return response
      } catch (error) {
         return error
      }
      
   }

   const logout = async () => {
      try {
         const response = await axios.get(`${BASE_URL}/logout`, {
            withCredentials: true,
            credentials: 'include',
          } )
          removeToken()
          setcurrentUser({})
         return response
      } catch (error) {
         console.log(error)
      }
      
   }

   const getUser = async (id) => {
      try {
         const response = await axios.get(`${BASE_URL}/${id}`, {
            withCredentials: true,
            credentials: 'include',
          })
          setcurrentUser(response.data)
         return response
      } catch (error) {
         console.log(error)
      }
      
   }

   const updateUser = async (values) => {
      try {
         const response = await axios.put(`${BASE_URL}/${token._id}`, values, {
            withCredentials: true,
            credentials: 'include',
          })
         saveToken(response.data)  
         return response
      } catch (error) {
         console.log(error)
      }
      
   }




  return (
   <AuthContext.Provider value={{login, logout, register, getUser, currentUser, updateUser}}>
      {children}
   </AuthContext.Provider>
  )
}
export {AuthContext, AuthContextProvider } 