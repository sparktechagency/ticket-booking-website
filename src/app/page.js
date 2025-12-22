import FeaturedConcerts from "@/components/home/FeaturedConcerts";
import FeaturedSports from "@/components/home/FeaturedSports";
import HeroSection from "@/components/home/HeroSection";
import Membership from "@/components/home/Membership";
import SafetySection from "@/components/home/SafetySection";
import Testimonial from "@/components/home/Testimonial";
import TopArtist from "@/components/home/TopArtist";
import TopEvents from "@/components/home/TopEvents";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      {/* <TopArtist /> */}
      <TopEvents />
      <FeaturedConcerts />
      <FeaturedSports />
      <SafetySection />
      <Testimonial />
      <Membership />
    </div>
  );
}
