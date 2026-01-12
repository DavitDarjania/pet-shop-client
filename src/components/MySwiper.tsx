import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import useFetch from "../hooks/useFetch";
import type { IPet } from "../interfaces/Pet";
import type { ICategorie } from "../interfaces/Category";

const MySwiper: React.FC = () => {
  const { data } = useFetch<IPet>("http://localhost:3000/pets");
  const { data: categoryData } = useFetch<ICategorie>(
    "http://localhost:3000/categories"
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 5000 }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi || !data?.length) return;

    emblaApi.reInit();

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, data]);

  return (
    <div className="w-full mx-auto mt-5 shadow">
      {/* Viewport */}
      <div
        className="overflow-hidden rounded-[10px] relative h-100 shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
        ref={emblaRef}
      >
        {/* Container */}
        <div className="flex h-full">
          {data?.map((el) => {
            let categoryName = categoryData?.find(
              (item) => item.categorieId == el.categorieId
            );
            return (
              <div
                key={el.petsId}
                className="min-w-full h-full flex items-center justify-center bg-[#4a674161] relative"
              >
                <h2 className="text-[70px]">{el.img}</h2>
                <div className="absolute bottom-0 w-full p-6 bg-[rgba(0,0,0,0.6)] text-white">
                  <h2 className="text-2xl">
                    {el.title} - {categoryName?.name}
                  </h2>
                  <p className="text-md">{el.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Buttons */}
        <div className="flex justify-between mt-4 px-5 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="px-4 py-2 bg-[rgba(0,0,0,0.5)] text-white rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="px-4 py-2 bg-[rgba(0,0,0,0.5)] text-white rounded-full"
          >
            &gt;
          </button>
        </div>
        {/* Dots */}
        <div className="flex justify-center absolute top-full left-1/2 -translate-x-1/2 -translate-y-[200%] gap-2 z-5">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === selectedIndex
                  ? "bg-[#f39c12]"
                  : "bg-[rgba(255,255,255,0.5)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySwiper;
