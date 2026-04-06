import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/i18n";

const DiagnoseBlock = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.15"],
  });

  const words = t.diagnose.paragraph.split(" ");
  const highlightWords = t.diagnose.highlight.split(" ");
  const allWords = [...words, ...highlightWords];

  return (
    <section ref={containerRef} className="py-20 md:py-48 lg:py-56 px-6 md:px-16 lg:px-24">
      <div className="max-w-[900px] mx-auto">
        <p className="font-display text-[28px] md:text-[44px] lg:text-[56px] leading-[1.15] tracking-[-0.03em] font-semibold">
          {words.map((word, i) => {
            const start = i / allWords.length;
            const end = (i + 1) / allWords.length;
            return <Word key={i} start={start} end={end} progress={scrollYProgress}>{word}</Word>;
          })}
          <br className="hidden md:block" />
          {highlightWords.map((word, i) => {
            const globalIndex = words.length + i;
            const start = globalIndex / allWords.length;
            const end = (globalIndex + 1) / allWords.length;
            return <Word key={`h-${i}`} start={start} end={end} progress={scrollYProgress} highlight>{word}</Word>;
          })}
        </p>
      </div>
    </section>
  );
};

const Word = ({ children, start, end, progress, highlight = false }: { children: string; start: number; end: number; progress: any; highlight?: boolean }) => {
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block mr-[0.3em] ${highlight ? "text-primary" : "text-foreground"}`}>
      {children}
    </motion.span>
  );
};

export default DiagnoseBlock;
