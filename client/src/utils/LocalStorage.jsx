import { createContext, useState, useEffect} from 'react';

const LocalStorageContext = createContext();

const LocalStorageProvider = ({children}) => {

   const [ token, setToken] = useState(JSON.parse(localStorage.getItem("auth_token")) || null);

   //save token to local storage
   const saveToken = (newToken) => {
      try {
         setToken(newToken);
      } catch (error) {
         console.log("problem with saving token")
      }
   }  

   // Remove the token from local storage
   const removeToken = () => {
      localStorage.removeItem('auth_token');
      setToken(null);
    };

    // Load token from local storage on component mount
    useEffect(() => {
      localStorage.setItem('auth_token', JSON.stringify(token));    
    }, [token]) 



   return (
      <LocalStorageContext.Provider value={{token, saveToken, removeToken}}>
         {children}
      </LocalStorageContext.Provider>
   )
}

export { LocalStorageContext, LocalStorageProvider }