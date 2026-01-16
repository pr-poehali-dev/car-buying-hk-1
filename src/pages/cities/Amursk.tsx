import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Header from "@/components/index/Header";
import CallbackForm from "@/components/index/CallbackForm";
import WhatsAppButton from "@/components/index/WhatsAppButton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Amursk = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackMethod, setCallbackMethod] = useState("phone");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Выкуп авто Амурск - Срочный выкуп автомобилей за 15 минут | +7(984)177-15-88";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Срочный выкуп автомобилей в Амурске за 15 минут. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88');
    }
  }, []);

  const handleCallRequest = () => {
    setShowCallbackForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://functions.poehali.dev/f5104568-fc2e-4198-82d3-37b4b6c4fe80', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: callbackPhone,
          contactMethod: callbackMethod
        })
      });

      const data = await response.json();

      if (data.success) {
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(104279599, 'reachGoal', 'callback_request');
        }
        
        if (typeof window !== 'undefined' && (window as any).VK && (window as any).VK.Retargeting) {
          (window as any).VK.Retargeting.Event('lead');
        }
        
        toast({
          title: "Заявка принята!",
          description: "Мы перезвоним вам в ближайшее время",
        });
        setShowCallbackForm(false);
        setCallbackPhone("");
        setCallbackMethod("phone");
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить заявку. Попробуйте позже.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive"
      });
    }
  };

  const handleEvaluationClick = () => navigate('/evaluation');
  const handlePhoneClick = () => {};

  return (
    <div className="min-h-screen bg-white">
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handlePhoneClick={handlePhoneClick}
      />

      <section className="relative min-h-[500px] md:h-[600px] flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg"
            alt="Выкуп авто в Амурске"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Выкуп авто в Амурске</h1>
            <p className="text-lg md:text-xl mb-8">Честная оценка за 15 минут. Деньги сразу наличными</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleEvaluationClick} className="bg-white text-gray-900 hover:bg-gray-100">
                <Icon name="Calculator" className="mr-2" />
                Оценить авто
              </Button>
              <Button size="lg" variant="outline" onClick={handleCallRequest} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900">
                <Icon name="PhoneCall" className="mr-2" />
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Выкуп авто в Амурске</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700">
            <p>Амурск — важный промышленный центр края. Мы выкупаем автомобили в любом районе города: центр, южная и северная части.</p>
            <p><strong>Бесплатный выезд</strong> в течение часа после звонка. Оцениваем автомобиль на месте, оформляем договор и выплачиваем деньги сразу.</p>
            <p>Выкупаем любые марки: японские, корейские, российские, европейские. Битые, кредитные, без документов — не проблема!</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества в Амурске</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border-2 border-green-600">
              <Icon name="TrendingUp" className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Выкупаем дороже на 15%</h3>
              <p className="text-gray-600">Реальная рыночная цена без занижения</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
              <Icon name="Shield" className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Безопасная сделка</h3>
              <p className="text-gray-600">Все документы оформляем сами</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
              <Icon name="Clock" className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Быстро</h3>
              <p className="text-gray-600">От звонка до денег — 30-60 минут</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
              <Icon name="Car" className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Любое состояние</h3>
              <p className="text-gray-600">Битые, не на ходу, после ДТП</p>
            </div>
          </div>
        </div>
      </section>

      <CallbackForm 
        showCallbackForm={showCallbackForm}
        setShowCallbackForm={setShowCallbackForm}
        callbackPhone={callbackPhone}
        setCallbackPhone={setCallbackPhone}
        callbackMethod={callbackMethod}
        setCallbackMethod={setCallbackMethod}
        handleCallbackSubmit={handleCallbackSubmit}
      />

      <WhatsAppButton />
    </div>
  );
};

export default Amursk;