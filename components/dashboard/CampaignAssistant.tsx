
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { ApiKeyPrompt } from './ApiKeyPrompt';
import { CampaignAssistantSkeleton } from './skeletons';
import { UserData } from '../../types';

interface CampaignPackage {
    adCopy: string;
    creativeSuggestion: string;
    audience: {
        location: string;
        age: string;
        gender: string;
        interests: string;
    };
    budget: {
        recommendation: string;
        duration: string;
    };
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
        <div className="flex items-center gap-3 mb-6">
            <span className="text-xl p-2 bg-indigo-50 rounded-xl">{icon}</span>
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">{title}</h4>
        </div>
        <div className="text-slate-600 text-sm leading-relaxed font-medium">{children}</div>
    </div>
);

export const CampaignAssistant: React.FC<{ user: UserData | null }> = ({ user }) => {
    const [objective, setObjective] = useState('Venda de Protocolo de Bioestimuladores de Colágeno');
    const [isLoading, setIsLoading] = useState(false);
    const [campaignPackage, setCampaignPackage] = useState<CampaignPackage | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [error, setError] = useState<string|null>(null);

    if (!process.env.API_KEY) {
        return <ApiKeyPrompt featureName="Gestor de Tráfego IA Elevare" />;
    }

    const handleGenerate = async () => {
        if (!objective.trim()) return;
        setIsLoading(true);
        setCampaignPackage(null);
        setError(null);
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const systemInstruction = `Você é o Gestor de Tráfego Sênior da Elevare v1.0. Especialista em Meta Ads para o mercado de estética luxuosa.
            Sua meta é maximizar o ROAS (Retorno sobre Gasto em Anúncios).
            Clínica: ${user?.clinic || 'Clínica Pro'}. Estilo: ${user?.tone || 'Premium'}.
            Responda APENAS com o JSON solicitado.`;

            const prompt = `Gere uma estratégia de escala para o objetivo: "${objective}".
            Inclua 'adCopy' (focada em dor/desejo), 'creativeSuggestion' (visual editorial), 'audience' (comportamentos de luxo) e 'budget'.`;
            
            const campaignSchema = {
                type: Type.OBJECT,
                properties: {
                    adCopy: { type: Type.STRING },
                    creativeSuggestion: { type: Type.STRING },
                    audience: {
                        type: Type.OBJECT,
                        properties: {
                            location: { type: Type.STRING },
                            age: { type: Type.STRING },
                            gender: { type: Type.STRING },
                            interests: { type: Type.STRING },
                        },
                        required: ["location", "age", "gender", "interests"]
                    },
                    budget: {
                        type: Type.OBJECT,
                        properties: {
                            recommendation: { type: Type.STRING },
                            duration: { type: Type.STRING },
                        },
                        required: ["recommendation", "duration"]
                    }
                },
                required: ["adCopy", "creativeSuggestion", "audience", "budget"]
            };

             const response = await ai.models.generateContent({
                model: 'gemini-3-pro-preview',
                contents: prompt,
                config: {
                    systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: campaignSchema,
                }
            });
            
            const jsonResponse = JSON.parse(response.text);
            setCampaignPackage(jsonResponse);

        } catch (err) {
            console.error("Campaign error:", err);
            setError("Ocorreu uma falha na orquestração da campanha. Verifique sua chave ou conexão.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gestor de Tráfego IA</h1>
                    <p className="text-slate-500 mt-2 font-medium max-w-lg italic">"Campanhas estruturadas para transformar impressões em agendamentos de alto ticket."</p>
                </div>
            </header>
            
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10 space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Qual o foco da sua escala?</label>
                        <textarea
                            value={objective}
                            onChange={(e) => setObjective(e.target.value)}
                            className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                            placeholder="Ex: Atrair pacientes para Botox com foco em rugas de expressão."
                            disabled={isLoading}
                        />
                    </div>
                    <button 
                        onClick={handleGenerate} 
                        disabled={isLoading || !objective.trim()} 
                        className="w-full md:w-auto px-12 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-100 shadow-xl transition-all transform active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'ESTRUTURANDO CAMPANHA...' : 'GERAR ESTRATÉGIA META ADS'}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <CampaignAssistantSkeleton />
            ) : error ? (
                <div className="bg-rose-50 text-rose-600 p-6 rounded-3xl border border-rose-100 font-bold text-center italic">{error}</div>
            ) : campaignPackage && (
                <div className="grid md:grid-cols-2 gap-8">
                    <ResultCard title="Diretriz Criativa & Copy" icon="📸">
                        <div className="space-y-6">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-700">
                                <strong>Sugestão Visual:</strong> {campaignPackage.creativeSuggestion}
                            </div>
                            <div className="relative">
                                <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed">{campaignPackage.adCopy}</p>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(campaignPackage.adCopy);
                                    setCopySuccess(true);
                                    setTimeout(() => setCopySuccess(false), 3000);
                                }} className={`mt-6 px-6 py-2 rounded-xl text-[10px] font-black transition-all shadow-sm ${copySuccess ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}>
                                    {copySuccess ? 'COPIADO COM SUCESSO!' : 'COPIAR TEXTO DO ANÚNCIO'}
                                </button>
                            </div>
                        </div>
                    </ResultCard>

                    <div className="space-y-8">
                        <ResultCard title="Segmentação de Público" icon="🎯">
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-400 font-bold uppercase text-[9px]">Raio de Atuação</span>
                                    <span className="text-slate-900 font-black">{campaignPackage.audience.location}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-slate-400 font-bold uppercase text-[9px]">Target Demográfico</span>
                                    <span className="text-slate-900 font-black">{campaignPackage.audience.age}, {campaignPackage.audience.gender}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Interesses & Comportamentos</span>
                                    <p className="text-slate-700 font-bold">{campaignPackage.audience.interests}</p>
                                </div>
                            </div>
                        </ResultCard>

                        <ResultCard title="Plano de Investimento" icon="📊">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-indigo-50 p-4 rounded-2xl">
                                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Verba Diária</span>
                                    <span className="text-xl font-black text-indigo-600">{campaignPackage.budget.recommendation}</span>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-2xl">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Ciclo de Campanha</span>
                                    <span className="text-xl font-black text-white">{campaignPackage.budget.duration}</span>
                                </div>
                            </div>
                            <p className="mt-6 text-[11px] text-slate-400 italic">"Estes valores são recomendações baseadas no custo médio do nicho para gerar volume de leads qualificados."</p>
                        </ResultCard>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignAssistant;
