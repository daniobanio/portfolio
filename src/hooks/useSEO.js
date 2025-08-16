import { useEffect } from 'react';

function upsertTag(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

export function useSEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  path,
  jsonLd,
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
      upsertTag('meta[property="og:title"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:title');
        return m;
      }).setAttribute('content', title);
      upsertTag('meta[name="twitter:title"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'twitter:title');
        return m;
      }).setAttribute('content', title);
    }

    if (description) {
      upsertTag('meta[name="description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        return m;
      }).setAttribute('content', description);
      upsertTag('meta[property="og:description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:description');
        return m;
      }).setAttribute('content', description);
      upsertTag('meta[name="twitter:description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'twitter:description');
        return m;
      }).setAttribute('content', description);
    }

    if (Array.isArray(keywords) && keywords.length) {
      upsertTag('meta[name="keywords"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'keywords');
        return m;
      }).setAttribute('content', keywords.join(', '));
    }

    const url = (() => {
      try {
        const pathname = path || window.location.pathname;
        return new URL(pathname, window.location.origin).href;
      } catch {
        return undefined;
      }
    })();

    if (url) {
      upsertTag('meta[property="og:url"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:url');
        return m;
      }).setAttribute('content', url);
      upsertTag('link[rel="canonical"]', () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      }).setAttribute('href', url);
    }

    upsertTag('meta[property="og:type"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:type');
      return m;
    }).setAttribute('content', type);

    upsertTag('meta[name="twitter:card"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'twitter:card');
      return m;
    }).setAttribute('content', 'summary_large_image');

    if (image) {
      const absoluteImage = (() => {
        try {
          return new URL(image, window.location.origin).href;
        } catch {
          return image;
        }
      })();
      upsertTag('meta[property="og:image"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:image');
        return m;
      }).setAttribute('content', absoluteImage);
      upsertTag('meta[name="twitter:image"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'twitter:image');
        return m;
      }).setAttribute('content', absoluteImage);
    }

    // site name
    upsertTag('meta[property="og:site_name"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:site_name');
      return m;
    }).setAttribute('content', 'Daniel Trinh');

    // JSON-LD
    const existingJsonLd = document.head.querySelector('script[type="application/ld+json"][data-seo="jsonld"]');
    if (existingJsonLd) existingJsonLd.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'jsonld');
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, JSON.stringify(keywords), image, type, path, JSON.stringify(jsonLd)]);
}


