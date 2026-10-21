import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  ClipboardCheck,
  IndianRupee,
  MapPin,
  PhoneCall,
  Play,
  Star,
} from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { CategoryGrid } from "@/components/services/CategoryGrid";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ReviewList } from "@/components/reviews/ReviewList";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { business, pestIssues, propertyTypes } from "@/lib/business";
import { faqs } from "@/lib/faqs";
import { services } from "@/lib/services";

const reasons = [
  {
    icon: ClipboardCheck,
    title: "A service you can compare",
    text: "Each visit has its own description, duration, and starting price, so you can tell a kitchen visit from a bungalow visit before you enquire.",
  },
  {
    icon: IndianRupee,
    title: "Starting prices, clearly marked",
    text: "Prices are shown as starting points in rupees. The final amount depends on the property and what the inspection finds.",
  },
  {
    icon: CalendarCheck2,
    title: "A time you request, not a fake slot",
    text: "You choose a preferred date and window. Nothing is marked available until the team confirms it.",
  },
  {
    icon: PhoneCall,
    title: "A person you can call",
    text: "Use the published phone numbers or WhatsApp. This site does not take payment or pretend a booking is confirmed.",
  },
  {
    icon: MapPin,
    title: "Based in Pune",
    text: "The published address is in Kothrud. The catalogue also lists Kasba Peth. Share your locality and the team will confirm the visit.",
  },
];

const steps = [
  "Choose a service.",
  "Share your pest problem and property details.",
  "Confirm availability and pricing.",
  "Schedule the treatment.",
  "Receive treatment guidance and follow-up information.",
];

