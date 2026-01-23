import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UrgencyTimerProps {
  city: string;
  onSubmit: (phone: string) => void;
}

const UrgencyTimer = ({ city, onSubmit }: UrgencyTimerProps) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      onSubmit(phone);
      setPhone('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-6 md:p-8 shadow-xl">
      <div className="text-center mb-5">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon name="Phone" size={28} className="flex-shrink-0" />
          <div className="font-bold text-2xl md:text-3xl">Заказать обратный звонок</div>
        </div>
        <div className="text-base text-green-50">Перезвоним через 2 минуты • Работаем в {city} и крае</div>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-white text-gray-900 border-0 h-12 text-lg"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 h-12 whitespace-nowrap"
          >
            Перезвоните мне
          </Button>
        </div>
        <p className="text-xs text-green-50 text-center mt-3">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </form>
    </div>
  );
};

export default UrgencyTimer;