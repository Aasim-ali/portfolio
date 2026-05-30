import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ThemeButton from "./components/ThemeButton";
import { ThemeProvider } from "./context/ThemeContext";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

function AppContent() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh(true);
    refresh();
    const t1 = setTimeout(refresh, 150);
    const t2 = setTimeout(refresh, 600);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <>
      <ThemeButton />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
