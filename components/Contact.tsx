'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

function Contact() {
  const [loading, setLoading] = useState<boolean>(true);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    try {
      setLoading(true);

      await validationSchema.validate(
        { name, email, subject, message },
        { abortEarly: false },
      );

      // Send Message here

      toast.success('Message sent successfully!');
    } catch (err: any) {
      if (err?.inner) {
        const validationError = err.inner[0].message;
        toast.error(validationError);
      }
      toast.error(err.message);
    }
  };

  return (
    <section className="section pb-12" id="contact-us">
      <h1 className="section-title flex items-center gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Contact Us</span>
        <hr className="w-2/3" />
      </h1>
      <div className="mx-auto flex flex-col items-center gap-8 md:flex-row">
        <ul className="flex w-full list-decimal flex-col gap-4 pl-6 text-lg md:w-1/2">
          <li>
            <span className="font-bold text-text-primary">
              Send Us a Message:
            </span>
            <p className="text-lg text-text-secondary">
              Use the form to send us your questions, feedback, or inquiries.
              We&apos;ll get back to you as soon as possible.
            </p>
          </li>
          <li>
            <span className="font-bold text-text-primary">
              Alternative Contact:
            </span>
            <p className="text-lg text-text-secondary">
              If the form doesn&apos;t work, don&apos;t worry! You can directly
              email us at:{' '}
              <Link href="mailto:example@gmail.com" className="text-primary">
                example@gmail.com
              </Link>
            </p>
          </li>
          <li>
            <span className="font-bold text-text-primary">Follow Us:</span>
            <p className="text-lg text-text-secondary">
              Stay connected on social media for updates, special offers, and
              more.
            </p>
            <div className="flex gap-2 pt-4">
              <Link href="https://instagram.com/username" target="_blank">
                <Image
                  src="/images/socials/instagram.png"
                  alt="instagram icon"
                  width={52}
                  height={52}
                />
              </Link>
              <Link href="https://facebook.com/username" target="_blank">
                <Image
                  src="/images/socials/facebook.png"
                  alt="facebook icon"
                  width={49}
                  height={49}
                />
              </Link>
              <Link href="https://twitter.com/username" target="_blank">
                <Image
                  src="/images/socials/twitter.png"
                  alt="twitter icon"
                  width={50}
                  height={50}
                />
              </Link>
            </div>
          </li>
        </ul>
        <form
          className="w-full space-y-4 md:w-1/2"
          onSubmit={handleSendMessage}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              name="name"
              id="name"
              className="w-full rounded-md border border-text-secondary p-3 text-text-primary outline-none focus:border-primary"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              id="email"
              className="w-full rounded-md border border-text-secondary p-3 text-text-primary outline-none focus:border-primary"
              placeholder="Email"
            />
          </div>
          <input
            type="text"
            name="subject"
            id="subject"
            className="w-full rounded-md border border-text-secondary p-3 text-text-primary outline-none focus:border-primary"
            placeholder="Subject"
          />
          <textarea
            name="message"
            id="message"
            className="w-full rounded-md border border-text-secondary p-3 text-text-primary outline-none focus:border-primary"
            rows={5}
            placeholder="Message"
          ></textarea>
          <button
            className="btn-full mt-4 disabled:cursor-no-drop disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {!loading ? 'Sending message...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
export default Contact;
