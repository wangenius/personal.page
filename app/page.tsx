import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { Base } from "@/components/Base";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Base />
      <Projects />
      <About />
    </Fragment>
  );
}
