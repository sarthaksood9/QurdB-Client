import { createContext, useState } from "react";


// Create a new context for user authentication
export const UserContext = createContext();


// Provider component to wrap around parts of the app that need access to user context
export const UserProvider = ({ children }) => {

    // Initialize user state with value from local storage or null if not found
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);



    // Function to log in a user and save user data to local storage
    const logIn = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }


    // Function to log out a user and remove user data from local storage
    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    }

    return (
        // Provide user state and authentication functions to children components
        <UserContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    )
}