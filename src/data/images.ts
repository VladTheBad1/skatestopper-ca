export interface ImageData {
  src: string;
  alt: { en: string; fr: string };
  width: number;
  height: number;
}

export const images: Record<string, Record<string, ImageData>> = {
  hero: {
    main: {
      src: '/images/hero/hero.webp',
      alt: {
        en: 'Granite ledge along a Canadian downtown plaza — the kind of edge skate stoppers protect from grind damage',
        fr: "Rebord en granite d'une place urbaine canadienne — le type de surface que les bloque-skate protègent des dégâts de glisse",
      },
      width: 1920,
      height: 1080,
    },
  },
  products: {
    'skate-stoppers': {
      src: '/images/products/skate-stoppers.webp',
      alt: {
        en: 'Skate stoppers installed on a granite planter wall with no-skateboarding signage in a Canadian downtown plaza',
        fr: "Bloque-skate installés sur un mur de bac en granite avec signalisation anti-planche dans une place urbaine canadienne",
      },
      width: 1600,
      height: 1200,
    },
    'skateboard-deterrents-for-ledges': {
      src: '/images/products/skateboard-deterrents-for-ledges.webp',
      alt: {
        en: 'Skateboard deterrents installed along a painted concrete ledge with notched anti-grind edge profile in a Canadian commercial plaza',
        fr: "Dissuasifs skateboard installés le long d'un rebord en béton peint avec profil anti-glisse dentelé dans une place commerciale canadienne",
      },
      width: 1600,
      height: 1200,
    },
    'skateboard-deterrents-for-handrails': {
      src: '/images/products/skateboard-deterrents-for-handrails.webp',
      alt: {
        en: 'Stainless saddle-stop skateboard deterrents clamped on round handrails along a granite staircase in Canada',
        fr: "Dissuasifs skateboard en inox montés sur des mains courantes rondes le long d'un escalier en granite au Canada",
      },
      width: 1600,
      height: 2134,
    },
    'skateboard-deterrents-for-benches': {
      src: '/images/products/skateboard-deterrents-for-benches.webp',
      alt: {
        en: 'Skateboard deterrent studs spaced along a wood-slat park bench with metal frame in a Canadian municipal park',
        fr: "Plots dissuasifs skateboard espacés le long d'un banc de parc en lattes de bois à structure métallique au Canada",
      },
      width: 1600,
      height: 1200,
    },
    'skateboard-deterrents-for-concrete': {
      src: '/images/products/skateboard-deterrents-for-concrete.webp',
      alt: {
        en: 'Decorative leaf-shaped skateboard deterrent epoxy-anchored to a concrete curb edge in a Canadian municipal landscape',
        fr: "Dissuasif skateboard décoratif en forme de feuille ancré à l'époxy sur le bord d'une bordure en béton dans un aménagement municipal canadien",
      },
      width: 1600,
      height: 2134,
    },
    'skateboard-deterrents-for-sidewalks': {
      src: '/images/products/skateboard-deterrents-for-sidewalks.webp',
      alt: {
        en: 'Skateboard deterrents installed along a sidewalk seam in a Canadian downtown streetscape',
        fr: "Dissuasifs skateboard installés le long d'une jonction de trottoir dans une rue commerciale canadienne",
      },
      width: 1600,
      height: 1200,
    },
  },
  industries: {},
  cities: {
    toronto: {
      src: '/images/cities/toronto-hero.webp',
      alt: { en: 'Skate stopper installation in Toronto, Ontario — granite plaza ledges in the financial district', fr: "Installation de bloque-skate à Toronto, Ontario — rebords en granite du quartier financier" },
      width: 1600, height: 900,
    },
    montreal: {
      src: '/images/cities/montreal-hero.webp',
      alt: { en: 'Skate stopper installation in Montréal, Québec — Vieux-Montréal heritage stone', fr: "Installation de bloque-skate à Montréal, Québec — pierre patrimoniale du Vieux-Montréal" },
      width: 1600, height: 900,
    },
    vancouver: {
      src: '/images/cities/vancouver-hero.webp',
      alt: { en: 'Skate stopper installation in Vancouver, BC — coastal salt-air conditions require 316L stainless', fr: "Installation de bloque-skate à Vancouver, C.-B. — air salin côtier exige inox 316L" },
      width: 1600, height: 900,
    },
    calgary: {
      src: '/images/cities/calgary-hero.webp',
      alt: { en: 'Skate stopper installation in Calgary, Alberta — frost-line anchoring for prairie freeze-thaw', fr: "Installation de bloque-skate à Calgary, Alberta — ancrage adapté aux cycles gel-dégel des Prairies" },
      width: 1600, height: 900,
    },
  },
}
