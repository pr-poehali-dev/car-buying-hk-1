import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Спасибо за обращение! | Автовыкуп Хабаровск";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ваша заявка принята! Мы свяжемся с вами в течение 15 минут.');
    }
  }, []);

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'phone_click');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle2" size={48} className="text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Спасибо за обращение!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Ваша заявка успешно отправлена. Наш специалист свяжется с вами в течение <span className="font-bold text-gray-900">15 минут</span>.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Что будет дальше?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Наш эксперт позвонит вам в течение 15 минут</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Обсудим детали и назовём точную стоимость</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Приедем на осмотр в удобное для вас время</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Деньги получите сразу после оформления</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a 
              href="tel:+79841771588"
              onClick={handlePhoneClick}
              className="block"
            >
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить сейчас: +7 (984) 177-15-88
              </Button>
            </a>

            <Button 
              size="lg" 
              variant="outline" 
              className="w-full h-14 text-lg"
              onClick={() => navigate('/')}
            >
              <Icon name="Home" size={20} className="mr-2" />
              Вернуться на главную
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-gray-400" />
                <span>Работаем 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-gray-400" />
                <span>По всему краю</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} className="text-yellow-500" />
                <span>Рейтинг 4.9</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Если не дозвонились — напишите в{" "}
            <a 
              href="https://wa.me/79841771588" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:underline font-medium"
            >
              WhatsApp
            </a>
            {" "}или{" "}
            <a 
              href="https://t.me/avtovikupkhabarovsk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Telegram
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
