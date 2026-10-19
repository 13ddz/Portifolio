import { motion } from 'motion/react';
import { ExternalLink, Github, Eye } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "PetLar",
    description: "Conectando apaixonados por pets às melhores soluções para o bem-estar animal.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/icons/petlar.png",
  },
  {
    id: 2,
    title: "Netflix",
    description: "Projeto de clone da interface da Netflix com tela de carregamento.",
    tech: ["HTML", "CSS"],
    image: "/icons/netflix.png",
  },
  {
    id: 3,
    title: "Dino",
    description: "Jogo clássico do Dino com implementação moderna.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/icons/dino.png",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-32 px-4 bg-gradient-to-b from-background via-muted/10 to-background"
      aria-labelledby="projects-heading"
    >

      <div className="max-w-7xl mx-auto">

        {/* Título da seção */}
        <div className="text-center mb-20">
          <h2 id="projects-heading" className="text-4xl md:text-6xl mb-6">
            Projetos que
            <span className="block bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">
              fazem a diferença
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada projeto é uma oportunidade de inovar, experimentar e criar experiências memoráveis
          </p>
        </div>

        {/* Grade de projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Imagem do projeto */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Botões de ação */}
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    tabIndex={-1}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                    aria-label={`Visualizar ${project.title}`}
                  >
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                  <button
                    tabIndex={-1}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                    aria-label={`Ver código do ${project.title} no GitHub`}
                  >
                    <Github className="w-5 h-5 text-white" />
                  </button>
                  <button
                    tabIndex={-1}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                    aria-label={`Abrir ${project.title} em nova aba`}
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Conteúdo do projeto */}
              <div className="p-6">
                <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Botão de ação */}
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full hover:shadow-lg transition-all duration-300">
            Ver Todos os Projetos
          </button>
        </div>
      </div>
    </section>
  );
}
