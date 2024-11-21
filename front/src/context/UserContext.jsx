import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};