import { HeroSlider } from "@/components/home/HeroSlider";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProcessBand } from "@/components/home/ProcessBand";
import { ContactSection } from "@/components/home/ContactSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutPreview />
      <ServicesPreview />
      <ProcessBand />
      <ContactSection />
    </>
  );
}
