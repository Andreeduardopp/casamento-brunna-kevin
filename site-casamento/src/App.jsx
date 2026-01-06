import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Heart, MapPin, Calendar, Clock, Camera, MessageCircle, Send, Check, Loader2, Plus , Trophy, PartyPopper, Star, Gift, Copy } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';
import heroBg from '/assets/B&K_ (117).jpg';

// --- CONFIGURATION ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- PALETTE CONSTANTS ---
const COLORS = {
  bg: '#f7f7f7',
  text: '#595849',
  sage: '#cfd9c6',
  olive: '#8da182'
};

// --- COMPONENTS ---

const Button = ({ children, onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-8 py-3 rounded-full font-serif uppercase tracking-widest text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${className}`}
    style={{
        backgroundColor: COLORS.olive,
        color: '#ffffff',  
        border: 'none',       
      }}
  >
    {children}
  </button>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12 animate-fade-in-up">
    <h3 className="font-serif italic text-xl mb-2" style={{ color: COLORS.olive }}>{subtitle}</h3>
    <h2 className="text-4xl md:text-5xl font-display" style={{ color: COLORS.text }}>{title}</h2>
    <div className="w-24 h-1 mx-auto mt-6 rounded-full opacity-60" style={{ backgroundColor: COLORS.olive }}></div>
  </div>
);

// --- SECTIONS ---

const Hero = () => (
  <section id="inicio" className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src={heroBg} 
        alt="Casamento Romântico" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#595849]/40 mix-blend-multiply"></div>
    </div>

    <div className="relative z-10 text-center text-[#f7f7f7] px-4 animate-fade-in">
      <p className="font-serif text-xl md:text-2xl tracking-widest mb-4">Vamos nos casar</p>
      <h1 className="font-script text-7xl md:text-9xl mb-6 drop-shadow-lg">
        Brunna & Kevin
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-serif text-lg md:text-xl tracking-wide">
        <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> 07 de março de 2026</span>
        <span className="hidden md:block w-2 h-2 bg-[#f7f7f7] rounded-full"></span>
        <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Pato Branco, PR</span>
      </div>
      <div className="mt-12">
        <a 
          href="#rsvp" 
          className="inline-block backdrop-blur-sm border px-10 py-4 rounded-full font-serif transition-all duration-300 uppercase tracking-widest text-sm"
          style={{
            color: '#f7f7f7',
            borderColor: '#f7f7f7',
            backgroundColor: 'rgba(247, 247, 247, 0.2)' // Default state
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f7f7f7';
            e.currentTarget.style.color = '#595849'; // Dark Earth on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(247, 247, 247, 0.2)';
            e.currentTarget.style.color = '#f7f7f7'; // Back to Light Grey
          }}
        >
          Confirmar Presença
        </a>
      </div>
    </div>
  </section>
);

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setSubmitted(true);
          setLoading(false);
        },
        (error) => {
          console.error('FAILED...', error.text);
          setError(true);
          setLoading(false);
        },
      );
  };

  return (
    <section id="rsvp" className="py-20" style={{ backgroundColor: COLORS.bg }}>
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionTitle title="Lista de Convidados" subtitle="Confirme sua presença" />

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#cfd9c6]">
          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: COLORS.sage, color: COLORS.text }}>
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif mb-2" style={{ color: COLORS.text }}>Obrigado!</h3>
              <p className="text-gray-600">Sua presença foi confirmada com sucesso. Verifique seu e-mail!</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 underline underline-offset-4" style={{ color: COLORS.olive }}>Enviar outra confirmação</button>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 font-sans tracking-wide" style={{ color: COLORS.text }}>NOME COMPLETO</label>
                  <input name="user_name" required type="text" className="w-full bg-[#f7f7f7] border-b-2 border-gray-200 focus:border-[#8da182] outline-none py-3 px-2 transition-colors" placeholder="Seu nome aqui" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 font-sans tracking-wide" style={{ color: COLORS.text }}>E-MAIL</label>
                  <input name="user_email" required type="email" className="w-full bg-[#f7f7f7] border-b-2 border-gray-200 focus:border-[#8da182] outline-none py-3 px-2 transition-colors" placeholder="seu@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 font-sans tracking-wide" style={{ color: COLORS.text }}>ACOMPANHANTES</label>
                <select name="guests_count" className="w-full bg-[#f7f7f7] border-b-2 border-gray-200 focus:border-[#8da182] outline-none py-3 px-2 transition-colors">
                  <option value="Apenas eu">Apenas eu</option>
                  <option value="Eu + 1 pessoa">Eu + 1 pessoa</option>
                  <option value="Eu + 2 pessoas">Eu + 2 pessoas</option>
                  <option value="Eu + 3 pessoas">Eu + 3 pessoas</option>
                </select>
              </div>

              <div className="flex items-center gap-3 py-4">
                <input name="attending" value="sim" type="checkbox" id="confirm" className="w-5 h-5 accent-[#8da182]" required />
                <label htmlFor="confirm" style={{ color: COLORS.text }}>Confirmo que estarei presente neste dia especial.</label>
              </div>

              {error && (
                <div className="text-red-600 text-center text-sm bg-red-50 p-2 rounded">
                  Ocorreu um erro ao enviar. Por favor, tente novamente.
                </div>
              )}

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-full font-serif uppercase tracking-widest text-sm hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
                  style={{
                    backgroundColor: COLORS.olive, 
                    color: '#ffffff',      
                    border: 'none',    
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    "Enviar Confirmação"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contato" className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <SectionTitle title="Entre em Contato" subtitle="Dúvidas ou sugestões?" />
      
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mt-12">
        <a href="#" className="group flex flex-col items-center p-6 rounded-xl hover:bg-[#f7f7f7] transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: COLORS.sage, color: COLORS.text }}>
            <MessageCircle className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-xl mb-2" style={{ color: COLORS.text }}>WhatsApp</h4>
          <p className="text-gray-500">Fale com a cerimonialista</p>
        </a>
        
        <a href="#" className="group flex flex-col items-center p-6 rounded-xl hover:bg-[#f7f7f7] transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: COLORS.sage, color: COLORS.text }}>
            <Send className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-xl mb-2" style={{ color: COLORS.text }}>E-mail</h4>
          <p className="text-gray-500">casamentobrunnakevin@gmail.com</p>
        </a>
      </div>
    </div>
  </section>
);

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error loading messages:", error.message);
    } finally {
      setFetching(false);
    }
  };

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !newName.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('guestbook').insert([{ name: newName, message: newMessage }]);
      if (error) throw error;
      setNewMessage("");
      setNewName("");
      fetchMessages(); 
    } catch (error) {
      alert("Erro ao salvar mensagem.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="mensagens" className="py-20" style={{ backgroundColor: '#cfd9c633' }}> {/* Sage with opacity */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h3 className="font-serif italic text-xl mb-2" style={{ color: COLORS.olive }}>Deixe seu carinho</h3>
          <h2 className="text-4xl md:text-5xl font-display" style={{ color: COLORS.text }}>Livro de Visitas</h2>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full opacity-60" style={{ backgroundColor: COLORS.olive }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formulário */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-fit border border-[#f7f7f7]">
            <h4 className="font-serif text-2xl mb-6 flex items-center gap-2" style={{ color: COLORS.text }}>
              <Heart className="fill-current" style={{ color: COLORS.olive }} /> Escreva algo
            </h4>
            <form onSubmit={handleAddMessage} className="space-y-4">
              <input 
                type="text" 
                placeholder="Seu nome" 
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-1 transition-all"
                style={{ backgroundColor: COLORS.bg, borderColor: '#e5e7eb', outlineColor: COLORS.olive }}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                maxLength={50}
              />
              <textarea 
                rows="4" 
                placeholder="Sua mensagem para os noivos..." 
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-1 transition-all resize-none"
                style={{ backgroundColor: COLORS.bg, borderColor: '#e5e7eb', outlineColor: COLORS.olive }}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                maxLength={280}
              ></textarea>
              
              <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Publicar Mensagem"}
              </Button>
            </form>
          </div>

          {/* Lista de Mensagens */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {fetching ? (
              <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                 <Loader2 className="animate-spin mb-2" />
                 <p>Carregando mensagens...</p>
              </div>
            ) : messages.length === 0 ? (
               <div className="text-center text-gray-400 py-10 italic">
                 Seja o primeiro a deixar uma mensagem!
               </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-white p-6 rounded-xl border border-[#cfd9c6] shadow-sm relative animate-fade-in-up">
                  <div className="absolute top-4 right-4 opacity-30" style={{ color: COLORS.olive }}>
                    <MessageCircle size={30} />
                  </div>
                  <p className="text-gray-600 italic mb-4 font-serif text-lg">"{msg.message}"</p>
                  <div className="flex justify-between items-end">
                    <p className="font-bold text-sm tracking-wide uppercase" style={{ color: COLORS.text }}>— {msg.name}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const imagesGlob = import.meta.glob('/assets/album/*.{jpg,jpeg,png,JPG}', { 
    eager: true, 
    import: 'default' 
  });
  
  const allPhotos = Object.values(imagesGlob);
  const [visibleCount, setVisibleCount] = useState(6);
  const handleLoadMore = () => { setVisibleCount((prev) => prev + 6); };
  const currentPhotos = allPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < allPhotos.length;

  return (
    <section id="album" className="py-20" style={{ backgroundColor: COLORS.bg }}>
      <div className="container mx-auto px-4">
        <SectionTitle title="Nossos Momentos" subtitle="Um pouco da nossa história" />
        
        {allPhotos.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>Nenhuma foto encontrada na pasta assets/album.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {currentPhotos.map((src, index) => (
                <div key={index} className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md cursor-pointer animate-fade-in-up">
                  <img 
                    src={src} 
                    alt={`Foto ${index + 1}`}
                    loading='lazy' 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#595849]/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Heart className="text-white fill-white animate-bounce" size={32} />
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  className="group flex items-center gap-2 mx-auto bg-white border border-[#cfd9c6] text-[#595849] px-8 py-3 rounded-full font-serif text-sm uppercase tracking-widest hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                  style={{
                    ':hover': { backgroundColor: COLORS.olive, borderColor: COLORS.olive },
                      border: 'none', 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLORS.olive; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = COLORS.text; }}
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  Ver Mais Fotos
                </button>
              </div>
            )}
            
            <div className="text-center mt-4 text-xs text-gray-400 font-sans tracking-wide">
              Mostrando {currentPhotos.length} de {allPhotos.length} momentos
            </div>
          </>
        )}
      </div>
    </section>
  );
};
const GiftList = () => {
  const PIX_KEY = "0a7d7c3f-417e-4912-94ae-77cf9b4c9611"; 
  
  // 1. ESTADO PARA O MODAL
  const [selectedGift, setSelectedGift] = useState(null);

  // 2. IMPORTAR TODAS AS IMAGENS DA PASTA QR_CODE
  const qrCodeImages = import.meta.glob('/assets/qr_code/*.png', { 
    eager: true, 
    import: 'default' 
  });

  // Função para limpar o preço e transformar em nome de arquivo (ex: "R$ 50,00" -> "50")
  const getQrImageSrc = (price) => {
    // Remove "R$ ", remove pontos de milhar, remove ",00" e espaços
    const cleanValue = price.replace('R$', '').replace(',00', '').replace('.', '').trim();
    
    // Procura no objeto de imagens importadas a chave que termina com "/50.png"
    const imagePath = Object.keys(qrCodeImages).find(path => path.endsWith(`/${cleanValue}.png`));
    
    return imagePath ? qrCodeImages[imagePath] : null;
  };

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    alert("Chave PIX copiada! Obrigado por contribuir com nossa sanidade mental (e financeira) ✨");
  };

  const gifts = [
    // --- ITENS ATUALIZADOS ---
    {
      icon: "🥘",
      title: "1 Mês de Almoço em Casa",
      desc: "Patrocine a feira do mês para garantir nossa marmita fit.",
      price: "R$ 250,00"
    },
    {
      icon: "🥕",
      title: "Bolo de Cenoura Semanal",
      desc: "Item de sobrevivência básica. Com bastante cobertura de chocolate, por favor.",
      price: "R$ 100,00"
    },
    {
      icon: "📖",
      title: "Livro: Sobrevivendo ao 1º Mês",
      desc: "Manual fictício com capítulos importantes sobre toalha molhada na cama.",
      price: "R$ 75,00"
    },
    {
      icon: "🏳️",
      title: "Almofada 'Zona de Paz'",
      desc: "Item de segurança. Sentou nela, qualquer DR está estritamente proibida.",
      price: "R$ 50,00"
    },
    {
      icon: "🍽️",
      title: "Jogo Americano 'Meu Espaço'",
      desc: "Para delimitar território na mesa e impedir o roubo de batatas fritas.",
      price: "R$ 125,00"
    },
    {
      icon: "⛽",
      title: "Combustível da Lua de Mel",
      desc: "Para garantir que a gente chegue no destino (e volte também).",
      price: "R$ 350,00"
    },

    // --- NOVAS IDEIAS ---
    {
      icon: "💐",
      title: "Seguro Anti-Buquê",
      desc: "Taxa para a noiva NÃO jogar o buquê na direção da sua namorada (evite pressões).",
      price: "R$ 150,00"
    },
    {
      icon: "🍬",
      title: "Passe VIP dos Docinhos",
      desc: "Autorização especial para roubar docinhos antes da mesa ser liberada oficialmente.",
      price: "R$ 500,00"
    },
    {
      icon: "💇‍♂️",
      title: "Cabelo do Noivo (Semestral)",
      desc: "Garanta que o Kevin mantenha o corte em dia pelos próximos 6 meses.",
      price: "R$ 300,00"
    },
    {
      icon: "🏃",
      title: "Fura-Fila do Buffet",
      desc: "Prioridade para se servir logo após os noivos (e antes dos tios famintos).",
      price: "R$ 150,00"
    },
    {
      icon: "🧣",
      title: "Cobertor da Razão",
      desc: "Para a Brunna estar sempre coberta de razão, quentinha e sem discussões.",
      price: "R$ 200,00"
    },
    {
      icon: "✨",
      title: "Luz Divina na Lua de Mel",
      desc: "Deus te iluminou e você resolveu dar aquele upgrade na nossa viagem.",
      price: "R$ 550,00"
    },
    {
      icon: "👶",
      title: "Aluguel de Bebê (Treino)",
      desc: "Apenas para test drive de fim de semana. Devolvemos na segunda-feira.",
      price: "R$ 250,00"
    },
    {
      icon: "🍻",
      title: "Patrocínio da Despedida",
      desc: "Ajude a gente a se despedir da solteirice com dignidade (e bons drinks).",
      price: "R$ 450,00"
    },
    {
      icon: "👵",
      title: "Aposentadoria dos Noivos",
      desc: "Pensando longe: ajude os noivos a garantirem o bingo da terceira idade.",
      price: "R$ 1.500,00"
    }
  ];

  return (
    <section id="presentes" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce" style={{ backgroundColor: COLORS.sage, color: COLORS.text }}>
            <Gift size={32} />
          </div>
          <SectionTitle title="Lista de Presentes" subtitle="Brincadeiras à parte..." />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Como já temos nossa casinha montada (e muita bagunça acumulada), optamos por uma lista virtual divertida. 
            Escolha um item abaixo para rir com a gente ou contribua com qualquer valor para nossa Lua de Mel!
          </p>
        </div>

        {/* Grid de Presentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {gifts.map((item, index) => (
            <div key={index} className="border border-[#cfd9c6] rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col" style={{ backgroundColor: COLORS.bg }}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: COLORS.text }}>{item.title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{item.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                <span className="font-bold text-lg" style={{ color: COLORS.olive }}>{item.price}</span>
                <button 
                  onClick={() => setSelectedGift(item)} // ABRE O MODAL
                  // Adicionado focus:outline-none e lógica de hover corrigida
                  className="bg-white border text-sm font-bold hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg focus:outline-none"
                  style={{ borderColor: COLORS.olive, color: COLORS.olive }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.backgroundColor = COLORS.olive; 
                    e.currentTarget.style.color = 'white'; 
                    e.currentTarget.style.borderColor = COLORS.olive;
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.backgroundColor = 'white'; 
                    e.currentTarget.style.color = COLORS.olive;
                    e.currentTarget.style.borderColor = COLORS.olive;
                  }}
                >
                  Presentear <Gift size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Área do PIX Central (Rodapé da seção) */}
        <div className="rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto border-2 border-dashed" style={{ backgroundColor: '#cfd9c633', borderColor: COLORS.sage }}>
          <h3 className="font-serif text-2xl mb-4" style={{ color: COLORS.text }}>Prefere fazer um PIX direto?</h3>
          <p className="text-gray-600 mb-8">
            Nossa chave PIX é nosso e-mail. Todo valor será usado para construirmos nosso futuro.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white px-6 py-4 rounded-lg border border-[#cfd9c6] font-mono text-gray-600 w-full md:w-auto overflow-hidden text-ellipsis">
              {PIX_KEY}
            </div>
            <Button onClick={copyPix} className="w-full md:w-auto flex items-center justify-center gap-2">
              <Copy size={18} /> Copiar Chave
            </Button>
          </div>
        </div>
      </div>

      {/* --- MODAL DO QR CODE --- */}
      {selectedGift && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedGift(null)}></div>
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden animate-fade-in-up p-8 text-center border-4" style={{ borderColor: COLORS.sage }}>
            <button 
              onClick={() => setSelectedGift(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 focus:outline-none"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <span className="text-5xl">{selectedGift.icon}</span>
              <h3 className="font-serif text-2xl mt-4 font-bold" style={{ color: COLORS.text }}>{selectedGift.title}</h3>
              <p className="text-lg font-bold mt-2" style={{ color: COLORS.olive }}>{selectedGift.price}</p>
            </div>

            <div className="bg-[#f7f7f7] p-4 rounded-xl mb-6 inline-block border border-[#cfd9c6]">
              {getQrImageSrc(selectedGift.price) ? (
                <img 
                  src={getQrImageSrc(selectedGift.price)} 
                  alt={`QR Code ${selectedGift.price}`} 
                  className="w-48 h-48 object-contain mix-blend-multiply"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-gray-400 text-sm">
                  QR Code não encontrado para {selectedGift.price}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-6 px-4">
              Escaneie o QR Code acima com o app do seu banco ou copie a chave PIX abaixo.
            </p>

            <Button onClick={copyPix} className="w-full flex justify-center items-center gap-2">
              <Copy size={18} /> Copiar Chave PIX
            </Button>
          </div>
        </div>
      )}

    </section>
  );
};

const Location = () => (
  <section id="endereco" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <SectionTitle title="O Grande Dia" subtitle="Cerimônia e Recepção" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 space-y-8">
           <div className="flex items-start gap-6">
             <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: COLORS.sage, color: COLORS.text }}>
               <Clock className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-serif text-2xl mb-2" style={{ color: COLORS.text }}>Horário</h3>
               <p className="text-gray-600">A recepção terá início pontualmente às 18:00.</p>
               <p className="text-gray-600">Recepção a seguir no mesmo local.</p>
             </div>
           </div>

           <div className="flex items-start gap-6">
             <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: COLORS.sage, color: COLORS.text }}>
               <MapPin className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-serif text-2xl mb-2" style={{ color: COLORS.text }}>Local</h3>
               <p className="text-gray-600 font-medium">AFFISP - Associação dos Funcionários Fiscais</p>
               <p className="text-gray-500">R. Sen. Teotônio Viléla, 610, 85509-270</p>
               <p className="text-gray-500">Pato Branco - PR</p>
             </div>
           </div>

           <Button onClick={() => window.open('https://www.google.com/maps/place/AFFISP+-+Associa%C3%A7%C3%A3o+dos+Funcion%C3%A1rios+Fiscais+do+Sudoeste+do+Paran%C3%A1/@-26.2486824,-52.7015264,17z/data=!3m1!4b1!4m6!3m5!1s0x94e5534a677f7387:0x42b8e610e60279ee!8m2!3d-26.2486825!4d-52.6966501!16s%2Fg%2F11frkcx2f2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D', '_blank')}>
              Ver Rota no GPS
           </Button>
        </div>

        <div className="order-1 lg:order-2 h-[400px] w-full bg-[#f7f7f7] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500" style={{ backgroundColor: '#cfd9c6' }}>
            <iframe
              className="w-full h-full border-0"
              title="Mapa do Local"
              src="https://maps.google.com/maps?q=AFFISP+Pato+Branco+R.+Sen.+Teotônio+Viléla,610&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="text-gray-300 py-12 text-center" style={{ backgroundColor: COLORS.text }}>
    <div className="container mx-auto px-4">
      <h2 className="font-script text-4xl mb-6" style={{ color: COLORS.sage }}>Brunna & Kevin</h2>
      <div className="flex justify-center gap-6 mb-8">
        {/* <a href="#" className="hover:text-white transition-colors"><Camera size={20} /></a>
        <a href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></a> */}
      </div>
      <p className="font-serif text-sm tracking-widest opacity-60">
        © 2026 FEITO COM AMOR. TODOS OS DIREITOS RESERVADOS.
      </p>
    </div>
  </footer>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Bem-vindos", href: "#inicio" },
    { name: "Presença", href: "#rsvp" },
    { name: "Mensagens", href: "#mensagens" },
    { name: "Álbum", href: "#album" },
    { name: "Presentes", href: "#presentes" },
    { name: "Local", href: "#endereco" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <div className="font-sans text-[#595849] bg-white selection:bg-[#cfd9c6] selection:text-[#595849] scroll-smooth">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Acme&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        html { scroll-behavior: smooth; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-display { font-family: 'Playfair Display', serif; }
        
        /* Updated font-sans to use Acme */
        .font-sans { font-family: 'Acme', sans-serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f7f7f7; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cfd9c6; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #8da182; }
      `}</style>

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#f7f7f7]/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a
            href="#inicio"
            className="font-script text-3xl md:text-4xl transition-colors"
            style={{
              color: scrolled ? '#8da182' : '#ffffff'
            }}
          >
            B & K
          </a>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '0.875rem',           
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',         
                  fontWeight: '700',
                  color: scrolled ? '#8da182' : 'rgba(255, 255, 255, 0.9)', 
                  transition: 'color 300ms ease',
                }}
                className={scrolled ? 'hover:text-[#8da182]' : 'hover:text-white'}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button onClick={toggleMenu} className="md:hidden z-50 p-2">
            {isMenuOpen ? (
              <X style={{ color: COLORS.text }} />
            ) : (
              <Menu style={{ color: scrolled ? COLORS.text : '#ffffff' }} />
            )}
          </button>
        </div>

        <div 
          className={`fixed inset-0 bg-[#f7f7f7] z-40 h-screen flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-2xl text-[#595849] hover:text-[#8da182] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </header>

      <main>
        <Hero />
        <RSVP />
        <Guestbook />
        <Gallery />
        <GiftList />
        <Location />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}