import Image from "next/image";
import Link from "next/link";

function Contact() {
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
                            Use the form to send us your questions, feedback, or
                            inquiries. We&apos;ll get back to you as soon as
                            possible.
                        </p>
                    </li>
                    <li>
                        <span className="font-bold text-text-primary">
                            Alternative Contact:
                        </span>
                        <p className="text-lg text-text-secondary">
                            If the form doesn&apos;t work, don&apos;t worry! You
                            can directly email us at:{" "}
                            <Link
                                href="mailto:example@gmail.com"
                                className="text-primary"
                            >
                                example@gmail.com
                            </Link>
                        </p>
                    </li>
                    <li>
                        <span className="font-bold text-text-primary">
                            Follow Us:
                        </span>
                        <p className="text-lg text-text-secondary">
                            Stay connected on social media for updates, special
                            offers, and more.
                        </p>
                        <div className="flex gap-2 pt-4">
                            <Link
                                href="https://instagram.com/username"
                                target="_blank"
                            >
                                <Image
                                    src="/images/socials/instagram.png"
                                    alt="instagram icon"
                                    width={52}
                                    height={52}
                                />
                            </Link>
                            <Link
                                href="https://facebook.com/username"
                                target="_blank"
                            >
                                <Image
                                    src="/images/socials/facebook.png"
                                    alt="facebook icon"
                                    width={49}
                                    height={49}
                                />
                            </Link>
                            <Link
                                href="https://twitter.com/username"
                                target="_blank"
                            >
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
                <form className="w-full space-y-4 md:w-1/2">
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
                    <input
                        type="submit"
                        value="Send Message"
                        className="w-full rounded-md bg-primary p-3 text-lg text-white outline-none"
                    />
                </form>
            </div>
        </section>
    );
}
export default Contact;
