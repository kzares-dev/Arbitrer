"use client"
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import Image from "next/image";
import robot from "@/public/robot.jpg";
import Link from "next/link";
import BackgroundHero from "./ui/BackgroundHero";

const Hero = () => {
  return (
    <main
      className="pb-5 pt-40">
      <BackgroundHero />
      <div
        className="h-screen w-full absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center 
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center relative">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Shorten it, profit from it.
          </p>cl

          <TextGenerateEffect
            words="Shorten it, profit from it .... Arbitrer"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl ">
            Monetize your links quickly with our link shortening platform!
          </p>
          <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

          {/*-- The bigining of the hero image part --*/}
          <div className="w-full md:px-20 lg:px-40 ">
            <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] shadow-custom shadow-purple ">
              <Image
                src={robot}
                width={1440}
                height={890}
                className="w-full object-contain"
                alt="Robot hero image"
              />
            </div>
          </div>

          <Link href="/auth/sign-in">
            <MagicButton
              title="Start now"
              icon={<FaLocationArrow />}
              position="right"
            />
          </Link>
        </div>


      </div>
    </main>
  );
};

export default Hero;
