import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrderStickers from "@/components/OrderStickers";
import Pricing from "@/components/Pricing";
import Stickers from "@/components/Stickers";
import ScrollTopButton from "@/components/common/ScrollTopButton";

function page() {
    return (
        <>
            <Header />
            <Stickers />
            <Pricing />
            <OrderStickers />
            <Contact />
            <Footer />
            <ScrollTopButton />
        </>
    );
}
export default page;
