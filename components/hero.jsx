"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";

const HeroSection = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const imageRef = useRef(null);

  // Initialize Vanta.js background
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3f6dff, // net color
          backgroundColor: 0x000000, // hero background color
          points: 12.0,
          maxDistance: 20.0,
          spacing: 18.0,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section
      ref={vantaRef}
      className="relative w-full pt-36 md:pt-48 pb-10 overflow-hidden text-white"
    >
      {/* Overlay for better contrast (optional) */}
      {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> */}
      <div className="absolute inset-0 bg-black/40"></div>


      {/* Hero Content */}
      <div className="relative z-10 space-y-6 text-center">
        <div className="space-y-8 mx-auto text-center py-20">
          <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Transform Your Career
            <br />
            with AI-Powered Coaching
          </h1>

          <p className="mx-auto max-w-[650px] text-slate-300 md:text-xl leading-relaxed">
            Accelerate your growth with smart, personalized guidance.
            Master interviews, improve your skills, and achieve your career goals 
            guided by AI built for success.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/rutujanalawade10/">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        {/* <div className="hero-image-wrapper mt-5 md:mt-0">
          <div
            ref={imageRef}
            className="hero-image transition-transform duration-500 ease-out"
          >
            <Image
              src="/banner3.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div> */}
        

      </div>
    </section>
  );
};

export default HeroSection;
