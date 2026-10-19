import { useState } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Início', href: '#' },
    { name: 'Sobre', href: '#about' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center space-x-2 outline-none rounded-lg"
            aria-label="Página inicial"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="font-mono text-lg cursor-default">{"<HELLO WORLD! ;)/>"}</span>
          </a>

          {/* Desktop - Links de navegação */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10 outline-none cursor-pointer"
                aria-label={`Navegar para ${item.name}`}
              >
                <span className="text-sm">{item.name}</span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}

            <div className="ml-4 pl-4 border-l border-border/50">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile - Botão de menu */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile - Menu expandido */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors outline-none cursor-pointer"
                onClick={() => setIsOpen(false)}
                aria-label={`Navegar para ${item.name}`}
              >
                <span className="text-sm">{item.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
