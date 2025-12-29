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
      className="fixed bottom-20 right-4 z-50 bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] text-white rounded-full p-5 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-slow"
      aria-label="Написать в WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </button>
  );
};

export default WhatsAppButton;