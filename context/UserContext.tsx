'use client';
import { UserInterface as User } from '@/types';
import { useSession } from 'next-auth/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import {
  fetchUserData,
  addToCart,
  removeFromCart,
  updateCart,
} from '@/lib/user';

interface UserContextType {
  user: User | null;
  fetchUserData: () => void;
  addToCart: (stickerId: string, quantity: number) => void;
  removeFromCart: (stickerId: string) => void;
  updateCart: (stickerId: string, quantity: number) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession(); // NextAuth session
  const [user, setUser] = useState<User | null>(null);

  const loadUserData = useCallback(async () => {
    if (session?.user) {
      try {
        const data = await fetchUserData(session.user.id);
        setUser(data);
      } catch (error: any) {
        toast.error('Failed to fetch user data');
      }
    }
  }, [session?.user]);

  useEffect(() => {
    if (session) {
      loadUserData();
    }
  }, [loadUserData, session]);

  const handleAddToCart = async (stickerId: string, quantity: number) => {
    if (!user) return;

    const previousCart = user.cartItems;
    const updatedCart = [...user.cartItems, { stickerId, quantity }];

    setUser({
      ...user,
      cartItems: updatedCart,
    });

    try {
      const updatedUser = await addToCart(user._id, stickerId, quantity);
      setUser(updatedUser);
      toast.success('Added to cart');
    } catch (error: any) {
      setUser({ ...user, cartItems: previousCart });
      toast.error('Error adding to cart');
    }
  };

  const handleRemoveFromCart = async (stickerId: string) => {
    if (!user) return;

    const previousCart = user.cartItems;
    const updatedCart = user.cartItems.filter(
      (item) => item.stickerId !== stickerId,
    );

    setUser({
      ...user,
      cartItems: updatedCart,
    });

    try {
      const updatedUser = await removeFromCart(user._id, stickerId);
      setUser(updatedUser);
      toast.success('Removed from cart');
    } catch (error: any) {
      setUser({ ...user, cartItems: previousCart });
      toast.error('Error removing from cart');
    }
  };

  const handleUpdateCart = async (stickerId: string, quantity: number) => {
    if (!user) return;

    const previousCart = user.cartItems;
    const updatedCart = user.cartItems.map((item) =>
      item.stickerId === stickerId ? { ...item, quantity } : item,
    );

    setUser({
      ...user,
      cartItems: updatedCart,
    });

    try {
      const updatedUser = await updateCart(user._id, stickerId, quantity);
      setUser(updatedUser);
      toast.success('Cart updated');
    } catch (error: any) {
      setUser({ ...user, cartItems: previousCart });
      toast.error('Error updating cart');
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUserData: loadUserData,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateCart: handleUpdateCart,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
