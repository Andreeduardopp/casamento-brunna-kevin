import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Heart, MapPin, Calendar, Clock, Camera, MessageCircle, Send, Check, Loader2, Plus , Trophy, PartyPopper, Star, Gift, Copy } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';
import heroBg from '/assets/B&K_ (117).jpg';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Button = ({ children, onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-rose-400 text-amber-600 px-8 py-3 rounded-full font-serif uppercase tracking-widest text-sm hover:bg-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${className}`}
    style={{
        backgroundColor: '#881337', 
        color: '#ffffff',         
      }}
  >
    {children}
  </button>
);

// Título de Seção
const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12 animate-fade-in-up">
    <h3 className="text-amber-600 font-serif italic text-xl mb-2">{subtitle}</h3>
    <h2 className="text-4xl md:text-5xl font-display text-gray-800">{title}</h2>
    <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 rounded-full opacity-60"></div>
  </div>
);

// --- SEÇÕES DO SITE ---

const Hero = () => (
  <section id="inicio" className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
    {/* Imagem de Fundo com Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src={heroBg} 
        alt="Casamento Romântico" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
    </div>

    {/* Conteúdo */}
    <div className="relative z-10 text-center text-white px-4 animate-fade-in">
      <p className="font-serif text-xl md:text-2xl tracking-widest mb-4">Vamos nos casar</p>
      <h1 className="font-script text-7xl md:text-9xl mb-6 text-gray-50 drop-shadow-lg">
        Brunna & Kevin
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-serif text-lg md:text-xl tracking-wide">
        <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> 07 de março de 2026</span>
        <span className="hidden md:block w-2 h-2 bg-white rounded-full"></span>
        <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Pato Branco, PR</span>
      </div>
      <div className="mt-12">
        <a href="#rsvp" className="inline-block bg-white/60 backdrop-blur-sm border border-white text-white px-10 py-4 rounded-full font-serif hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-widest text-sm">
          Confirmar Presença
        </a>
      </div>
    </div>
  </section>
);

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(false);
  const form = useRef(); // Reference to the form

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
    <section id="rsvp" className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionTitle title="Lista de Convidados" subtitle="Confirme sua presença" />

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-stone-100">
          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-2">Obrigado!</h3>
              <p className="text-stone-600">Sua presença foi confirmada com sucesso. Verifique seu e-mail!</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-rose-900 underline underline-offset-4 hover:text-rose-700">Enviar outra confirmação</button>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone-600 text-sm font-bold mb-2 font-sans tracking-wide">NOME COMPLETO</label>
                  <input name="user_name" required type="text" className="w-full bg-stone-50 border-b-2 border-stone-200 focus:border-rose-900 outline-none py-3 px-2 transition-colors" placeholder="Seu nome aqui" />
                </div>
                <div>
                  <label className="block text-stone-600 text-sm font-bold mb-2 font-sans tracking-wide">E-MAIL</label>
                  <input name="user_email" required type="email" className="w-full bg-stone-50 border-b-2 border-stone-200 focus:border-rose-900 outline-none py-3 px-2 transition-colors" placeholder="seu@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 text-sm font-bold mb-2 font-sans tracking-wide">ACOMPANHANTES</label>
                <select name="guests_count" className="w-full bg-stone-50 border-b-2 border-stone-200 focus:border-rose-900 outline-none py-3 px-2 transition-colors">
                  <option value="Apenas eu">Apenas eu</option>
                  <option value="Eu + 1 pessoa">Eu + 1 pessoa</option>
                  <option value="Eu + 2 pessoas">Eu + 2 pessoas</option>
                  <option value="Eu + 3 pessoas">Eu + 3 pessoas</option>
                </select>
              </div>

              <div className="flex items-center gap-3 py-4">
                <input name="attending" value="sim" type="checkbox" id="confirm" className="w-5 h-5 accent-rose-900" required />
                <label htmlFor="confirm" className="text-stone-600">Confirmo que estarei presente neste dia especial.</label>
              </div>

              {error && (
                <div className="text-red-600 text-center text-sm bg-red-50 p-2 rounded">
                  Ocorreu um erro ao enviar. Por favor, tente novamente.
                </div>
              )}

              {/* Replace the <Button> tag inside the form with this: */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-rose-900 text-amber-600 font-serif italic px-8 py-3 rounded-full font-serif uppercase tracking-widest text-sm hover:bg-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
                    style={{
                    backgroundColor: '#881337', 
                    color: '#ffffff',         
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
        <a href="#" className="group flex flex-col items-center p-6 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-900 mb-4 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-xl mb-2">WhatsApp</h4>
          <p className="text-stone-500">Fale com a cerimonialista</p>
        </a>
        
        <a href="#" className="group flex flex-col items-center p-6 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4 group-hover:scale-110 transition-transform">
            <Send className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-xl mb-2">E-mail</h4>
          <p className="text-stone-500">casamentobrunnakevin@gmail.com</p>
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

  // 1. Load messages when the page opens
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Select all messages, ordered by newest first
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

  // 2. Save a new message
  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !newName.trim()) return;
    
    setLoading(true);

    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([
          { name: newName, message: newMessage }
        ]);

      if (error) throw error;

      // Clear form and reload list
      setNewMessage("");
      setNewName("");
      fetchMessages(); 
      
    } catch (error) {
      alert("Erro ao salvar mensagem. Tente novamente!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="mensagens" className="py-20 bg-rose-50/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Reusing your SectionTitle component */}
        <div className="text-center mb-12">
          <h3 className="text-amber-600 font-serif italic text-xl mb-2">Deixe seu carinho</h3>
          <h2 className="text-4xl md:text-5xl font-display text-stone-800">Livro de Visitas</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 rounded-full opacity-60"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formulário */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
            <h4 className="font-serif text-2xl text-stone-800 mb-6 flex items-center gap-2">
              <Heart className="text-rose-400 fill-rose-400" /> Escreva algo
            </h4>
            <form onSubmit={handleAddMessage} className="space-y-4">
              <input 
                type="text" 
                placeholder="Seu nome" 
                className="w-full border border-stone-200 rounded-lg p-3 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                maxLength={50}
              />
              <textarea 
                rows="4" 
                placeholder="Sua mensagem para os noivos..." 
                className="w-full border border-stone-200 rounded-lg p-3 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 resize-none"
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
              <div className="text-center text-stone-400 py-10 flex flex-col items-center">
                 <Loader2 className="animate-spin mb-2" />
                 <p>Carregando mensagens...</p>
              </div>
            ) : messages.length === 0 ? (
               <div className="text-center text-stone-400 py-10 italic">
                 Seja o primeiro a deixar uma mensagem!
               </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm relative animate-fade-in-up">
                  <div className="absolute top-4 right-4 text-rose-200 opacity-50">
                    <MessageCircle size={30} />
                  </div>
                  <p className="text-stone-600 italic mb-4 font-serif text-lg">"{msg.message}"</p>
                  <div className="flex justify-between items-end">
                    <p className="text-amber-700 font-bold text-sm tracking-wide uppercase">— {msg.name}</p>
                    <span className="text-xs text-stone-400">
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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const currentPhotos = allPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < allPhotos.length;

  return (
    <section id="album" className="py-20 bg-stone-100">
      <div className="container mx-auto px-4">
        <SectionTitle title="Nossos Momentos" subtitle="Um pouco da nossa história" />
        
        {allPhotos.length === 0 ? (
          <div className="text-center text-stone-500 py-10">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Heart className="text-white fill-white animate-bounce" size={32} />
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  className="group flex items-center gap-2 mx-auto bg-white border border-stone-200 text-stone-600 px-8 py-3 rounded-full font-serif text-sm uppercase tracking-widest hover:bg-rose-900 hover:text-white hover:border-rose-900 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  Ver Mais Fotos
                </button>
              </div>
            )}
            
            <div className="text-center mt-4 text-xs text-stone-400 font-sans tracking-wide">
              Mostrando {currentPhotos.length} de {allPhotos.length} momentos
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Game = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    { text: "Quem é mais provável de chorar na cerimônia?", options: ["Brunna", "Kevin"], correct: 1 },
    { text: "Quem é mais bagunceiro em casa?", options: ["Brunna", "Kevin"], correct: 1 },
    { text: "Quem demora mais para se arrumar?", options: ["Brunna", "Kevin"], correct: 0 },
    { text: "Quem é mais viciado em café?", options: ["Brunna", "Kevin"], correct: 0 },
    { text: "Quem se perde mais fácil no GPS?", options: ["Brunna", "Kevin"], correct: 0 },
    { text: "Quem é mais dramático quando fica doente?", options: ["Brunna", "Kevin"], correct: 1 },
    { text: "Quem cozinha melhor?", options: ["Brunna", "Kevin"], correct: 1 },
    { text: "Quem não vive sem um docinho?", options: ["Brunna", "Kevin"], correct: 0 },
  ];

  const QUESTIONS_TO_WIN = 5;

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      const isCorrect = optionIndex === questions[currentQuestion].correct;
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const resetGame = () => {
    setIsOpen(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  const hasWon = score >= QUESTIONS_TO_WIN;

  return (
    <section id="game" className="py-20 bg-amber-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-6 animate-bounce" />
          <SectionTitle title="Quiz do Casal" subtitle="Você nos conhece bem?" />
          
          <p className="text-stone-600 mb-8 text-lg">
            Acerte pelo menos <strong className="text-rose-900">{QUESTIONS_TO_WIN} perguntas</strong> e ganhe um drink especial na festa!
          </p>
          
          <Button onClick={() => setIsOpen(true)} className="animate-pulse">
            Jogar Agora
          </Button>
        </div>
      </div>

      {/* MODAL DO JOGO */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Overlay Escuro */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={resetGame}></div>
          
          {/* Conteúdo do Modal */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
            
            {/* Botão Fechar */}
            <button onClick={resetGame} className="absolute top-4 right-4 text-stone-400 hover:text-rose-500">
              <X size={24} />
            </button>

            {!showResult ? (
              // TELA DE PERGUNTAS
              <div className="p-8 text-center">
                <span className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  PERGUNTA {currentQuestion + 1} de {questions.length}
                </span>
                
                <h3 className="text-2xl font-serif text-stone-800 mb-8 min-h-[80px] flex items-center justify-center">
                  {questions[currentQuestion].text}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={selectedOption !== null}
                      className={`
                        py-6 px-4 rounded-xl text-lg font-bold transition-all transform hover:-translate-y-1
                        ${selectedOption === idx 
                          ? 'bg-stone-800 text-white scale-95' 
                          : 'bg-stone-100 text-stone-700 hover:bg-rose-100 hover:text-rose-900 shadow-md'
                        }
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 text-stone-400 text-sm">
                  Pontuação atual: {score}
                </div>
              </div>
            ) : (
              // TELA DE RESULTADO
              <div className="p-10 text-center">
                {hasWon ? (
                  <>
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <PartyPopper size={40} />
                    </div>
                    <h3 className="text-3xl font-script text-rose-900 mb-2">Parabéns!</h3>
                    <p className="text-stone-600 mb-6">
                      Você acertou <strong>{score}</strong> de {questions.length} perguntas! Tire um print desta tela e mostre no bar para pegar seu drink especial.
                    </p>
                    <div className="bg-amber-100 border border-amber-200 rounded-lg p-4 mb-6">
                      <p className="font-serif text-amber-800 font-bold">VOUCHER: DRINK DOS NOIVOS</p>
                    </div>
                  </>
                ) : (
                  <>
                     <div className="w-20 h-20 bg-stone-100 text-stone-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Star size={40} />
                    </div>
                    <h3 className="text-2xl font-serif text-stone-800 mb-2">Quase lá...</h3>
                    <p className="text-stone-600 mb-6">
                      Você acertou {score} perguntas. Precisava de {QUESTIONS_TO_WIN} para ganhar o drink. Que tal tentar de novo?
                    </p>
                  </>
                )}
                
                <Button onClick={resetGame}>
                  {hasWon ? "Fechar" : "Tentar Novamente"}
                </Button>
              </div>
            )}
            
            {/* Barra de Progresso */}
            {!showResult && (
              <div className="h-2 bg-stone-100 w-full">
                <div 
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const GiftList = () => {
  // Substitua pela sua chave PIX real!
  const PIX_KEY = "000.000.000-00"; 

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    alert("Chave PIX copiada! Obrigado por contribuir com nossa sanidade mental (e financeira) ✨");
  };

  const gifts = [
    { 
      icon: "🥘", 
      title: "1 Mês de Almoço em Casa", 
      desc: "Patrocine a feira do mês para garantir nossa marmita fit.", 
      price: "R$ 150,00" 
    },
    { 
      icon: "🥕", 
      title: "Bolo de Cenoura Semanal", 
      desc: "Item de sobrevivência básica. Com bastante cobertura de chocolate, por favor.", 
      price: "R$ 50,00" 
    },
    { 
      icon: "📖", 
      title: "Livro: Sobrevivendo ao 1º Mês", 
      desc: "Manual fictício com capítulos importantes sobre toalha molhada na cama e louça na pia.", 
      price: "R$ 45,00" 
    },
    { 
      icon: "🏳️", 
      title: "Almofada 'Zona de Paz'", 
      desc: "Item de segurança para o sofá. Sentou nela, qualquer DR está estritamente proibida.", 
      price: "R$ 60,00" 
    },
    { 
      icon: "🍽️", 
      title: "Jogo Americano 'Meu Espaço'", 
      desc: "Para delimitar o território na mesa e impedir, legalmente, o roubo de batatas fritas.", 
      price: "R$ 70,00" 
    },
    { 
      icon: "☕", 
      title: "Caneca '1º Café, depois DR'", 
      desc: "Fundamental para garantir que o humor matinal esteja ajustado antes de qualquer conversa séria.", 
      price: "R$ 35,00" 
    },
    { 
      icon: "🍕", 
      title: "Folga do Chef", 
      desc: "O Kevin cozinha bem, mas merece um delivery de vez em quando para não queimar as panelas.", 
      price: "R$ 80,00" 
    },
    { 
      icon: "🍹", 
      title: "Combustível da Lua de Mel", 
      desc: "Garanta os drinks dos noivos na praia (item de extrema importância para a felicidade do casal).", 
      price: "R$ 50,00" 
    },
    { 
      icon: "🧘‍♂️", 
      title: "Paciência pra Brunna", 
      desc: "Estoque vitalício de paciência para lidar com as piadas do Kevin.", 
      price: "R$ 100,00" 
    }
  ];

  return (
    <section id="presentes" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Gift size={32} />
          </div>
          <SectionTitle title="Lista de Presentes" subtitle="Brincadeiras à parte..." />
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Como já temos nossa casinha montada (e muita bagunça acumulada), optamos por uma lista virtual divertida. 
            Escolha um item abaixo para rir com a gente ou contribua com qualquer valor para nossa Lua de Mel!
          </p>
        </div>

        {/* Grid de Presentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {gifts.map((item, index) => (
            <div key={index} className="border border-stone-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-stone-50 group flex flex-col">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="font-serif text-xl text-stone-800 font-bold mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm mb-6 flex-grow">{item.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                <span className="font-bold text-amber-600 text-lg">{item.price}</span>
                <button 
                  onClick={copyPix}
                  className="bg-white border border-stone-200 text-rose-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-rose-900 hover:text-white transition-colors flex items-center gap-2"
                  style={{
                    backgroundColor: '#881337',
                    color: '#ffffff',
                  }}
                >
                  Presentear <Gift size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Área do PIX Central */}
        <div className="bg-rose-50 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto border-2 border-dashed border-rose-200">
          <h3 className="font-serif text-2xl text-stone-800 mb-4">Prefere fazer um PIX direto?</h3>
          <p className="text-stone-600 mb-8">
            Nossa chave PIX é nosso e-mail/CPF/Telefone. Todo valor será usado para construirmos nosso futuro.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white px-6 py-4 rounded-lg border border-stone-200 font-mono text-stone-600 w-full md:w-auto overflow-hidden text-ellipsis">
              {PIX_KEY}
            </div>
            <Button onClick={copyPix} className="w-full md:w-auto flex items-center justify-center gap-2">
              <Copy size={18} /> Copiar Chave
            </Button>
          </div>
        </div>
      </div>
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
             <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 text-amber-600">
               <Clock className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-serif text-2xl text-stone-800 mb-2">Horário</h3>
               <p className="text-stone-600">A cerimônia terá início pontualmente às <strong className="text-rose-900">18:00</strong>.</p>
               <p className="text-stone-600">Recepção a seguir no mesmo local.</p>
             </div>
           </div>

           <div className="flex items-start gap-6">
             <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 text-amber-600">
               <MapPin className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-serif text-2xl text-stone-800 mb-2">Local</h3>
               <p className="text-stone-600 font-medium">AFFISP - Associação dos Funcionários Fiscais do Sudoeste do Paraná</p>
               <p className="text-stone-500">R. Sen. Teotônio Viléla, 610, 85509-270</p>
               <p className="text-stone-500">Pato Branco - PR</p>
             </div>
           </div>

           <Button onClick={() => window.open('https://www.google.com/maps/place/AFFISP+-+Associa%C3%A7%C3%A3o+dos+Funcion%C3%A1rios+Fiscais+do+Sudoeste+do+Paran%C3%A1/@-26.2486824,-52.7015264,17z/data=!3m1!4b1!4m6!3m5!1s0x94e5534a677f7387:0x42b8e610e60279ee!8m2!3d-26.2486825!4d-52.6966501!16s%2Fg%2F11frkcx2f2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D', '_blank')}>
              Ver Rota no GPS
           </Button>
        </div>

        <div className="order-1 lg:order-2 h-[400px] w-full bg-stone-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
          <div className="w-full h-full bg-stone-300 flex flex-col items-center justify-center text-stone-500">
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
  <footer className="bg-stone-900 text-stone-300 py-12 text-center">
    <div className="container mx-auto px-4">
      <h2 className="font-script text-4xl text-amber-500 mb-6">Brunna & Kevin</h2>
      <div className="flex justify-center gap-6 mb-8">
        <a href="#" className="hover:text-white transition-colors"><Camera size={20} /></a>
        <a href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></a>
      </div>
      <p className="font-serif text-sm tracking-widest opacity-60">
        © 2025 FEITO COM AMOR. TODOS OS DIREITOS RESERVADOS.
      </p>
    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efeito para detectar scroll e mudar estilo da navbar
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
    { name: "Quiz", href: "#game" },
    { name: "Presentes", href: "#presentes" },
    { name: "Local", href: "#endereco" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <div className="font-sans text-stone-800 bg-white selection:bg-rose-200 selection:text-rose-900 scroll-smooth">
      {/* Estilos Globais para Fontes e Scroll */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        html { scroll-behavior: smooth; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-display { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        
        /* Scrollbar personalizada */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f5f5f4; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e7e5e4; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d6d3d1; }
      `}</style>

      {/* Navbar Sticky */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#inicio" className={`font-script text-3xl md:text-4xl transition-colors ${scrolled ? 'text-stone-800' : 'text-white'}`}>
            B & K
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  color:'#57534e',
                  fontSize: '0.875rem',           
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',         
                  fontWeight: '700',
                  color: scrolled
                    ? '#57534e'                   
                    : 'rgba(255, 255, 255, 0.9)', 
                  transition: 'color 300ms ease',
                }}
                className={scrolled ? 'hover:text-amber-600' : 'hover:text-white'}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden z-50 p-2">
            {isMenuOpen ? (
              <X className="text-stone-800" />
            ) : (
              <Menu style={{ color: scrolled ? '#292524' : '#ffffff' }} className={scrolled ? 'text-stone-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-40 h-screen flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-2xl text-stone-800 hover:text-rose-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </header>

      {/* Renderização das Seções */}
      <main>
        <Hero />
        <RSVP />
        <Guestbook />
        <Game />
        <Gallery />
        <GiftList />
        <Location />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}