import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import AIWorkflow from '@/components/AIWorkflow';
import Education from '@/components/Education';
import GithubStats from '@/components/GithubStats';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <AIWorkflow />
      <Education />
      <GithubStats />
      <Contact />
    </>
  );
}
