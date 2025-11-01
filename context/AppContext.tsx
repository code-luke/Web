import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// FIX: The User type can still be imported from 'firebase/auth' with compat libraries.
import { User as FirebaseUser } from "firebase/auth";
// FIX: Removed v9 modular firestore imports as they are replaced by compat API calls.
import { auth, db } from '../services/firebase';
import { InterestResult, Jurusan, User } from '../types';

interface AppContextType {
  // Test results
  interestResult: InterestResult | null;
  setInterestResult: (result: InterestResult | null) => void;
  recommendedMajors: Jurusan[] | null;
  setRecommendedMajors: (majors: Jurusan[] | null) => void;
  // Auth
  currentUser: User | null;
  loadingAuth: boolean; // To handle initial auth state loading
  logout: () => void;
  upgradeAccount: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [interestResult, setInterestResult] = useState<InterestResult | null>(null);
  const [recommendedMajors, setRecommendedMajors] = useState<Jurusan[] | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // FIX: Switched from v9's onAuthStateChanged(auth, ...) to compat's auth.onAuthStateChanged(...)
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in, get their data from Firestore
        // FIX: Switched from v9's doc(db, "users", ...) to compat's db.collection(...).doc(...)
        const userDocRef = db.collection("users").doc(firebaseUser.uid);
        // FIX: Switched from v9's getDoc(userDocRef) to compat's userDocRef.get()
        const userDocSnap = await userDocRef.get();

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data()!;
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            subscriptionStatus: (userData.subscriptionStatus as User['subscriptionStatus']) || 'free',
          });
        } else {
            // This case might happen if user is created in Auth but not in Firestore.
            // We can create it here as a fallback.
            const newUser: Omit<User, 'uid' | 'email'> = { subscriptionStatus: 'free' };
            // FIX: Switched from v9's setDoc(userDocRef, ...) to compat's userDocRef.set(...)
            await userDocRef.set(newUser);
            setCurrentUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                subscriptionStatus: 'free'
            });
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoadingAuth(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
        // FIX: Switched from v9's signOut(auth) to compat's auth.signOut()
        await auth.signOut();
    } catch (error) {
        console.error("Error signing out: ", error);
    }
  };

  const upgradeAccount = async () => {
      if (currentUser) {
        // FIX: Switched from v9's doc(db, ...) to compat's db.collection(...).doc(...)
        const userDocRef = db.collection("users").doc(currentUser.uid);
        try {
            // FIX: Switched from v9's updateDoc(userDocRef, ...) to compat's userDocRef.update(...)
            await userDocRef.update({ subscriptionStatus: 'premium' });
            setCurrentUser(prev => prev ? { ...prev, subscriptionStatus: 'premium' } : null);
        } catch (error) {
            console.error("Error upgrading account: ", error);
        }
      }
  };

  const value = {
    interestResult,
    setInterestResult,
    recommendedMajors,
    setRecommendedMajors,
    currentUser,
    loadingAuth,
    logout,
    upgradeAccount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
