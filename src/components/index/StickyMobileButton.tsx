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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-green-600 shadow-2xl p-3 animate-slide-up">
      <button
        onClick={handleClick}
        className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 text-lg transition shadow-lg"
      >
        <Icon name="Phone" size={24} className="animate-pulse" />
        Позвонить сейчас
      </button>
    </div>
  );
};

export default StickyMobileButton;
