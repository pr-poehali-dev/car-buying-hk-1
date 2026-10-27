import { useLocation } from "@/lib/router-compat";

const SITE = 'https://avtovykupkhb27.ru';
const NOINDEX = ['/admin-leads', '/spasibo', '/seo-settings'];

const CanonicalTag = () => {
  const { pathname } = useLocation();
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';

  return (
    <>
      <link rel="canonical" href={`${SITE}${clean}`} />
      <meta
        name="robots"
        content={NOINDEX.includes(clean) ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />
    </>
  );
};

export default CanonicalTag;
