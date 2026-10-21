import type { Category, CategorySlug, Service } from "@/lib/types";

const sharedAftercare = [
  "Follow the re-entry, ventilation, and cleaning instructions given for your visit. They depend on the product and the treatment used that day.",
  "Leave gel points and bait stations in place unless the technician asks you to move them.",
  "If pests are still active afterwards, call the published numbers and mention the service and visit date.",
];

const tellTheTeam = [
  "Tell the team about children, pets, pregnancy, or respiratory sensitivity when you enquire. Products differ, and this site does not make a blanket safety claim.",
];

export const categories: Category[] = [
  {
    slug: "kitchen-bathroom",
    name: "Kitchen & Bathroom",
    shortName: "Kitchens and bathrooms",
    description: "Treatment for the rooms where food, water, and hiding spots meet.",
    summary:
      "Kitchen and bathroom visits in Pune focus on cabinets, corners, drains, and the places cockroaches and ants use to travel. Two options are listed: one includes utensil removal, and one expects you to clear utensils yourself.",
    image: "/images/kitchen.jpg",
    imageAlt: "Bright kitchen with white cabinets and a marble island",
  },
  {
    slug: "apartment",
    name: "Apartment",
    shortName: "Apartments",
    description: "Spray and gel treatment planned for flats, cabinets, and shared walls.",
    summary:
      "Apartment pest control is priced separately because flats have compact kitchens, shared walls, and more routes through cabinets and cracks. Utensil removal can be included or handled by you.",
    image: "/images/apartment.jpg",
    imageAlt: "Exterior of a multi-storey apartment building",
  },
  {
    slug: "independent-house",
    name: "Independent House",
    shortName: "Independent houses",
    description: "Longer bungalow visits covering corners, drains, and the perimeter.",
    summary:
      "Independent houses and bungalows in Pune usually need more time than a flat. These visits cover corners, cabinets, drains, and, on the customer-cleared plan, the perimeter.",
    image: "/images/house.jpg",
    imageAlt: "Contemporary independent house with a garden and large windows",
  },
  {
    slug: "insect-bug",
    name: "Insect & Bug",
    shortName: "Insects and bugs",
    description: "Targeted cockroach treatment and bed bug treatment.",
    summary:
      "Choose a named insect treatment when the problem is specific: cockroaches in cracks, cabinets, and drains, or bed bugs in beds, sofas, and corners.",
    image: "/images/cabinets.jpg",
    imageAlt: "Kitchen with open shelves, a sink, and a cooking range",
  },
  {
    slug: "rodent",
    name: "Rodent",
    shortName: "Rodents",
    description: "Inspection, trapping, and bait stations matched to the property.",
    summary:
      "Rodent control starts with an inspection. Trapping and bait stations are used when they suit the property and the infestation. A plan-option count is not published for this service.",
    image: "/images/house.jpg",
    imageAlt: "Contemporary independent house with a garden and large windows",
  },
  {
    slug: "commercial",
    name: "Commercial",
    shortName: "Offices and shops",
    description: "Inspection and targeted treatment for offices and shops.",
    summary:
      "Office and shop pest control covers workstations, pantries, storage, and entry points. The visit is planned around how the space is used.",
    image: "/images/office.jpg",
    imageAlt: "Modern workplace with an office pantry and glass-walled rooms",
  },
];

export const services: Service[] = [
  {
    id: "kitchen-utensil-included",
    slug: "pest-control-includes-utensil-removal",
    category: "kitchen-bathroom",
    name: "Pest Control (Includes Utensil Removal)",
    rating: 4.7,
    reviewCount: 972,
    startingPrice: 1379,
    durationMinutes: 60,
    description:
      "Premium pest control for kitchens and bathrooms. Utensil removal included + free revisit if pests return.",
    overview:
      "This is the kitchen and bathroom visit for homes in Pune where you want the team to move utensils as part of the work. The published description is premium pest control for kitchens and bathrooms, with utensil removal included and a free revisit if pests return. It is the only service in this catalogue that states that revisit offer. The starting price is for the listed visit, not a flat rate for every kitchen size.",
    optionCount: 6,
    includes: [
      "Premium pest control for kitchens and bathrooms",
      "Utensil removal",
      "Free revisit if pests return",
    ],
    excludes: [],
    freeRevisit: true,
    image: "/images/kitchen.jpg",
    imageAlt: "Bright kitchen with white cabinets and a marble island",
    suitableFor:
      "Kitchens and bathrooms in Pune homes where utensil removal should be part of the visit.",
    preparation: [
      ...tellTheTeam,
      "You do not have to empty the cabinets yourself. Clear a safe path to the kitchen and bathroom.",
      "Set aside anything fragile or valuable if you would rather move it yourself.",
      "Store open food before the visit.",
    ],
    aftercare: sharedAftercare,
    faqs: [
      {
        question: "Does this visit include a free revisit?",
        answer:
          "Yes. The published description for this service says utensil removal is included and there is a free revisit if pests return. That offer is not listed on the other services in this catalogue.",
      },
      {
        question: "Do I need to remove utensils before the team arrives?",
        answer:
          "No. Utensil removal is included in this service. The lower-priced kitchen service is the one where the customer removes utensils.",
      },
      {
        question: "Why are there six options?",
        answer:
          "The catalogue lists six plan options. Their individual names and price differences are not published, so the page shows the starting price and asks you to enquire for the option that fits the property.",
      },
    ],
  },
  {
    id: "kitchen-utensil-customer",
    slug: "pest-control-utensil-removal-by-customer",
    category: "kitchen-bathroom",
    name: "Pest Control (Utensil Removal by Customer)",
    rating: 4.7,
    reviewCount: 1063,
    startingPrice: 1099,
    durationMinutes: 60,
    description: "Spray + gel treatment for cockroaches and ants. Excludes utensil removal.",
    overview:
      "Choose this kitchen and bathroom service when you will clear utensils yourself. The treatment is spray plus gel for cockroaches and ants, and utensil removal is excluded. It starts lower than the visit that includes removal, and it does not include the free-revisit line published on that other service. The estimated duration is 1 hour, with six plan options confirmed during enquiry.",
    optionCount: 6,
    includes: [
      "Spray treatment",
      "Gel treatment",
      "Treatment aimed at cockroaches and ants",
    ],
    excludes: ["Utensil removal"],
    freeRevisit: false,
    image: "/images/kitchen-prep.jpg",
    imageAlt: "Two people cooking together in a bright white kitchen",
    suitableFor:
      "Kitchens and bathrooms where someone at home can clear utensils before the visit.",
    preparation: [
      ...tellTheTeam,
      "Remove utensils, containers, and items from the cabinets so edges and corners can be reached.",
      "Cover or store open food, and wipe loose crumbs before the visit.",
      "Keep the sink area accessible.",
    ],
    aftercare: sharedAftercare,
    faqs: [
      {
        question: "Which pests does this service name?",
        answer: "The published description names cockroaches and ants, treated with spray and gel.",
      },
      {
        question: "Is utensil removal included?",
        answer: "No. This service excludes utensil removal. The customer clears utensils before treatment.",
      },
      {
        question: "Is the free revisit included here?",
        answer:
          "No. The free revisit if pests return is published only with Pest Control (Includes Utensil Removal).",
      },
    ],
  },
  {
    id: "apartment-utensil-included",
    slug: "apartment-pest-control-includes-utensil-removal",
    category: "apartment",
    name: "Apartment Pest Control (Includes Utensil Removal)",
    rating: 4.6,
    reviewCount: 1031,
    startingPrice: 1929,
    durationMinutes: 90,
    description: "Utensil removal, spray + gel treatment. Covers corners, cabinets, and cracks.",
    overview:
      "This apartment visit includes utensil removal and uses spray plus gel through corners, cabinets, and cracks. It is planned for flats in Pune, where compact kitchens and shared walls give insects more places to travel. The starting price is ₹1,929 and the estimated duration is 1 hour 30 minutes. Five plan options are listed without separate prices.",
    optionCount: 5,
    includes: [
      "Utensil removal",
      "Spray treatment",
      "Gel treatment",
      "Coverage for corners, cabinets, and cracks",
    ],
    excludes: [],
    freeRevisit: false,
    image: "/images/apartment.jpg",
    imageAlt: "Exterior of a multi-storey apartment building",
    suitableFor: "Apartments and flats where utensil removal should be included in the visit.",
    preparation: [
      ...tellTheTeam,
      "You do not have to empty cabinets yourself on this plan. Keep corridors and the kitchen reachable.",
      "Tell the team the flat size and whether the activity is mainly in the kitchen.",
      "Store open food and pet bowls before the visit.",
    ],
    aftercare: sharedAftercare,
    faqs: [
      {
        question: "How is this different from the kitchen-only visit?",
        answer:
          "This service is listed for apartments and includes corners, cabinets, and cracks as well as utensil removal. The kitchen and bathroom services are priced and described separately.",
      },
      {
        question: "How long should I allow?",
        answer: "The published duration is 90 minutes, shown on this site as 1 hour 30 minutes.",
      },
      {
        question: "Does the starting price cover every flat?",
        answer:
          "No. ₹1,929 is the starting price. The final amount can change after the property and the level of activity are understood.",
      },
    ],
  },
  {
    id: "apartment-utensil-customer",
    slug: "apartment-pest-control-utensil-removal-by-customer",
    category: "apartment",
    name: "Apartment Pest Control (Utensil Removal by Customer)",
    rating: 4.7,
    reviewCount: 1042,
    startingPrice: 1659,
    durationMinutes: 75,
    description: "Spray + gel treatment, crack and drain coverage. Excludes utensil removal.",
    overview:
      "This is the apartment service for households that will remove utensils themselves. Treatment is spray plus gel, with crack and drain coverage, and utensil removal is excluded. It starts at ₹1,659 with an estimated duration of 1 hour 15 minutes. Five plan options are available; the right one is confirmed when you enquire.",
    optionCount: 5,
    includes: ["Spray treatment", "Gel treatment", "Crack coverage", "Drain coverage"],
    excludes: ["Utensil removal"],
    freeRevisit: false,
    image: "/images/apartment-interior.jpg",
    imageAlt: "Bright apartment living and dining area with large windows",
    suitableFor: "Apartments where the household can clear utensils before the technician arrives.",
    preparation: [
      ...tellTheTeam,
      "Clear utensils from cabinets and leave drain areas reachable.",
      "Move items only as far as you need to. Do not spread infested belongings into untreated rooms.",
      "Note whether you have seen activity near the bathroom drain or kitchen cracks.",
    ],
    aftercare: sharedAftercare,
    faqs: [
      {
        question: "What does crack and drain coverage mean here?",
        answer:
          "The published description says the spray and gel treatment includes crack and drain coverage. Exact products and placement are decided for the flat.",
      },
      {
        question: "Who removes the utensils?",
        answer: "You do. Utensil removal is excluded from this service.",
      },
      {
        question: "Can I book this for a bungalow?",
        answer:
          "This price and duration are for the apartment service. Independent houses have their own bungalow services with different starting prices and longer visits.",
      },
    ],
  },
  {
    id: "bungalow-utensil-included",
    slug: "bungalow-pest-control-includes-utensil-removal",
    category: "independent-house",
    name: "Bungalow Pest Control (Includes Utensil Removal)",
    rating: 4.7,
    reviewCount: 996,
    startingPrice: 2439,
    durationMinutes: 180,
    description: "Utensil removal + spray and gel treatment. Corner, cabinet, and drain coverage.",
    overview:
      "Bungalow pest control with utensil removal is the longer independent-house visit. It includes utensil removal, spray and gel treatment, and coverage for corners, cabinets, and drains. The starting price is ₹2,439 and the estimated duration is 3 hours. Four plan options are listed. A larger house can need a different final price than the starting figure.",
    optionCount: 4,
    includes: [
      "Utensil removal",
      "Spray treatment",
      "Gel treatment",
      "Corner, cabinet, and drain coverage",
    ],
    excludes: [],
    freeRevisit: false,
    image: "/images/house.jpg",
    imageAlt: "Contemporary independent house with a garden and large windows",
    suitableFor: "Independent houses and bungalows where utensil removal is included.",
    preparation: [
      ...tellTheTeam,
      "You do not have to clear utensils yourself. Make kitchens, bathrooms, and service areas accessible.",
      "Share the number of floors and kitchens so the team can judge the visit.",
      "Keep pets in a room that is not being treated until you are given re-entry guidance.",
    ],
    aftercare: sharedAftercare,
    faqs: [
      {
        question: "Why is this visit longer than the apartment service?",
        answer:
          "The published duration is 180 minutes, about 3 hours, compared with 90 minutes for the apartment visit that includes utensil removal. Independent houses usually have more area to cover.",
      },
      {
        question: "Is perimeter treatment included?",
        answer:
          "Perimeter treatment is named on the bungalow service where the customer removes utensils. This service names utensil removal plus corner, cabinet, and drain coverage.",
      },
      {
        question: "Are all four options the same price?",
        answer:
          "The site only publishes a starting price. The four options are not itemised, so the team needs to match one to the house.",
      },
    ],
  },
  {
    id: "bungalow-utensil-customer",
    slug: "bungalow-pest-control-utensil-removal-by-customer",
    category: "independent-house",
    name: "Bungalow Pest Control (Utensil Removal by Customer)",
    rating: 4.6,
    reviewCount: 1021,
    startingPrice: 2169,
    durationMinutes: 150,
    description:
      "Inspection, treatment, crack and drain coverage, perimeter treatment, and pest-prevention tips.",
    overview:
      "This bungalow service is for independent houses where the customer removes utensils. The published scope is an inspection, treatment, crack and drain coverage, perimeter treatment, and pest-prevention tips. It starts at ₹2,169 and is estimated at 2 hours 30 minutes. Four plan options exist. The perimeter work is specific to this description and is not copied onto every other service.",
    optionCount: 4,
    includes: [
      "Inspection",
      "Treatment",
      "Crack and drain coverage",
      "Perimeter treatment",
      "Pest-prevention tips",
    ],
    excludes: ["Utensil removal"],
    freeRevisit: false,
    image: "/images/hero-living.jpg",
    imageAlt: "Sunlit living room with a sofa, armchairs, and houseplants",
    suitableFor:
      "Independent houses where the household can clear utensils and the perimeter also needs attention.",
    preparation: [
      ...tellTheTeam,
      "Clear utensils before the visit and unlock gates or side passages needed for the perimeter.",
      "Point out droppings, gnaw marks, or insect activity you have already noticed.",
      "Keep children and pets away from the outside areas while treatment is underway.",
    ],
    aftercare: [
      ...sharedAftercare,
      "Use the prevention tips you are given for this property. They are guidance from the visit, not a guarantee that pests cannot return.",
    ],
    faqs: [
      {
        question: "What is included beyond spraying?",
        answer:
          "The description includes an inspection, treatment, crack and drain coverage, perimeter treatment, and pest-prevention tips.",
      },
      {
        question: "How long is the visit?",
        answer: "The published duration is 150 minutes, which is 2 hours 30 minutes.",
      },
      {
        question: "Do I remove utensils myself?",
        answer: "Yes. The service name states that utensil removal is done by the customer.",
      },
    ],
  },
  {
    id: "cockroach-control",
    slug: "cockroach-control-treatment",
    category: "insect-bug",
    name: "Cockroach Control Treatment (Utensil Removal by Customer)",
    rating: 4.7,
    reviewCount: 1007,
    startingPrice: 849,
    durationMinutes: 60,
    description:
      "Cockroach treatment with gel + spray application. Targets cracks, cabinets, and drain areas.",
    overview:
      "This is a cockroach-specific treatment for Pune homes, not a general kitchen package. Gel and spray are applied to cracks, cabinets, and drain areas. Utensil removal is by the customer, and the visit starts at ₹849 for about 1 hour. Six plan options are listed. If you also want ants named in the scope, compare it with the kitchen service that explicitly includes cockroaches and ants.",
    optionCount: 6,
    includes: [
      "Cockroach treatment",
      "Gel application",
      "Spray application",
      "Attention to cracks, cabinets, and drain areas",
    ],
    excludes: ["Utensil removal"],
    freeRevisit: false,
    image: "/images/cabinets.jpg",
    imageAlt: "Kitchen with open shelves, a sink, and a cooking range",
    suitableFor: "Homes where cockroaches are the main problem and utensils will be cleared by the household.",
    preparation: [
      ...tellTheTeam,
      "Empty the cabinets you want treated and clear the area around drains.",
      "Do not use another spray on top of the treatment area just before the visit.",
      "Keep food covered and wash any surfaces you use for eating before you put items back, following the technician’s instructions.",
    ],
    aftercare: sharedAftercare,
    faqs: [
      {
        question: "Is this only for cockroaches?",
        answer:
          "The service name and description are for cockroach treatment. Ants are named on the separate kitchen service that uses spray and gel for cockroaches and ants.",
      },
      {
        question: "Where is the treatment placed?",
        answer: "The published targets are cracks, cabinets, and drain areas, using gel and spray.",
      },
      {
        question: "Why is the starting price lower than the kitchen packages?",
        answer:
          "This catalogue lists it as its own service at ₹849. It does not include utensil removal and it does not use the kitchen-package description. The final price still depends on the property.",
      },
    ],
  },
  {
    id: "bed-bug-control",
    slug: "bed-bug-control",
    category: "insect-bug",
    name: "Bed Bug Control",
    rating: 4.6,
    reviewCount: 1048,
    startingPrice: 1759,
    durationMinutes: 90,
    description:
      "Bed bug treatment targeting beds, sofas, cracks, and corners, using the appropriate treatment method.",
    overview:
      "Bed bug control targets beds, sofas, cracks, and corners. The catalogue does not name a single chemical or promise a one-visit result. It says the appropriate treatment method is used, which is decided for the furniture and the level of activity. The starting price is ₹1,759, the estimated duration is 1 hour 30 minutes, and five plan options are listed without further price detail.",
    optionCount: 5,
    includes: [
      "Bed bug treatment",
      "Attention to beds, sofas, cracks, and corners",
      "A treatment method chosen for the situation",
    ],
    excludes: [],
    freeRevisit: false,
    image: "/images/bedroom.jpg",
    imageAlt: "Bedroom with a made bed, bedside tables, and a large window",
    suitableFor: "Homes where bed bugs are suspected in sleeping or seating furniture.",
    preparation: [
      ...tellTheTeam,
      "Reduce clutter around beds and sofas so frames, seams, and corners can be reached.",
      "Do not carry infested bedding into another room before the visit.",
      "Wash linen only if the technician asks, and bag it before moving it through the home.",
    ],
    aftercare: [
      ...sharedAftercare,
      "Ask when mattresses, sofas, and rooms can be used again. That timing depends on the method used.",
    ],
    faqs: [
      {
        question: "Will I have to leave the home?",
        answer:
          "It depends on the treatment method. The technician will tell you whether people and pets need to stay out of the treated rooms, and for how long. There is no single rule for every bed bug visit.",
      },
      {
        question: "Does the price cover every bedroom?",
        answer:
          "₹1,759 is the starting price. More rooms or heavy activity can change the recommendation and the price.",
      },
      {
        question: "Is a heat treatment or a spray specified?",
        answer:
          "No. The catalogue says the appropriate treatment method is used. The method is not itemised here, so it should be confirmed before the visit.",
      },
    ],
  },
  {
    id: "rodent-control",
    slug: "rodent-control",
    category: "rodent",
    name: "Rodent Control",
    rating: 4.6,
    reviewCount: 1023,
    startingPrice: 999,
    durationMinutes: 60,
    description:
      "Inspection, trapping, and bait stations. Treatment suitability depends on the property and infestation.",
    overview:
      "Rodent control in this catalogue begins with an inspection and can include trapping and bait stations. It is not presented as one method for every property. Suitability depends on the building and the infestation, which matters in homes with children, pets, or food businesses. The starting price is ₹999 and the estimated duration is 1 hour. A plan-option count is not specified, so this page does not invent one.",
    optionCount: null,
    includes: ["Inspection", "Trapping", "Bait stations"],
    excludes: [],
    freeRevisit: false,
    image: "/images/house.jpg",
    imageAlt: "Contemporary independent house with a garden and large windows",
    suitableFor:
      "Homes and other properties in Pune where rats or mice are suspected, subject to an inspection.",
    preparation: [
      ...tellTheTeam,
      "Note where you have seen droppings, gnawing, or movement, including lofts, kitchens, and outside drains.",
      "Keep pet food stored and tell the team where pets roam. Bait is not suitable for every household.",
      "Do not block the holes you want inspected.",
    ],
    aftercare: [
      ...sharedAftercare,
      "Do not move traps or bait stations. Ask when they will be checked.",
      "If the inspection shows the method is unsuitable, the team should say so rather than force a standard package.",
    ],
    faqs: [
      {
        question: "Are bait stations always used?",
        answer:
          "The service lists inspection, trapping, and bait stations. The description also says suitability depends on the property and the infestation, so bait is not automatic.",
      },
      {
        question: "How many plan options are there?",
        answer: "The catalogue does not specify an option count for rodent control.",
      },
      {
        question: "Is the price the same for a shop and a flat?",
        answer:
          "No. ₹999 is a starting price. The inspection decides what is suitable and what the visit should cost.",
      },
    ],
  },
  {
    id: "office-shop",
    slug: "office-shop-pest-control",
    category: "commercial",
    name: "Office/Shop Pest Control",
    rating: 4.7,
    reviewCount: 1041,
    startingPrice: 1899,
    durationMinutes: 150,
    description:
      "Inspection and targeted treatment for offices and shops, covering workstations, pantries, storage areas, and entry points.",
    overview:
      "Office and shop pest control is an inspection plus targeted treatment for commercial rooms in Pune. The published coverage is workstations, pantries, storage areas, and entry points. It starts at ₹1,899 and is estimated at 2 hours 30 minutes, with four plan options. A busy shop may need a time that avoids customers, so share your operating hours when you enquire. The final scope depends on the premises.",
    optionCount: 4,
    includes: [
      "Inspection",
      "Targeted treatment",
      "Workstations",
      "Pantries",
      "Storage areas",
      "Entry points",
    ],
    excludes: [],
    freeRevisit: false,
    image: "/images/office.jpg",
    imageAlt: "Modern workplace with an office pantry and glass-walled rooms",
    suitableFor: "Offices and shops that need an inspection and treatment around staff areas and stock.",
    preparation: [
      ...tellTheTeam,
      "Share opening hours and any rooms that must stay in use during the visit.",
      "Make the pantry, storage, and entry points accessible.",
      "Tell the team if food is prepared or sold on site.",
    ],
    aftercare: [
      ...sharedAftercare,
      "Pass the technician’s re-entry and cleaning instructions to the people who use the pantry and store.",
    ],
    faqs: [
      {
        question: "Can this be done after closing time?",
        answer:
          "You can request a preferred time. This website cannot show a slot as free until the team confirms it. Closing-time visits depend on their schedule.",
      },
      {
        question: "Which areas are named in the service?",
        answer: "Workstations, pantries, storage areas, and entry points, after an inspection.",
      },
      {
        question: "Is this a contract for the whole year?",
        answer:
          "No annual contract is published here. The catalogue shows a starting price for the service and four plan options. Ask if you need a repeat visit.",
      },
    ],
  },
];

