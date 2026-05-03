export const BRAND = {
  name: "DF Engenharia",
  tagline: "Automacao Residencial",
  whatsapp: "5516999633590",
  whatsappLink: "https://wa.me/5516999633590",
};

const BASE = "https://customer-assets.emergentagent.com/job_df-smart-home/artifacts";

export const ASSETS = {
  logo: `${BASE}/logo.png`,
  panelInstalled: `${BASE}/panel-installed.jpg`,
  panelCloseup: `${BASE}/panel-closeup.jpg`,
  logoInHouse: `${BASE}/logo-in-house.jpg`,
  livingRoom:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
  kitchen:
    "https://images.pexels.com/photos/9757622/pexels-photo-9757622.jpeg?auto=compress&cs=tinysrgb&w=1600",
  bedroom:
    "https://images.pexels.com/photos/17547230/pexels-photo-17547230/free-photo-of-cama-luxo-interior-casa.jpeg?auto=compress&cs=tinysrgb&w=1600",
  garage:
    "https://images.unsplash.com/photo-1626036938027-5e6b0a3ba939?auto=format&fit=crop&w=1920&q=80",
};

export const SCENES = [
  { id: "intro", label: "Introducao", start: 0, end: 14, bg: ASSETS.livingRoom, headline: "A casa que entende voce", caption: "Luxo inteligente no tempo certo." },
  { id: "panel", label: "Painel", start: 14, end: 30, bg: ASSETS.panelInstalled, headline: "Coracao da automacao", caption: "Controle central elegante e invisivel." },
  { id: "kitchen", label: "Cozinha", start: 30, end: 42, bg: ASSETS.kitchen, headline: "Um toque, tudo acontece", caption: "Cenarios para os seus momentos." },
  { id: "bedroom", label: "Quarto", start: 42, end: 56, bg: ASSETS.bedroom, headline: "Conforto automatizado", caption: "Luz e clima para relaxar." },
  { id: "garage", label: "Garagem", start: 56, end: 74, bg: ASSETS.garage, headline: "Comando de voz imediato", caption: "Seguranca e praticidade no acesso." },
  { id: "personalized", label: "Personalizado", start: 74, end: 96, bg: ASSETS.logoInHouse, headline: "Projeto unico para sua familia", caption: "Rotina, estilo e bolso no centro." },
  { id: "outro", label: "Encerramento", start: 96, end: 110, bg: ASSETS.livingRoom, headline: "Tecnologia para o seu sonho", caption: "Agende sua consultoria DF Engenharia." },
];
