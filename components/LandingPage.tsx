
import React, { useState, useEffect } from 'react';
import { auth, functions } from '../firebase/config';
import { PRICE_IDS } from '../config/priceIds';
import { Hero } from './Hero';
import { EvolvingLibrary } from './EvolvingLibrary';
import { ComparisonTable } from './ComparisonTable';
import { GamificationFlow } from './GamificationFlow';

export const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 47, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (plan: 'Pro' | 'Master') => {
    setIsLoading(plan);
    if (!auth.currentUser) {
        window.location.hash = '#/signup';
        return;
    }
    try {
        const createStripeCheckout = functions.httpsCallable('createStripeCheckout');
        const result = await createStripeCheckout({
            priceId: plan === 'Pro' ? PRICE_IDS.pro_monthly : PRICE_IDS.master_monthly,
            successUrl: `${window.location.origin}${window.location.pathname}#/payment/success`,
            cancelUrl: `${window.location.origin}${window.location.pathname}#/payment/cancel`,
        });
        const { url } = result.data as { url: string };
        window.location.href = url;
    } catch (error) {
        setIsLoading(null);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-900 overflow-x-hidden">
      {/* Banner de Escassez - Urgência Elevare */}
      <div className="bg-amber-500 text-black py-2.5 px-6 text-center text-[10px] md:text-xs font-black tracking-[0.2em] uppercase sticky top-0 z-[60] shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
            <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full animate-ping"></span>
                Venda como ciência, não como esperança.
            </span>
            <span className="font-mono">PROMOÇÃO DE LANÇAMENTO EXPIRA EM: 00:{String(timeLeft.minutes).padStart(2,'0')}:{String(timeLeft.seconds).padStart(2,'0')}</span>
        </div>
      </div>

      <header className="sticky top-[41px] md:top-[37px] left-0 right-0 backdrop-blur-xl bg-white/80 z-50 border-b border-slate-200/60">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/20">E</div>
            <div>
              <div className="font-black text-slate-900 text-base leading-none tracking-tighter uppercase">Elevare AI</div>
              <div className="text-[9px] uppercase tracking-widest text-orange-600 font-black mt-1 leading-none">NeuroVendas v1.1.0</div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <a href="#radar" className="hover:text-orange-600 transition-colors">Radar de Bio</a>
            <a href="#manifesto" className="hover:text-orange-600 transition-colors">Manifesto</a>
            <a href="#pricing" className="hover:text-orange-600 transition-colors">Planos</a>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <a href="#/login" className="text-[11px] font-black uppercase tracking-widest text-slate-600">Entrar</a>
            <a href="#/signup" className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-orange-600 transition-all">Começar Agora</a>
          </div>
        </nav>
      </header>

      <main>
        <Hero onFreeStart={() => window.location.hash = '#/signup'} onPremiumSubscribe={handleSubscribe} />

        {/* Manifesto Section */}
        <section id="manifesto" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] mb-8 inline-block bg-orange-50 px-4 py-2 rounded-full">Manifesto NeuroVendas</span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tight leading-[1.1]">Vender é traduzir valor, <br/>não baixar preço.</h2>
                <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium italic">
                    "A cliente não compra o procedimento — compra a promessa. Elevare Inteligência de Vendas ensina você a entregar exatamente essa promessa."
                </p>
                <div className="mt-12 flex justify-center opacity-30">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                </div>
            </div>
        </section>

        {/* Radar de Bio - Lead Magnet Responsivo */}
        <section id="radar" className="py-20 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 relative">
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-sm shadow-xl animate-bounce">
                            GRÁTIS
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-6">Radar de Bio (Ímã de Leads)</h3>
                        <p className="text-slate-500 mb-8 font-medium">Analise sua bio do Instagram com nossa IA treinada em Neurociência e descubra por que você não está convertendo seguidores em pacientes.</p>
                        <div className="space-y-4">
                            <input type="text" placeholder="@seu_instagram" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold" />
                            <button className="w-full py-5 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all uppercase tracking-widest text-sm">Realizar Diagnóstico IA</button>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 inline-block">Funcionalidade #1</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">Diagnóstico de Perfil com Inteligência de Vendas.</h2>
                    <ul className="space-y-4 text-slate-600 font-medium">
                        <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold">✓</span> Análise de Posicionamento</li>
                        <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold">✓</span> Gatilhos de Decisão Aplicados</li>
                        <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold">✓</span> Plano de Ação Personalizado</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Pricing - Elevare Plans */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] bg-orange-50 px-5 py-2 rounded-full mb-6 inline-block">Estrutura de Investimento</span>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">O Fim da Esperança, <br/>O Início da Ciência.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* GRATIS */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 flex flex-col shadow-lg">
              <h4 className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Plano Grátis</h4>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900">R$0</span>
              </div>
              <ul className="mt-8 text-sm text-slate-600 space-y-4 flex-grow font-bold">
                <li className="flex items-center gap-3 opacity-50">✔ 1/6 Créditos Radar de Bio</li>
                <li className="flex items-center gap-3 opacity-50">✔ Diagnóstico Básico</li>
              </ul>
              <button onClick={() => window.location.hash = '#/signup'} className="w-full mt-10 py-4 rounded-xl bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest">
                Começar Grátis
              </button>
            </div>

            {/* PRO */}
            <div className="bg-white rounded-[2.5rem] p-10 border-2 border-orange-500 relative flex flex-col shadow-2xl scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-8 py-2 rounded-full text-[10px] font-black shadow-lg">O SALTO LÓGICO</div>
              <h4 className="font-black text-orange-600 uppercase tracking-widest text-[10px]">Elevare PRO</h4>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">R$29</span>
                <span className="text-slate-400 text-sm font-bold">/mês</span>
              </div>
              <ul className="mt-10 text-sm text-slate-700 space-y-5 flex-grow font-bold">
                <li className="flex items-center gap-3">✔ 10 Créditos de Inteligência</li>
                <li className="flex items-center gap-3">✔ Gerador de E-books (IA)</li>
                <li className="flex items-center gap-3">✔ Robô Produtor de Anúncios</li>
                <li className="flex items-center gap-3">✔ Gatilhos de Neurovendas</li>
              </ul>
              <button onClick={() => handleSubscribe('Pro')} className="w-full mt-12 py-5 rounded-2xl bg-orange-500 text-white font-black text-sm tracking-widest shadow-xl shadow-orange-500/30 hover:bg-orange-600">
                ASSINAR PLANO PRO
              </button>
            </div>

            {/* PRO+ */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 relative flex flex-col text-white shadow-2xl">
              <h4 className="font-black text-indigo-400 uppercase tracking-widest text-[10px]">Elevare PRO+</h4>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white tracking-tighter">R$79</span>
                <span className="text-slate-500 text-sm font-bold">/mês</span>
              </div>
              <ul className="mt-10 text-sm text-slate-300 space-y-5 flex-grow font-medium">
                <li className="flex items-center gap-3">✔ <strong>CRÉDITOS ILIMITADOS</strong></li>
                <li className="flex items-center gap-3">✔ Vídeos IA (Veo - Master)</li>
                <li className="flex items-center gap-3">✔ Mentorias de Escala</li>
                <li className="flex items-center gap-3">✔ Suporte VIP 24h</li>
              </ul>
              <button onClick={() => handleSubscribe('Master')} className="w-full mt-12 py-5 rounded-2xl bg-white text-slate-900 font-black text-sm tracking-widest hover:bg-slate-100">
                QUERO O PRO+
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-16 px-6 border-t border-slate-100 pb-32 lg:pb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black">E</div>
                    <span className="font-black text-xl text-slate-900 tracking-tighter uppercase">Elevare AI</span>
                </div>
                <p className="text-sm text-slate-400 font-medium max-w-xs text-center md:text-left italic">"A inteligência que transforma caos digital em lucro científico."</p>
            </div>
            
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2025 Elevare NeuroVendas • Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};
