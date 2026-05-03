import { Toaster } from "sonner";
import LandingHeader from "@/components/df/LandingHeader";
import Hero from "@/components/df/Hero";
import CommercialPlayer from "@/components/df/CommercialPlayer";
import PanelShowcase from "@/components/df/PanelShowcase";
import AppMockup from "@/components/df/AppMockup";
import VoiceCommand from "@/components/df/VoiceCommand";
import ProjectsSection from "@/components/df/ProjectsSection";
import ContactSection from "@/components/df/ContactSection";
import LandingFooter from "@/components/df/LandingFooter";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <Hero />
        <CommercialPlayer />
        <PanelShowcase />
        <AppMockup />
        <VoiceCommand />
        <ProjectsSection />
        <ContactSection />
      </main>
      <LandingFooter />
      <Toaster position="top-right" richColors />
    </div>
  );
}
