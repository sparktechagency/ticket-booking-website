import React from "react";
import Image from "next/image";
import { ArtistData } from "../../../public/Data/ArtistData";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function TopArtist() {
  const topArtist = ArtistData;

  return (
    <div className="bg-[#04092C] py-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg lg:text-xl xl:text-3xl text-white">
            Top Artist
          </p>
          <p
            className={`${poppins.className} text-xs lg:text-base text-[#99A1AF]`}
          >
            Discover the artists fans are excited to see live.
          </p>
        </div>

        <Link
          href="/artists"
          className="text-[#A1E8FD] text-xs flex items-center gap-2 "
        >
          See All <FaArrowRight />
        </Link>
      </div>

      {/* Artist Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6 mt-8">
        {topArtist?.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col items-center gap-5 p-4 rounded-lg hover:bg-[#0B1150] transition"
          >
            <Image
              src={artist.image}
              alt={artist.name}
              width={200}
              height={200}
              className="rounded-full w-24 h-24 sm:w-32 sm:h-32 xl:w-48 xl:h-48 object-cover"
            />
            <p className="text-white text-xs sm:text-base text-center">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
