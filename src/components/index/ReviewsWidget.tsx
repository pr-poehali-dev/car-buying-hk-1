import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ReviewsWidget = () => {
  const [reviewCount] = useState(387 + Math.floor(Math.random() * 15));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon key={star} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="text-2xl font-bold text-gray-900">4.9</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Отзывов на</div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold text-sm">Яндекс.Картах</span>
            <span className="text-gray-900 font-bold">({reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsWidget;
