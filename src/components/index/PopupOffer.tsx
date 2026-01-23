import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PopupOfferProps {
  onClose: () => void;
  onSubmit: () => void;
  city: string;
}

const PopupOffer = ({ onClose, onSubmit, city }: PopupOfferProps) => {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'popup_phone_click');
    }
    window.location.href = 'tel:+79841771588';
  };

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
            <div className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-bold text-sm mb-4 shadow-lg">
              <Icon name="Phone" size={18} />
              ОБРАТНЫЙ ЗВОНОК
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Перезвоним через 2 минуты
            </h3>
            
            <p className="text-gray-600 text-base mb-4">
              Работаем в {city}
            </p>

            <a
              href="tel:+79841771588"
              onClick={handlePhoneClick}
              className="block bg-gray-900 text-white rounded-xl p-5 mb-5 hover:bg-gray-800 transition-colors"
            >
              <div className="text-sm text-gray-400 mb-1">Позвоните сейчас:</div>
              <div className="text-3xl md:text-4xl font-bold">
                +7 (984) 177-15-88
              </div>
            </a>

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

          <div className="space-y-3">
            <Button
              onClick={onSubmit}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Заказать обратный звонок
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Или позвоните нам прямо сейчас по номеру выше
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupOffer;