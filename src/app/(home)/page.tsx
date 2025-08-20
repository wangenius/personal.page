import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Footer } from "./sections/Footer";
import { Projects } from "./sections/Projects";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
