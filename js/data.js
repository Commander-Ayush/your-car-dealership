/* ============================================================
   MAISON MOTORS — data.js
   Static inventory of 12 vehicles
   ============================================================ */

window.MM_VEHICLES = [
  {
    id: 'mm-001', make: 'Porsche', model: '911 GT3 RS', year: 2024, price: 245000, mileage: 1200,
    body: 'Coupe', transmission: 'PDK Automatic', fuel: 'Petrol', color: 'Crayon White',
    horsepower: 518, zeroToSixty: 3.0, topSpeed: 184,
    description: "An uncompromising track-focused machine. The GT3 RS distills decades of Porsche motorsport DNA into a single, breathtakingly precise instrument.",
    images: [
      'https://images.pexels.com/photos/36237587/pexels-photo-36237587.jpeg',
      'https://static.prod-images.emergentagent.com/jobs/6d76a550-a766-4da0-8c9f-1d3a87264e0e/images/db12b4335703f26da9d36a92ace97304d3ba98a1797018edaa51eabf65cd7b14.png',
      'https://static.prod-images.emergentagent.com/jobs/6d76a550-a766-4da0-8c9f-1d3a87264e0e/images/ef17fe167a96451d044252ddedcc6aec41df928806cc33a6acbf843c86e6b9ea.png',
    ],
    featured: true, tier: 'Exotic',
  },
  {
    id: 'mm-002', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, price: 625000, mileage: 850,
    body: 'Coupe', transmission: '8-Speed DCT', fuel: 'Hybrid', color: 'Rosso Corsa',
    horsepower: 986, zeroToSixty: 2.5, topSpeed: 211,
    description: "Ferrari's first plug-in hybrid supercar. A 4.0L twin-turbo V8 paired with three electric motors — the future of Maranello, today.",
    images: [
      'https://images.pexels.com/photos/17077313/pexels-photo-17077313.jpeg',
      'https://images.pexels.com/photos/29370663/pexels-photo-29370663.jpeg',
    ],
    featured: true, tier: 'Exotic',
  },
  {
    id: 'mm-003', make: 'Lamborghini', model: 'Revuelto', year: 2024, price: 608000, mileage: 420,
    body: 'Coupe', transmission: '8-Speed DCT', fuel: 'Hybrid', color: 'Arancio Apodis',
    horsepower: 1001, zeroToSixty: 2.5, topSpeed: 217,
    description: "The first HPEV from Sant'Agata. A naturally aspirated V12 reborn with three electric motors and a brand new carbon monocoque.",
    images: ['https://images.pexels.com/photos/35102752/pexels-photo-35102752.jpeg'],
    featured: true, tier: 'Exotic',
  },
  {
    id: 'mm-004', make: 'Rolls-Royce', model: 'Phantom Series II', year: 2024, price: 510000, mileage: 2100,
    body: 'Sedan', transmission: '8-Speed Automatic', fuel: 'Petrol', color: 'Arctic White',
    horsepower: 563, zeroToSixty: 5.1, topSpeed: 155,
    description: "The pinnacle of luxury motoring. Bespoke craftsmanship, a magic-carpet ride, and the most silent cabin in the automotive world.",
    images: [
      'https://images.pexels.com/photos/3894063/pexels-photo-3894063.jpeg',
      'https://images.pexels.com/photos/29370663/pexels-photo-29370663.jpeg',
    ],
    featured: true, tier: 'Luxury',
  },
  {
    id: 'mm-005', make: 'Bentley', model: 'Continental GT Speed', year: 2023, price: 285000, mileage: 4800,
    body: 'Coupe', transmission: '8-Speed DCT', fuel: 'Petrol', color: 'Beluga Black',
    horsepower: 650, zeroToSixty: 3.5, topSpeed: 208,
    description: "British grand touring perfected. A 6.0L W12 twin-turbo wrapped in handcrafted leather and polished veneer — equal parts brutal and refined.",
    images: [
      'https://images.pexels.com/photos/3954415/pexels-photo-3954415.jpeg',
      'https://images.pexels.com/photos/29370663/pexels-photo-29370663.jpeg',
    ],
    tier: 'Luxury',
  },
  {
    id: 'mm-006', make: 'Mercedes-Benz', model: 'AMG GT 63 S', year: 2024, price: 178000, mileage: 3200,
    body: 'Coupe', transmission: '9-Speed Automatic', fuel: 'Petrol', color: 'Obsidian Black',
    horsepower: 630, zeroToSixty: 3.1, topSpeed: 196,
    description: "Affalterbach's flagship four-door coupe. A 4.0L biturbo V8 mated to AMG's most sophisticated chassis tuning to date.",
    images: ['https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg'],
    tier: 'Premium',
  },
  {
    id: 'mm-007', make: 'BMW', model: 'M8 Competition', year: 2023, price: 142000, mileage: 6800,
    body: 'Coupe', transmission: '8-Speed Automatic', fuel: 'Petrol', color: 'Frozen Marina Bay Blue',
    horsepower: 617, zeroToSixty: 2.8, topSpeed: 190,
    description: "The most powerful M car ever produced. A track-honed bahnstormer with relentless thrust and a surprisingly civilised demeanour.",
    images: ['https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg'],
    tier: 'Premium',
  },
  {
    id: 'mm-008', make: 'Audi', model: 'R8 V10 Performance', year: 2023, price: 215000, mileage: 3900,
    body: 'Coupe', transmission: '7-Speed DCT', fuel: 'Petrol', color: 'Suzuka Grey',
    horsepower: 602, zeroToSixty: 3.1, topSpeed: 205,
    description: "The last of its kind. A naturally aspirated V10 in a quattro chassis — usable, precise, and impossibly engaging.",
    images: ['https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg'],
    tier: 'Premium',
  },
  {
    id: 'mm-009', make: 'Porsche', model: 'Taycan Turbo S', year: 2024, price: 195000, mileage: 1800,
    body: 'Sedan', transmission: '2-Speed Automatic', fuel: 'Electric', color: 'Frozen Berry',
    horsepower: 750, zeroToSixty: 2.6, topSpeed: 162,
    description: "Porsche's electric revolution. Devastating launch performance, race-bred chassis, and 800V architecture that redefines fast charging.",
    images: ['https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg'],
    tier: 'Premium',
  },
  {
    id: 'mm-010', make: 'Aston Martin', model: 'DB12', year: 2024, price: 248000, mileage: 980,
    body: 'Coupe', transmission: '8-Speed Automatic', fuel: 'Petrol', color: 'Iridescent Emerald',
    horsepower: 671, zeroToSixty: 3.5, topSpeed: 202,
    description: "The world's first super tourer. A 4.0L twin-turbo V8, an all-new bonded-aluminium chassis, and unmistakable Gaydon elegance.",
    images: ['https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'],
    tier: 'Luxury',
  },
  {
    id: 'mm-011', make: 'McLaren', model: '750S', year: 2024, price: 332000, mileage: 540,
    body: 'Coupe', transmission: '7-Speed DCT', fuel: 'Petrol', color: 'Volcano Yellow',
    horsepower: 740, zeroToSixty: 2.7, topSpeed: 206,
    description: "Woking's lightest, fastest series-production supercar. A carbon monocoque and a 4.0L twin-turbo V8 that rewires your sense of speed.",
    images: ['https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg'],
    tier: 'Exotic',
  },
  {
    id: 'mm-012', make: 'Mercedes-Benz', model: 'S-Class S580', year: 2024, price: 138000, mileage: 2400,
    body: 'Sedan', transmission: '9-Speed Automatic', fuel: 'Petrol', color: 'Diamond White',
    horsepower: 496, zeroToSixty: 4.4, topSpeed: 155,
    description: "The benchmark luxury sedan. Effortless V8 power, MBUX Hyperscreen, and rear-wheel steering wrapped in flagship Stuttgart refinement.",
    images: ['https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg'],
    tier: 'Premium',
  },
];

window.MM_MAKES  = [...new Set(MM_VEHICLES.map(v => v.make))].sort();
window.MM_BODIES = [...new Set(MM_VEHICLES.map(v => v.body))].sort();
window.MM_TIERS  = ['Exotic', 'Luxury', 'Premium'];
window.MM_YEARS  = [...new Set(MM_VEHICLES.map(v => v.year))].sort((a, b) => b - a);

window.MM_GET = function (id) {
  return MM_VEHICLES.find(v => v.id === id);
};
