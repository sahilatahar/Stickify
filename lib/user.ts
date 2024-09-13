import { UserInterface as User } from '@/types';

export const fetchUserData = async (userId: string): Promise<User | null> => {
  try {
    const res = await fetch(`/api/user/${userId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await res.json();
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const addToCart = async (
  userId: string,
  stickerId: string,
  quantity: number,
): Promise<User> => {
  try {
    const res = await fetch(`/api/cart`, {
      method: 'POST',
      body: JSON.stringify({ userId, stickerId, quantity }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error('Failed to add to cart');
    }

    return await res.json();
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const removeFromCart = async (
  userId: string,
  stickerId: string,
): Promise<User> => {
  try {
    const res = await fetch(`/api/cart/${stickerId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to remove from cart');
    }

    return await res.json();
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const updateCart = async (
  userId: string,
  stickerId: string,
  quantity: number,
): Promise<User> => {
  try {
    const res = await fetch(`/api/cart/${stickerId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error('Failed to update cart');
    }

    return await res.json();
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
