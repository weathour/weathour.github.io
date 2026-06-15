import Link from "next/link";
import { PageFrame } from "@/components/site/site-shell";

export default function ContactPage() {
  return (
    <PageFrame
      kicker="Contact"
      title="Routes back to the person behind the work."
      description="Email, GitHub, and future CV links will stay simple and durable."
    currentPath="/contact"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="mailto:mr.weathour@gmail.com" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-primary/50">
          <h2 className="text-xl font-medium">Email</h2>
          <p className="mt-3 font-mono text-sm text-primary">mr.weathour@gmail.com</p>
        </Link>
        <Link href="https://github.com/weathour" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-primary/50">
          <h2 className="text-xl font-medium">GitHub</h2>
          <p className="mt-3 font-mono text-sm text-primary">github.com/weathour</p>
        </Link>
      </div>
    </PageFrame>
  );
}
