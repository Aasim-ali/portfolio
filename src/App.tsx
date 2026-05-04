import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import BackgroundVideo from "./components/BackgroundVideo";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useState } from "react";
import Loader from "./components/Loader";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <BackgroundVideo setLoading={setLoading}/>
      {loading ?
        <Loader loading={loading} />
        :
        <>
          <Navbar />

          <main className="relative z-10">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <section id="end"></section>
          </main>
        </>
      }
    </>
  );
}

export default App