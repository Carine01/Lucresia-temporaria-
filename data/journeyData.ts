import React from 'react';

// Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
const Stage1Icon: React.FC = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }));
// Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
const Stage2Icon: React.FC = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }));
// Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
const Stage3Icon: React.FC = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }));
// Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
const Stage4Icon: React.FC = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }));
// Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
const Stage5Icon: React.FC = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zM3 18h18" }));

export const journeyData = [
    {
        stage: 1,
        title: "Impulso Lucrativo",
        synopsis: "Gere resultados rápidos com prompts, frases e posts prontos. Aqui você desperta para a ação e sente o poder da IA LucresIA.",
        contents: ["Prompt Start LucresIA", "Banco de Frases Magnéticas", "Copy de Luxo Express", "Checklist: Erros de Comunicação", "Kit Visual Elevare"],
        buttonText: "Criar meu primeiro conteúdo LucresIA",
        unlock: "Publicar 1 conteúdo feito com a LucresIA.",
        // Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
        icon: React.createElement(Stage1Icon),
        color: "text-[#9F8DE6]",
    },
    {
        stage: 2,
        title: "Mente Estratégica",
        synopsis: "Transforme técnica em negócio e crie diferenciais reais.",
        contents: ["Manual da Esteticista Estratégica", "Consultas que Criam Valor", "O Método Água no Deserto", "A Arte de Encantar no Silêncio"],
        buttonText: "Construir meu pacote premium",
        unlock: "Criar 1 pacote de serviço nomeado e com promessa clara.",
        // Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
        icon: React.createElement(Stage2Icon),
        color: "text-blue-400",
    },
    {
        stage: 3,
        title: "Neurovendas e Desejo",
        synopsis: "Aprenda como o cérebro decide e por que as clientes compram.",
        contents: ["Cérebro da Beleza", "Decodificando o Desejo", "Coaching Estético"],
        buttonText: "Fazer Quiz: Como o cliente confia",
        unlock: "Concluir o quiz “Como sua cliente decide confiar em você”.",
        // Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
        icon: React.createElement(Stage3Icon),
        color: "text-pink-400",
    },
    {
        stage: 4,
        title: "Inteligência Aplicada",
        synopsis: "Automatize conteúdo, captação e vendas com IA.",
        contents: ["Prompt Lab LucresIA", "Automação Estética", "Calendário Elevare 12M"],
        buttonText: "Ativar automação de atendimento",
        unlock: "Automatizar o seu primeiro atendimento via WhatsApp com a IA.",
        // Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
        icon: React.createElement(Stage4Icon),
        color: "text-indigo-400",
    },
     {
        stage: 5,
        title: "Elevare Master",
        synopsis: "Crie seu método próprio e transforme seu nome em marca.",
        contents: ["Arquitetura de Conteúdo Premium", "Planejamento Anual Elevare", "Mentoria Lucrativa"],
        buttonText: "Criar meu Método Elevare",
        unlock: "Entregar o desafio prático “Meu método em 3 páginas”.",
        // Fix: Substituído JSX por React.createElement para ser compatível com um arquivo .ts.
        icon: React.createElement(Stage5Icon),
        color: "text-amber-400",
    },
];