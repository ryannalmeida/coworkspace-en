
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  getCurrentUser, 
  loginUser as loginUserInStorage, 
  logoutUser as logoutUserInStorage,
  registerUser as registerUserInStorage,
  updateUserProfile,
  deleteUser,
  initializeData
} from '../utils/localStorage';
import { toast } from '../hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  registerUser: (email: string, name: string, password: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize data and check for logged in user on mount
  useEffect(() => {
    initializeData();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const loggedInUser = loginUserInStorage(email, password);
      setUser(loggedInUser);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logoutUser = () => {
    logoutUserInStorage();
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const registerUser = async (email: string, name: string, password: string) => {
    try {
      const newUser = registerUserInStorage(email, name, password);
      setUser(newUser);
      toast({
        title: "Registration Successful",
        description: `Welcome to CoworkSpace, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Could not create account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      if (!user) {
        throw new Error("No user is logged in");
      }
      const updatedUser = updateUserProfile(user.id, updates);
      setUser(updatedUser);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Could not update profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      if (!user) {
        throw new Error("No user is logged in");
      }
      deleteUser(user.id);
      setUser(null);
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: error instanceof Error ? error.message : "Could not delete account",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      loginUser, 
      logoutUser, 
      registerUser,
      updateUser,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
