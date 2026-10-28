import { trackGoal } from '@/lib/analytics';
import { Link } from "@/lib/router-compat";
import Icon from '@/components/ui/icon';
import { seoPages } from '@/data/seoPages';

const cities = [
  { to: '/', label: 'Хабаровск' },
  { to: '/komsomolsk', label: 'Комсомольск-на-Амуре' },
  { to: '/amursk', label: 'Амурск' },
  { to: '/sovetskaya-gavan', label: 'Советская Гавань' },
  { to: '/bikin', label: 'Бикин' },
  ...seoPages.filter((p) => p.kind === 'city').map((p) => ({ to: `/${p.slug}`, label: p.name })),
];

const services = [
  { to: '/vykup-bityh-avto', label: 'Выкуп битых авто' },
  { to: '/vykup-kreditnyh-avto', label: 'Выкуп кредитных авто' },
  { to: '/srochnyj-vykup-avto', label: 'Срочный выкуп авто' },
  ...seoPages.filter((p) => p.kind === 'service').map((p) => ({ to: `/${p.slug}`, label: p.name })),
];

const brands = seoPages.filter((p) => p.kind === 'brand').map((p) => ({ to: `/${p.slug}`, label: p.name }));

const info = [
  { to: '/evaluation', label: 'Оценка авто' },
  { to: '/how-it-works', label: 'Как мы работаем' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/blog', label: 'Блог' },
];

const Column = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
  <div>
    <h3 className="font-bold text-gray-900 mb-3 text-sm md:text-base">{title}</h3>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className="text-gray-600 hover:text-gray-900 text-sm transition">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-10">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
        <Column title="Города и районы" links={cities} />
        <Column title="Услуги" links={services} />
        <Column title="Марки" links={brands} />
        <Column title="Информация" links={info} />
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Car" size={22} className="text-gray-900" />
            <span className="font-semibold text-gray-900">АвтоВыкуп</span>
          </div>
          <a href="tel:+79841771588" onClick={() => trackGoal('phone_click')} className="text-gray-900 font-bold text-lg block mb-2">
            +7 (984) 177-15-88
          </a>
          <p className="text-gray-600 text-sm">Хабаровск и Хабаровский край. Ежедневно, выезд бесплатный.</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs border-t border-gray-200 pt-6">
        © {new Date().getFullYear()} Выкуп автомобилей в Хабаровске и Хабаровском крае
      </div>
    </div>
  </footer>
);

export default Footer;
