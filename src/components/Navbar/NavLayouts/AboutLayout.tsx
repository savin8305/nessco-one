"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarData } from "../types/constant";
import { countryCODE, languageCODE } from "../nav-menue";

interface NavItem {
  title: string;
  link?: string;
  image?: string;
  alt?: string;
  icon?: string;
  textcolor?: string;
  description?: string;
}

interface AboutDataProps {
  navData: NavbarData;
  setActive?: (item: string | null) => void;
}

const AboutLayout: React.FC<AboutDataProps> = ({ navData, setActive }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const aboutData = navData?.navbar[0]?.data;
  const navLeftData = aboutData?.navleftdata || [];
  const navRightData = aboutData?.navrightdata || [];

  const scrollDown = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < navLeftData.length - 2 ? prev + 1 : prev
    );
  }, [navLeftData]);

  const scrollUp = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      isScrollingDown ? scrollDown() : scrollUp();
    },
    [scrollDown, scrollUp]
  );

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

  const bgColors = [
    "bg-[#f4f4ff]",
    "bg-[#f6ffef]",
    "bg-blue-200",
    "bg-yellow-200",
  ];
  const mobileImage = [
    "https://assets.nesscoindustries.com/public/assets/about/about-main-icon.webp",
    "https://assets.nesscoindustries.com/public/assets/about/our-company/our-company-main-icon.webp",
    "https://assets.nesscoindustries.com/public/assets/about/our-strength/our-strength-main-icon.webp",
    "https://assets.nesscoindustries.com/public/assets/about/mission-and-vision/mission&vision-main-icon.webp",
  ];

  return (
    <div className="flex w-full lg:border-none lg:pb-6 mx-auto max-w-screen-2xl flex-col lg:flex-row items-center justify-center lg:rounded-xl h-full">
      <div className="grid grid-cols-1 gap-2 lg:mt-2 lg:px-4 h-full sm:grid-cols-3 lg:grid-cols-4 w-full lg:w-[70.5vw]">
        <div className="lg:hidden p-2 bg-[#483d782a] border-b lg:rounded-none lg:p-0 lg:border-none flex flex-row  items-center">
          <Link
            href={`/${countryCODE}/${languageCODE}/about`}
            onClick={() => setActive(null)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                <path d="m21 3-9 9" />
                <path d="M15 3h6v6" />
              </svg>
            </div>
            <p className="text-xl font-poppins hover:text-[#483d78] hover:font-bold font-normal transition-transform duration-300">
              About
            </p>
          </Link>
        </div>

        {navRightData?.map((item: NavItem, index: number) => (
          <div
            key={index}
            className="lg:p-0 px-4 lg:px-0 border-b p-1 lg:border-none flex flex-row lg:flex-col justify-start items-center lg:mt-4"
          >
            <Link
              href={`/${countryCODE}/${languageCODE}/about/${item.link}`}
              onClick={() => setActive(null)}
            >
              <div className="hidden lg:flex flex-row lg:flex-col space-x-4 lg:space-x-0">
                <Image
                  src={item?.image || "/path/to/fallback-image.jpg"}
                  alt={item?.alt || "Fallback alt text"}
                  className="rounded-xl cursor-pointer h-10 w-10 lg:w-56 lg:h-56 object-cover transform lg:hover:scale-80 transition-transform duration-200"
                  width={224}
                  height={224}
                  loading="lazy"
                />
                <p className=" flex items-center justify-center text-xl   text-center font-poppins invert-0 hover:text-[#483d78] hover:font-bold font-normal md:text-base transform lg:hover:scale-80 transition-transform duration-300">
                  <span>{item?.title}</span>
                </p>
              </div>
              <div className="flex lg:hidden flex-row lg:flex-col space-x-4 lg:space-x-0">
                <Image
                  src={mobileImage[index % mobileImage?.length]} // Removed unnecessary template literal                    alt={item?.alt || "Fallback alt text"}
                  alt={item?.alt || "Fallback alt text"}
                  className="rounded-xl invert cursor-pointer h-10 w-10 lg:w-56 lg:h-56 object-cover transform lg:hover:scale-80 transition-transform duration-200"
                  width={224}
                  height={224}
                  loading="lazy"
                />
                <p className=" flex items-center justify-center text-xl   text-center font-poppins invert-0 hover:text-[#483d78] hover:font-bold font-normal md:text-base transform lg:hover:scale-80 transition-transform duration-300">
                  <span>{item?.title}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="lg:flex lg:px-0 px-4  ml-2 w-2 h-72 hidden border-l border-gray-300"></div>
      <div className="w-full lg:w-[20vw] h-32 ml-4 lg:h-auto flex flex-col justify-between mt-4 lg:mt-0">
        {navLeftData
          .slice(currentIndex, currentIndex + 2)
          .map((item: NavItem, index: number) => (
            <Link
              key={index}
              href={`/${countryCODE}/${languageCODE}/about/${item.link}`}
              onClick={() => setActive(null)}
            >
              <div
                className={`hidden lg:flex h-[6.5rem] lg:hover:scale-80 transition-transform duration-200 items-center lg:p-4 lg:rounded-3xl lg:mb-2 ${
                  bgColors[index % bgColors?.length]
                }`}
              >
                <div
                  className={`w-[20%] mx-4 flex justify-center items-center text-2xl ${item.textcolor}`}
                >
                  <Image
                    src={item?.icon || "/path/to/fallback-image.jpg"}
                    alt={item?.title}
                    className="rounded-xl cursor-pointer h-full w-full object-cover transform lg:hover:scale-80 transition-transform duration-200"
                    width={24}
                    height={24}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </div>
                <div className="w-[80%]">
                  <h3 className="text-sm sm:text-md text-black font-semibold mb-0">
                    {item?.title}
                  </h3>
                  <p className="text-xs hidden lg:flex font-regular text-black pr-2">
                    {item?.description}
                  </p>
                </div>
              </div>
              <div
                className={`flex border-b lg:hidden h-10 lg:hover:scale-80 transition-transform duration-200 items-center lg:p-4 lg:rounded-3xl lg:mb-2`}
              >
                <div className={` mx-4 flex  text-2xl ${item.textcolor}`}>
                  <Image
                    src={item?.icon || "/path/to/fallback-image.jpg"}
                    alt={item?.title}
                    className="rounded-xl cursor-pointer h-6 w-6 object-cover transform lg:hover:scale-80 transition-transform duration-200"
                    width={24}
                    height={24}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </div>
                <div className="w-[80%]">
                  <h3 className="text-sm sm:text-md text-black font-semibold mb-0">
                    {item?.title}
                  </h3>
                  <p className="text-xs hidden lg:flex font-regular text-black pr-2">
                    {item?.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        {/* Scroll Buttons */}
        <div className="flex w-full bg-gray-800 justify-center">
          {currentIndex > 0 && (
            <button
              onClick={scrollUp}
              className="absolute text-3xl invert-0 lg:top-[5%] top-[55%] rounded-full"
            ></button>
          )}
        </div>
        <div className="bottom-4 flex w-full justify-center text-3xl">
          {currentIndex < navLeftData?.length - 2 && (
            <button
              onClick={scrollDown}
              className="absolute bg-transparent invert-0 flex justify-center items-center"
            ></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutLayout;
