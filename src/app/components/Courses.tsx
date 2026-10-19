import { GraduationCap, Award, Calendar, Clock, Sparkles } from 'lucide-react';

const courses = [
  {
    institution: 'Codi Academy',
    course: 'Desenvolvimento Web Full Stack',
    year: '2025',
    hours: null,
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    institution: 'PrograMaria Sprint',
    course: 'Agentes de IA',
    year: '2026',
    hours: '40 horas',
    icon: Award,
    color: 'from-purple-500 to-pink-500',
  },
  {
    institution: 'Smart Consulting',
    course: 'Power Platform, Agentes & Extending',
    year: '2026',
    hours: '200 horas',
    icon: Award,
    color: 'from-orange-500 to-red-500',
  },
];

export function Courses() {
  return (
    <section
      className="py-20 px-4 bg-muted/30"
      aria-labelledby="courses-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Formação Contínua</span>
          </div>

          <h2 id="courses-heading" className="text-3xl md:text-5xl mb-4">
            Cursos & Certificados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Investimento constante em aprendizado e atualização profissional
          </p>
        </div>

        {/* Destaque: Graduação em Andamento */}
        <div className="mb-12">
          <article className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/30 rounded-3xl p-8 md:p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
            {/* Badge "Em Andamento" */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-lg">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Em Andamento
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Ícone grande */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-xl">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl mb-2">
                  Análise e Desenvolvimento de Sistemas
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground mb-4">
                  Faculdade Descomplica
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">Previsão de Conclusão: 2028</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">Graduação Tecnológica</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full w-[60%]" />
            </div>
          </article>
        </div>

        {/* Grid de cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <article
              key={`${course.institution}-${course.course}`}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              {/* Ícone */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4`}>
                <course.icon className="w-6 h-6 text-white" />
              </div>

              {/* Instituição */}
              <div className="mb-3">
                <h3 className="font-semibold text-lg mb-1">
                  {course.institution}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.course}
                </p>
              </div>

              {/* Informações adicionais */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{course.year}</span>
                </div>
                {course.hours && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.hours}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Estatística */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-card border border-border rounded-full">
            <div>
              <div className="text-2xl md:text-3xl mb-1 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-bold">
                240+
              </div>
              <p className="text-xs text-muted-foreground">Horas de Formação</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-2xl md:text-3xl mb-1 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-bold">
                3
              </div>
              <p className="text-xs text-muted-foreground">Certificados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
