import { trackGoal } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  city: string;
  handleEvaluationClick: () => void;
  handleCallRequest: () => void;
}

const HeroSection = ({ city, handleEvaluationClick, handleCallRequest }: HeroSectionProps) => {
  const handlePhoneClick = () => {
    trackGoal('hero_phone_click');
    window.location.href = 'tel:+79841771588';
  };

  return (
    <section className="relative min-h-[600px] md:h-[600px] flex items-center py-8 md:py-0">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.webp"
          alt="Срочный выкуп автомобилей в Хабаровске - деньги сразу, оценка за 15 минут"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-2xl text-white">
          <div className="inline-block bg-green-600 text-white px-4 py-3 rounded-xl font-bold text-base mb-4 animate-pulse shadow-lg">
            💰 Дороже конкурентов на 15%
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Срочный выкуп автомобилей в {city}</h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100 leading-relaxed">Деньги сразу наличными. Оценка за 15 минут. Битые, кредитные, без документов</p>
          <div className="flex flex-col gap-3">
            <Button 
              size="lg" 
              onClick={handlePhoneClick}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xl font-bold px-8 py-7 h-auto w-full shadow-2xl"
            >
              <Icon name="Phone" size={28} className="mr-3" />
              Позвонить сейчас
            </Button>
            <Button 
              size="lg" 
              onClick={handleEvaluationClick}
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg font-semibold px-8 py-6 h-auto w-full"
            >
              <Icon name="Calculator" size={24} className="mr-2" />
              Узнать цену авто
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;