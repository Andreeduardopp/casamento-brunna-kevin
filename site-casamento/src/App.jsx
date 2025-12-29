import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Heart, MapPin, Calendar, Clock, Camera, MessageCircle, Send, Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Botão Primário reutilizável
const Button = ({ children, onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-rose-900 text-white px-8 py-3 rounded-full font-serif uppercase tracking-widest text-sm hover:bg-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${className}`}
  >
    {children}
  </button>
);

// Título de Seção
const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12 animate-fade-in-up">
    <h3 className="text-amber-600 font-serif italic text-xl mb-2">{subtitle}</h3>
    <h2 className="text-4xl md:text-5xl font-display text-stone-800">{title}</h2>
    <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 rounded-full opacity-60"></div>
  </div>
);

// --- SEÇÕES DO SITE ---

const Hero = () => (
  <section id="inicio" className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
    {/* Imagem de Fundo com Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="assets/B&K_ (117).jpg" 
        alt="Casamento Romântico" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
    </div>

    {/* Conteúdo */}
    <div className="relative z-10 text-center text-white px-4 animate-fade-in">
      <p className="font-serif text-xl md:text-2xl tracking-widest mb-4">Vamos nos casar</p>
      <h1 className="font-script text-7xl md:text-9xl mb-6 text-stone-50 drop-shadow-lg">
        Brunna & Kevin
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-serif text-lg md:text-xl tracking-wide">
        <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> 15 de Novembro de 2025</span>
        <span className="hidden md:block w-2 h-2 bg-white rounded-full"></span>
        <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Pato Branco, PR</span>
      </div>
      <div className="mt-12">
        <a href="#rsvp" className="inline-block bg-white/20 backdrop-blur-sm border border-white text-white px-10 py-4 rounded-full font-serif hover:bg-white hover:text-stone-900 transition-all duration-300 uppercase tracking-widest text-sm">
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

    const SERVICE_ID = "service_gammwb7";
    const TEMPLATE_ID = "template_kxu2ors";
    const PUBLIC_KEY = "iBJu07hIvL-Vq_IOo";
    console.log("Form data:", new FormData(form.current));
    // emailjs
    //   .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
    //     publicKey: PUBLIC_KEY,
    //   })
    //   .then(
    //     () => {
    //       setSubmitted(true);
    //       setLoading(false);
    //     },
    //     (error) => {
    //       console.error('FAILED...', error.text);
    //       setError(true);
    //       setLoading(false);
    //     },
    //   );
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="rsvp" className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionTitle title="RSVP" subtitle="Confirme sua presença" />
        
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
          <p className="text-stone-500">contato@brunnaekevin.com</p>
        </a>
      </div>
    </div>
  </section>
);

const Guestbook = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "Tia Marta", text: "Que a felicidade de vocês seja infinita! Mal posso esperar pelo grande dia." },
    { id: 2, name: "Lucas & Ana", text: "Vocês merecem todo o amor do mundo. Parabéns ao casal!" },
    { id: 3, name: "Vovó Cida", text: "Deus abençoe essa união linda. Amo vocês." }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [newName, setNewName] = useState("");

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !newName.trim()) return;
    
    setMessages([{ id: Date.now(), name: newName, text: newMessage }, ...messages]);
    setNewMessage("");
    setNewName("");
  };

  return (
    <section id="mensagens" className="py-20 bg-rose-50/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle title="Livro de Visitas" subtitle="Deixe seu carinho" />

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
              />
              <textarea 
                rows="4" 
                placeholder="Sua mensagem para os noivos..." 
                className="w-full border border-stone-200 rounded-lg p-3 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 resize-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
              <Button type="submit" className="w-full">Publicar Mensagem</Button>
            </form>
          </div>

          {/* Lista de Mensagens */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm relative">
                <div className="absolute top-4 right-4 text-rose-200 opacity-50">
                  <MessageCircle size={30} />
                </div>
                <p className="text-stone-600 italic mb-4 font-serif text-lg">"{msg.text}"</p>
                <p className="text-amber-700 font-bold text-sm tracking-wide uppercase">— {msg.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const photos = [
    "https://images.unsplash.com/photo-1511285560982-1356c11d4606?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1621801306660-c31a31d9d936?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc330e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522673607200-1645062cd958?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <section id="album" className="py-20 bg-stone-100">
      <div className="container mx-auto px-4">
        <SectionTitle title="Nossos Momentos" subtitle="Um pouco da nossa história" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {photos.map((src, index) => (
            <div key={index} className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md cursor-pointer">
              <img 
                src={src} 
                alt={`Foto casal ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Heart className="text-white fill-white animate-bounce" size={32} />
              </div>
            </div>
          ))}
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
               <p className="text-stone-600">A cerimônia terá início pontualmente às <strong className="text-rose-900">16:30</strong>.</p>
               <p className="text-stone-600">Recepção a seguir no mesmo local.</p>
             </div>
           </div>

           <div className="flex items-start gap-6">
             <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 text-amber-600">
               <MapPin className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-serif text-2xl text-stone-800 mb-2">Local</h3>
               <p className="text-stone-600 font-medium">Chácara Encanto das Flores</p>
               <p className="text-stone-500">Rodovia das Hortênsias, km 10</p>
               <p className="text-stone-500">Pato Branco - PR</p>
             </div>
           </div>

           <Button onClick={() => window.open('https://maps.google.com', '_blank')}>
              Ver Rota no GPS
           </Button>
        </div>

        <div className="order-1 lg:order-2 h-[400px] w-full bg-stone-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
           {/* Placeholder do Google Maps - Em produção, substituir pelo Iframe real do Google Embed API */}
           <div className="w-full h-full bg-stone-300 flex flex-col items-center justify-center text-stone-500">
              <MapPin size={48} className="mb-2 text-stone-400" />
              <p className="font-sans font-bold">Google Maps Placeholder</p>
              <iframe 
                className="w-full h-full opacity-60 pointer-events-none"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.4789539308676!2d-52.6961!3d-26.2295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEzJzQ2LjIiUyA1MsKwNDEnNDYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1635789000000!5m2!1spt-BR!2sbr" 
                allowFullScreen="" 
                loading="lazy"
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
    { name: "RSVP", href: "#rsvp" },
    { name: "Mensagens", href: "#mensagens" },
    { name: "Álbum", href: "#album" },
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
                className={`text-sm uppercase tracking-widest font-bold hover:text-amber-600 transition-colors ${
                  scrolled ? 'text-stone-600' : 'text-white/90 hover:text-white'
                }`}
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
              <Menu className={scrolled ? 'text-stone-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
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
        <Gallery />
        <Location />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}