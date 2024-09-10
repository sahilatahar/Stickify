import Image from 'next/image';
import Link from 'next/link';

function PersonalizedStickers() {
  return (
    <section className="section">
      <h1 className="section-title flex items-center gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Personalized Sticker</span>
        <hr className="w-2/3" />
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full select-none items-center justify-center md:w-1/2">
          <Image
            src="/images/human_sticker.jpg"
            alt="sticker 1"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-[250px] md:w-[350px] md:animate-up-down"
          />
        </div>
        <div className="w-full px-4 md:w-1/2 md:px-0">
          <h3 className="py-4 text-xl font-semibold">
            Get Personalized Sticker in 4 Easy Steps
          </h3>
          <ul className="flex list-decimal flex-col gap-4 pl-4 text-lg">
            <li>
              <span className="font-medium text-text-primary">
                Fill Out the Form:
              </span>
              <p className="text-text-secondary">
                Choose a custom image – it can be anything from your face, a
                logo, or a unique design. Upload it directly through our form.
              </p>
            </li>
            <li>
              <span className="font-medium text-text-primary">
                Fill in Your Details
              </span>
              <p className="text-text-secondary">
                Provide your contact information and any specific instructions
                for your sticker via our form. Your data will be securely saved
                in our database for processing.
              </p>
            </li>
            <li>
              <span className="font-medium text-text-primary">
                Complete Payment
              </span>
              <p className="text-text-secondary">
                Use our secure payment gateway to pay for your order. Various
                payment options like UPI, debit/credit cards, and more are
                available.{' '}
                <span className="ml-1 text-red-600">
                  (Cash-on-Delivery is not available.)
                </span>
              </p>
            </li>
            <li>
              <span className="font-medium text-text-primary">
                Receive Your Stickers at Home
              </span>
              <p className="text-text-secondary">
                Once your custom stickers are ready, we’ll ship them straight to
                your door. You&apos;ll get notifications to track the status of
                your order.
              </p>
            </li>
            <Link
              href="/personalized-stickers/order"
              className="mt-4 w-full rounded-md bg-primary p-3 px-8 text-center text-lg text-white outline-none sm:w-fit"
            >
              Order Personalized Stickers
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default PersonalizedStickers;
