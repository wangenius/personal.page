import { Contact } from "../../components/sections/Contact";
import { Footer } from "../../components/sections/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <Contact />
      <Footer />
    </main>
  );
}
