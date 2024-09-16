'use client';
import { useWindowSize } from '@uidotdev/usehooks';
import Image from 'next/image';
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { v4 as uuidv4 } from 'uuid';

function Header() {
  const { width } = useWindowSize();
  return (
    <>
      <header className="gradient flex w-full flex-col justify-center py-0 md:py-10 lg:h-[calc(100vh-70px)]">
        <section className="mx-auto w-full overflow-hidden bg-white p-0 md:w-[90%] md:rounded-2xl md:p-8 md:shadow-box">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={width && width >= 768 ? true : false}
            pagination={{ clickable: true }}
            className="h-[300px] select-none md:h-full"
            loop={true}
            autoplay={true}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <SwiperSlide key={uuidv4()}>
                <picture>
                  {/* Mobile images */}
                  <source
                    media="(max-width: 450px)"
                    srcSet={`/images/swiper/mobile/image${i + 1}.png`}
                  />
                  {/* Default images */}
                  <source
                    media="(min-width: 450px)"
                    srcSet={`/images/swiper/image${i + 1}.png`}
                  />
                  <Image
                    src={`/images/swiper/image${i + 1}.png`}
                    alt="image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-contain sm:object-cover"
                  />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </header>
      <section className="section mx-auto max-w-screen-lg pt-16 text-center">
        <h1 className="text-2xl font-semibold text-text-primary md:text-3xl">
          Get Personalized Stickers of Your Face - Stick with Style!
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
