import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { WhyUs } from "@/components/why-us";
import { Process } from "@/components/process";
import { Quiz } from "@/components/quiz";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-360 w-[90%]">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Quiz />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
