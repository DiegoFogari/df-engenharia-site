import { useMemo, useState } from "react";
import { ASSETS } from "@/lib/brand";

const rooms = {
  kitchen: { label: "Cozinha", image: ASSETS.kitchen },
  bedroom: { label: "Quarto", image: ASSETS.bedroom },
  garage: { label: "Garagem", image: ASSETS.garage },
};

export default function AppMockup() {
  const [active, setActive] = useState("kitchen");
  const preview = useMemo(() => rooms[active], [active]);
  return (
    <section id="app" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="df-glass rounded-3xl p-6">
          <h2 className="text-3xl font-bold">Aplicativo personalizado</h2>
          <p className="mt-2 text-white/80">Controle por ambiente com um toque.</p>
          <div className="mt-5 flex gap-2">
            {Object.entries(rooms).map(([id, room]) => (
              <button key={id} onClick={() => setActive(id)} className={`rounded-full px-4 py-2 text-sm ${active === id ? "bg-primary text-black" : "bg-white/10"}`}>
                {room.label}
              </button>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-xl">
            <img src={preview.image} alt={preview.label} className={`h-56 w-full object-cover transition duration-500 ${active ? "brightness-100" : "brightness-50"}`} />
          </div>
        </div>
        <div className="mx-auto h-[540px] w-[280px] rounded-[40px] border border-white/20 bg-black p-4 shadow-2xl">
          <div className="h-full rounded-[30px] bg-zinc-900 p-4">
            <p className="text-sm text-white/60">DF App</p>
            <h3 className="mt-1 text-xl font-bold">{preview.label}</h3>
            <div className="mt-6 space-y-3">
              <div className="rounded-xl bg-white/10 p-3">Iluminacao: 72%</div>
              <div className="rounded-xl bg-white/10 p-3">Climatizacao: 23 C</div>
              <div className="rounded-xl bg-primary/20 p-3 text-primary">Cena ativa: Conforto</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
