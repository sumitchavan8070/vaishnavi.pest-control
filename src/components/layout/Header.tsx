"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { business } from "@/lib/business";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const phone = business.phones[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur",
        scrolled && "border-line shadow-[0_8px_30px_rgba(6,78,59,0.06)]",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="mr-auto rounded-xl" aria-label="Vaishnavi Pest Control, home">
          <Logo priority />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-mist hover:text-deep",
                isActive(pathname, link.href) && "bg-mist text-deep",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="hidden items-center gap-1 text-sm font-medium text-charcoal/80 xl:flex">
          <MapPin className="h-4 w-4 text-forest" aria-hidden="true" />
          Pune, Maharashtra
        </p>
        <a href={phone.tel} className="hidden items-center gap-1 text-sm font-semibold text-deep md:inline-flex">
          <Phone className="h-4 w-4 text-forest" aria-hidden="true" />
          {phone.display}
        </a>
        <Link
          href="/book"
          className="hidden min-h-11 items-center rounded-full bg-forest px-4 text-sm font-semibold text-white hover:bg-deep md:inline-flex"
        >
          Book a Service
        </Link>
        <a href={phone.tel} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest md:hidden" aria-label={`Call ${phone.display}`}>
          <Phone className="h-5 w-5" />
        </a>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div id={menuId} className="border-t border-line bg-white px-4 py-4 lg:hidden">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-charcoal/80">
            <MapPin className="h-4 w-4 text-forest" aria-hidden="true" />
            Pune, Maharashtra
          </p>
          <nav aria-label="Mobile" className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className="rounded-2xl px-3 py-3 text-base font-medium text-deep hover:bg-mist"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/book" className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-forest px-4 font-semibold text-white">
            Book a Service
          </Link>
        </div>
      ) : null}
    </header>
  );
}
