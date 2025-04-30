import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, storage } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AuthContextType {
  user: FirebaseUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string; }) => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  uploadProfileImage: (uri: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsAdmin(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setIsAuthenticated(true);
        setIsAdmin(true);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        await AsyncStorage.setItem('isAdmin', 'true');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setIsAuthenticated(true);
        setIsAdmin(false);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        await AsyncStorage.removeItem('isAdmin');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
      setIsAdmin(false);
      await AsyncStorage.setItem('isAuthenticated', 'true');
      await AsyncStorage.removeItem('isAdmin');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      await AsyncStorage.removeItem('isAuthenticated');
      await AsyncStorage.removeItem('isAdmin');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string; }) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await updateProfile(user, data);
      // Update the local user state to reflect changes
      setUser((prevUser) => {
        if (!prevUser) return null;
        return { ...prevUser, ...data };
      });
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user.email) throw new Error('No user logged in');

    try {
      // Re-authenticate user before password change
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  };

  const uploadProfileImage = async (uri: string): Promise<string> => {
    if (!user) throw new Error('No user logged in');

    try {
      // Convert URI to blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-images/${user.uid}`);

      // Upload the file
      await uploadBytes(storageRef, blob);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update user profile with new photo URL
      await updateUserProfile({ photoURL: downloadURL });

      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateUserProfile,
        updateUserPassword,
        uploadProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}