import { BRAND } from "@/lib/brand";

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
        <p className="text-2xl font-bold text-primary drop-shadow-[0_0_20px_rgba(255,120,30,0.6)]">{BRAND.name}</p>
        <div className="flex gap-3">
          <a className="rounded-full bg-primary px-4 py-2 font-semibold text-black" href={BRAND.whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="rounded-full bg-white/10 px-4 py-2" href="tel:+5516999633590">Telefone</a>
        </div>
        <p className="text-xs text-white/50">© {new Date().getFullYear()} DF Engenharia. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
