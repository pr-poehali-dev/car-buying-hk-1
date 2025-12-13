import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const HowItWorks = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    document.title = "Как мы покупаем автомобили - Процесс выкупа авто за 4 шага | Хабаровск";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Узнайте как проходит выкуп автомобилей в Хабаровске: заявка → осмотр → договор → деньги. Весь процесс за 15-30 минут. Прозрачная схема работы');
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Car" size={28} className="text-gray-900" />
            <span className="text-xl font-semibold text-gray-900">АвтоВыкуп</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition">Главная</Link>
            <Link to="/how-it-works" className="text-gray-900 font-semibold">Как мы работаем</Link>
            <Link to="/reviews" className="text-gray-600 hover:text-gray-900 transition">Отзывы</Link>
            <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition">Оценка авто</Link>
          </nav>
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} className="text-gray-900" />
          </button>
          <a href="tel:+79841771588" className="hidden md:block text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Главная</Link>
              <Link to="/how-it-works" className="text-gray-900 font-semibold" onClick={() => setMobileMenuOpen(false)}>Как мы работаем</Link>
              <Link to="/reviews" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Отзывы</Link>
              <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setMobileMenuOpen(false)}>Оценка авто</Link>
              <a href="tel:+79841771588" className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
            </nav>
          </div>
        )}
      </header>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Как мы покупаем автомобили</h1>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Простой и прозрачный процесс выкупа за 4 шага</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                <Icon name="MessageSquare" size={32} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-3">1</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Заявка</h3>
              <p className="text-gray-600 leading-relaxed">
                Оставьте заявку на сайте, позвоните нам или напишите в мессенджер. 
                Мы свяжемся с вами в течение 5 минут и обсудим детали.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                <Icon name="Search" size={32} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-3">2</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Осмотр</h3>
              <p className="text-gray-600 leading-relaxed">
                Наш специалист приедет к вам в удобное время. Проведём детальный 
                осмотр автомобиля и назовём честную цену на месте.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                <Icon name="FileCheck" size={32} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-3">3</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Договор</h3>
              <p className="text-gray-600 leading-relaxed">
                Оформляем договор купли-продажи прямо на месте. Весь процесс 
                занимает всего 15-20 минут. Никаких сложностей.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                <Icon name="Banknote" size={32} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-3">4</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Деньги</h3>
              <p className="text-gray-600 leading-relaxed">
                Сразу после подписания договора выплачиваем полную сумму. 
                Наличными или переводом на карту — как вам удобнее.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Наши преимущества</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={36} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Быстро</h3>
              <p className="text-gray-600">Весь процесс от заявки до получения денег занимает от 30 минут</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={36} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Надёжно</h3>
              <p className="text-gray-600">Официальный договор и полная юридическая чистота сделки</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={36} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Выгодно</h3>
              <p className="text-gray-600">Честная рыночная оценка без скрытых комиссий и вычетов</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы продать автомобиль?</h2>
          <p className="text-gray-300 mb-8 text-lg">Оставьте заявку и получите оценку в течение 5 минут</p>
          <Link to="/evaluation">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              <Icon name="Calculator" size={24} className="mr-2" />
              Оценить авто
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Car" size={28} className="text-gray-900" />
                <span className="text-xl font-semibold text-gray-900">АвтоВыкуп</span>
              </div>
              <p className="text-gray-600">Профессиональный выкуп автомобилей в Хабаровске</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Навигация</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-600 hover:text-gray-900">Главная</Link>
                <Link to="/how-it-works" className="block text-gray-600 hover:text-gray-900">Как мы работаем</Link>
                <Link to="/reviews" className="block text-gray-600 hover:text-gray-900">Отзывы</Link>
                <Link to="/evaluation" className="block text-gray-600 hover:text-gray-900">Оценка авто</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Контакты</h3>
              <p className="text-gray-600 mb-2">Телефон:</p>
              <a href="tel:+79841771588" className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;