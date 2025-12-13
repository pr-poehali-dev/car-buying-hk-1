import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackMethod, setCallbackMethod] = useState("phone");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      const message = `📞 Заказ обратного звонка\n\n• Телефон: ${callbackPhone}\n• Способ связи: ${contactMap[callbackMethod]}\n\n📊 Всего заявок: ${totalLeads}`;

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const data = await response.json();

      if (data.ok) {
        // Отправляем цель в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(104279599, 'reachGoal', 'callback_request');
        }
        
        // Отправляем событие в VK Pixel
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

  const handleEvaluationClick = () => {
    navigate('/evaluation', { replace: true });
  };

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'phone_click');
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={28} className="text-gray-900" />
            <span className="text-xl font-semibold text-gray-900">АвтоВыкуп</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-900 font-semibold">Главная</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 transition">Как мы работаем</Link>
            <Link to="/reviews" className="text-gray-600 hover:text-gray-900 transition">Отзывы</Link>
            <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition">Оценка авто</Link>
          </nav>
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} className="text-gray-900" />
          </button>
          <a href="tel:+79841771588" onClick={handlePhoneClick} className="hidden md:block text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-gray-900 font-semibold" onClick={() => setMobileMenuOpen(false)}>Главная</Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Как мы работаем</Link>
              <Link to="/reviews" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Отзывы</Link>
              <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Оценка авто</Link>
              <a href="tel:+79841771588" onClick={handlePhoneClick} className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg"
            alt="Автомобиль"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Выкуп автомобилей в Хабаровске</h1>
            <p className="text-xl mb-8 text-gray-100">Быстрая оценка и честная цена за ваш автомобиль</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleEvaluationClick}
                className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              >
                <Icon name="Calculator" size={24} className="mr-2" />
                Оценить авто
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleCallRequest}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-6 h-auto"
              >
                <Icon name="PhoneCall" size={24} className="mr-2" />
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl font-bold text-gray-900">4.9</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <Icon key={i} name="Star" size={24} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-center text-gray-600">Рейтинг на Яндекс Картах</p>
          <p className="text-center text-sm text-gray-500 mt-1">На основе 127 отзывов</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Как проходит выкуп автомобиля</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Простой процесс от заявки до получения денег за 4 шага</p>
          <Link to="/how-it-works">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
              <Icon name="Info" size={24} className="mr-2" />
              Подробнее о процессе
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Что говорят наши клиенты</h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-3xl font-bold text-gray-900">4.9</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">на Яндекс Картах</span>
          </div>
          <Link to="/reviews">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
              <Icon name="MessageSquare" size={24} className="mr-2" />
              Читать отзывы
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Какие автомобили выкупаем</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Выкупаем авто в любом состоянии</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Отличное</h3>
                <p className="text-gray-600 text-sm">без повреждений</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Хорошее</h3>
                <p className="text-gray-600 text-sm">мелкие дефекты</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Среднее</h3>
                <p className="text-gray-600 text-sm">требует ремонта</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="Car" size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Битое</h3>
                <p className="text-gray-600 text-sm">после ДТП</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="Wrench" size={24} className="text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Не на ходу</h3>
                <p className="text-gray-600 text-sm">не заводится, требует эвакуации</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CreditCard" size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">В кредите</h3>
                <p className="text-gray-600 text-sm">поможем закрыть</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="FileText" size={24} className="text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Без документов</h3>
                <p className="text-gray-600 text-sm">решим вопрос</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Где мы работаем</h2>
          <p className="text-center text-gray-600 mb-12">Выкупаем автомобили по всему Хабаровскому краю</p>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Хабаровск</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Комсомольск-на-Амуре</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Амурск</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Советская Гавань</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Бикин</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Вяземский</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Николаевск-на-Амуре</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Ванино</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Переяславка</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600">А также Хабаровский район, Комсомольский район и все населённые пункты края</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="Clock" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Быстрая сделка</h3>
                <p className="text-gray-600">Оформление за 30 минут</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="ShieldCheck" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Честная оценка</h3>
                <p className="text-gray-600">Реальная рыночная цена</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="Banknote" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Оплата наличными</h3>
                <p className="text-gray-600">Получите деньги сразу после сделки</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="FileText" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Все документы</h3>
                <p className="text-gray-600">Берём на себя все вопросы с документами</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы продать авто?</h2>
          <p className="text-xl mb-8 text-gray-300">Получите оценку прямо сейчас</p>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleEvaluationClick}
            className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
          >
            Оценить авто
          </Button>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/79841771588" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition z-50"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </a>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Car" size={24} className="text-gray-900" />
              <span className="font-semibold text-gray-900">АвтоВыкуп</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 Выкуп автомобилей в Хабаровске
            </div>
            <a href="tel:+79841771588" onClick={handlePhoneClick} className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
          </div>
        </div>
      </footer>

      {showCallbackForm && (
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Заказать обратный звонок</h2>
                <button 
                  onClick={() => setShowCallbackForm(false)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>
              <form onSubmit={handleCallbackSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="callback-phone">Номер телефона</Label>
                  <Input
                    id="callback-phone"
                    type="tel"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="block mb-3">Способ связи</Label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="callback-method"
                        value="phone"
                        checked={callbackMethod === "phone"}
                        onChange={(e) => setCallbackMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900">Телефон</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="callback-method"
                        value="whatsapp"
                        checked={callbackMethod === "whatsapp"}
                        onChange={(e) => setCallbackMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900">WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="callback-method"
                        value="telegram"
                        checked={callbackMethod === "telegram"}
                        onChange={(e) => setCallbackMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900">Telegram</span>
                    </label>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                  Подтвердить
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;