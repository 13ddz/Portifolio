import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Mail, Github, Linkedin, MessageCircleMore, ExternalLink, X } from 'lucide-react';
import { Button } from './ui/button';
import { useReducedMotion } from './useReducedMotion';

export function Contact() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const contactLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:lettyciasilvag@hotmail.com',
      label: 'lettyciasilvag@hotmail.com'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircleMore,
      href: 'https://wa.me/5532984422652',
      label: '+55 (32) 98442-2652'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/13ddz',
      label: 'github.com/13ddz'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/lettyciasilva/',
      label: 'linkedin.com/in/lettyciasilva'
    }
  ];

  const modalDescriptions: Record<string, string> = {
    Email: 'Para oportunidades profissionais e propostas.',
    WhatsApp: 'Para uma conversa rápida.',
    LinkedIn: 'Para networking e oportunidades de carreira.'
  };
  const modalLinks = contactLinks
    .filter((link) => link.name !== 'GitHub')
    .sort((first, second) => ['WhatsApp', 'Email', 'LinkedIn'].indexOf(first.name) - ['WhatsApp', 'Email', 'LinkedIn'].indexOf(second.name))
    .map((link) => ({ ...link, description: modalDescriptions[link.name] }));

  useEffect(() => {
    if (!isContactModalOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsContactModalOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (
        event.shiftKey &&
        (
          document.activeElement === firstElement ||
          document.activeElement === modalRef.current ||
          !modalRef.current.contains(document.activeElement)
        )
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement || !modalRef.current.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [isContactModalOpen]);

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-background to-muted/20"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Título da seção */}
        <div className="mb-12">
          <h2 id="contact-heading" className="text-3xl md:text-5xl mb-4">
            Vamos criar algo
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"> incrível juntos?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estou sempre aberto a novos desafios e oportunidades de colaboração.
          </p>
        </div>

        {/* Cards de contato */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group block"
              aria-label={`${link.name}: ${link.label}`}
            >
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg">
                <link.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="mb-2 group-hover:text-primary transition-colors">{link.name}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {link.label}
                </p>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-2 mx-auto opacity-0 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>

        {/* Botão principal */}
        <div>
          <Button
            size="lg"
            onClick={() => setIsContactModalOpen(true)}
            ref={contactTriggerRef}
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            Entrar em contato
          </Button>
        </div>

        <AnimatePresence>
          {isContactModalOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsContactModalOpen(false);
              }}
              aria-hidden="false"
            >
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                aria-describedby="contact-modal-description"
                tabIndex={-1}
                className="relative my-auto w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card text-card-foreground shadow-2xl outline-none max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)]"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: prefersReducedMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8, scale: prefersReducedMotion ? 1 : 0.99 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="p-5 pb-4 sm:p-7 sm:pb-5">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-5 sm:top-5"
                    aria-label="Fechar janela de contato"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <h2 id="contact-modal-title" className="pr-10 text-2xl font-semibold sm:text-3xl">
                    Vamos conversar? <span aria-hidden="true">👋</span>
                  </h2>
                  <p id="contact-modal-description" className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Tem uma oportunidade, um projeto ou quer conhecer melhor meu trabalho? Ficarei feliz em conversar com você!
                  </p>
                </div>

                <div className="space-y-3 px-5 pb-5 sm:px-7 sm:pb-6">
                  {modalLinks.map((link) => {
                    const href = link.name === 'WhatsApp'
                      ? `${link.href}?text=${encodeURIComponent('Olá, Lettycia! Vi seu portfólio e gostaria de conversar com você.')}`
                      : link.href;

                    return (
                      <a
                        key={link.name}
                        href={href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-background p-3 transition-all hover:border-primary/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-4 sm:p-4"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-12 sm:w-12">
                          <link.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-foreground">{link.name}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground sm:text-sm">{link.description}</span>
                          <span className="mt-1 block break-all text-xs text-foreground/80 sm:text-sm">{link.label}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>

                <div className="border-t border-border bg-muted/30 px-5 py-4 text-center text-xs text-muted-foreground sm:px-7 sm:text-sm">
                  Aberta a oportunidades de estágio e desenvolvimento de software.
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rodapé */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Feito com <span aria-label="amor">❤️</span> e muito código • 2026
          </p>
        </footer>
      </div>
    </section>
  );
}
