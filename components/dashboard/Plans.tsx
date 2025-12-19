
import React, { useState } from 'react';
import { functions } from '../../firebase/config';
import { PRICE_IDS } from '../../config/priceIds';
import { UserData } from '../../types';

export const Plans: React.FC<{ user: UserData }> = ({ user }) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [procedureValue, setProcedureValue] = useState(450);

    const handleSubscribe = async (plan: 'pro' | 'master') => {
        setIsLoading(plan);
        try {
            const priceId = plan === 'pro' ? PRICE_IDS.pro_monthly : PRICE_IDS.master_monthly;
            const createCheckout = functions.httpsCallable('createStripeCheckout');
            const result = await createCheckout({
                priceId,
                successUrl: `${window.location.origin}${window.location.pathname}#/payment/success`,
                cancelUrl: `${window.location.origin}${window.location.pathname}#/payment/cancel`,
            });
            const { url } = result.data as { url: string };
            window.location.href = url;
        } catch (error) {
            console.error(error);
            alert("Erro ao iniciar fluxo de pagamento seguro.");
            setIsLoading(null);
        }
    };

    // ROI v1.0
    const annualPro = 87 * 12;
    const salesNeeded = Math.ceil(annualPro / procedureValue);

    return (
        <div className="space-y-16 animate-in fade-in zoom-in duration-700">
            <div className="text-center">
                <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] bg-indigo-50 px-5 py-2 rounded-full mb-6 inline-block">Elevare Enterprise v1.0</span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">Arquitetura de Lucro</h1>
                <p className="text-slate-500 max-w-2xl mx-auto italic font-medium text-lg">"Investir na sua clínica não é um gasto, é o único caminho para a liberdade."</p>
            </div>

            {/* Calculadora de ROI v1.0 - Estilo Dashboard */}
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl shadow-indigo-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
                    <div>
                        <h4 className="text-2xl font-black text-slate-900 mb-2">Simulador de ROI Elevare</h4>
                        <p className="text-sm text-slate-500 mb-8">Veja como o sistema se paga sozinho no primeiro ciclo.</p>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Ticket Médio do seu Procedimento</label>
                                <input 
                                    type="range" min="150" max="5000" step="50" 
                                    value={procedureValue} 
                                    onChange={(e) => setProcedureValue(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-100 rounded-full appearance-none accent-indigo-600 cursor-pointer"
                                />
                                <div className="text-4xl font-black text-indigo-600 mt-4 tracking-tighter">R$ {procedureValue}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-500/20 transform hover:scale-[1.02] transition-transform">
                        <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-4">Veredito da LucresIA</p>
                        <p className="text-lg leading-relaxed font-medium">
                            Com apenas <span className="text-indigo-400 font-black text-2xl">{salesNeeded} {salesNeeded === 1 ? 'venda' : 'vendas'}</span> anuais deste procedimento, você financia <strong>TODO O SEU MARKETING PROFISSIONAL</strong> por 1 ano.
                        </p>
                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-black">ROI ESTIMADO:</span>
                            <span className="text-indigo-400 font-black text-xl">+1.200%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto pb-12">
                {/* PRO PLAN */}
                <div className={`relative bg-white rounded-[3rem] p-12 flex flex-col transition-all border-2 ${user.level === 'pro' ? 'border-indigo-500 shadow-2xl' : 'border-slate-100 shadow-xl'}`}>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-3xl font-black text-slate-900">Elevare Pro</h3>
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Alta Performance</p>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-black text-slate-900">R$87</span>
                            <span className="text-slate-400 text-sm font-bold block">/mês</span>
                        </div>
                    </div>
                    
                    <ul className="space-y-5 flex-grow mb-12">
                        {['Posts e Legendas Ilimitados', 'CRM de Leads Avançado', 'E-books Estratégicos Ilimitados', 'Assistente de Ads (Meta)', 'Suporte Prioritário'].map(f => (
                            <li key={f} className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] shrink-0">✔</span>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => handleSubscribe('pro')}
                        disabled={!!isLoading || user.level === 'pro' || user.level === 'master'}
                        className={`w-full py-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all transform active:scale-95 ${user.level === 'pro' || user.level === 'master' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-600/20'}`}
                    >
                        {isLoading === 'pro' ? 'PROCESSANDO...' : user.level === 'pro' ? 'PLANO ATIVO' : user.level === 'master' ? 'JÁ INCLUSO NO MASTER' : 'VIRAR PRO AGORA'}
                    </button>
                </div>

                {/* MASTER PLAN - LUXURY BLACK & GOLD */}
                <div className={`relative bg-slate-900 rounded-[3rem] p-12 flex flex-col transition-all border-2 ${user.level === 'master' ? 'border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.2)]' : 'border-amber-500/20 shadow-2xl shadow-black/30'}`}>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-6 py-1.5 rounded-full text-[10px] font-black shadow-lg">EXCLUSIVO ENTERPRISE</div>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-3xl font-black text-white">Elevare Master</h3>
                            <p className="text-sm text-amber-500 font-bold uppercase tracking-widest mt-1">Autoridade Máxima</p>
                        </div>
                        <div className="text-right text-white">
                            <span className="text-4xl font-black">R$117</span>
                            <span className="text-slate-500 text-sm font-bold block">/mês</span>
                        </div>
                    </div>

                    <ul className="space-y-6 flex-grow mb-12">
                        {[
                            { t: 'Gerador de Vídeos IA (Veo)', d: 'Vídeos cinematográficos em segundos.' },
                            { t: 'Mentorias Estratégicas', d: 'Encontros mensais para escala de faturamento.' },
                            { t: 'Isolamento Multi-tenant', d: 'Segurança e infraestrutura enterprise.' },
                            { t: 'Priority Alpha Access', d: 'Novas ferramentas antes de todo o mercado.' }
                        ].map(f => (
                            <li key={f.t} className="flex items-start gap-4">
                                <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-[10px] shrink-0 mt-1">✔</span>
                                <div>
                                    <p className="text-sm text-white font-black leading-none mb-1">{f.t}</p>
                                    <p className="text-[10px] text-slate-500 font-medium leading-tight">{f.d}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => handleSubscribe('master')}
                        disabled={!!isLoading || user.level === 'master'}
                        className={`w-full py-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all transform active:scale-95 ${user.level === 'master' ? 'bg-white/5 text-slate-600' : 'bg-amber-500 text-black hover:bg-amber-400 shadow-xl shadow-amber-500/30'}`}
                    >
                        {isLoading === 'master' ? 'PROCESSANDO...' : user.level === 'master' ? 'SEU PLANO MASTER ATIVO' : 'MUDAR PARA MASTER'}
                    </button>
                </div>
            </div>
            
            <div className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] pb-12">
                🔒 Transações Seguras Elevare v1.0 • Global Enterprise Standard
            </div>
        </div>
    );
};

export default Plans;