const process = [
  {
    title: "Inspection",
    text: "The visit starts by looking at where the activity is, which rooms are involved, and whether children, pets, or food preparation change the approach.",
  },
  {
    title: "Treatment planning",
    text: "The technician matches the published service to the property. Plan options are confirmed here because their individual prices are not listed on the site.",
  },
  {
    title: "Application",
    text: "Spray, gel, traps, or another suitable method is used only as the selected service describes. You get instructions for that product, not a general rule for every visit.",
  },
  {
    title: "After the visit",
    text: "Preparation and re-entry depend on the treatment. A free revisit if pests return is listed only for Pest Control (Includes Utensil Removal).",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
        <div className="relative overflow-hidden rounded-[28px] bg-[#f4f7f2] md:min-h-[560px]">
          <div className="absolute inset-y-0 right-0 hidden w-[62%] md:block">
            <Image
              src="/images/Family Comfort with Pest Control Care.png"
              alt="A family and their dog on a living-room sofa"
              fill
              priority
              sizes="720px"
              className="object-cover object-[30%_42%]"
            />
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#f4f7f2] to-transparent" />
          </div>
          <p className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-forest shadow-[0_6px_20px_rgba(6,78,59,0.08)] md:right-6 md:top-6">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            100% Safe &amp; Eco-Friendly
          </p>
          <div className="relative z-10 px-5 pb-6 pt-16 sm:px-8 md:flex md:min-h-[520px] md:w-[58%] md:flex-col md:justify-center md:px-12 md:py-14">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <p className="font-semibold leading-none text-deep">Pune</p>
                <p className="mt-1 text-sm text-charcoal/60">{business.listedLocation}</p>
              </div>
            </div>
            <h1 className="mt-6 text-[2.05rem] font-bold leading-[1.12] tracking-tight text-deep md:text-[2.45rem]">
              Pest Control Services
              <br />
              in Pune
            </h1>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-sun" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-sm text-charcoal/70">
                <span className="font-semibold text-forest">{business.overallRating.toFixed(1)}</span>
                {` (${business.overallReviews} reviews)`}
              </p>
            </div>
            <p className="mt-5 text-lg font-semibold text-deep">{business.tagline}</p>
            <p className="mt-3 max-w-md text-[15px] leading-7 text-charcoal/80">
              Effective, eco-friendly and affordable pest control services for your home and business.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <ButtonLink href="/book">
                Book a Service
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-deep">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/25">
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
                </span>
              Watch Video
            </button>
            </div>
          </div>
          <div className="relative h-72 sm:h-80 md:hidden">
            <Image
              src="/images/Family Comfort with Pest Control Care.png"
              alt="A family and their dog on a living-room sofa"
              fill
              sizes="100vw"
              className="object-cover object-[18%_38%]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <form id="enquiry" action="/book" className="scroll-mt-28 rounded-3xl border border-line bg-white p-5 shadow-[0_16px_40px_rgba(6,78,59,0.06)]">
            <p className="text-sm font-semibold text-deep">Start an enquiry</p>
            <p className="mt-1 text-sm leading-6 text-charcoal/70">
              These details are optional. You can explore services without sending anything.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold text-deep">
                Location
                <input
                  name="location"
                  readOnly
                  value="Pune, Maharashtra"
                  className="mt-1 w-full rounded-2xl border border-line bg-mist px-3 py-3 font-medium"
                />
              </label>
              <label className="text-sm font-semibold text-deep">
                Property type
                <select name="property" defaultValue="" className="mt-1 w-full rounded-2xl border border-line bg-white px-3 py-3 font-medium">
                  <option value="">Any</option>
                  {propertyTypes.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-deep">
                Pest issue
                <select name="issue" defaultValue="" className="mt-1 w-full rounded-2xl border border-line bg-white px-3 py-3 font-medium">
                  <option value="">Not sure</option>
                  {pestIssues.map((issue) => (
                    <option key={issue.id} value={issue.id}>
                      {issue.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-deep">
                Preferred date
                <input type="date" name="date" className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium" />
              </label>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button type="submit" formAction="/services" className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold text-deep">
                Explore matching services
              </button>
              <button type="submit" className="min-h-11 rounded-full bg-forest px-5 text-sm font-semibold text-white hover:bg-deep">
                Continue enquiry
              </button>
            </div>
          </form>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Services</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-deep md:text-4xl">What service do you need?</h2>
          <p className="mt-3 text-base leading-7 text-charcoal/75">
            Six ways to look at the same Pune catalogue: by room, by property, or by the pest you have already seen.
          </p>
        </div>
        <div className="mt-8">
          <CategoryGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Catalogue</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-deep md:text-4xl">Our services</h2>
            <p className="mt-3 text-base leading-7 text-charcoal/75">
              Every price below is a starting price. Ratings and review counts stay with the service they belong to.
            </p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-forest">
            View all services
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-deep md:text-4xl">Why people enquire with us</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason) => (
            <article key={reason.title} className="rounded-3xl border border-line bg-white p-5">
              <reason.icon className="h-6 w-6 text-forest" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-deep">{reason.title}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/75">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-deep md:text-4xl">How it works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step} className="rounded-3xl border border-line bg-white p-5">
              <span className="text-sm font-semibold text-forest">0{index + 1}</span>
              <p className="mt-3 font-semibold leading-6 text-deep">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:px-6 lg:grid-cols-[280px_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Reviews</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-deep">What customers wrote</h2>
          <div className="mt-4">
            <StarRating value={business.overallRating} count={business.overallReviews} note={business.ratingNote} />
          </div>
          <p className="mt-4 text-sm leading-6 text-charcoal/70">
            The written reviews below are copied from the business website. They are not new testimonials, and they are not tied to a review platform.
          </p>
        </div>
        <ReviewList page={1} path="/" compact />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-deep md:text-4xl">What happens on a visit</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-charcoal/75">
          Preparation and the time before you re-enter a room depend on the selected treatment and the technician’s instructions.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item, index) => (
            <article key={item.title} className="rounded-3xl bg-white p-5 ring-1 ring-line">
              <p className="text-sm font-semibold text-forest">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-deep">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/75">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-deep">Questions before you book</h2>
          <Link href="/faq" className="text-sm font-semibold text-forest">
            All questions
          </Link>
        </div>
        <Accordion items={faqs.slice(0, 6)} />
      </section>

      <FinalCta />
    </>
  );
}
