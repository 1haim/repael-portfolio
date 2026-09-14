import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Numbers from "@/components/sections/Numbers";
import PocToProduct from "@/components/sections/PocToProduct";
import DesigningWithPeople from "@/components/sections/DesigningWithPeople";
import Trajectory from "@/components/sections/Trajectory";
import Speaking from "@/components/sections/Speaking";
import { footer } from "@/data/content";

export default function Page() {
  return (
    <>
      <main id="main">
        <Hero />
        <Profile />
        <Numbers />
        <PocToProduct />
        <DesigningWithPeople />
        <Trajectory />
        <Speaking />
      </main>
      <footer aria-label={footer.ariaLabel} className="px-gutter pb-10 pt-6">
        <p className="mx-auto w-full max-w-site border-t rule pt-6 text-sm text-muted">{footer.text}</p>
      </footer>
    </>
  );
}
