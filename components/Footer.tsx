import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="gradient p-8 lg:p-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h1 className="flex min-h-fit items-center gap-2 text-3xl font-semibold text-primary">
            <Image src="/logo.png" alt="logo" width={60} height={60} />
            <span className="tracking-2">Stickify</span>
          </h1>
          <p className="pt-6 text-lg text-text-secondary">
            Call now:{' '}
            <span className="cursor-pointer font-semibold text-primary">
              +91 0000000000
            </span>
            <span className="block pt-4 text-text-secondary">
              456 Chandni Chowk Street, Near Red Fort, Old Delhi, New Delhi,
              Delhi 110006, India
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-text-secondary">
          <h3 className="pb-4 text-lg font-semibold text-primary">
            Quick Link
          </h3>
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/stickers" className="hover:text-primary">
            Sticker Gallery
          </Link>
          <Link href="/order-stickers" className="hover:text-primary">
            Order Stickers
          </Link>
          <Link href="/contact-us" className="hover:text-primary">
            Contact Us
          </Link>
          <Link href="#" className="hover:text-primary">
            FAQs
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-text-secondary">
          <h3 className="pb-4 text-lg font-semibold text-primary">
            Customer Support
          </h3>
          <Link href="#" className="hover:text-primary">
            Shipping & Delivery
          </Link>
          <Link href="#" className="hover:text-primary">
            Returns & Refunds
          </Link>
          <Link href="/order-stickers" className="hover:text-primary">
            Payment Options
          </Link>
          <Link href="#" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary">
            Terms & Conditions
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-text-secondary">
          <h3 className="pb-4 text-lg font-semibold text-primary">
            Stay Connected
          </h3>
          <div className="flex gap-2">
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
            <Link href="https://wa.me/+910000000000">
              <Image
                src="/images/socials/whatsapp.png"
                alt="whatsapp icon"
                width={48}
                height={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
