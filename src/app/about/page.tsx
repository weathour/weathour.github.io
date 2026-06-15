import { AboutContent } from "@/components/site/about-content";
import { PageFrame } from "@/components/site/site-shell";

export default function AboutPage() {
  return (
    <PageFrame
      kicker="About"
      title="Student, researcher, developer — building routes across inquiry and tools."
      description="Based in Xi'an as a doctoral student at Chang'an University, working from transportation information engineering and control toward a broader system of research, writing, software, and theory."
      currentPath="/about"
    >
      <AboutContent />
    </PageFrame>
  );
}
