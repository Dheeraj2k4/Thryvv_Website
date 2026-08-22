import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Work } from "@/components/sections/Work";
import { PrecisionTools } from "@/components/sections/PrecisionTools";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Work />
        <PrecisionTools />
        <ImpactStats />
        <Process />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

