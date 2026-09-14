import fs from "node:fs";
import path from "node:path";
import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Numbers from "@/components/sections/Numbers";
import PocToProduct from "@/components/sections/PocToProduct";
import DesigningWithPeople from "@/components/sections/DesigningWithPeople";
import Trajectory from "@/components/sections/Trajectory";
import Speaking from "@/components/sections/Speaking";
import Closing from "@/components/sections/Closing";
import Faq from "@/components/sections/Faq";
import SectionRule from "@/components/ui/SectionRule";
import { footer, images, type SiteImage } from "@/data/content";

/** Photos render only once their files exist in /public. */
function pick(img: SiteImage): SiteImage | null {
  return fs.existsSync(path.join(process.cwd(), "public", img.file)) ? img : null;
}

export default function Page() {
  return (
    <>
      <main id="main">
        <Hero />
        <SectionRule />
        <Profile />
        <Numbers />
        <SectionRule />
        <PocToProduct image={pick(images.poc)} />
        <SectionRule />
        <DesigningWithPeople image={pick(images.people)} />
        <SectionRule />
        <Trajectory />
        <SectionRule />
        <Speaking image={pick(images.speaking)} />
        <SectionRule />
        <Closing />
        <Faq />
      </main>
      <footer aria-label={footer.ariaLabel} className="px-gutter pb-10 pt-6">
        <p className="mx-auto w-full max-w-site border-t rule pt-6 text-sm text-muted">{footer.text}</p>
      </footer>
    </>
  );
}
