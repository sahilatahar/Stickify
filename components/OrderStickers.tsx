import Image from "next/image";
import Link from "next/link";

function OrderStickers() {
    return (
        <section className="section">
            <h1 className="section-title flex items-center gap-4">
                <hr className="w-2/3" />
                <span className="min-w-fit">Order Stickers</span>
                <hr className="w-2/3" />
            </h1>
            <div className="flex flex-col md:flex-row">
                <div className="flex w-full select-none items-center justify-center md:w-1/2">
                    <Image
                        src="/images/human_sticker.jpg"
                        alt="sticker 1"
                        width={300}
                        height={300}
                        className="md:animate-up-down"
                    />
                </div>
                <div className="w-full px-4 md:w-1/2 md:px-0">
                    <h3 className="py-4 text-xl font-semibold">
                        How It Works:
                    </h3>
                    <ul className="flex list-decimal flex-col gap-4 pl-4 text-lg">
                        <li>
                            <span className="font-medium text-text-primary">
                                Fill Out the Form:
                            </span>
                            <p className="text-text-secondary">
                                Fill google form on our website, including your
                                details.
                            </p>
                            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScAOGzafdsQfUEYejijEs3SddrA0BJsBp43zPk0t8b1dtaBjw/viewform?usp=sf_link">
                                <Image
                                    src="/images/socials/google-form.png"
                                    alt="google form"
                                    width={150}
                                    height={0}
                                    className="mt-2 h-auto rounded-md border-2 border-primary"
                                />
                            </Link>
                        </li>
                        <li>
                            <span className="font-medium text-text-primary">
                                Upload Images:
                            </span>
                            <p className="text-text-secondary">
                                Easily upload your own images through the form,
                                or browse and download stickers from our
                                pre-designed{" "}
                                <Link href="/stickers" className="text-primary">
                                    gallery
                                </Link>
                                . Once downloaded, you can upload the stickers.
                            </p>
                        </li>
                        <li>
                            <span className="font-medium text-text-primary">
                                Contact Us on WhatsApp:
                            </span>
                            <p className="text-text-secondary">
                                Send us a message on WhatsApp with your name to
                                confirm your order.
                            </p>
                            <Link href="https://wa.me/+910000000000">
                                <Image
                                    src="/images/socials/whatsapp-chat.png"
                                    className="mt-2 h-auto"
                                    alt="chat on whatsapp"
                                    width={175}
                                    height={0}
                                />
                            </Link>
                        </li>
                        <li>
                            <span className="font-medium text-text-primary">
                                Make a Payment via UPI:
                            </span>
                            <p className="text-text-secondary">
                                Pay securely using UPI
                                <span className="ml-1 text-red-600">
                                    (Cash-on-Delivery is not available.)
                                </span>
                            </p>
                            <div className="flex items-center gap-8">
                                <Link href="#">
                                    <Image
                                        src="/images/payments/g-pay.png"
                                        className="mt-2 inline"
                                        alt="g-pay icon"
                                        width={80}
                                        height={50}
                                    />
                                </Link>
                                <Link href="#">
                                    <Image
                                        src="/images/payments/paytm.png"
                                        className="mt-2 inline"
                                        alt="g-pay icon"
                                        width={80}
                                        height={50}
                                    />
                                </Link>
                                <Link href="#">
                                    <Image
                                        src="/images/payments/amazon-pay.png"
                                        className="mt-2 inline translate-y-2"
                                        alt="g-pay icon"
                                        width={180}
                                        height={50}
                                    />
                                </Link>
                            </div>
                        </li>
                        <li>
                            <span className="font-medium text-text-primary">
                                Receive Your Stickers:
                            </span>
                            <p className="text-text-secondary">
                                Once payment is confirmed, we’ll print and ship
                                your stickers right to your door.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
export default OrderStickers;
