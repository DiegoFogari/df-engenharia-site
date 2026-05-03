import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function ContactSection() {
  const [projectType, setProjectType] = useState("Residencial Completo");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/api/contact`, { ...form, project_type: projectType });
      toast.success("Contato enviado com sucesso!");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Nao foi possivel enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={submit} className="df-glass rounded-2xl p-6">
          <h2 className="text-3xl font-bold">Entre em contato</h2>
          <div className="mt-4 space-y-3">
            <div><Label>Nome</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Telefone</Label><Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>Email</Label><Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div>
              <Label>Tipo de projeto</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residencial Completo">Residencial Completo</SelectItem>
                  <SelectItem value="Retrofit de Automacao">Retrofit de Automacao</SelectItem>
                  <SelectItem value="Iluminacao e Cenas">Iluminacao e Cenas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Mensagem</Label><Textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <Button className="w-full" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</Button>
          </div>
        </form>
        <div className="df-glass rounded-2xl p-6">
          <h3 className="text-2xl font-semibold">Atendimento rapido</h3>
          <p className="mt-2 text-white/80">Fale com a DF Engenharia agora.</p>
          <div className="mt-4 space-y-2">
            <a className="block rounded-lg bg-primary px-4 py-3 font-semibold text-black" href={BRAND.whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp: +{BRAND.whatsapp}
            </a>
            <a className="block rounded-lg bg-white/10 px-4 py-3" href="tel:+5516999633590">Ligar: (16) 99963-3590</a>
          </div>
        </div>
      </div>
    </section>
  );
}
