import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {Base} from "@/components/Base";
import {cn} from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Header/>
            <main>
                    <Hero/>

                <Base/>
                <Projects/>
                <About/>
                <Contact/>
            </main>
            <Footer/>
        </div>
    );
}