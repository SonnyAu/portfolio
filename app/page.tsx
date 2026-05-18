import Hero from "./components/Hero";
import IntroSequence from "./components/IntroSequence";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <IntroSequence />
    </>
  );
}
