import { useState } from 'react';
import { Code, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Front-end',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React',
      'Vue.js', 'Angular', 'Bootstrap', 'Next.js'
    ]
  },
  {
    id: 'backend',
    title: 'Back-end',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    skills: [
      'Python', 'C#', 'Java', 'Express', 'PHP',
      'Node.js', 'SQL', 'MongoDB', 'AWS'
    ]
  },
  {
    id: 'tools',
    title: 'Ferramentas',
    icon: Wrench,
    color: 'from-green-500 to-emerald-500',
    skills: [
      'Git', 'GitHub', 'Flutter', 'Metodologias ágeis',
      'Microsoft Power Platform'
    ]
  }
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  return (
    <section
      id="about"
      className="py-32 px-4 bg-gradient-to-b from-background to-muted/20"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/80 to-transparent max-w-28" />
          <div className="mx-4 h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_rgba(0,0,0,0.3)]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/80 to-transparent max-w-28" />
        </div>

        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 id="skills-heading" className="text-4xl md:text-6xl mb-6">
            Conhecimentos em
            <span className="block bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">
              Desenvolvimento
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tecnologias aprendidas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Seletor de categorias */}
          <div className="space-y-4">
            <h3 className="text-2xl mb-6">Categorias</h3>

            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color} shadow-lg`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <h4 className={activeCategory === category.id ? 'text-primary' : ''}>
                      {category.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {category.skills.length} tecnologias
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Lista de habilidades */}
          <div className="space-y-6">
            <h3 className="text-2xl mb-6">
              {skillCategories.find(cat => cat.id === activeCategory)?.title}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {activeSkills.map((skill) => (
                <div
                  key={skill}
                  className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h4 className="text-sm md:text-base">
                    {skill}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