const categoryOrder = new Map(categories.map((category, index) => [category.slug, index]));

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getServicesByCategory(slug: CategorySlug): Service[] {
  return services.filter((service) => service.category === slug);
}

export function getService(category: string, slug: string): Service | undefined {
  return services.find((service) => service.category === category && service.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service, limit = 3): Service[] {
  const sameCategory = services.filter(
    (item) => item.category === service.category && item.id !== service.id,
  );
  const others = services.filter((item) => item.category !== service.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function filterServices(property?: string, issue?: string): Service[] {
  if (issue === "bed-bugs") {
    return services.filter((service) => service.id === "bed-bug-control");
  }
  if (issue === "cockroaches-ants") {
    return services.filter(
      (service) => service.category === "insect-bug" || service.category === "kitchen-bathroom",
    );
  }
  if (issue === "rodents") {
    return services.filter((service) => service.category === "rodent");
  }
  if (issue === "kitchen") {
    return services.filter((service) => service.category === "kitchen-bathroom");
  }
  if (property && property !== "other" && categoryOrder.has(property as CategorySlug)) {
    return services.filter((service) => service.category === property);
  }
  return services;
}

export const otherPublishedServices = [
  "Sanitization and disinfectant services",
  "Termite treatment",
  "Mosquito management",
  "Crawling insect control",
  "Fogging",
  "Wood borer management",
  "Honey bee removal",
  "Lizard control",
  "Spider control",
];
