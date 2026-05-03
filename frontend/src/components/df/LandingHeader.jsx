import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";

const links = [
  ["commercial", "O Comercial"],
  ["painel", "Painel"],
  ["app", "Aplicativo"],
  ["voz", "Comando de Voz"],
  ["projetos", "Projetos"],
  ["contato", "Contato"],
];

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="font-semibold tracking-wide">{BRAND.name}</a>
        <nav className="hidden gap-6 md:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-sm text-white/80 hover:text-white">{label}</a>
          ))}
        </nav>
        <Button variant="outline" size="sm" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={16} /> : <Menu size={16} />}
        </Button>
      </div>
      {open && (
        <div className="df-glass mx-4 mb-3 rounded-xl p-3 md:hidden">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="block py-2 text-sm" onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
