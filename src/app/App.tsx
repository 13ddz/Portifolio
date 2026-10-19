import { ThemeProvider } from './components/ThemeProvider';
import { SkipLink } from './components/SkipLink';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Skills } from './components/Skills';
import { Courses } from './components/Courses';
import { AccessibilityButton } from './components/AccessibilityButton';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <SkipLink />
      <div className="min-h-screen">
        <Navbar />
        <main id="main-content" className="pt-16">
          <Hero />
          <Profile />
          <Skills />
          <Courses />
          <Projects />
          <Contact />
        </main>
        <AccessibilityButton />
      </div>
    </ThemeProvider>
  );
}