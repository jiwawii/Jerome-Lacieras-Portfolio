export type ProjectCategory = 'Advertising' | 'Social Media' | 'Branding' | 'Marketing' | 'Posters';

export type PortfolioProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: ProjectCategory[];
  thumbnail: string;
  behanceUrl: string;
  featured: boolean;
  role: string;
  description?: string;
  images?: string[];
};

export const luckyImages = [
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/ef200e256501323.6abe06033d310.jpg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/f17733256501323.6abe06033f9cb.jpg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/994568256501323.6abe06033bf4f.jpg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/a0a435256501323.6abe06033eee6.jpg',
];

export const projects: PortfolioProject[] = [
  {
    id: 'lucky-world',
    title: 'Brand Visuals for Lucky World Online (iGaming Brand)',
    category: 'Branding',
    tags: ['Branding', 'Marketing', 'Advertising', 'Social Media'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/bb82e1256501323.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/256501323/Brand-Visuals-for-Lucky-World-Online-(iGaming-Brand)',
    featured: true,
    role: 'Graphic Designer',
    description: 'A collection of marketing and brand visuals created for Lucky World Online, covering promotional graphics, social media creatives, and marketing collateral while maintaining a consistent visual identity and PAGCOR-compliant communication.',
    images: luckyImages,
  },
  {
    id: 'axis-dance',
    title: 'Social Media Posters for AXIS Dance Studio',
    category: 'Social Media',
    tags: ['Social Media', 'Posters', 'Marketing'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/a0fb06249092299.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/249092299/Social-Media-Posters-for-AXIS-Dance-Studio',
    featured: true,
    role: 'Graphic Designer',
  },
  {
    id: 'wrapped-ads',
    title: '2025 Wrapped: Ad Designs',
    category: 'Advertising',
    tags: ['Advertising', 'Marketing', 'Social Media'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/0e8289241547307.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/241547307/2025-Wrapped-Ad-Designs',
    featured: true,
    role: 'Graphic Designer',
  },
  {
    id: 'petbloom',
    title: 'PetBloom Ad Images',
    category: 'Advertising',
    tags: ['Advertising', 'Marketing'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/db11b5223100637.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/223100637/PetBloom-Ad-Images',
    featured: true,
    role: 'Graphic Designer',
  },
  {
    id: 'pixra',
    title: 'Pixra Creatives - Web Design and Logo Project',
    category: 'Branding',
    tags: ['Branding', 'Marketing'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/fb12e2212944011.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/212944011/Pixra-Creatives-Web-Design-and-Logo-Project',
    featured: true,
    role: 'Graphic Designer',
  },
  {
    id: 'wrapped-canva',
    title: '2025 Wrapped: Custom Canva Kits',
    category: 'Social Media',
    tags: ['Social Media', 'Marketing'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/30067a241548169.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/241548169/2025-Wrapped-Custom-Canva-Kits',
    featured: false,
    role: 'Graphic Designer',
  },
  {
    id: 'wrapped-posters',
    title: '2025 Wrapped: Poster Designs',
    category: 'Posters',
    tags: ['Posters', 'Marketing'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/20c78d241546829.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/241546829/2025-Wrapped-Poster-Designs',
    featured: false,
    role: 'Graphic Designer',
  },
  {
    id: 'wrapped-logos',
    title: '2025 Wrapped: Logo Designs',
    category: 'Branding',
    tags: ['Branding'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/a6a0fd241546195.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/241546195/2025-Wrapped-Logo-Designs',
    featured: false,
    role: 'Graphic Designer',
  },
  {
    id: 'sk-poblacion',
    title: 'SK Poblacion Logo Design',
    category: 'Branding',
    tags: ['Branding'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/1248d0211443831.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/211443831/SK-Poblacion-Logo-Design',
    featured: false,
    role: 'Graphic Designer',
  },
  {
    id: 'bske-campaign',
    title: 'Campaign Materials Layout BSKE 2023',
    category: 'Marketing',
    tags: ['Marketing', 'Posters'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/f7afb0211443673.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/211443673/Campaign-Materials-Layout-BSKE-2023',
    featured: false,
    role: 'Graphic Designer',
  },
  {
    id: 'serbisyong-bait',
    title: 'Campaign Materials Layout for Serbisyong Bait',
    category: 'Marketing',
    tags: ['Marketing'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/ab1b2e211443339.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/211443339/Campaign-Materials-Layout-for-Serbisyong-Bait',
    featured: false,
    role: 'Graphic Designer',
  },
  {
    id: 'jaskin',
    title: 'JASkin Magical Touch Logo Design',
    category: 'Branding',
    tags: ['Branding'],
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/2fcdfe211442907.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    behanceUrl: 'https://www.behance.net/gallery/211442907/JASkin-Magical-Touch-Logo-Design',
    featured: false,
    role: 'Graphic Designer',
  },
];
