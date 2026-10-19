import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Code, Coffee, Heart, Zap } from "lucide-react";

export function Profile() {
  const personalStats = [
    {
      icon: Code,
      label: "Linhas de código",
      value: "500K+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coffee,
      label: "Xícaras de café",
      value: "∞",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Heart,
      label: "Projetos com amor",
      value: "100%",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Zap,
      label: "Energia criativa",
      value: "MAX",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section
      className="py-32 px-4 bg-gradient-to-b from-background via-muted/5 to-background"
      aria-labelledby="profile-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 id="profile-heading" className="text-4xl md:text-6xl mb-6 leading-[1.3]">
            A desenvolvedora
            <span className="block bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">
              por trás do código
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça um pouco mais sobre quem está criando essas experiências digitais
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Foto de perfil */}
          <div className="relative max-w-md mx-auto">
            <div className="relative bg-card border-2 border-border/50 rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/icons/lele.jpg"
                alt="Lettycia Silva - Desenvolvedora"
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Badge de status */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border/50 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Disponível para projetos</span>
              </div>
            </div>
          </div>

          {/* Estatísticas pessoais */}
          <div className="space-y-6">
            {/* Texto introdutório */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl mb-4">
                Mais que apenas números
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Cada projeto é uma nova aventura, cada linha de código uma oportunidade de fazer a diferença.
                Aqui está um pouco do que me motiva todos os dias.
              </p>
            </div>

            {/* Cards de estatísticas */}
            <div className="grid grid-cols-2 gap-4">
              {personalStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="text-2xl mb-1 text-primary">
                    {stat.value}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Citação */}
            <blockquote className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-xl">
              <p className="text-lg italic mb-2">
                "Código é poesia em movimento, design é a alma da tecnologia."
              </p>
              <footer className="text-sm text-muted-foreground">
                — Minha filosofia de desenvolvimento
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
