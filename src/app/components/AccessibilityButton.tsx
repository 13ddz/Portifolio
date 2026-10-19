import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Users, X, Keyboard, Volume2, Contrast, Type, RotateCcw, Minus, Plus } from 'lucide-react';
import { useReducedMotion } from './useReducedMotion';

type FontSize = 'small' | 'normal' | 'large';

export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [audioDescription, setAudioDescription] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Carregar preferências do localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem('a11y-fontSize') as FontSize;
    const savedContrast = localStorage.getItem('a11y-contrast') === 'true';
    const savedAudio = localStorage.getItem('a11y-audio') === 'true';

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedContrast) setHighContrast(savedContrast);
    if (savedAudio) setAudioDescription(savedAudio);
  }, []);

  // Aplicar tamanho da fonte
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('a11y-fontSize', fontSize);

    switch (fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'normal':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '20px';
        break;
    }
  }, [fontSize]);

  // Aplicar alto contraste
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('a11y-contrast', String(highContrast));
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Aplicar audiodescrição
  useEffect(() => {
    localStorage.setItem('a11y-audio', String(audioDescription));

    if (!('speechSynthesis' in window)) {
      return;
    }

    if (audioDescription) {
      const finalText = `Olá. A seguir, uma apresentação profissional desta página. A navegação principal oferece quatro seções: início, sobre, projetos e contatos. Também há um botão para alternar entre o modo claro e o modo escuro. A mensagem inicial destaca a proposta do portfólio: transformar ideias em experiências. Em seguida, a página reforça a ideia de criar o futuro, uma linha de código por vez. A profissional por trás dessa criação é uma desenvolvedora front-end que também explora o back-end para construir aplicações completas e funcionais. A experiência profissional é apresentada com mais de três anos de atuação, mais de cinquenta projetos desenvolvidos e infinitas possibilidades de criação. Logo abaixo, há opções para ver projetos e falar comigo, permitindo uma navegação direta para contato e apresentação do trabalho. A seção sobre a desenvolvedora oferece uma visão mais pessoal e humana do processo criativo. Conheça um pouco mais sobre quem está por trás dessas experiências digitais. A imagem da profissional reforça a identidade e a presença do portfólio. A página também comunica disponibilidade para novos projetos, destacando que o trabalho vai além dos números. Cada projeto representa uma nova oportunidade de criar valor, resolver desafios e transformar ideias em soluções relevantes. Cada linha de código é pensada com atenção, criatividade e propósito. A filosofia do desenvolvimento aparece de forma clara e inspiradora: código é poesia em movimento, e design é a alma da tecnologia. Essa visão conecta técnica, estética e intenção. Por fim, a área de conhecimentos em desenvolvimento apresenta as tecnologias e ferramentas que fazem parte da trajetória profissional, com foco em front-end, back-end e demais recursos essenciais para a criação de experiências digitais modernas.`;

      const utterance = new SpeechSynthesisUtterance(finalText);

      utterance.lang = 'pt-BR';
      utterance.rate = 0.72;
      utterance.pitch = 1.02;
      utterance.volume = 1;

      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (voice) =>
            voice.lang.toLowerCase().startsWith('pt') &&
            /femin|woman|mulher|female|maria|victoria|julia|bruna|samantha|zira|vitoria/i.test(voice.name)
        ) ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('pt')) ?? voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      };

      pickVoice();

      if (window.speechSynthesis.onvoiceschanged) {
        window.speechSynthesis.onvoiceschanged = pickVoice;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [audioDescription]);

  // Atalho Alt+A para abrir
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const isAccessibilityShortcut =
        (e.altKey && !e.ctrlKey && !e.metaKey && (e.key.toLowerCase() === 'a' || e.code === 'KeyA')) ||
        (e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey && (e.key.toLowerCase() === 'a' || e.code === 'KeyA'));

      if (isAccessibilityShortcut) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(prev => !prev);
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyPress, true);
  }, [isOpen]);

  // Resetar todas as configurações
  const handleReset = () => {
    setFontSize('normal');
    setHighContrast(false);
    setAudioDescription(false);
    localStorage.removeItem('a11y-fontSize');
    localStorage.removeItem('a11y-contrast');
    localStorage.removeItem('a11y-audio');
  };

  const shortcuts = [
    { key: 'Tab', description: 'Navegar entre Início, Sobre, Projetos e Contato' },
    { key: 'Enter', description: 'Ativar elemento' },
    { key: 'Esc', description: 'Fechar menus' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            role="dialog"
            aria-label="Painel de acessibilidade"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-border sticky top-0 z-10 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" aria-hidden="true" />
                  Acessibilidade
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-background/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Fechar painel de acessibilidade"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-4 space-y-6">
              
              {/* Tamanho da Fonte */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Type className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Tamanho da Fonte</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontSize('small')}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    disabled={fontSize === 'small'}
                    aria-label="Diminuir fonte"
                  >
                    <Minus className="w-4 h-4 mx-auto" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setFontSize('normal')}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    disabled={fontSize === 'normal'}
                    aria-label="Fonte normal"
                  >
                    <Type className="w-4 h-4 mx-auto" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    disabled={fontSize === 'large'}
                    aria-label="Aumentar fonte"
                  >
                    <Plus className="w-4 h-4 mx-auto" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Atual: <span className="font-medium capitalize">{fontSize === 'small' ? 'Pequena' : fontSize === 'normal' ? 'Normal' : 'Grande'}</span>
                </p>
              </div>

              {/* Contraste */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Contrast className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Contraste</span>
                </div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-full px-4 py-3 text-sm border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                    highContrast
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:bg-muted/50'
                  }`}
                  aria-pressed={highContrast}
                >
                  {highContrast ? '✓ Alto Contraste Ativado' : 'Ativar Alto Contraste'}
                </button>
              </div>

              {/* Audiodescrição */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Volume2 className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Audiodescrição</span>
                </div>
                <button
                  onClick={() => setAudioDescription(!audioDescription)}
                  className={`w-full px-4 py-3 text-sm border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                    audioDescription
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:bg-muted/50'
                  }`}
                  aria-pressed={audioDescription}
                >
                  {audioDescription ? '✓ Audiodescrição Ativada' : 'Ativar Audiodescrição'}
                </button>
                <p className="text-xs text-muted-foreground">
                  Descrições em áudio das imagens e conteúdo
                </p>
              </div>

              {/* Atalhos de Teclado */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Keyboard className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Atalhos de Teclado</span>
                </div>
                <div className="space-y-2 bg-muted/30 rounded-lg p-3">
                  {shortcuts.map((shortcut) => (
                    <div key={shortcut.key} className="flex items-center justify-between text-xs">
                      <kbd className="px-2 py-1 bg-background border border-border rounded font-mono">
                        {shortcut.key}
                      </kbd>
                      <span className="text-muted-foreground text-right flex-1 ml-3">
                        {shortcut.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão de Reset */}
              <button
                onClick={handleReset}
                className="w-full px-4 py-3 text-sm border border-border rounded-lg hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all focus:outline-none focus:ring-2 focus:ring-destructive flex items-center justify-center gap-2"
                aria-label="Resetar todas as configurações de acessibilidade"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Resetar Configurações
              </button>

              {/* Badge WCAG */}
              <div className="text-center pt-3 border-t border-border">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                  <span className="text-xs font-medium">WCAG 2.1 AA Compliant</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
        whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
        animate={prefersReducedMotion ? {} : {
          boxShadow: [
            '0 10px 30px rgba(var(--primary-rgb, 0, 0, 0), 0.3)',
            '0 10px 40px rgba(var(--primary-rgb, 0, 0, 0), 0.5)',
            '0 10px 30px rgba(var(--primary-rgb, 0, 0, 0), 0.3)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        aria-label={isOpen ? "Fechar painel de acessibilidade (Alt+A)" : "Abrir painel de acessibilidade (Alt+A)"}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Users className="w-6 h-6" aria-hidden="true" />
          )}
        </motion.div>
      </motion.button>

      {/* Indicador de badge */}
      {!isOpen && (fontSize !== 'normal' || highContrast || audioDescription) && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground border-2 border-background rounded-full flex items-center justify-center text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          aria-label="Configurações de acessibilidade ativas"
        >
          {[fontSize !== 'normal', highContrast, audioDescription].filter(Boolean).length}
        </motion.div>
      )}
    </div>
  );
}
