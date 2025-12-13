import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PopupOfferProps {
  onClose: () => void;
  onSubmit: () => void;
}

const PopupOffer = ({ onClose, onSubmit }: PopupOfferProps) => {
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition shadow-lg"
          aria-label="Закрыть"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-red-600 text-white px-5 py-2 rounded-full font-bold text-sm mb-4 shadow-lg animate-pulse">
              🔥 АКЦИЯ ТОЛЬКО СЕГОДНЯ
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              +5 000 ₽ к оценке
            </h3>
            
            <p className="text-gray-600 text-base mb-4">
              При выкупе авто в течение 3 часов после оценки
            </p>

            <div className="bg-gray-900 text-white rounded-xl p-4 mb-5">
              <div className="text-sm text-gray-400 mb-1">Предложение действует:</div>
              <div className="text-4xl font-bold tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>

            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Бесплатный выезд оценщика</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Деньги сразу наличными</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Оформление за 15 минут</span>
              </div>
            </div>
          </div>

          <Button
            onClick={onSubmit}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Получить +5 000 ₽
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Нажимая кнопку, вы получите обратный звонок в течение 2 минут
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupOffer;