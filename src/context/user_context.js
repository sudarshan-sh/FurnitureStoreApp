import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        myUser,
        loginWithRedirect,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
