import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BANNER_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Future Technology',
    title: 'The Future of AI',
    subtitle: 'Exploring next-gen artificial intelligence solutions'
  },
  {
    src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Climate Change',
    title: 'Climate Crisis',
    subtitle: 'Understanding global warming impacts'
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Renewable Energy',
    title: 'Sustainable Future',
    subtitle: 'Transitioning to green energy solutions'
  }
];

const Banner = () => {
  return (
    <Carousel className="w-full max-w-9xl mx-auto">
      <CarouselContent>
        {BANNER_IMAGES.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-96 md:h-[500px] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent rounded-lg" />
              
              {/* Centered Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {image.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg max-w-2xl">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 md:left-4" />
      <CarouselNext className="right-2 md:right-4" />
    </Carousel>
  );
};

export default Banner;