
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { SupportChat } from './components/SupportChat';
import { auth } from './firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const DashboardPage = lazy(() => import('./components/DashboardPage'));

const PaymentSuccessPage: React.FC = () => {
    useEffect(() => {
        console.log("Payment successful. A webhook should be updating the user's status in Firestore.");
        setTimeout(() => {
            window.location.hash = '#/dashboard';
        }, 3000); 
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-slate-50 text-slate-800">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Pagamento Aprovado!</h1>
            <p className="text-slate-600">Sua conta foi atualizada para Premium. Redirecionando para o seu dashboard...</p>
        </div>
    );
};

const PaymentCancelPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-slate-50 text-slate-800">
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Pagamento Cancelado</h1>
            <p className="text-slate-600 mb-6">Você pode tentar novamente a qualquer momento na página de planos.</p>
            <a href="#/dashboard" className="px-6 py-3 bg-[#9F8DE6] text-white rounded-lg font-bold hover:bg-violet-500 transition-colors">
                Voltar para o Dashboard
            </a>
        </div>
    );
};

const LoadingFallback: React.FC = () => (
    <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9F8DE6]"></div>
    </div>
);

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [page, setPage] = useState('landing');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;

            if (hash === '#/payment/success') {
                setPage('payment_success');
                return;
            }
            if (hash === '#/payment/cancel') {
                setPage('payment_cancel');
                return;
            }

            if (currentUser) {
                 if (hash.startsWith('#/dashboard') || hash === '') {
                     setPage('dashboard');
                     if (hash === '') window.history.pushState(null, '', '#/dashboard');
                 } else if (hash === '#/logout') {
                    auth.signOut();
                    window.location.hash = '';
                 } else {
                     setPage('dashboard');
                 }
            } else if (hash === '#/login' || hash === '#/signup') {
                setPage('auth');
            } else {
                setPage('landing');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [currentUser]);

     useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, [page]);
    
    const handleLogout = () => {
        auth.signOut();
        window.location.hash = '';
    };

    if (loading) {
        return <LoadingFallback />;
    }

    const renderPage = () => {
        if (page === 'payment_success') {
            return <PaymentSuccessPage />;
        }
        if (page === 'payment_cancel') {
            return <PaymentCancelPage />;
        }
        if (page === 'dashboard' && currentUser) {
            return (
                <Suspense fallback={<LoadingFallback />}>
                    <DashboardPage onLogout={handleLogout} />
                </Suspense>
            );
        }
        if (page === 'auth') {
            const mode = window.location.hash === '#/signup' ? 'signup' : 'login';
            return <AuthPage mode={mode} />;
        }
        return <LandingPage />;
    };
    
    const backgroundClass = 'bg-slate-50 text-slate-800';

    return (
        <div className={`min-h-screen ${backgroundClass}`}>
            {renderPage()}
            <SupportChat />
        </div>
    );
};

export default App;
