import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 md:py-32 px-4 md:px-8", className)}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
