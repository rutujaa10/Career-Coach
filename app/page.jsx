import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-backg
      round">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-colors duration-300"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
<section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
  {/* Background gradient glow */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-cyan-900/10 pointer-events-none"></div>

  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <h2 className="text-4xl font-extrabold tracking-tight text-center mb-16 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
      Powerful Features for Your Career Growth
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="group relative border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm 
                     hover:from-slate-800/90 hover:to-slate-900/80 transition-all duration-500 ease-out
                     shadow-md hover:shadow-xl hover:-translate-y-2 rounded-2xl overflow-hidden"
        >
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-600/20 to-cyan-500/20"></div>

          <CardContent className="relative pt-8 pb-10 px-6 text-center flex flex-col items-center z-10">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-2 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>



     {/* ================== STATS SECTION ================== */}
<section className="relative w-full py-16 md:py-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-cyan-900/10 pointer-events-none"></div>

  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
      {[
        { value: "50+", label: "Industries Covered" },
        { value: "1000+", label: "Interview Questions" },
        { value: "95%", label: "Success Rate" },
        { value: "24/7", label: "AI Support" },
      ].map((stat, i) => (
        <div
          key={i}
          className="group relative bg-gradient-to-br from-slate-900/70 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8
                     hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_20px_#3f6dff40]"
        >
          <h3 className="text-4xl font-extrabold text-white group-hover:text-blue-400 transition-colors duration-300">
            {stat.value}
          </h3>
          <p className="text-slate-400 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================== HOW IT WORKS SECTION ================== */}
<section className="relative w-full py-20 bg-background overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-cyan-900/10 pointer-events-none"></div>

  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
        How It Works
      </h2>
      <p className="text-muted-foreground text-lg">
        Four simple steps to accelerate your career growth
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
      {howItWorks.map((item, index) => (
        <div
          key={index}
          className="group relative flex flex-col items-center text-center space-y-4 bg-slate-900/50 border border-slate-800
                     rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_#3f6dff40]"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          <h3 className="font-semibold text-xl text-white">{item.title}</h3>
          <p className="text-slate-400 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================== TESTIMONIALS SECTION ================== */}
{/* <section className="relative w-full py-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>

  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <h2 className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
      What Our Users Say
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {testimonial.map((testimonial, index) => (
        <Card
          key={index}
          className="relative bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden
                     hover:shadow-[0_0_25px_#3f6dff40] transition-all duration-500"
        >
          <CardContent className="p-8 flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                width={48}
                height={48}
                src={testimonial.image}
                alt={testimonial.author}
                className="rounded-full border-2 border-blue-500/40"
              />
              <div>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
                <p className="text-sm text-blue-400">{testimonial.company}</p>
              </div>
            </div>
            <blockquote className="relative text-slate-300 italic leading-relaxed">
              <span className="absolute -top-3 left-0 text-4xl text-blue-500">“</span>
              {testimonial.quote}
              <span className="absolute -bottom-3 text-4xl text-blue-500">”</span>
            </blockquote>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section> */}

{/* ================== FAQ SECTION ================== */}
<section className="relative w-full py-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-cyan-900/10 pointer-events-none"></div>

  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <p className="text-muted-foreground text-lg">
        Find answers to common questions about our platform
      </p>
    </div>

    <div className="max-w-3xl mx-auto bg-slate-900/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-800">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-slate-800"
          >
            <AccordionTrigger className="text-left text-white hover:text-blue-400 transition-colors duration-300">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
</section>

{/* ================== CTA SECTION ================== */}
<section className="relative w-full py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
  <div className="container mx-auto text-center px-4 relative z-10">
    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
      Ready to Accelerate Your Career?
    </h2>
    <p className="mx-auto max-w-[600px] text-slate-300 md:text-xl mb-8 leading-relaxed">
      Join thousands of professionals advancing their careers with AI-powered guidance.
    </p>
    <Link href="/dashboard" passHref>
      <Button
        size="lg"
        className="h-12 px-8 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-500 hover:scale-105 transition-all duration-300"
      >
        Start Your Journey Today <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </div>

  {/* Optional subtle animated circles for depth */}
  <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-700 opacity-20 rounded-full blur-3xl animate-float-slow"></div>
  <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-indigo-600 opacity-20 rounded-full blur-3xl animate-float-slower"></div>
</section>

   </>
  );
}