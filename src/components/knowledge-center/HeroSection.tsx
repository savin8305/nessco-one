"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "./style.css";
import { gsap } from "gsap";
import { KnowledgeCenterItem } from "./types/constant";

interface KnowledgeCenterProps {
  knowledgeCenterData: KnowledgeCenterItem;
}

const HeroSection: React.FC<KnowledgeCenterProps> = ({
  knowledgeCenterData,
}) => {
  const Hero = knowledgeCenterData?.knowledgeCenter[0]?.Hero;
  const glowRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Apply GSAP animation to each Light SVG using their index
    glowRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0.5 }, // Start partially visible
          {
            opacity: 0.7, // Fade to full opacity
            duration: 1, // Slightly increase duration for each index
            repeat: -1, // Repeat indefinitely
            yoyo: true, // Reverse the animation on repeat
            ease: "power2.inOut",
          }
        );
      }
    });

    // Cleanup animation on component unmount
    return () => {
      glowRefs.current.forEach((ref) => {
        if (ref) {
          gsap.killTweensOf(ref);
        }
      });
    };
  }, []);

  return (
    <div className="flex pt-24 bg-black h-screen w-full flex-col font-regular font-poppins">
      <div className="lg:h-[10%]">
        <p className="lg:text-5xl text-4xl px-10 font-poppins font-semibold w-full lg:text-left text-center text-white">
          {Hero?.title}
        </p>
      </div>
      <div className="lg:h-[90%] flex lg:flex-row flex-col w-full">
        <div className="lg:w-1/2 flex justify-center items-center">
          <Image
            src="https://assets.nesscoindustries.com/public/assets/resources/knowledge-center/knowledge-center-hero-gif.webp"
            className="lg:h-full lg:w-full object-contain h-[16rem] w-auto"
            height={600}
            width={600}
            priority
            alt={"knowldege-hero"}
          />
        </div>
        <div className="lg:w-1/2 lg:pr-4">
          {/* start */}
          <div className="text-white lg:py-20 lg:w-[95%] px-4">
            <p className="lg:text-left text-center lg:text-3xl text-2xl font-medium mb-10">
              {Hero?.subtitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#8c52ff]">
                {Hero?.subtitle?.split(" ").slice(-1)}
              </span>
            </p>
            <div className="flex justify-center gap-10">
              {Hero?.section?.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="relative flex flex-col items-center justify-center">
                    {/* SVG Bulb Icon with Glow */}
                    <div className="">
                      <Image
                        src="https://assets.nesscoindustries.com/public/assets/resources/knowledge-center/knowledge-center-bulb-image.webp"
                        width={400}
                        height={400}
                        className="lg:h-24 h-16 light-bulb w-auto glow z-30 -mt-10"
                        alt={""}
                      />
                    </div>
                    <Image
                      ref={(el) => {
                        glowRefs.current[idx] = el;
                      }}
                      src="https://assets.nesscoindustries.com/public/assets/resources/knowledge-center/knowledge-center-light-gif.webp"
                      width={400}
                      height={400}
                      className="absolute -top-[1.8rem] h-40 w-auto"
                      alt={""}
                    />
                    <div className="flex flex-col items-center justify-center lg:mt-20 gap-2 z-20">
                      <Image
                        src={item?.img}
                        className="lg:w-16 w-12"
                        alt={""}
                        width={400}
                        height={400}
                      />
                      <h2 className="lg:text-2xl text-md font-normal">{item?.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
