import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  city: string;
  handleEvaluationClick: () => void;
  handleCallRequest: () => void;
}

const HeroSection = ({ city, handleEvaluationClick, handleCallRequest }: HeroSectionProps) => {
  return (
    <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg"
          alt="Срочный выкуп автомобилей в Хабаровске - деньги сразу, оценка за 15 минут"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-4">Срочный выкуп автомобилей в {city}</h1>
          <p className="text-xl mb-8 text-gray-100">Деньги сразу наличными. Оценка за 15 минут. Битые, кредитные, без документов</p>
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
  );
};

export default HeroSection;
