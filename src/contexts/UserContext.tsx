import { FC, createContext, ReactNode, useContext, useState } from 'react';
import { User } from 'firebase/auth';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Define props for UserProvider
interface UserProviderProps {
  children: React.ReactNode; // Ensure children prop is defined
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {} // Initial value, will be overwritten by provider
};

const UserContext = createContext<UserContextType>(initialUserContext);

export const UserProvider: FC<UserProviderProps> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
