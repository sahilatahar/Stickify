import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Stickify",
    description: "About Stickify",
};

function page() {
    return (
        <section className="section mx-auto max-w-screen-lg pb-16 pt-8 text-lg">
            <h1 className="section-title text-4xl">About Us</h1>
            <article>
                <span className="text-xl font-medium text-text-primary">
                    Welcome to Stickify
                </span>
                <p className="pt-2 text-text-secondary">
                    We are a passionate startup on a mission to bring creativity
                    to life, one sticker at a time. What started as a small idea
                    has quickly grown into a vibrant business that combines art,
                    technology, and a love for customization.
                </p>
            </article>
            <article className="pt-8">
                <span className="text-xl font-medium text-text-primary">
                    Our Story:
                </span>
                <p className="pt-2 text-text-secondary">
                    At Stickify, we believe that stickers are more than just
                    decorative items; they are a way to express individuality
                    and add a personal touch to the world around us. Our journey
                    began with a simple question: &quot;What if we could turn
                    anyone’s favorite photo into a high-quality sticker?&quot;
                    This idea sparked the creation of our company, and since
                    then, we&apos;ve been dedicated to delivering top-notch
                    custom stickers to customers all over India.
                </p>
            </article>
            <article className="pt-8">
                <span className="text-xl font-medium text-text-primary">
                    Our Process:
                </span>
                <p className="pt-2 text-text-secondary">
                    We’ve made it incredibly easy for you to get your hands on
                    our stickers:
                </p>
                <ul className="list-decimal pl-4">
                    <li>
                        <span className="font-medium text-text-primary">
                            Choose Your Image or Browse Our Gallery:
                        </span>
                        <p className="text-text-secondary">
                            Upload your favorite photo or pick from our
                            collection of pre-made designs.
                        </p>
                    </li>
                    <li>
                        <span className="font-medium text-text-primary">
                            Customize & Order
                        </span>
                        <p className="text-text-secondary">
                            Fill out our easy-to-use form, upload your image,
                            and contact us to finalize your order.
                        </p>
                    </li>
                    <li>
                        <span className="font-medium text-text-primary">
                            Delivered to Your Door:
                        </span>
                        <p className="text-text-secondary">
                            Once your payment is confirmed, we’ll print your
                            stickers and ship them directly to your doorstep.
                        </p>
                    </li>
                </ul>
            </article>
            <article className="pt-8">
                <span className="text-xl font-medium text-text-primary">
                    Our Commitment:
                </span>
                <p className="pt-2 text-text-secondary">
                    As a startup, we are committed to providing not only
                    high-quality products but also exceptional customer service.
                    We value your feedback and are constantly looking for ways
                    to improve our offerings and better serve our customers.
                </p>
            </article>
            <article className="pt-8">
                <span className="text-xl font-medium text-text-primary">
                    Join Us on Our Journey:
                </span>
                <p className="pt-2 text-text-secondary">
                    We&apos;re excited to share our passion for stickers with
                    you. Whether you&apos;re looking for a single custom sticker
                    or a bulk order, we&apos;re here to make your ideas stick.
                    Follow us on social media and stay tuned for new designs,
                    special offers, and behind-the-scenes glimpses of what makes
                    Stickify unique.
                </p>
            </article>

            <p className="pt-6 font-medium text-text-primary">
                Thank you for supporting our startup!
            </p>
            <p className="pt-2 font-medium text-text-primary">Stickify Team</p>
        </section>
    );
}
export default page;
