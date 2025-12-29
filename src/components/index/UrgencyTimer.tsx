import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const UrgencyTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 2;
          minutes = 47;
          seconds = 30;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-5 shadow-xl">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon name="TrendingUp" size={28} className="flex-shrink-0" />
          <div className="font-bold text-2xl">Акция: +20% к цене!</div>
        </div>
        <div className="text-base text-red-50">Успейте продать сегодня дороже</div>
      </div>
      <div className="flex items-center justify-center gap-3 bg-white/20 rounded-xl p-4 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-sm mt-1">часов</div>
        </div>
        <div className="text-3xl font-bold">:</div>
        <div className="text-center">
          <div className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-sm mt-1">минут</div>
        </div>
        <div className="text-3xl font-bold">:</div>
        <div className="text-center">
          <div className="text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-sm mt-1">секунд</div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyTimer;