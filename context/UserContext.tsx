'use client';
import { UserInterface as User } from '@/types';
import { signOut, useSession } from 'next-auth/react';
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
  updateUserData,
} from '@/lib/user';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  fetchUserData: () => void;
  updateUser: (name: string, address: string, phoneNumber: string) => void;
  addToCart: (stickerId: string, quantity: number) => void;
  removeFromCart: (stickerId: string) => void;
  updateCart: (stickerId: string, quantity: number) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession(); // NextAuth session
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loadUserData = useCallback(async () => {
    if (session?.user) {
      try {
        setIsLoading(true);
        const data = await fetchUserData(session.user.id);
        setUser(data);
      } catch (error: any) {
        toast.error('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    }
  }, [session?.user]);

  useEffect(() => {
    if (session) {
      loadUserData();
    }
  }, [loadUserData, session]);

  const updateUser = async (
    name: string,
    address: string,
    phoneNumber: string,
  ) => {
    if (!user) return;

    setUser({
      ...user,
      name,
      phoneNumber,
      address,
    });

    try {
      await updateUserData(user._id, { name, address, phoneNumber });
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error('Failed to update profile');
    }
  };

  const handleAddToCart = async (stickerId: string, quantity: number) => {
    if (!user) {
      router.push('/login');
      return;
    }

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
      toast.error('Failed to add into cart');
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
      toast.error('Failed to removing from cart');
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
      toast.error('Failed to updating cart');
    }
  };

  const logoutUser = () => {
    setUser(null);
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        updateUser,
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
