import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface EvaluationHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  handlePhoneClick: () => void;
}

const EvaluationHeader = ({ mobileMenuOpen, setMobileMenuOpen, handlePhoneClick }: EvaluationHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Car" size={24} className="text-gray-900 md:w-7 md:h-7" />
            <span className="font-semibold text-gray-900 text-base md:text-lg">АвтоВыкуп</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+79841771588"
              onClick={handlePhoneClick}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition"
            >
              <Icon name="Phone" size={20} />
              <span className="font-medium text-base">+7 (984) 177-15-88</span>
            </a>
          </div>

          <button
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? (
              <Icon name="X" size={24} />
            ) : (
              <Icon name="Menu" size={24} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-3 border-t border-gray-200 pt-4">
            <Button
              asChild
              variant="outline"
              className="w-full mb-3"
              onClick={handlePhoneClick}
            >
              <a href="tel:+79841771588" className="flex items-center justify-center gap-2">
                <Icon name="Phone" size={18} />
                <span>+7 (984) 177-15-88</span>
              </a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default EvaluationHeader;
