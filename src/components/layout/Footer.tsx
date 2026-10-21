import Link from "next/link";
import { business } from "@/lib/business";
import { categories } from "@/lib/services";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <Logo framed />
          <p className="mt-4 text-sm leading-6 text-white/75">
            Pest control for kitchens, homes, apartments, and commercial spaces in Pune.
            {` ${business.tagline}`}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/services/${category.slug}`} className="text-white/80 hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Reviews", "/reviews"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
              ["Enquire", "/book"],
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-white/80 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">Contact</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/80">
            <p>
              Published address
              <br />
              {business.publishedAddress.street}, {business.publishedAddress.locality}{" "}
              {business.publishedAddress.postalCode}
            </p>
            <p>Listed service location: {business.listedLocation}</p>
            <p>Service area: {business.serviceArea}</p>
            {business.phones.map((phone) => (
              <p key={phone.id}>
                <a href={phone.tel} className="font-semibold text-white hover:text-lime">
                  {phone.display}
                </a>
                <span className="block text-xs text-white/55">{phone.label}</span>
              </p>
            ))}
            {business.email ? (
              <p>
                <a href={`mailto:${business.email}`} className="hover:text-lime">
                  {business.email}
                </a>
              </p>
            ) : (
              <p>No public email address is listed.</p>
            )}
            <p>
              <a href={business.facebook} className="hover:text-lime" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/55 md:px-6">
          © {new Date().getFullYear()} Vaishnavi Pest Control. Prices shown are starting prices for Pune.
        </p>
      </div>
    </footer>
  );
}
