import { trackGoal } from "@/lib/analytics";
import { useState } from 'react';
import { useNavigate, useParams } from "@/lib/router-compat";
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/index/Header';
import CallbackForm from '@/components/index/CallbackForm';
import WhatsAppButton from '@/components/index/WhatsAppButton';
import Footer from '@/components/Footer';
import NotFound from '@/pages/NotFound';
import { useToast } from '@/hooks/use-toast';
import { getSeoPage } from '@/data/seoPages';

const API = 'https://functions.poehali.dev/f5104568-fc2e-4198-82d3-37b4b6c4fe80';

interface Props {
  slug: string;
}

const SeoLanding = ({ slug }: Props) => {
  const page = getSeoPage(slug);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('phone');
  const [sending, setSending] = useState(false);

  if (!page) return <NotFound />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, contactMethod: method, city: page.callbackCity }),
      });
      const data = await res.json();
      if (data.success) {
        trackGoal('callback_request');
        navigate('/spasibo');
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Попробуйте позже.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Попробуйте позже.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  /* JSON-LD of this page is rendered in head() of src/routes/$slug.tsx (telephone '+79841771588') */

  return (
    <div className="min-h-screen bg-white">
      <Header mobileMenuOpen={menuOpen} setMobileMenuOpen={setMenuOpen} handlePhoneClick={() => {}} />

      <section className="relative min-h-[460px] md:h-[520px] flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <img src="/hero.webp" alt={page.h1} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">{page.h1}</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">{page.lead}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={() => navigate('/evaluation')} className="bg-green-600 hover:bg-green-700 text-white">
                <Icon name="Calculator" className="mr-2" />
                Оценить авто
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowForm(true)}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Icon name="PhoneCall" className="mr-2" />
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl space-y-5 text-base md:text-lg text-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{page.name}: как это работает</h2>
          {page.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">Наши преимущества</h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {page.points.map((pt) => (
              <div key={pt.title} className="bg-white p-5 rounded-lg border-2 border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{pt.title}</h3>
                <p className="text-gray-600">{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">Частые вопросы</h2>
          <div className="space-y-4">
            {page.faq.map((f) => (
              <div key={f.q} className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Узнайте цену за 15 минут</h2>
          <p className="text-gray-200 mb-6">Позвоните или оставьте заявку, перезвоним сами.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+79841771588"
              onClick={() => trackGoal('phone_click')}
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg"
            >
              +7 (984) 177-15-88
            </a>
            <Button size="lg" onClick={() => setShowForm(true)} className="bg-white text-gray-900 hover:bg-gray-100 h-auto py-4">
              Заказать звонок
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <CallbackForm
        showCallbackForm={showForm}
        setShowCallbackForm={setShowForm}
        callbackPhone={phone}
        setCallbackPhone={setPhone}
        callbackMethod={method}
        setCallbackMethod={setMethod}
        handleCallbackSubmit={submit}
      />
      <WhatsAppButton />
    </div>
  );
};

export default SeoLanding;