
import React, { useState } from 'react';

const Stage1Icon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const Stage2Icon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const Stage3Icon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const Stage4Icon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const Stage5Icon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zM3 18h18" /></svg>;
const ChevronIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;

const libraryData = [
    {
        stage: 1,
        title: "Impulso Lucrativo",
        objective: "Ativar resultados imediatos em 24 horas.",
        contents: ["Prompts Start de Postagens", "Script de Vendas WhatsApp", "Kit Visual Estética Luxo", "Copy Express: Foco em Agendamento"],
        unlock: "Gratuito para Teste",
        icon: <Stage1Icon />,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        stage: 2,
        title: "Diferenciação Magnética",
        objective: "Posicionamento premium e aumento de ticket.",
        contents: ["Anatomia do Serviço de Luxo", "Como Vender sem Dar Descontos", "Personalidade de Marca IA"],
        unlock: "Plano Pro / Master",
        icon: <Stage2Icon />,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        stage: 3,
        title: "Inteligência de Vendas",
        objective: "Dominar o tráfego e os funis automáticos.",
        contents: ["Gestor de Campanhas Meta IA", "Escrita de E-books em Massa", "Funis de WhatsApp v1.0"],
        unlock: "Plano Pro / Master",
        icon: <Stage3Icon />,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
];

const StageCard: React.FC<any> = ({ stage, title, objective, contents, unlock, icon, color, bg, isExpanded, onToggleExpand }) => (
    <div className={`group border border-slate-100 rounded-[2rem] overflow-hidden bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-indigo-100 ${isExpanded ? 'ring-2 ring-indigo-500/20' : ''}`}>
        <button onClick={() => onToggleExpand(stage)} className="w-full text-left outline-none">
            <div className={`p-6 md:p-8 ${bg}/30 flex items-center gap-6 border-b border-slate-50 transition-colors group-hover:bg-white`}>
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-white ${color} flex items-center justify-center shadow-xl border border-slate-50 group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>Fase {stage}</span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">{title}</h3>
                    <p className="text-xs md:text-sm text-slate-500 font-bold mt-1 italic">"{objective}"</p>
                </div>
                <div className={`text-slate-300 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-indigo-500' : ''}`}>
                    <ChevronIcon />
                </div>
            </div>
        </button>

        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="p-8 space-y-6">
                <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recursos Inclusos</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {contents.map((item: string, index: number) => (
                             <li key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Condição para Acesso</p>
                        <p className="text-sm font-black text-slate-900 mt-1">{unlock}</p>
                    </div>
                    <button onClick={() => window.location.hash = '#/signup'} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Explorar Agora</button>
                </div>
            </div>
        </div>
    </div>
);

export const EvolvingLibrary: React.FC = () => {
    const [expandedStage, setExpandedStage] = useState<number | null>(1);

    return (
        <section id="library" className="animate-in fade-in duration-1000">
            <div className="mb-12 text-center md:text-left">
                <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 inline-block">Sua Jornada Evolutiva</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">O Ecossistema do Sucesso</h2>
                <p className="mt-4 text-lg text-slate-500 font-medium italic max-w-3xl">Uma trilha pensada para quem quer sair da operação e focar na estratégia da clínica.</p>
            </div>
            
            <div className="space-y-6">
                {libraryData.map((item) => (
                    <StageCard 
                        key={item.stage} 
                        {...item} 
                        isExpanded={expandedStage === item.stage}
                        onToggleExpand={(s: number) => setExpandedStage(expandedStage === s ? null : s)}
                    />
                ))}
            </div>
        </section>
    );
};
