import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  framed?: boolean;
  className?: string;
  priority?: boolean;
}

export function Logo({ framed = false, className, priority = false }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        framed && "rounded-2xl bg-white px-3 py-2",
        className,
      )}
    >
      <Image
        src="/brand/logo-lockup.png"
        alt=""
        width={1456}
        height={470}
        priority={priority}
        className="h-12 w-auto md:h-14"
      />
    </span>
  );
}
