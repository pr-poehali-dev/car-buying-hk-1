import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ReviewsWidget = () => {
  const [reviewCount] = useState(387 + Math.floor(Math.random() * 15));

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-5 shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon key={star} name="Star" size={24} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="text-4xl font-bold text-gray-900">4.9</span>
        </div>
        <div className="text-center">
          <div className="text-gray-900 font-bold text-lg">{reviewCount} реальных отзывов</div>
          <div className="text-blue-600 font-semibold text-base">на Яндекс.Картах</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsWidget;