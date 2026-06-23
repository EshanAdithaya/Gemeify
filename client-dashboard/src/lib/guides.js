// Editorial gem-education content. Plain data so pages can be statically
// rendered and fully indexed. Each guide maps to /guides/[slug].

export const GUIDES = [
  {
    slug: 'how-to-read-a-gemstone-certificate',
    title: 'How to Read a Gemstone Certificate',
    excerpt:
      'A lab report is your proof of authenticity and value. Learn what every line on a GIA, IGI or GRS certificate actually means.',
    category: 'Buying',
    readingTime: 6,
    updated: '2026-01-15',
    keywords: ['GIA certificate', 'gem lab report', 'how to read gem certificate'],
    sections: [
      {
        heading: 'Why the certificate matters',
        body: 'A gemstone certificate (or lab report) is an independent, scientific assessment of a stone from a recognised laboratory such as GIA, IGI, GRS, SSEF or Gübelin. It confirms the gem is natural, documents any treatments, and records the measurements that drive its value. Never buy an investment-grade stone without one.',
      },
      {
        heading: 'The fields that drive value',
        body: 'Focus on five fields: carat weight, dimensions, colour grade, clarity grade and treatment disclosure. For coloured stones, origin (e.g. "Sri Lanka" for sapphire or "Myanmar" for ruby) can change the price by multiples. Treatment matters enormously — an unheated sapphire commands a strong premium over a heated one.',
      },
      {
        heading: 'Spotting red flags',
        body: 'Verify the report number against the lab’s public database. Be wary of "in-house" certificates, missing treatment lines, or photos that do not match the listed dimensions. On Gemify, every listed certification number is recorded against the gem so you can cross-check it directly.',
      },
    ],
  },
  {
    slug: 'sapphire-buying-guide',
    title: 'The Complete Sapphire Buying Guide',
    excerpt:
      'From Ceylon blue to padparadscha, learn how colour, origin and heat treatment shape the price of a sapphire.',
    category: 'Buying',
    readingTime: 7,
    updated: '2026-02-02',
    keywords: ['sapphire buying guide', 'ceylon sapphire', 'unheated sapphire'],
    sections: [
      {
        heading: 'Colour is king',
        body: 'The single biggest driver of sapphire value is colour. The most sought-after blue is a vivid, slightly violet "royal blue" with strong saturation and medium-dark tone. Pastel, overly dark or greyish stones are far more affordable. Fancy sapphires — pink, yellow, and the rare pink-orange padparadscha — have their own passionate collectors.',
      },
      {
        heading: 'Origin and the Ceylon premium',
        body: 'Sri Lankan ("Ceylon") sapphires are prized for their bright, lively blue. Kashmir sapphires are legendary and exceedingly rare. Origin is determined by trace-element and inclusion analysis and should appear on a reputable lab report.',
      },
      {
        heading: 'Heated vs unheated',
        body: 'Most sapphires on the market are heat-treated to improve colour and clarity — this is a stable, accepted practice. Certified unheated stones of fine colour are rarer and carry a significant premium. Always confirm treatment status on the certificate before you pay an unheated price.',
      },
    ],
  },
  {
    slug: 'understanding-the-four-cs',
    title: 'Understanding the 4 Cs',
    excerpt:
      'Cut, colour, clarity and carat — the four pillars of gemstone grading, explained without the jargon.',
    category: 'Education',
    readingTime: 5,
    updated: '2026-01-28',
    keywords: ['4 Cs', 'diamond grading', 'gem clarity', 'gem cut'],
    sections: [
      {
        heading: 'Cut',
        body: 'Cut governs how a stone returns light. A well-cut gem sparkles and appears lively; a poor cut looks dull or "windowed" regardless of its other qualities. For coloured stones, cut also balances colour and weight retention.',
      },
      {
        heading: 'Colour',
        body: 'For diamonds, colour is graded from D (colourless) downward. For coloured stones, the ideal is a pure, saturated hue with even distribution. Colour is the dominant value factor for coloured gems.',
      },
      {
        heading: 'Clarity',
        body: 'Clarity measures internal inclusions and surface blemishes. Grades run from Flawless (FL) through VVS, VS, SI and beyond. Some inclusions are normal and even help confirm a stone is natural.',
      },
      {
        heading: 'Carat',
        body: 'Carat is weight, not size — one carat equals 0.2 grams. Because large fine gems are rare, price per carat rises sharply with size, especially at round milestone weights.',
      },
    ],
  },
  {
    slug: 'ethical-gemstone-sourcing',
    title: 'Ethical & Sustainable Gemstone Sourcing',
    excerpt:
      'What responsible sourcing means, why traceability matters, and the questions to ask before you buy.',
    category: 'Responsibility',
    readingTime: 5,
    updated: '2026-02-10',
    keywords: ['ethical gemstones', 'sustainable gems', 'traceable sapphire'],
    sections: [
      {
        heading: 'Why traceability matters',
        body: 'Responsible sourcing protects miners, communities and the environment. A traceable supply chain — ideally mine-to-market — lets you verify that a stone was extracted and cut under fair conditions.',
      },
      {
        heading: 'Questions to ask any seller',
        body: 'Where was the stone mined and cut? Can the seller document the chain of custody? Are treatments disclosed? Reputable sellers welcome these questions. Gemify verifies its sellers and surfaces shop verification status on every listing.',
      },
    ],
  },
];

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug) || null;
}
