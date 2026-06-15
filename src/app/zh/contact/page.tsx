import Link from "next/link";
import { PageFrame } from "@/components/site/site-shell";

export default function ZhContactPage() {
  return (
    <PageFrame
      locale="zh"
      currentPath="/contact"
      kicker="联系"
      title="回到这个站点背后的人。"
      description="邮箱、GitHub 和未来的 CV 链接都会保持简单、稳定、可访问。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="mailto:mr.weathour@gmail.com" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-primary/50">
          <h2 className="text-xl font-medium">邮箱</h2>
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
