"use client";
import React, { useEffect } from "react";
import { Carousel, Card } from "./Common/AnnouncementCarousel";
import { HomeData } from "./types/constant";
interface AnnouncementSectionProps {
  heroData: HomeData;
}

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({
  heroData,
}) => {
  useEffect(() => {
    console.log(
      "heroData?.home[9]?.Announcement?.data?",
      heroData?.home[9]?.data
    );
  }, []);
  const cards = heroData?.home[9]?.data?.map((card, index) => (
    <Card
      key={index} // Using index as the key
      src={card?.src}
      title={card?.title}
      description={card?.description}
      date={card?.date}
    />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
};
export default AnnouncementSection;
