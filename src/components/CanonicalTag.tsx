import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://avtovykupkhb27.ru';
const NOINDEX = ['/admin-leads', '/spasibo', '/seo-settings'];

const CanonicalTag = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${SITE}${clean}`;

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = NOINDEX.includes(clean)
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large';
  }, [pathname]);

  return null;
};

export default CanonicalTag;
