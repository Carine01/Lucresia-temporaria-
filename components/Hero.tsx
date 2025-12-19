
import React, { useState, useRef } from 'react';

interface HeroProps {
    onFreeStart?: () => void;
    onPremiumSubscribe?: (plan: 'Pro' | 'Master') => void;
}

export const Hero: React.FC<HeroProps> = ({ onFreeStart, onPremiumSubscribe }) => {
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleFreeStart = () => {
        if (onFreeStart) onFreeStart();
        else window.location.hash = '#/signup';
    };

    const handlePlayVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section id="hero" className="relative pt-12 pb-16 md:pt-32 md:pb-24 overflow-hidden px-6">
            {/* Background Decorativo Elevare */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] bg-orange-400 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-5%] right-[-10%] w-[60%] h-[60%] bg-indigo-600 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Lado Esquerdo: NeuroVendas Copy */}
                    <div className="text-center lg:text-left animate-on-scroll">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-[10px] md:text-xs font-black mb-6 border border-orange-100 uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Inteligência de Vendas Aplicada
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-6">
                            Venda como <span className="text-orange-600 underline decoration-orange-200">ciência</span>, <br className="hidden md:block"/> não como esperança.
                        </h1>
                        
                        <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            A arquitetura lógica que une neurociência, comportamento e IA para transformar sua clínica em uma máquina de agendamentos automáticos.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button
                                onClick={handleFreeStart}
                                className="w-full sm:w-auto px-10 py-5 bg-orange-500 text-white rounded-2xl shadow-xl shadow-orange-500/20 font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95">
                                Analisar meu Perfil
                            </button>
                            <button
                                onClick={() => onPremiumSubscribe ? onPremiumSubscribe('Pro') : (window.location.hash = '#/plans')}
                                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-800 border-2 border-slate-100 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
                                Ver Planos PRO
                            </button>
                        </div>
                    </div>

                    {/* Lado Direito: Demo Veo v1.1.0 */}
                    <div className="relative animate-on-scroll delay-200 w-full max-w-2xl mx-auto">
                        <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white bg-white/50 backdrop-blur-sm transition-all hover:scale-[1.01]">
                            
                            <div className="absolute top-6 right-6 z-20 bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black flex items-center gap-2 border border-white/10 uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                                Elevare Demo v1.1
                            </div>

                            <video 
                                ref={videoRef}
                                className="w-full aspect-[4/3] object-cover cursor-pointer"
                                poster="https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                loop
                                playsInline
                            >
                                <source src="https://videos.pexels.com/video-files/8743919/8743919-hd_1920_1080_25fps.mp4" type="video/mp4" />
                            </video>

                            {!isPlaying && (
                                <div onClick={handlePlayVideo} className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all cursor-pointer z-10">
                                    <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl text-orange-600">
                                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z"></path>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
