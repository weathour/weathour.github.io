import { AboutContent } from "@/components/site/about-content";
import { PageFrame } from "@/components/site/site-shell";

export default function ZhAboutPage() {
  return (
    <PageFrame
      locale="zh"
      currentPath="/about"
      kicker="关于"
      title="学生、研究者、开发者：在研究、工具与思想之间修路。"
      description="目前在中国陕西西安的长安大学攻读博士，专业方向是交通信息工程及控制，同时将长期工作延伸到写作系统、软件工具与理论表达之中。"
    >
      <AboutContent locale="zh" />
    </PageFrame>
  );
}
