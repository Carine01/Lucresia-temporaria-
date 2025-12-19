
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { auth, db } from '../firebase/config';
import { UserData } from '../types';
import { doc, onSnapshot } from 'firebase/firestore';
import ContentCreation from './dashboard/ContentCreation';
import { Profile } from './dashboard/Profile';
import { Plans } from './dashboard/Plans';
import { VideoGenerator } from './VideoGenerator';

const EbookGeneratorPage = lazy(() => import('./dashboard/EbookGeneratorPage'));
const RoboProdutorPage = lazy(() => import('./dashboard/RoboProdutorPage'));
const CampaignAssistant = lazy(() => import('./dashboard/CampaignAssistant'));
const LeadsPage = lazy(() => import('./dashboard/LeadsPage'));
const CalendarPage = lazy(() => import('./dashboard/CalendarPage'));

const PageFallback: React.FC = () => (
    <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
    </div>
);

const NavItem: React.FC<{ 
    id: string; 
    icon: React.ReactNode; 
    label: string; 
    isActive: boolean; 
    onClick: () => void; 
    isLocked?: boolean; 
}> = ({ icon, label, isActive, onClick, isLocked }) => (
    <li
        onClick={isLocked ? undefined : onClick}
        className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
            isActive
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-semibold'
                : isLocked 
                    ? 'text-slate-600 cursor-not-allowed opacity-50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
    >
        <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500'}`}>{icon}</span>
        <span className="text-sm tracking-tight">{label}</span>
        {isLocked && (
            <svg className="w-3.5 h-3.5 ml-auto text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
        )}
    </li>
);

