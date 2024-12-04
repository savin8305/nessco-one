"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavbarData } from "../types/constant";
import YouTube from "./YoutubeSvg";
import SVGComponent from "../BlueLogo";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface VideoLayoutGridProps {
  navData: NavbarData;
  setActive?: (item: string | null) => void;
}

const VideoGrid: React.FC<VideoLayoutGridProps> = ({ navData, setActive }) => {
  const videoData = navData?.navbar[5]?.data;
  const videoDataItem = videoData?.videoDataItem || [];

  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  useEffect(() => {
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      // Your scrollability check logic here
    }
  };
  const renderVideoCard = (item: any, index: number) => (
    <Dialog key={index}>
      <DialogTrigger asChild>
        <div className="relative flex-shrink-0 cursor-grab w-full h-48 bg-[#f2f2f2] rounded-3xl flex flex-col justify-center items-center">
          <div className="relative w-full h-full flex justify-center items-center cursor-pointer">
            <Image
              src={item.bgPic}
              alt={item.title}
              fill
              className="absolute inset-0 h-full w-full rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>

            <div
              className="absolute text-white rounded-[0.8rem] w-[3.5rem] h-[3.5rem] flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer z-10"
              onClick={() =>
                setCurrentVideo("https://www.youtube.com/embed/AE0QMNZleJs")
              }
            >
              <YouTube />
            </div>
          </div>

          <div className="absolute flex items-center space-x-2 -top-2 left-2 z-40 cursor-pointer font-poppins text-center mt-4 font-semibold text-base hover:text-[#483d78]">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#483d73] text-white">
              <SVGComponent />
            </div>
            <span className="text-white hover:text-[#483d73] text-sm font-semibold">
              {item?.title || "Watch Video"}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[760px] lg:max-w-[54rem] p-4">
        <div className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh]">
          <iframe
            src={`${currentVideo || ""}${
              currentVideo?.includes("?") ? "&" : "?"
            }autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-xl"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className="relative hidden lg:flex flex-col lg:flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-2 w-full">
        <div
          className={`flex overflow-x-auto py-2 scroll-smooth [scrollbar-width:none] gap-6`}
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          {videoDataItem?.map((item, index) => (
            <div key={index} className="flex cursor-grab flex-col space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative flex-shrink-0 cursor-grab w-80 h-48 bg-[#f2f2f2] rounded-3xl flex flex-col justify-center items-center">
                    <div className="relative w-full h-full flex justify-center items-center cursor-pointer">
                      <Image
                        src={item.bgPic}
                        alt={item.title}
                        fill
                        className="absolute inset-0 h-full w-full rounded-xl opacity-80"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>

                      <div
                        className="absolute text-white rounded-[0.8rem] w-[3.5rem] h-[3.5rem] flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer z-10"
                        onClick={() =>
                          setCurrentVideo(
                            "https://www.youtube.com/embed/AE0QMNZleJs"
                          )
                        }
                      >
                        <YouTube />
                      </div>
                    </div>

                    <div className="absolute flex items-center space-x-2 -top-2 left-2 z-40 cursor-pointer font-poppins text-center mt-4 font-semibold text-base hover:text-[#483d78]">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#483d73] text-white">
                        <SVGComponent />
                      </div>
                      <span className="text-white hover:text-[#483d73] text-lg font-semibold">
                        {item?.title || "Watch Video"}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[760px] lg:max-w-[54rem] p-4">
                  <div className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh]">
                    <iframe
                      src={`${currentVideo || ""}${
                        currentVideo?.includes("?") ? "&" : "?"
                      }autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-xl"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile View */}
      <div className="lg:hidden">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-2 gap-4 p-4">
            {videoDataItem?.map((item, index) => (
              <div key={index} className="w-full">
                {renderVideoCard(item, index)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default VideoGrid;
