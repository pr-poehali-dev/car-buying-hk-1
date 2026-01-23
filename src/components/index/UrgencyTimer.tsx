import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UrgencyTimerProps {
  city: string;
  onSubmit: (phone: string, selectedCity: string) => void;
}

const UrgencyTimer = ({ city, onSubmit }: UrgencyTimerProps) => {
  const [phone, setPhone] = useState('');
  const [selectedCity, setSelectedCity] = useState('khabarovsk');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      onSubmit(phone, selectedCity);
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
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-3 mb-3">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="bg-white text-gray-900 border-0 h-12 text-lg font-medium">
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="khabarovsk">Хабаровск</SelectItem>
              <SelectItem value="komsomolsk">Комсомольск-на-Амуре</SelectItem>
              <SelectItem value="amursk">Амурск</SelectItem>
              <SelectItem value="sovetskaya-gavan">Советская Гавань</SelectItem>
              <SelectItem value="bikin">Бикин</SelectItem>
              <SelectItem value="vyazemsky">Вяземский</SelectItem>
              <SelectItem value="nikolaevsk">Николаевск-на-Амуре</SelectItem>
              <SelectItem value="vanino">Ванино</SelectItem>
              <SelectItem value="pereyaslavka">Переяславка</SelectItem>
              <SelectItem value="khabarovsky-raion">Хабаровский район</SelectItem>
              <SelectItem value="komsomolsky-raion">Комсомольский район</SelectItem>
              <SelectItem value="other">Другой населённый пункт</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
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