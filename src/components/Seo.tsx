import { useEffect } from 'react';

const SITE = 'https://avtovykupkhb27.ru';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: object[];
}

const setMeta = (selector: string, attr: string, key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const Seo = ({ title, description, path, jsonLd = [] }: SeoProps) => {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${SITE}${path}`);

    const nodes = jsonLd.map((data) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = 'page';
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });
    return () => nodes.forEach((n) => n.remove());
  }, [title, description, path]);

  return null;
};

export default Seo;
