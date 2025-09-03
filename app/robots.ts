import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/parking-reservation',
          '/food-voucher',
          '/spice-of-india-2025',
          '/event-details',
          '/event-information',
          '/faq',
          '/directions-parking',
          '/about',
          '/catch-the-event',
          '/contact',
          '/community',
          '/privacy',
          '/terms',
          '/accessibility',
          '/sitemap.xml',
          '/robots.txt',
          '/manifest.json',
          '/favicon.ico',
          '/apple-touch-icon.png',
          '/favicon-32x32.png',
          '/favicon-16x16.png',
          '/images/',
          '/_next/static/',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/middleware',
          '/.env',
          '/node_modules/',
          '/.git/',
          '/.vscode/',
          '/*.log',
          '/data/',
          '/cookies.txt',
          '/new_cookies.txt',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/middleware',
        ],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/middleware',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://catchtheevent.com/sitemap.xml',
    host: 'https://catchtheevent.com',
  }
} 