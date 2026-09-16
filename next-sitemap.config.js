/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://gadgetlens.store',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://gadgetlens.store/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Higher priority for product pages
    if (path.startsWith('/products/') && path !== '/products') {
      return { loc: path, changefreq: 'daily', priority: 0.9, lastmod: new Date().toISOString() };
    }
    if (path === '/') {
      return { loc: path, changefreq: 'hourly', priority: 1.0, lastmod: new Date().toISOString() };
    }
    if (path.startsWith('/categories/')) {
      return { loc: path, changefreq: 'daily', priority: 0.8, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() };
  },
};

module.exports = config;
