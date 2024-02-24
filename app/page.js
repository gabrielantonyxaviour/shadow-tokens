"use client";
import Header from "@/components/common/Header";
import Hero from "@/components/common/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <div>
        <Hero />
        <div className="shape"></div>
        <div className="shape right"></div>
        <div className="shape s3 right"></div>
      </div>
    </main>
  );
}
