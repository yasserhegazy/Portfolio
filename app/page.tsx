import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import WakibCaseStudy from '@/components/WakibCaseStudy';
import Projects from '@/components/Projects';
import AIWorkflow from '@/components/AIWorkflow';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import GithubStats from '@/components/GithubStats';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <WakibCaseStudy />
      <Projects />
      <AIWorkflow />
      <Skills />
      <Education />
      <GithubStats />
      <Contact />
    </>
  );
}
