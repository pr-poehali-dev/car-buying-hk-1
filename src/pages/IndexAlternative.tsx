import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const IndexAlternative = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCallRequest = () => {
    toast({
      title: "Заявка принята!",
      description: "Мы перезвоним вам в ближайшее время",
    });
  };

  const handleEvaluationClick = () => {
    navigate('/evaluation', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={28} className="text-white" />
            <span className="text-xl font-semibold text-white">АвтоВыкуп 24/7</span>
          </div>
          <a href="tel:+79841771588" className="text-white font-bold text-lg">+7 (984) 177-15-88</a>
        </div>
      </header>

      <section className="relative min-h-[600px] flex items-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="mb-6 inline-block px-4 py-2 bg-orange-600 rounded-full text-sm font-medium">
              🌙 Ночной режим работы
            </div>
            <h1 className="text-6xl font-bold mb-6">Срочный выкуп авто</h1>
            <p className="text-2xl mb-4 text-gray-300">Работаем круглосуточно</p>
            <p className="text-xl mb-10 text-gray-400">Оценка и выезд специалиста в любое время</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleEvaluationClick}
                className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 py-7 h-auto"
              >
                <Icon name="Clock" size={24} className="mr-2" />
                Срочная оценка
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleCallRequest}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-10 py-7 h-auto"
              >
                <Icon name="Phone" size={24} className="mr-2" />
                Позвонить сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Почему выбирают нас ночью?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">24/7</h3>
              <p className="text-gray-400">Работаем без выходных и праздников</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Быстро</h3>
              <p className="text-gray-400">Выезд и оценка в течение часа</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Banknote" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Наличные</h3>
              <p className="text-gray-400">Деньги сразу на руки</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Выкупаем любые авто</h2>
          <p className="text-center text-gray-400 mb-12">В любом состоянии и с любой историей</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">Срочный выкуп</h3>
                <p className="text-gray-400 text-sm">Деньги в течение часа</p>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-start gap-3">
              <Icon name="Car" size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">После ДТП</h3>
                <p className="text-gray-400 text-sm">Битые и не на ходу</p>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-start gap-3">
              <Icon name="CreditCard" size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">В кредите</h3>
                <p className="text-gray-400 text-sm">Закроем кредит сами</p>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-start gap-3">
              <Icon name="FileText" size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">Без документов</h3>
                <p className="text-gray-400 text-sm">Решим проблему</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Нужно продать прямо сейчас?</h2>
          <p className="text-xl mb-8">Звоните — работаем круглосуточно!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleEvaluationClick}
              className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-10 py-7 h-auto font-bold"
            >
              Оценить авто
            </Button>
            <a href="tel:+79841771588">
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-10 py-7 h-auto font-bold"
              >
                <Icon name="Phone" size={24} className="mr-2" />
                +7 (984) 177-15-88
              </Button>
            </a>
          </div>
        </div>
      </section>

      <a 
        href="https://wa.me/79841771588" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition z-50"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </a>

      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Car" size={24} className="text-white" />
              <span className="font-semibold text-white">АвтоВыкуп 24/7</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Круглосуточный выкуп автомобилей
            </div>
            <a href="tel:+79841771588" className="text-white font-bold text-lg">+7 (984) 177-15-88</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexAlternative;
