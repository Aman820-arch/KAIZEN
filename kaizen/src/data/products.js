/**
 * Local product catalog.
 * Replace this module with API calls when a backend exists.
 * Keep field names stable so UI components do not need to change.
 */

export const collections = [
  {
    id: 'horizon',
    slug: 'horizon',
    name: 'Horizon',
    tagline: 'Quiet presence for daily wear.',
  },
  {
    id: 'atelier',
    slug: 'atelier',
    name: 'Atelier',
    tagline: 'Complications with a measured hand.',
  },
  {
    id: 'nocturne',
    slug: 'nocturne',
    name: 'Nocturne',
    tagline: 'Evenings, low light, and longer hours.',
  },
]

export const products = [
  {
    id: 'kz-hz-40',
    slug: 'horizon-40',
    name: 'Horizon 40',
    collection: 'horizon',
    reference: 'KZ.HZ.40.01',
    price: 4200,
    currency: 'USD',
    featured: true,
    isNew: true,
    limited: false,
    description:
      'A 40mm dress-sport piece with a sunburst dial and a thin, hand-finished case.',
    story:
      'Horizon is the first expression of KAIZEN: proportion, restraint, and a movement chosen for reliability rather than spectacle.',
    specs: {
      movement: 'Automatic, 38-hour power reserve',
      case: '316L stainless steel',
      diameter: '40mm',
      thickness: '10.2mm',
      waterResistance: '100m',
      crystal: 'Sapphire, anti-reflective',
      strap: 'Calf leather, steel pin buckle',
    },
    images: {
      hero: '/images/watches/horizon-40.jpg',
      gallery: [
        '/images/watches/horizon-40.jpg',
        '/images/watches/horizon-40-dial.jpg',
      ],
    },
  },
  {
    id: 'kz-at-chrono',
    slug: 'atelier-chronograph',
    name: 'Atelier Chronograph',
    collection: 'atelier',
    reference: 'KZ.AT.CH.02',
    price: 6800,
    currency: 'USD',
    featured: true,
    isNew: false,
    limited: false,
    description:
      'A column-wheel chronograph with a silvered opaline dial and subdials kept deliberately quiet.',
    story:
      'The Atelier line treats complications as craft, not display. Timing functions sit inside a case that still reads as a wristwatch.',
    specs: {
      movement: 'Automatic chronograph, 48-hour power reserve',
      case: '316L stainless steel',
      diameter: '41mm',
      thickness: '13.4mm',
      waterResistance: '50m',
      crystal: 'Sapphire, anti-reflective',
      strap: 'Alligator leather, steel folding clasp',
    },
    images: {
      hero: '/images/watches/atelier-chronograph.jpg',
      gallery: ['/images/watches/atelier-chronograph.jpg'],
    },
  },
  {
    id: 'kz-nc-moon',
    slug: 'nocturne-moon',
    name: 'Nocturne Moon',
    collection: 'nocturne',
    reference: 'KZ.NC.MN.03',
    price: 7400,
    currency: 'USD',
    featured: true,
    isNew: false,
    limited: true,
    description:
      'A moon-phase watch with a dark lacquered dial and a discreet date at six.',
    story:
      'Nocturne is built for dim rooms and late hours. The moon disc is the only ornament; everything else recedes.',
    specs: {
      movement: 'Automatic moon phase, 42-hour power reserve',
      case: '316L stainless steel',
      diameter: '39mm',
      thickness: '11.1mm',
      waterResistance: '50m',
      crystal: 'Sapphire, anti-reflective',
      strap: 'Suede leather, steel pin buckle',
    },
    images: {
      hero: '/images/watches/nocturne-moon.jpg',
      gallery: ['/images/watches/nocturne-moon.jpg'],
    },
  },
  {
    id: 'kz-hz-36',
    slug: 'horizon-36',
    name: 'Horizon 36',
    collection: 'horizon',
    reference: 'KZ.HZ.36.01',
    price: 3900,
    currency: 'USD',
    featured: false,
    isNew: true,
    limited: false,
    description:
      'The smaller Horizon: the same architecture, refined for a lighter presence on the wrist.',
    story:
      'A companion to the 40mm, sharing the same movement family and finishing, scaled for balance rather than fashion.',
    specs: {
      movement: 'Automatic, 38-hour power reserve',
      case: '316L stainless steel',
      diameter: '36mm',
      thickness: '9.8mm',
      waterResistance: '100m',
      crystal: 'Sapphire, anti-reflective',
      strap: 'Calf leather, steel pin buckle',
    },
    images: {
      hero: '/images/watches/horizon-36.jpg',
      gallery: ['/images/watches/horizon-36.jpg'],
    },
  },
]

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}

export function getProductsByCollection(collectionSlug) {
  return products.filter((product) => product.collection === collectionSlug)
}

export function getCollectionBySlug(slug) {
  return collections.find((collection) => collection.slug === slug) ?? null
}
