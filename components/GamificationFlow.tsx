
import React from 'react';

const Step: React.FC<{ 
    step: number;
    title: string; 
    description: string; 
    points?: string; 
    icon: React.ReactNode, 
    isLast?: boolean; 
    className?: string 
}> = ({ step, title, description, points, icon, isLast, className }) => (
    <div className={`relative flex items-start gap-6 md:gap-10 ${className}`}>
        <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center z-10 shadow-2xl shadow-indigo-600/30 transform transition-transform hover:scale-110">
                {icon}
            </div>
            {!isLast && <div className="w-0.5 h-full bg-indigo-900/30 mt-4"></div>}
        </div>
        <div className="pt-2 md:pt-4 pb-12">
            <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">ETAPA {step}</span>
                {points && <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">+{points} PONTOS</span>}
            </div>
            <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h4>
            <p className="text-sm md:text-base text-slate-400 mt-2 leading-relaxed max-w-lg font-medium">{description}</p>
        </div>
    </div>
);

export const GamificationFlow: React.FC = () => {
    return (
        <section id="gamification" className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="mb-16">
                <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4 inline-block">Mecânica de Evolução</span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">Domine o Mercado</h2>
                <p className="mt-6 text-lg text-slate-400 font-medium italic max-w-2xl leading-relaxed">Não é apenas um software, é uma jornada guiada por pontos. Cada ação que você toma para crescer sua clínica libera recompensas exclusivas.</p>
            </div>
            
            <div className="max-w-4xl">
                 <Step 
                    step={1}
                    title="Ignição de Autoridade"
                    description="Cadastre-se e gere seu primeiro post IA. Ative seu posicionamento digital e receba seus primeiros 20 pontos."
                    icon={<span className="text-2xl">🚀</span>}
                />
                 <Step 
                    step={2}
                    title="Assinatura Enterprise"
                    description="Desbloqueie a arquitetura Pro ou Master para liberar o CRM, o Gestor de Tráfego e a criação ilimitada de conteúdo."
                    points="50"
                    icon={<span className="text-2xl">💎</span>}
                />
                 <Step 
                    step={3}
                    title="Império de Conteúdo"
                    description="Use a IA de E-books para criar materiais educativos e captar leads qualificados. Libera o selo de Especialista v1.0."
                    points="100"
                    icon={<span className="text-2xl">📖</span>}
                />
                 <Step 
                    step={4}
                    title="Maestria Elevare"
                    description="Acesso ao gerador de vídeos cinematográficos (Veo) e mentorias de escala para faturar 6 dígitos mensais."
                    points="250"
                    icon={<span className="text-2xl">👑</span>}
                    isLast={true}
                />
            </div>

             <div className="mt-10 p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="text-3xl">🎁</div>
                    <div>
                        <p className="text-white font-black text-sm uppercase tracking-widest">Recompensas Exclusivas</p>
                        <p className="text-slate-500 text-xs font-bold">Use seus pontos para descontos na mensalidade ou mentorias individuais.</p>
                    </div>
                </div>
                <button onClick={() => window.location.hash = '#/signup'} className="bg-white text-black px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Começar Jornada</button>
            </div>
        </section>
    );
};
