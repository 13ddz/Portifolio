import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      aria-label="Hero - Apresentação"
    >

      {/* Fundo simples */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">

        {/* Título principal */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Transformo
          </span>
          <span className="block text-primary">
            ideias em
          </span>
          <span className="block bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
            experiências
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Criando o futuro, uma linha de código por vez
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">
            Desenvolvedora Front-end que também explora o Back-end para construir aplicações completas.
          </p>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { number: "3+", label: "Anos" },
            { number: "50+", label: "Projetos" },
            { number: "∞", label: "Possibilidades" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl mb-2 text-primary">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Botões de ação */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Ver Projetos
          </a>

          <a
            href="#contact"
            className="px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Falar Comigo
          </a>
        </motion.div>

        <motion.a
          href="#about"
          className="mt-6 inline-flex flex-col items-center gap-2 text-center select-none hover:opacity-100 transition-opacity"
          aria-label="Ir para a seção de conhecimentos"
          animate={{
            y: [0, -8, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Explore</span>
          <ChevronDown className="w-5 h-5 text-primary" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
