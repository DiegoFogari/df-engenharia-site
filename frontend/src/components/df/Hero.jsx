import { ASSETS } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden pt-24">
      <img src={ASSETS.livingRoom} alt="Sala premium" className="absolute inset-0 h-full w-full object-cover opacity-35 animate-df-slow-zoom" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl df-shimmer-text">
          O futuro e uma casa que entende voce
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">Automacao residencial premium, personalizada para seu estilo de vida.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#contato">Agendar consultoria</a></Button>
          <Button asChild variant="outline" size="lg"><a href="#commercial">Ver comercial</a></Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["+100", "Projetos sob medida"],
            ["24/7", "Conforto e controle"],
            ["100%", "Personalizavel"],
          ].map((item) => (
            <div key={item[0]} className="df-glass rounded-xl p-4">
              <p className="text-2xl font-bold text-primary">{item[0]}</p>
              <p className="text-sm text-white/70">{item[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
