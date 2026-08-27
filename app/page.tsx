import { Nav } from "@/components/Nav";
import { Fold } from "@/components/Fold";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Career } from "@/components/Career";
import { Contact } from "@/components/Contact";
import { Chat } from "@/components/Chat";

export default function Page() {
  return (
    <>
      <a className="skip" href="#career">
        Skip to career
      </a>
      <Nav />
      <main>
        <Fold />
        <Skills />
        <Projects />
        <Career />
      </main>
      <Contact />
      <Chat />
    </>
  );
}
