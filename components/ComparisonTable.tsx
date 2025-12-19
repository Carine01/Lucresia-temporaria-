
import React from 'react';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ComparisonTable: React.FC = () => {
    const features = [
        { name: "IA de Conteúdo Estético", free: "1 post/semana", elev: "Ilimitado + Persona" },
        { name: "CRM Multi-tenant v1.0", free: "Sem acesso", elev: "Incluso c/ Scoring" },
        { name: "Escritor de E-books IA", free: "Sem acesso", elev: "Ilimitado" },
        { name: "Vídeos IA (Veo)", free: "Bloqueado", elev: "Apenas Master" },
        { name: "Gestor de Tráfego IA", free: "Manual", elev: "Configuração Automática" },
        { name: "Monitoramento de ROAS", free: false, elev: true },
        { name: "Isolamento de Dados LGPD", free: "Básico", elev: "Enterprise Level" },
        { name: "Suporte Prioritário 24h", free: "E-mail", elev: "WhatsApp VIP" },
    ];

    return (
        <div className="w-full overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-100/50 bg-white animate-in fade-in duration-700">
            {/* Wrapper de Scroll para Mobile */}
            <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                    <div className="grid grid-cols-3 bg-slate-50/50 border-b border-slate-50">
                        <div className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Funcionalidade</div>
                        <div className="p-8 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-x border-slate-100">Fazer Sozinho</div>
                        <div className="p-8 text-center text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50/50">Elevare Enterprise</div>
                    </div>
                    
                    {features.map((feature, index) => (
                        <div key={index} className="grid grid-cols-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                            <div className="p-6 md:p-8 flex items-center font-bold text-slate-900 text-sm md:text-base">
                                {feature.name}
                            </div>
                            
                            <div className="p-6 md:p-8 text-center text-slate-500 border-x border-slate-100 flex flex-col justify-center items-center text-sm">
                                {typeof feature.free === 'boolean' ? (
                                    feature.free ? <CheckIcon className="text-green-500" /> : <CloseIcon className="text-rose-500" />
                                ) : (
                                    <span className="font-medium">{feature.free}</span>
                                )}
                            </div>
                            
                            <div className="p-6 md:p-8 text-center bg-indigo-50/30 flex flex-col justify-center items-center font-black text-indigo-600 text-sm">
                                {typeof feature.elev === 'boolean' ? (
                                    feature.elev ? <CheckIcon className="text-indigo-600" /> : <CloseIcon className="text-slate-400" />
                                ) : (
                                    <span>{feature.elev}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-8 bg-slate-900 text-center text-white">
                <p className="text-sm font-medium italic opacity-70 mb-4">"A arquitetura Elevare substitui uma agência de marketing de R$ 2.500/mês por apenas R$ 87."</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">ROI médio reportado: +450% no primeiro trimestre</span>
                </div>
            </div>
        </div>
    );
};
