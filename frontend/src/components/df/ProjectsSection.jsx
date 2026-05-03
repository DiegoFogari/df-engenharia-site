export default function ProjectsSection() {
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-bold">Projetos 100% personalizados</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Sua rotina", "Automacoes desenhadas para o seu dia a dia."],
          ["Seu estilo", "Acabamento e experiencia de uso premium."],
          ["Seu bolso", "Escopo sob medida com melhor custo-beneficio."],
        ].map(([title, text]) => (
          <div key={title} className="df-glass rounded-2xl p-5">
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            <p className="mt-2 text-white/80">{text}</p>
          </div>
        ))}
      </div>
      <ul className="mt-6 grid gap-2 text-white/80 md:grid-cols-2">
        {["Levantamento tecnico", "Projeto luminotecnico integrado", "Automacao de climatizacao", "Cenas para entretenimento", "Integracao com assistentes virtuais", "Suporte especializado"].map((item) => (
          <li key={item} className="rounded-lg bg-white/5 px-4 py-2">✓ {item}</li>
        ))}
      </ul>
    </section>
  );
}
