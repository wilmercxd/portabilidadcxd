import { useState, useEffect, useMemo } from 'react';
import { 
  Phone, 
  User, 
  CreditCard, 
  Clipboard, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Search, 
  Zap, 
  Shield, 
  Download, 
  Timer, 
  Maximize2, 
  Menu,
  Check,
  Calculator,
  MessageSquare,
  DollarSign,
  RefreshCcw,
  WifiOff,
  ArrowUpCircle,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PRODUCTS, 
  OBJECTIONS, 
  OPENING_SCRIPTS, 
  OCCUPATIONS, 
  PRIORITIES, 
  GUION_HABEAS_DIGITAL,
  GUION_HABEAS_GRABADO,
  GUION_MOVIL,
  CONTRATO_ENTREGA_SIM,
  CONTRATO_SIM_ADQUIRIDA
} from './constants';

// Types
interface LeadData {
  name: string;
  id: string;
  phone: string;
  city: string;
  occupation: string;
  budget: number;
  priority: string;
  painPoint: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    id: '',
    phone: '',
    city: '',
    occupation: OCCUPATIONS[0],
    budget: 45000,
    priority: PRIORITIES[0],
    painPoint: ''
  });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [acceptedHabeas, setAcceptedHabeas] = useState(false);
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [showObjections, setShowObjections] = useState(false);
  const [objectionSearch, setObjectionSearch] = useState('');
  const [isCallMode, setIsCallMode] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [pasteContent, setPasteContent] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Timer logic for Call Mode
  useEffect(() => {
    let interval: any;
    if (isCallMode) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCallMode]);

  // Load metrics from local storage
  useEffect(() => {
    const saved = localStorage.getItem('claro_co_pilot_metrics');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'l') {
        setIsCallMode(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCallMode(false);
        setShowObjections(false);
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && currentStep < 6) setCurrentStep(prev => prev + 1);
      if (e.key === 'ArrowLeft' && currentStep > 0) setCurrentStep(prev => prev - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  // Intelligent Paste Logic
  const handleSmartPaste = (text: string) => {
    setPasteContent(text);
    const newData = { ...leadData };
    
    const nameMatch = text.match(/NOMBRES?:\s*(.*)/i);
    const idMatch = text.match(/(?:CEDULA|ID|CC):\s*(\d+)/i);
    const phoneMatch = text.match(/(?:MIN|CELULAR|LINEA):\s*(\d+)/i);
    const cityMatch = text.match(/CIUDAD:\s*(.*)/i);

    if (nameMatch) newData.name = nameMatch[1].trim();
    if (idMatch) newData.id = idMatch[1].trim();
    if (phoneMatch) newData.phone = phoneMatch[1].trim();
    if (cityMatch) newData.city = cityMatch[1].trim();

    setLeadData(newData);
  };

  // Recommender Logic with Price Anchoring (Tiered Offer)
  const recommendedProducts = useMemo(() => {
    const scored = PRODUCTS.map(p => {
      let score = 0;
      if (leadData.budget >= p.price) score += 30;
      if (p.scoreFactors.priorities.includes(leadData.priority)) score += 40;
      if (p.scoreFactors.occupations.includes(leadData.occupation)) score += 30;
      return { ...p, score };
    });

    // Get the top 3 best fits
    const topFit = scored.sort((a, b) => b.score - a.score).slice(0, 3);
    
    // Sort THEM by price high to low for Price Anchoring
    return topFit.sort((a, b) => b.price - a.price);
  }, [leadData]);

  const personalizeScript = (text: string) => {
    return text
      .replace(/\[Nombre\]/g, leadData.name || 'Don/Doña')
      .replace(/\[Ocupacion\]/g, leadData.occupation)
      .replace(/\[Beneficio_Clave\]/g, selectedProduct.benefits[0]);
  };

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || recommendedProducts[0];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const saveSale = () => {
    const sale = {
      date: new Date().toISOString(),
      lead: leadData.name,
      product: selectedProduct.name,
      time: callTimer
    };
    const newHistory = [sale, ...history];
    setHistory(newHistory);
    localStorage.setItem('claro_co_pilot_metrics', JSON.stringify(newHistory));
    
    // Download as .txt
    const blob = new Blob([JSON.stringify(sale, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `venta_claro_${leadData.name || 'sin_nombre'}.txt`;
    a.click();
  };

  const sections = [
    { title: "Apertura y Gestión", icon: <User /> },
    { title: "Oferta", icon: <Calculator /> },
    { title: "Rebátelo", icon: <MessageSquare /> },
    { title: "Legal (Habeas/NIP)", icon: <Shield /> },
    { title: "Logística", icon: <Zap /> },
    { title: "Contrato (Grabación)", icon: <Mic /> },
    { title: "Cierre", icon: <CheckCircle /> }
  ];

  const habeasDigitalText = GUION_HABEAS_DIGITAL
    .replace('[Nombre]', leadData.name || 'Señor(a)')
    .replace('[Fecha]', new Date().toLocaleDateString('es-CO'));

  const habeasGrabadoText = GUION_HABEAS_GRABADO
    .replace('[Nombre]', leadData.name || 'Señor(a)')
    .replace('[Fecha]', new Date().toLocaleDateString('es-CO'));

  const guionMovilText = GUION_MOVIL
    .replace(/\[Nombre\]/g, leadData.name || 'CLIENTE')
    .replace(/\[ID\]/g, leadData.id || 'N/A')
    .replace(/\[Nombre_Plan\]/g, selectedProduct.name)
    .replace(/\[Beneficios_Plan\]/g, selectedProduct.benefits.join(', '))
    .replace(/\[Descuento\]/g, selectedProduct.discount)
    .replace(/\[Precio_Plan\]/g, '$' + selectedProduct.price.toLocaleString());

  const parseContract = (contractText: string) => {
    return contractText
      .replace(/\[Nombre\]/g, leadData.name || 'CLIENTE')
      .replace(/\[ID\]/g, leadData.id || 'N/A')
      .replace(/\[Nombre_Plan\]/g, selectedProduct.name)
      .replace(/\[Gigas_Plan\]/g, selectedProduct.data)
      .replace(/\[Beneficios_Plan\]/g, selectedProduct.benefits.join(', '))
      .replace(/\[Descuento\]/g, selectedProduct.discount || 'Ninguna')
      .replace(/\[Precio_Plan\]/g, '$' + selectedProduct.price.toLocaleString())
      .replace(/\[Numero_Portar\]/g, leadData.phone || 'Numero no provisto')
      .replace(/DD\/MM\/AA/g, new Date().toLocaleDateString('es-CO'));
  };

  const contratoEntregaSim = parseContract(CONTRATO_ENTREGA_SIM);
  const contratoSimAdquirida = parseContract(CONTRATO_SIM_ADQUIRIDA);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100 pb-28">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Phone className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm md:text-lg tracking-tight uppercase">Claro Co-Pilot</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden md:block">Master Sales v2.0 - Portabilidad</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-red-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsCallMode(true)}
              className="bg-slate-900 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Mic size={14} className="animate-pulse text-red-500" />
              <span className="hidden sm:inline">AL AIRE</span>
              <span className="sm:hidden">ON</span>
            </button>
            <button 
              onClick={() => setShowObjections(true)}
              className="bg-white border border-slate-200 p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 shadow-sm"
              title="Matrix de Objeciones"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {/* STEP 0: OPENING */}
          {currentStep === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">¡Dales con toda! 🚀</h2>
                <p className="text-slate-500 font-medium">Escoge tu mejor apertura según el perfil del cliente.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {OPENING_SCRIPTS.map(s => (
                  <div key={s.id} className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                    <div className="text-red-600 mb-4 p-3 bg-red-50 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                      <Zap size={24} />
                    </div>
                    <h3 className="font-extrabold text-lg mb-3">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed italic mb-6">"{s.text.replace('[Nombre]', leadData.name || 'vecino(a)')}"</p>
                    <button 
                      onClick={() => copyToClipboard(s.text.replace('[Nombre]', leadData.name || 'cliente'))}
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-600 hover:text-white py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all"
                    >
                      <Copy size={16} /> Copiar Gancho
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1: QUALIFICATION */}
          {currentStep === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="p-2 bg-red-600 rounded-xl"><Clipboard size={20} /></span> Pegado Inteligente (Autocompletar)
                </h3>
                <textarea 
                  className="w-full h-28 bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-sm font-mono focus:ring-2 focus:ring-red-500 outline-none text-red-100 transition-all font-mono"
                  placeholder="Pega aquí los datos de ADRES, POLIEDRO o CRM..."
                  onChange={(e) => handleSmartPaste(e.target.value)}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
                {[
                  { label: "Nombre", field: "name" },
                  { label: "CC / ID", field: "id" },
                  { label: "Línea Actual", field: "phone" },
                  { label: "Ciudad", field: "city" }
                ].map(input => (
                  <div key={input.field}>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">{input.label}</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-800"
                      value={(leadData as any)[input.field]}
                      onChange={(e) => setLeadData({...leadData, [input.field]: e.target.value})}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">Ocupación</label>
                  <select 
                    className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none"
                    value={leadData.occupation}
                    onChange={(e) => setLeadData({...leadData, occupation: e.target.value})}
                  >
                    {OCCUPATIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">Prioridad</label>
                  <select 
                    className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none"
                    value={leadData.priority}
                    onChange={(e) => setLeadData({...leadData, priority: e.target.value})}
                  >
                    {PRIORITIES.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: RECOMMENDATION */}
          {currentStep === 2 && (
            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-800">Oferta Escalonada para {leadData.name || 'su cliente'} ⭐</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Arranca con el mayor beneficio para {leadData.name || 'el cliente'}</p>
                </div>
                <button 
                  onClick={() => setShowAllProducts(!showAllProducts)}
                  className="text-xs font-black text-red-600 hover:scale-105 transition-transform uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl"
                >
                  {showAllProducts ? 'Ver Menos' : 'Ver Todos los Planes'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { label: "Cobertura 4G", value: "94.6%", desc: "878 Municipios vs 87 (WOM)", icon: <WifiOff size={20} className="text-blue-500" /> },
                  { label: "Red 5G Real", value: "40 Ciudades", desc: "92% de antenas 5G en Col", icon: <Zap size={20} className="text-red-500" /> },
                  { label: "Plan Cerrado", value: "$ Fijo", desc: "Sin sorpresas en factura", icon: <Shield size={20} className="text-green-500" /> }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-red-200 transition-all">
                    <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase">{stat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4">
                {(showAllProducts ? [...PRODUCTS].sort((a,b) => b.price - a.price) : recommendedProducts).map((p, idx) => (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer relative group ${selectedProductId === p.id ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white hover:border-red-200'}`}
                  >
                    {!showAllProducts && idx === 0 && (
                      <div className="absolute -top-3 left-8 bg-slate-900 text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-2xl uppercase tracking-widest">
                        Nuestra mejor oferta
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="font-black text-xl text-slate-900">{p.name}</h4>
                          <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${idx === 0 ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {p.category}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 font-bold mb-4 pr-12 italic leading-relaxed">"{p.argument}"</p>
                        
                        {/* Competitor Saving UI */}
                        {(p as any).competitorPrice && (
                          <div className="mb-4 flex items-center gap-3 bg-green-50 border border-green-100 p-3 rounded-2xl w-fit">
                            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Ahorro vs Competencia</span>
                            <span className="text-sm font-black text-green-600">-$ {((p as any).competitorPrice - p.price).toLocaleString()}</span>
                         </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                           <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-500 shadow-sm">{p.data}</div>
                           {p.benefits.map(b => {
                             const benefitLower = b.toLowerCase();
                             const priority = leadData.priority;
                             
                             // Logic to determine if benefit matches current client priority
                             const isDigitalHighlight = priority.includes('Digitales') && (benefitLower.includes('video') || benefitLower.includes('music') || benefitLower.includes('prime') || benefitLower.includes('drive'));
                             const isDataHighlight = (priority.includes('Gigas') || priority.includes('Redes')) && (benefitLower.includes('redes') || benefitLower.includes('ilimitado') || benefitLower.includes('navega'));
                             const isSecurityHighlight = priority.includes('Seguridad') && benefitLower.includes('escudo');
                             
                             const isHighlight = isDigitalHighlight || isDataHighlight || isSecurityHighlight;
                             
                             return (
                               <div 
                                 key={b} 
                                 className={`px-3 py-1.5 border rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${isHighlight ? 'bg-red-600 text-white border-red-500 scale-105 shadow-md shadow-red-200' : 'bg-blue-50 text-blue-600 border-blue-100 opacity-80'}`}
                               >
                                 {b}
                               </div>
                             );
                           })}
                        </div>
                      </div>
                      <div className="md:text-right border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8 flex flex-col justify-center min-w-[180px]">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Inversión Mensual</div>
                        <div className="text-3xl font-black text-slate-900">${p.price.toLocaleString()}</div>
                        <div className="text-xs text-red-600 font-black mt-1">{p.discount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: OBJECTIONS */}
          {currentStep === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-block p-4 bg-red-100 text-red-600 rounded-[2rem] mb-6">
                   <MessageSquare size={40} />
                </div>
                <h2 className="text-3xl font-black mb-4">Combatiendo Objeciones 🥊</h2>
                <p className="text-slate-500 font-medium">Usa estos argumentos personalizados para {leadData.occupation}. Recuerda que la portabilidad es su derecho.</p>
              </div>

              <div className="grid gap-6">
                {OBJECTIONS.slice(0, 3).map(obj => (
                  <div key={obj.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-slate-900 text-white rounded-2xl">
                         {obj.icon === 'Timer' && <Timer size={24} />}
                         {obj.icon === 'RefreshCcw' && <RefreshCcw size={24} />}
                         {obj.icon === 'DollarSign' && <DollarSign size={24} />}
                         {obj.icon === 'Clipboard' && <Clipboard size={24} />}
                         {obj.icon === 'ArrowUpCircle' && <ArrowUpCircle size={24} />}
                      </div>
                      <h4 className="text-xl font-black text-slate-900">{obj.title}</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-red-600">
                        <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">Argumento Ganador para {leadData.name || 'el cliente'}</div>
                        <p className="text-slate-800 font-bold leading-relaxed italic">
                          "{personalizeScript(obj.arguments[leadData.occupation as keyof typeof obj.arguments] || obj.arguments['General'])}"
                        </p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(personalizeScript(obj.arguments[leadData.occupation as keyof typeof obj.arguments] || obj.arguments['General']))}
                        className="text-xs font-black text-slate-400 group-hover:text-red-600 transition-colors flex items-center gap-2"
                      >
                        <Copy size={14} /> COPIAR SCRIPT PERSONALIZADO
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: HABEAS DATA */}
          {currentStep === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-black mb-2">Autorización Habeas Data 🛡️</h2>
                <p className="text-slate-500">Lectura obligatoria para iniciar el proceso formal.</p>
              </div>

              <div className="bg-red-600 text-white p-10 rounded-[3rem] shadow-2xl relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Shield size={120} />
                </div>
                <div className="text-2xl font-bold leading-relaxed mb-8 select-none">
                  {habeasDigitalText.split('\n').map((l, i) => <p key={i} className="mb-4">{l}</p>)}
                </div>
                <button 
                  onClick={() => copyToClipboard(habeasDigitalText)}
                  className="bg-white text-red-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                >
                  Copiar Lectura
                </button>
              </div>

              <div 
                onClick={() => setAcceptedHabeas(!acceptedHabeas)}
                className={`flex items-center gap-6 p-8 rounded-[2rem] border-2 transition-all cursor-pointer ${acceptedHabeas ? 'bg-green-50 border-green-500' : 'bg-white border-slate-200'}`}
              >
                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${acceptedHabeas ? 'bg-green-500 border-green-500' : 'border-slate-200'}`}>
                  {acceptedHabeas && <Check size={24} className="text-white" />}
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 uppercase tracking-tight">Autorización Confirmada</h4>
                  <p className="text-sm text-slate-500 font-bold">El cliente respondió SI de forma clara y audible.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: LEGALIZATION / CONTRACT */}
          {currentStep === 5 && (
             <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-black mb-2">Grabación de Contrato 🎤</h2>
                <p className="text-slate-500">Lectura literal y sin pausas para validación legal.</p>
              </div>

              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative font-mono text-lg border-b-8 border-red-600 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Guion Personalizado Móvil</div>
                <div className="leading-relaxed whitespace-pre-line opacity-90">
                  {guionMovilText}
                  <br/><br/>
                  <div className="text-slate-500 mt-4 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Guion Contrato Grabado</div>
                  {habeasGrabadoText}
                  <br/><br/>
                  <div className="text-slate-500 mt-4 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Contrato: Entrega de SIM</div>
                  {contratoEntregaSim}
                  <br/><br/>
                  <div className="text-slate-500 mt-4 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Contrato: SIM Adquirida</div>
                  {contratoSimAdquirida}
                </div>
                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={() => copyToClipboard(guionMovilText + '\n\n' + habeasGrabadoText + '\n\n' + contratoEntregaSim)}
                    className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-700"
                  >
                    Copiar (Móvil + Grabado + SIM)
                  </button>
                  <div className="flex-1"></div>
                  <div className="flex items-center gap-3 text-green-500">
                    <Mic className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Leyendo...</span>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setAcceptedLegal(!acceptedLegal)}
                className={`flex items-center gap-6 p-8 rounded-[2rem] border-2 transition-all cursor-pointer ${acceptedLegal ? 'bg-red-50 border-red-500' : 'bg-white border-slate-200'}`}
              >
                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${acceptedLegal ? 'bg-red-500 border-red-500' : 'border-slate-200'}`}>
                  {acceptedLegal && <Check size={24} className="text-white" />}
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 uppercase tracking-tight">Legalización Auditada</h4>
                  <p className="text-sm text-slate-500 font-bold">He leído el contrato completo y el cliente ha dado su aceptación final.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: SUMMARY */}
          {currentStep === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="text-center">
                 <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle size={50} />
                 </div>
                 <h2 className="text-4xl font-black tracking-tight text-slate-900">¡VENTA CORONADA! 🏆</h2>
                 <p className="text-slate-500 text-lg font-medium">Sigue así, el bono está más cerca hoy.</p>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl relative">
                <div className="grid grid-cols-2 gap-8 mb-10">
                   <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Titular</div>
                      <div className="text-2xl font-black text-slate-800">{leadData.name || 'ANÓNIMO'}</div>
                   </div>
                   <div className="space-y-1 text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cédula</div>
                      <div className="text-xl font-black text-slate-800">{leadData.id || 'N/A'}</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Contratado</div>
                      <div className="text-xl font-black text-red-600">{selectedProduct.name}</div>
                   </div>
                   <div className="space-y-1 text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiempo de Cierre</div>
                      <div className="text-xl font-black text-slate-800">{formatTime(callTimer)}</div>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                       const text = `FECHA: ${new Date().toLocaleString()}\nLEAD: ${leadData.name}\nID: ${leadData.id}\nCELULAR: ${leadData.phone}\nPLAN: ${selectedProduct.name}\nCFM: $${selectedProduct.price}`;
                       copyToClipboard(text);
                    }}
                    className="flex-1 bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                    <Copy size={18} /> Copiar para CRM
                  </button>
                  <button 
                    onClick={saveSale}
                    className="flex-1 bg-red-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    <Download size={18} /> Descargar Comprobante
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-4 md:p-6 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="flex items-center gap-2 py-4 px-6 font-black text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-all uppercase text-[10px] tracking-widest"
          >
            <ChevronLeft size={18} /> Atrás
          </button>

          <div className="flex-1 flex justify-center gap-1.5 md:gap-3 px-4">
            {sections.map((s, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-500 overflow-hidden ${i === currentStep ? 'flex-[2] bg-red-600' : i < currentStep ? 'flex-[1] bg-red-200' : 'flex-[1] bg-slate-100'}`}
                title={s.title}
              />
            ))}
          </div>

          <button 
            disabled={currentStep === 6 || (currentStep === 4 && !acceptedHabeas) || (currentStep === 5 && !acceptedLegal)}
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.15em] hover:bg-red-700 shadow-lg transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            {currentStep === 5 ? 'Finalizar Venta' : 'Siguiente Paso'} <ChevronRight size={18} />
          </button>
        </div>
      </footer>

      {/* OBJECTION DRAWER */}
      <AnimatePresence>
        {showObjections && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowObjections(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[50]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-[51] flex flex-col rounded-l-[3rem]">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">Banco de Objeciones 🛡️</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Nivel: Senior Closer Colombia</p>
                </div>
                <button onClick={() => setShowObjections(false)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={24} /></button>
              </div>

              <div className="p-6">
                <div className="relative group">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Busca el punto de dolor (ej. señal, precio, duda)..."
                    className="w-full pl-12 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-[2rem] outline-none font-bold text-slate-800 transition-all shadow-inner"
                    value={objectionSearch}
                    onChange={(e) => setObjectionSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
                <div className="grid gap-6">
                  {OBJECTIONS.filter(o => o.title.toLowerCase().includes(objectionSearch.toLowerCase())).map(obj => (
                    <div key={obj.id} className="bg-slate-50 rounded-[2rem] p-8 border-2 border-transparent hover:border-red-100 transition-all group">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="p-3 bg-white shadow-sm rounded-2xl text-red-600 group-hover:scale-110 transition-transform">
                            {obj.icon === 'Timer' && <Timer size={24} />}
                            {obj.icon === 'RefreshCcw' && <RefreshCcw size={24} />}
                            {obj.icon === 'DollarSign' && <DollarSign size={24} />}
                            {obj.icon === 'Clipboard' && <Clipboard size={24} />}
                            {obj.icon === 'ArrowUpCircle' && <ArrowUpCircle size={24} />}
                         </div>
                         <h4 className="font-black text-lg text-slate-900">{obj.title}</h4>
                      </div>
                      <div className="space-y-6">
                         <div className="p-6 bg-white border border-slate-100 rounded-3xl relative">
                            <div className="absolute -top-3 left-6 bg-red-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">As bajo la manga</div>
                            <p className="text-slate-800 font-bold italic leading-relaxed">"{personalizeScript(obj.arguments[leadData.occupation as keyof typeof obj.arguments] || obj.arguments['General'])}"</p>
                            <button 
                              onClick={() => copyToClipboard(personalizeScript(obj.arguments[leadData.occupation as keyof typeof obj.arguments] || obj.arguments['General']))}
                              className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                               <Copy size={14} /> Copiar Argumento Personalizado
                            </button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CALL MODE OVERLAY */}
      <AnimatePresence>
        {isCallMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950 z-[100] flex flex-col font-sans">
            <div className="p-8 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-8">
                 <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                    <span className="text-white font-black text-2xl tracking-tighter">CALL ACTIVE</span>
                 </div>
                 <div className="text-slate-500 font-mono text-3xl font-bold tracking-widest">{formatTime(callTimer)}</div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] bg-white/5 px-6 py-3 rounded-2xl border border-white/10">PASO {currentStep + 1}: {sections[currentStep].title}</div>
                 <button onClick={() => setIsCallMode(false)} className="bg-white/10 hover:bg-red-600 text-white p-4 rounded-full transition-all group shadow-2xl"><X size={28} className="group-hover:rotate-90 transition-transform" /></button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
               {/* Script Area */}
               <div className="flex-1 p-16 overflow-y-auto custom-scrollbar-dark select-none">
                  <div className="max-w-4xl mx-auto space-y-16">
                     <div className="space-y-4">
                        <div className="text-red-600 text-xs font-black uppercase tracking-[0.4em] mb-4">Lo que debes decir ahora</div>
                        {currentStep === 0 && <h2 className="text-white text-6xl font-black leading-[1.1] tracking-tight">{personalizeScript(OPENING_SCRIPTS.find(s => s.id === 'fomo')?.text || '')}</h2>}
                        {currentStep === 1 && <h2 className="text-white text-6xl font-black leading-[1.1] tracking-tight">"Cuénteme, Don/Doña {leadData.name || 'vecino(a)'}, ¿qué es lo que más le saca la piedra de su operador actual? ¿El precio o que se le va la señal?"</h2>}
                        {currentStep === 2 && <h2 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight text-balance">"Mire, Don/Doña {leadData.name || 'vecino(a)'}, yo le tengo la fija. Su mejor opción es el plan de {selectedProduct.data}. {personalizeScript(selectedProduct.argument)}. Queda pagando solo ${selectedProduct.price.toLocaleString()} IVA incluído. Es lo más inteligente hoy mismo."</h2>}
                        {currentStep === 3 && (
                          <h2 className="text-white text-4xl font-black leading-tight tracking-tight italic">
                            "{personalizeScript((OBJECTIONS[0].arguments as any)[leadData.occupation] || OBJECTIONS[0].arguments['General'])}"
                          </h2>
                        )}
                        {currentStep === 4 && (
                          <div className="space-y-6">
                             <div className="text-white/50 text-xs font-black uppercase tracking-[0.4em] mb-4">Guion Habeas Digital</div>
                             <h2 className="text-white text-3xl font-extrabold leading-relaxed opacity-90 border-l-8 border-red-600 pl-10 whitespace-pre-line bg-white/5 p-8 rounded-[3rem] italic">{habeasDigitalText}</h2>
                          </div>
                        )}
                        {currentStep === 5 && (
                          <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                             <div>
                               <div className="text-white/50 text-xs font-black uppercase tracking-[0.4em] mb-4">Guion Móvil (Confirmación Rápida)</div>
                               <h2 className="text-white text-3xl font-mono leading-[1.6] opacity-90 border-l-8 border-blue-500 pl-10 whitespace-pre-line bg-blue-900/10 p-8 rounded-[3rem] shadow-2xl">{guionMovilText}</h2>
                             </div>
                             <div>
                               <div className="text-white/50 text-xs font-black uppercase tracking-[0.4em] mb-4">Habeas Contrato Grabado</div>
                               <h2 className="text-white text-2xl font-extrabold leading-relaxed opacity-90 border-l-8 border-slate-600 pl-10 whitespace-pre-line bg-white/5 p-8 rounded-[3rem] italic">{habeasGrabadoText}</h2>
                             </div>
                             <div>
                               <div className="text-white/50 text-xs font-black uppercase tracking-[0.4em] mb-4">OPCIÓN 1: Contrato Entrega de SIM</div>
                               <div className="bg-white text-slate-900 font-sans text-sm leading-relaxed p-10 rounded-[3rem] whitespace-pre-line shadow-2xl border-t-8 border-red-600">
                                 {contratoEntregaSim}
                               </div>
                             </div>
                             <div>
                               <div className="text-white/50 text-xs font-black uppercase tracking-[0.4em] mb-4">OPCIÓN 2: Contrato SIM Adquirida</div>
                               <div className="bg-white text-slate-900 font-sans text-sm leading-relaxed p-10 rounded-[3rem] whitespace-pre-line shadow-2xl border-t-8 border-slate-800">
                                 {contratoSimAdquirida}
                               </div>
                             </div>
                          </div>
                        )}
                        {currentStep === 6 && <h2 className="text-white text-6xl font-black leading-[1.1] tracking-tight text-center">"¡Listo Don/Doña {leadData.name || 'vecino(a)'}! Bienvenido a la familia Claro. En 24 horas ya es nuestro. ¿Le puedo ayudar en algo más?"</h2>}
                     </div>
                  </div>
               </div>

               {/* Quick Buttons Sidebar */}
               <div className="w-[450px] bg-white/5 border-l border-white/10 p-10 overflow-y-auto custom-scrollbar-dark flex flex-col gap-10">
                  <div className="space-y-6">
                    <div className="text-red-600 text-xs font-black uppercase tracking-[0.4em]">Argumentos Persona</div>
                    <div className="p-8 bg-red-600 rounded-[2.5rem] text-white shadow-2xl">
                       <p className="text-xl font-bold leading-relaxed">"Como {leadData.occupation}, este servicio le resuelve la vida porque {personalizeScript(selectedProduct?.argument || 'le ofrece la mejor calidad del país.')}"</p>
                    </div>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">Rebatir Rápido</div>
                    <div className="grid gap-4">
                       {OBJECTIONS.map(obj => (
                         <div key={obj.id} onClick={() => copyToClipboard(personalizeScript(obj.arguments[leadData.occupation as keyof typeof obj.arguments] || obj.arguments['General']))} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group">
                            <h5 className="text-white font-black text-sm mb-3 group-hover:text-red-500">{obj.title}</h5>
                            <p className="text-slate-400 text-[10px] leading-relaxed italic line-clamp-3">"{personalizeScript(obj.arguments[leadData.occupation as keyof typeof obj.arguments] || obj.arguments['General'])}"</p>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="bg-red-600 p-2 text-center text-white text-[10px] font-black uppercase tracking-[1em] select-none">
              Control Discipline · Empathy · Velocity · Closure
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        
        .custom-scrollbar-dark::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #334155; border-radius: 20px; }

        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@700&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
}
