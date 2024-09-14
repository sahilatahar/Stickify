'use client';
import { Loading } from '@/components/common/Loading';
import { useUserContext } from '@/context/UserContext';
import { useSession } from 'next-auth/react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import NotFound from '../not-found';

function Profile() {
  const { user, updateUser, isLoading } = useUserContext();
  const { status } = useSession();

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const address = formData.get('address') as string;

    if (!name) {
      toast.error('Name is required');
      return;
    } else if (!address) {
      toast.error('Address is required');
      return;
    }

    updateUser(name, address);
  };

  if (isLoading || status === 'loading') return <Loading />;
  if (!user) return <NotFound />;

  return (
    <section className="section pb-20">
      <h1 className="section-title pb-8 text-center md:pt-0">Your Profile</h1>
      <div className="mx-auto flex w-full max-w-md flex-col md:flex-row">
        <form onSubmit={handleUpdate} className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user?.name}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email (Unchangeable)</label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={user?.email}
                disabled={true}
                readOnly
              />
            </div>
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                defaultValue={user?.address}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-full mx-auto mt-6 md:w-fit md:px-8"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
export default Profile;
