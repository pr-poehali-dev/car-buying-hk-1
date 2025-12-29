import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const OnlineCounter = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [dealsToday, setDealsToday] = useState(0);

  useEffect(() => {
    // Генерируем случайное количество онлайн (8-24)
    const generateOnline = () => {
      const min = 8;
      const max = 24;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Генерируем количество сделок за день (2-7)
    const generateDeals = () => {
      const min = 2;
      const max = 7;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    setOnlineCount(generateOnline());
    setDealsToday(generateDeals());

    // Обновляем счетчик каждые 15-30 секунд
    const interval = setInterval(() => {
      setOnlineCount(generateOnline());
    }, Math.random() * 15000 + 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-6 z-40 space-y-2 animate-in fade-in slide-in-from-right-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-gray-200 flex items-center gap-2">
        <div className="relative">
          <Eye className="w-4 h-4 text-green-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <span className="text-sm text-gray-700">
          <span className="font-bold text-green-600">{onlineCount}</span> человек онлайн
        </span>
      </div>

      <div className="bg-blue-600 text-white rounded-lg shadow-lg px-4 py-2 text-sm font-medium">
        🚗 Выкуплено сегодня: <span className="font-bold">{dealsToday}</span> авто
      </div>
    </div>
  );
};

export default OnlineCounter;
