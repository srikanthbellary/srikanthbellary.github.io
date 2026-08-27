import { Nav } from "@/components/Nav";
import { Fold } from "@/components/Fold";
import { Capabilities } from "@/components/Capabilities";
import { SelectedWork } from "@/components/SelectedWork";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Chat } from "@/components/Chat";

export default function Page() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav />
      <main>
        <Fold />
        <Capabilities />
        <SelectedWork />
        <Projects />
      </main>
      <Contact />
      <Chat />
    </>
  );
}
