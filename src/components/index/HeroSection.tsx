import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  city: string;
  handleEvaluationClick: () => void;
  handleCallRequest: () => void;
}

const HeroSection = ({ city, handleEvaluationClick, handleCallRequest }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[500px] md:h-[600px] flex items-center py-12 md:py-0">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg"
          alt="Срочный выкуп автомобилей в Хабаровске - деньги сразу, оценка за 15 минут"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-2xl text-white">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm md:text-base mb-4 animate-pulse">
            💰 Дороже конкурентов на 15%
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">Срочный выкуп автомобилей в {city}</h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-100 leading-relaxed">Деньги сразу наличными. Оценка за 15 минут. Битые, кредитные, без документов</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button 
              size="lg" 
              onClick={handleEvaluationClick}
              className="bg-white text-gray-900 hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto"
            >
              <Icon name="Calculator" size={20} className="mr-2" />
              Оценить авто
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleCallRequest}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto"
            >
              <Icon name="PhoneCall" size={20} className="mr-2" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;