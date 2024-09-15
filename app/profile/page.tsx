'use client';
import { Loading } from '@/components/common/Loading';
import { useUserContext } from '@/context/UserContext';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import * as Yup from 'yup';

const profileValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .matches(
      /^[789]\d{9}$/,
      'Invalid phone number. Must be a 10-digit number starting with 7, 8, or 9.',
    )
    .required('Phone number is required'),
});

function Profile() {
  const { user, updateUser, isLoading, logoutUser } = useUserContext();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const phoneNumber = formData.get('phoneData') as string;

    try {
      setLoading(true);
      await profileValidationSchema.validate({ name, address, phoneNumber });
      updateUser(name, address, phoneNumber);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || status === 'loading') return <Loading />;
  else if (!session?.user) router.push('/login');

  return (
    <section className="section pb-20">
      <h1 className="section-title pb-8 text-center md:pt-0">Your Profile</h1>
      <div className="mx-auto flex w-full max-w-lg flex-col md:flex-row">
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
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={user?.email}
                disabled={true}
                className="read-only:text-text-secondary"
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
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                defaultValue={user?.phoneNumber}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-row gap-4">
            <button
              type="button"
              className="btn mx-auto flex-[0.3] bg-danger md:w-fit md:flex-[0.2] md:px-8"
              onClick={logoutUser}
            >
              Log out
            </button>
            <button
              className="btn flex-[0.7] disabled:cursor-no-drop disabled:opacity-50 md:flex-[0.8]"
              type="submit"
              disabled={loading}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Profile;
