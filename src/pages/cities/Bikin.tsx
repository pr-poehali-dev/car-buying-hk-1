import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Header from "@/components/index/Header";
import CallbackForm from "@/components/index/CallbackForm";
import WhatsAppButton from "@/components/index/WhatsAppButton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Bikin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackMethod, setCallbackMethod] = useState("phone");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Выкуп авто Бикин - Срочный выкуп автомобилей за 15 минут | +7(984)177-15-88";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Срочный выкуп автомобилей в Бикине за 15 минут. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88');
    }
  }, []);

  const handleCallRequest = () => {
    setShowCallbackForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactMap: Record<string, string> = {
      'whatsapp': 'WhatsApp',
      'telegram': 'Telegram',
      'phone': 'Телефон'
    };

    try {
      const botToken = '7827853509:AAHLZ8JQkdRmucBRQOGh7r1XkJMDw4vxC0w';
      const chatId = '6275725133';
      
      const countResponse = await fetch('https://functions.poehali.dev/a8f2aee8-9a59-444c-8d70-39de338b39c8');
      const countData = await countResponse.json();
      const totalLeads = countData.count + 1;

      const message = `📞 Заказ обратного звонка (Бикин)\n\n• Телефон: ${callbackPhone}\n• Способ связи: ${contactMap[callbackMethod]}\n\n📊 Всего заявок: ${totalLeads}`;

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
      });

      const data = await response.json();
      if (data.ok) {
        toast({ title: "Заявка принята!", description: "Мы перезвоним вам в ближайшее время" });
        setShowCallbackForm(false);
        setCallbackPhone("");
        setCallbackMethod("phone");
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось отправить заявку", variant: "destructive" });
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
            alt="Выкуп авто в Бикине"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Выкуп авто в Бикине</h1>
            <p className="text-lg md:text-xl mb-8">Быстрая оценка за 15 минут. Деньги сразу наличными.</p>
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
          <h2 className="text-3xl font-bold text-center mb-12">Выкуп авто в Бикине и районе</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700">
            <p>Бикин — город на западе Хабаровского края. Мы работаем в городе и Бикинском районе более 3 лет.</p>
            <p><strong>Быстрый выезд</strong> в течение 1-2 часов после звонка. Оцениваем автомобиль на месте, оформляем договор купли-продажи и выплачиваем деньги сразу.</p>
            <p>Выкупаем любые марки: японские, корейские, китайские, европейские, российские. Битые, кредитные, без документов — работаем со всеми случаями.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Преимущества работы с нами</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border-2 border-green-600">
              <Icon name="TrendingUp" className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Дороже на 15%</h3>
              <p className="text-gray-600">Платим больше конкурентов</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
              <Icon name="MapPin" className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Работаем по району</h3>
              <p className="text-gray-600">Выезжаем в любой населённый пункт</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
              <Icon name="Clock" className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">За 30 минут</h3>
              <p className="text-gray-600">От оценки до получения денег</p>
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

export default Bikin;
