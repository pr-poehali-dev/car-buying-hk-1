import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "79841771588";
  const message = "Здравствуйте! Хочу узнать стоимость выкупа моего авто";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-slow group"
      aria-label="Написать в WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Написать в WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;
