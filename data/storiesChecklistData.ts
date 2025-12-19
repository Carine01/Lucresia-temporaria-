import React from 'react';

// Icons for each checklist item
const ConnectionIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }));
const AuthorityIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }));
const DesireIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 3v4M3 5h4M6 17v4m-2-2h4m-4-5l2.293-2.293a1 1 0 011.414 0l2.293 2.293m-4 5a2 2 0 012-2h2a2 2 0 012 2m-4-5a2 2 0 00-2 2h2a2 2 0 002-2m-4 5V10m0 0a2 2 0 012-2h2a2 2 0 012 2m-4 5V10" }));
const SaleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" }));
const MonitoringIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }));

export const storiesChecklistData = [
    {
        id: 1,
        title: "Conexão: Construa um relacionamento",
        description: "Humanize seu perfil e gere empatia. Mostre sua rotina, compartilhe desafios e conquistas, e use enquetes e reações para interagir.",
        icon: React.createElement(ConnectionIcon),
        color: "text-pink-400"
    },
    {
        id: 2,
        title: "Autoridade: Mostre o que você sabe",
        description: "Compartilhe resultados do dia a dia, dicas e técnicas, explique conceitos e resolva dúvidas frequentes. Seja uma especialista no seu nicho e inspire confiança.",
        icon: React.createElement(AuthorityIcon),
        color: "text-blue-400"
    },
    {
        id: 3,
        title: "Desejo: Faça seu público querer mais",
        description: "Mostre o poder da sua solução. Compartilhe transformações de clientes, resolva problemas e use narrativas para criar identificação.",
        icon: React.createElement(DesireIcon),
        color: "text-amber-400"
    },
    {
        id: 4,
        title: "Venda: Converta seguidores em clientes",
        description: "Apresente seu produto ou serviço de forma estratégica e natural. Incentive a ação e adicione chamadas para ação (links de vendas).",
        icon: React.createElement(SaleIcon),
        color: "text-green-400"
    },
    {
        id: 5,
        title: "Monitoramento: Aprenda com seus resultados",
        description: "Analise os insights do Instagram para identificar o que funciona. Observe o engajamento e ajuste sua estratégia com base nos resultados.",
        icon: React.createElement(MonitoringIcon),
        color: "text-indigo-400"
    }
];

export const dailyRoutine = {
    title: "Stories do dia a dia: Uma rotina que vende",
    description: "Manhã: Rotina, bastidores e interação. Tarde: Conteúdo de valor. Noite: reforço do posicionamento."
};
