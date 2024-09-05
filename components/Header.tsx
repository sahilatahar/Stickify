'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';
import { useWindowSize } from '@uidotdev/usehooks';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Header() {
  const { width } = useWindowSize();
  return (
    <>
      <header className="gradient flex w-full flex-col justify-center md:py-8 lg:py-16">
        <section className="mx-auto w-full max-w-screen-lg rounded-2xl bg-white pt-4 md:w-[90%] md:p-8 md:pt-8 md:shadow-box">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={width && width >= 768 ? true : false}
            pagination={{ clickable: true }}
            className="h-[250px] select-none md:h-auto lg:h-[350px]"
            loop={true}
            autoplay={true}
          >
            <SwiperSlide>
              <Image
                src="/images/swiper/image1.png"
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full object-cover md:object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/images/swiper/image2.png"
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full object-cover md:object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/images/swiper/image1.png"
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full object-cover md:object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/images/swiper/image3.png"
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full object-cover md:object-contain"
              />
            </SwiperSlide>
          </Swiper>
        </section>
      </header>
      <section className="section mx-auto max-w-screen-lg pt-16 text-center">
        <h1 className="text-2xl font-semibold text-text-primary md:text-3xl">
          Get Personalized Stickers of Your Face – Stick with Style!
        </h1>
        <h3 className="pt-4 text-xl font-medium text-text-secondary">
          Turn your favorite photos into high-quality, sticky stickers!
        </h3>
        <p className="pt-6 text-lg text-text-secondary">
          Bring your photos to life with custom stickers that are perfect for
          any occasion. Whether you want to personalize your laptop, decorate
          your space, or add a unique touch to your gifts, our stickers are the
          perfect choice. Simply upload your image, and we will handle the rest.
          Our durable, waterproof stickers are printed with care and delivered
          straight to your door. Start sticking your style everywhere you go!
        </p>
      </section>
    </>
  );
}
export default Header;
