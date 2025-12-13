import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Reviews = () => {
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
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 transition">Как мы работаем</Link>
            <Link to="/reviews" className="text-gray-900 font-semibold">Отзывы</Link>
            <Link to="/evaluation" className="text-gray-600 hover:text-gray-900 transition">Оценка авто</Link>
          </nav>
          <a href="tel:+79841771588" className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
        </div>
      </header>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Отзывы наших клиентов</h1>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-5xl font-bold text-gray-900">4.9</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Icon key={i} name="Star" size={28} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-lg">Рейтинг на Яндекс Картах</p>
              <p className="text-gray-500">На основе 127 отзывов</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Продал Камри 2015 года. Приехали быстро, оценили честно, деньги получил сразу. Всё прошло без задержек и проблем. Рекомендую!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Алексей М.</div>
                  <div className="text-sm text-gray-500">2 недели назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Машина была после ДТП, думала не продам. Здесь выкупили без проблем, помогли с документами. Очень благодарна!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Марина К.</div>
                  <div className="text-sm text-gray-500">1 месяц назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Профессиональный подход! Оценили справедливо, оформление заняло 20 минут. Очень доволен сервисом."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Дмитрий В.</div>
                  <div className="text-sm text-gray-500">3 недели назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Нужно было срочно продать Форд Фокус. Позвонил утром, к обеду уже всё оформили и деньги на руках. Супер!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Сергей Л.</div>
                  <div className="text-sm text-gray-500">1 неделю назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Машина в кредите, помогли закрыть и всё оформить. Никаких скрытых комиссий. Честные ребята."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Игорь П.</div>
                  <div className="text-sm text-gray-500">2 месяца назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Выкупили Хонду CR-V. Цена устроила, всё быстро и без лишних вопросов. Спасибо за работу!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Елена Ш.</div>
                  <div className="text-sm text-gray-500">3 недели назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Продавал Ниссан Х-Трейл 2018 года. Сделка заняла полчаса. Деньги сразу перевели на карту. Всё чётко!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Андрей Н.</div>
                  <div className="text-sm text-gray-500">1 месяц назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Отличный сервис! Машина не на ходу была, организовали эвакуатор. Всё взяли на себя. Молодцы!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Владимир Р.</div>
                  <div className="text-sm text-gray-500">2 недели назад</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"Сравнивала цены с другими компаниями - здесь предложили больше всех. Доволна выбором!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ольга Т.</div>
                  <div className="text-sm text-gray-500">3 недели назад</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Присоединяйтесь к довольным клиентам</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Более 500 успешных сделок. Получите честную оценку вашего автомобиля прямо сейчас
          </p>
          <Link to="/evaluation">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 text-lg px-8 py-6 h-auto">
              <Icon name="Calculator" size={24} className="mr-2" />
              Оценить мой автомобиль
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

export default Reviews;
