import { useState } from "react";
import { ASSETS } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export default function VoiceCommand() {
  const [active, setActive] = useState(false);
  return (
    <section id="voz" className="relative mx-auto max-w-6xl px-4 py-20">
      <div className="df-glass relative overflow-hidden rounded-2xl p-6">
        <img src={ASSETS.garage} alt="Garagem" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative">
          <h2 className="text-3xl font-bold">Comando de voz</h2>
          <p className="mt-2 text-white/80">"Alexa, abrir portao da garagem."</p>
          <div className="mt-6 flex items-center gap-4">
            <Button onClick={() => setActive((v) => !v)}>Simular comando</Button>
            <div className="flex h-10 items-end gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="w-1 rounded-full bg-accent" style={{ height: `${active ? 6 + ((i * 11) % 30) : 6}px`, transition: "height 120ms ease" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
