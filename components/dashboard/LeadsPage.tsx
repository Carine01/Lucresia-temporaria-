
import React, { useState } from 'react';
import { Lead } from '../../types';
import { useToast } from '../Toast';

export const LeadsPage: React.FC = () => {
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');

    const [leads] = useState<(Lead & { score: number })[]>([
        { id: '1', name: 'Juliana Silva', email: 'ju@email.com', phone: '(11) 98888-7777', service: 'Botox', status: 'novo', createdAt: '2023-10-25', source: 'Instagram', score: 85 },
        { id: '2', name: 'Mariana Costa', email: 'mari@email.com', phone: '(11) 97777-6666', service: 'Preenchimento', status: 'em_contato', createdAt: '2023-10-24', source: 'WhatsApp', score: 45 },
        { id: '3', name: 'Fernanda Lima', email: 'fer@email.com', phone: '(11) 96666-5555', service: 'Limpeza de Pele', status: 'faturado', createdAt: '2023-10-22', source: 'Site', score: 100 },
        { id: '4', name: 'Carla Souza', email: 'carla@email.com', phone: '(11) 95555-4444', service: 'Bioestimulador', status: 'agendado', createdAt: '2023-10-20', source: 'Indicação', score: 92 },
    ]);

    const getStatusStyle = (status: Lead['status']) => {
        const styles = {
            novo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
            em_contato: 'bg-amber-50 text-amber-600 border-amber-100',
            agendado: 'bg-purple-50 text-purple-600 border-purple-100',
            faturado: 'bg-green-50 text-green-600 border-green-100',
            perdido: 'bg-rose-50 text-rose-600 border-rose-100',
        };
        return styles[status] || styles.novo;
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 50) return 'text-amber-600 bg-amber-50';
        return 'text-rose-600 bg-rose-50';
    };

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Pipeline</h1>
                        <p className="text-slate-500 text-sm md:text-base font-medium">CRM Multi-tenant v1.0</p>
                    </div>
                    <button className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg md:px-6 md:py-3 font-bold text-sm">
                        <span className="hidden md:inline">+ Novo Lead</span>
                        <span className="md:hidden">+</span>
                    </button>
                </div>
            </header>

            {/* Grid de Stats Responsivo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Conversão', val: '24%', icon: '📈' },
                    { label: 'CAC', val: 'R$42', icon: '💰' },
                    { label: 'Novos', val: '+5', icon: '✨' },
                    { label: 'Lost', val: '8%', icon: '📉' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">{stat.label}</p>
                        <p className="text-lg md:text-2xl font-black text-slate-900">{stat.val}</p>
                    </div>
                ))}
            </div>

            {/* Filtros Mobile-First */}
            <div className="flex flex-col md:flex-row gap-3">
                <input 
                    type="text" 
                    placeholder="Pesquisar..."
                    className="flex-1 bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 outline-none">
                    <option value="todos">Todos Status</option>
                    <option value="novo">Novos</option>
                    <option value="agendado">Agendados</option>
                </select>
            </div>

            {/* Card Layout para Mobile / Tabela para Desktop */}
            <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl md:border border-slate-100 overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-5 px-8 py-5 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-50">
                    <div className="col-span-2">Lead</div>
                    <div>Score</div>
                    <div>Status</div>
                    <div className="text-right">Ação</div>
                </div>

                {/* List Body */}
                <div className="divide-y divide-slate-50">
                    {leads.map((lead) => (
                        <div key={lead.id} className="p-5 md:px-8 md:py-6 hover:bg-slate-50/50 transition-colors flex flex-col md:grid md:grid-cols-5 gap-4 md:items-center">
                            <div className="md:col-span-2 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs uppercase shrink-0">
                                    {lead.name.substring(0,2)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{lead.name}</div>
                                    <div className="text-[11px] text-slate-400">{lead.phone}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between md:block">
                                <span className="md:hidden text-[10px] font-black text-slate-400 uppercase">Score:</span>
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${getScoreColor(lead.score)}`}>
                                    {lead.score}%
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:block">
                                <span className="md:hidden text-[10px] font-black text-slate-400 uppercase">Status:</span>
                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getStatusStyle(lead.status)}`}>
                                    {lead.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div className="pt-2 md:pt-0 text-right">
                                <button className="w-full md:w-auto bg-slate-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                    Abrir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadsPage;