export const DashboardPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [activePage, setActivePage] = useState('radar');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    setUser({ ...doc.data(), uid: currentUser.uid } as UserData);
                } else {
                    onLogout();
                }
            });
            return () => unsubscribe();
        } else {
            onLogout();
        }
    }, [onLogout]);

    if (!user) return <PageFallback />;

    const renderActivePage = () => {
        switch(activePage) {
            case 'radar': return <Suspense fallback={<PageFallback />}><RoboProdutorPage user={user} /></Suspense>; // Mapeado para o Analyzer no RoboProdutorPage
            case 'robo': return <Suspense fallback={<PageFallback />}><ContentCreation user={user} /></Suspense>;
            case 'leads': return <Suspense fallback={<PageFallback />}><LeadsPage /></Suspense>;
            case 'ebooks': return <Suspense fallback={<PageFallback />}><EbookGeneratorPage user={user} /></Suspense>;
            case 'ads': return <Suspense fallback={<PageFallback />}><CampaignAssistant user={user} /></Suspense>;
            case 'video': return user.level === 'master' ? <VideoGenerator /> : <Plans user={user} />;
            case 'profile': return <Profile user={user} />;
            case 'plans': return <Plans user={user} />;
            default: return <RoboProdutorPage user={user} />;
        }
    }

    return (
        <div className="min-h-screen bg-[#F1F5F9] font-sans flex flex-col lg:flex-row">
            {/* Header Mobile Elevare */}
            <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#0F172A] text-white sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black">E</div>
                    <span className="font-black text-sm tracking-tighter uppercase">Elevare AI</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[10px] font-black bg-white/10 px-2 py-1 rounded border border-white/5">{user.credits || 0}/{user.maxCredits || 6}</div>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </header>

            {/* Sidebar NeuroVendas */}
            <aside className={`
                w-72 bg-[#0F172A] p-6 flex flex-col justify-between fixed lg:sticky h-screen z-40 shadow-2xl transition-transform duration-300
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="overflow-y-auto custom-scrollbar pr-2">
                    <div className="hidden lg:flex items-center gap-3 mb-10 px-2">
                        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30">E</div>
                        <div>
                            <h1 className="text-white font-black text-lg leading-none uppercase tracking-tighter">Elevare AI</h1>
                            <p className="text-[9px] text-orange-400 font-bold uppercase tracking-widest mt-1">NeuroVendas v1.1.0</p>
                        </div>
                    </div>
                    
                    <nav className="space-y-8">
                        <div>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4 px-4">Captação</p>
                            <ul className="space-y-1">
                                <NavItem id="radar" icon="📡" label="Radar de Bio" isActive={activePage === 'radar'} onClick={() => { setActivePage('radar'); setIsMenuOpen(false); }} />
                                <NavItem id="leads" icon="💎" label="Leads Pipeline" isActive={activePage === 'leads'} onClick={() => { setActivePage('leads'); setIsMenuOpen(false); }} />
                            </ul>
                        </div>

                        <div>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4 px-4">Produção IA</p>
                            <ul className="space-y-1">
                                <NavItem id="robo" icon="🤖" label="Robô Produtor" isActive={activePage === 'robo'} onClick={() => { setActivePage('robo'); setIsMenuOpen(false); }} />
                                <NavItem id="ads" icon="🎯" label="Gerente de Ads" isActive={activePage === 'ads'} onClick={() => { setActivePage('ads'); setIsMenuOpen(false); }} isLocked={user.level === 'free'} />
                                <NavItem id="ebooks" icon="📖" label="Gerador E-books" isActive={activePage === 'ebooks'} onClick={() => { setActivePage('ebooks'); setIsMenuOpen(false); }} isLocked={user.level === 'free'} />
                                <NavItem id="video" icon="🎬" label="Vídeo Veo" isActive={activePage === 'video'} onClick={() => { setActivePage('video'); setIsMenuOpen(false); }} isLocked={user.level !== 'master'} />
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase mb-2">
                            <span>Créditos de Uso</span>
                            <span className="text-orange-400">{user.credits || 0}/{user.maxCredits || 6}</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full" style={{ width: `${((user.credits || 0) / (user.maxCredits || 6)) * 100}%` }}></div>
                        </div>
                        {user.level === 'free' && (
                            <button onClick={() => setActivePage('plans')} className="w-full mt-3 py-2 bg-orange-500/10 text-orange-500 text-[10px] font-black rounded-lg border border-orange-500/20 uppercase">Fazer Upgrade</button>
                        )}
                    </div>
                    <button onClick={onLogout} className="w-full text-center text-[10px] font-black text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest py-2">Sair do Sistema</button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 lg:p-10 min-h-screen pb-24 lg:pb-10 overflow-x-hidden">
                <div className="max-w-6xl mx-auto">
                    <Suspense fallback={<PageFallback />}>
                        {renderActivePage()}
                    </Suspense>
                </div>
            </main>

            {/* Bottom Navigation Mobile NeuroVendas */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <button onClick={() => setActivePage('radar')} className={`flex flex-col items-center gap-1 ${activePage === 'radar' ? 'text-orange-500' : 'text-slate-400'}`}>
                    <span className="text-xl">📡</span>
                    <span className="text-[10px] font-bold uppercase">Radar</span>
                </button>
                <button onClick={() => setActivePage('robo')} className={`flex flex-col items-center gap-1 ${activePage === 'robo' ? 'text-orange-500' : 'text-slate-400'}`}>
                    <span className="text-xl">🤖</span>
                    <span className="text-[10px] font-bold uppercase">Robô</span>
                </button>
                <button onClick={() => setActivePage('leads')} className={`flex flex-col items-center gap-1 ${activePage === 'leads' ? 'text-orange-500' : 'text-slate-400'}`}>
                    <span className="text-xl">💎</span>
                    <span className="text-[10px] font-bold uppercase">Leads</span>
                </button>
                <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-1 text-slate-400">
                    <span className="text-xl">☰</span>
                    <span className="text-[10px] font-bold uppercase">Mais</span>
                </button>
            </nav>
        </div>
    );
};

export default DashboardPage;
