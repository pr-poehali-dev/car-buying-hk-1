import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={28} className="text-gray-900" />
            <span className="text-xl font-semibold text-gray-900">АвтоВыкуп</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition">Главная</Link>
            <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition">Оценка авто</Link>
          </nav>
          <a href="tel:+74212000000" className="text-gray-900 font-medium">+7 (4212) 00-00-00</a>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg"
            alt="Автомобиль"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Выкуп автомобилей в Хабаровске</h1>
            <p className="text-xl mb-8 text-gray-100">Быстрая оценка и честная цена за ваш автомобиль</p>
            <Link to="/evaluation">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Оценить авто
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Как мы работаем</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">1. Заявка</h3>
              <p className="text-gray-600">Оставьте заявку на сайте или позвоните нам</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calculator" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Оценка</h3>
              <p className="text-gray-600">Проведём осмотр и назовём точную стоимость</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Banknote" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Оплата</h3>
              <p className="text-gray-600">Получите деньги сразу после оформления</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-4 items-start p-6 border border-gray-200 rounded-lg">
              <Icon name="Clock" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Быстрая сделка</h3>
                <p className="text-gray-600">Оформление за 30 минут</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 border border-gray-200 rounded-lg">
              <Icon name="ShieldCheck" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Честная оценка</h3>
                <p className="text-gray-600">Реальная рыночная цена</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 border border-gray-200 rounded-lg">
              <Icon name="MapPin" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Работаем по региону</h3>
                <p className="text-gray-600">Хабаровск, Комсомольск-на-Амуре, Хабаровский край</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 border border-gray-200 rounded-lg">
              <Icon name="FileText" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Все документы</h3>
                <p className="text-gray-600">Берём на себя все вопросы с документами</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы продать авто?</h2>
          <p className="text-xl mb-8 text-gray-300">Получите оценку прямо сейчас</p>
          <Link to="/evaluation">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
              Оценить авто
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Car" size={24} className="text-gray-900" />
              <span className="font-semibold text-gray-900">АвтоВыкуп</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 Выкуп автомобилей в Хабаровске
            </div>
            <a href="tel:+74212000000" className="text-gray-900 font-medium">+7 (4212) 00-00-00</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
