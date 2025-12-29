import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const StickyMobileButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'sticky_button_click');
    }
    window.location.href = 'tel:+79841771588';
  };

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-4 border-green-600 shadow-2xl p-3 animate-slide-up">
      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 active:from-green-800 active:to-green-700 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 text-xl transition shadow-lg"
      >
        <Icon name="Phone" size={28} className="animate-pulse" />
        Позвонить сейчас
      </button>
    </div>
  );
};

export default StickyMobileButton;