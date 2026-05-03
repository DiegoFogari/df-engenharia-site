import { ASSETS } from "@/lib/brand";

export default function PanelShowcase() {
  return (
    <section id="painel" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="df-glass relative col-span-2 overflow-hidden rounded-2xl p-4">
          <img src={ASSETS.panelInstalled} alt="Painel instalado" className="h-80 w-full rounded-xl object-cover" />
          <img src={ASSETS.panelCloseup} alt="Painel closeup" className="absolute -bottom-8 right-8 h-36 w-52 rounded-xl border border-white/20 object-cover shadow-2xl" />
        </div>
        {[
          ["Tecnologia", "Controle completo e centralizado com software premium."],
          ["Seguranca", "Cenarios protegidos, acesso confiavel e monitoramento."],
          ["Modular", "Expansao por etapas, conforme sua necessidade."],
        ].map(([t, d]) => (
          <div key={t} className="df-glass rounded-2xl p-5">
            <h3 className="text-xl font-semibold text-primary">{t}</h3>
            <p className="mt-2 text-white/80">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
