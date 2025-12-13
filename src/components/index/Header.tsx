import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handlePhoneClick: () => void;
}

const Header = ({ mobileMenuOpen, setMobileMenuOpen, handlePhoneClick }: HeaderProps) => {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Car" size={24} className="text-gray-900 md:w-7 md:h-7" />
          <span className="text-lg md:text-xl font-semibold text-gray-900">АвтоВыкуп</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-gray-900 font-semibold">Главная</Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 transition">Как мы работаем</Link>
          <Link to="/reviews" className="text-gray-600 hover:text-gray-900 transition">Отзывы</Link>
          <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition">Оценка авто</Link>
        </nav>
        <button 
          className="md:hidden p-2 -mr-2 touch-manipulation" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={28} className="text-gray-900" />
        </button>
        <a href="tel:+79841771588" onClick={handlePhoneClick} className="hidden md:block text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-900 font-semibold" onClick={() => setMobileMenuOpen(false)}>Главная</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Как мы работаем</Link>
            <Link to="/reviews" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Отзывы</Link>
            <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Оценка авто</Link>
            <a href="tel:+79841771588" onClick={handlePhoneClick} className="text-white bg-gray-900 hover:bg-gray-800 font-bold text-lg py-3 px-4 rounded-lg text-center touch-manipulation">+7 (984) 177-15-88</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;