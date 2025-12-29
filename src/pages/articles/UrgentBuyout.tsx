import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Header from "@/components/index/Header";
import WhatsAppButton from "@/components/index/WhatsAppButton";
import { useState } from "react";

const UrgentBuyout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Срочный выкуп авто за наличные Хабаровск - Деньги за 15 минут | +7(984)177-15-88";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Срочный выкуп автомобилей за наличные в Хабаровске за 15 минут. Приезжаем, оцениваем, платим сразу. Любое состояние. Звоните +7(984)177-15-88');
    }
  }, []);

  const handlePhoneClick = () => {};

  return (
    <div className="min-h-screen bg-white">
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handlePhoneClick={handlePhoneClick}
      />

      <article className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Срочный выкуп авто за наличные в Хабаровске</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">Нужны деньги срочно? Мы выкупим ваш автомобиль за 15 минут. Приезжаем к вам, оцениваем, оформляем сделку и выдаём деньги наличными сразу на руки.</p>

            <img 
              src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg" 
              alt="Срочный выкуп авто за наличные"
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <h2 className="text-3xl font-bold mt-12 mb-6">Когда нужен срочный выкуп?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
                <Icon name="AlertCircle" className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Срочно нужны деньги</h3>
                <p className="text-gray-600">На лечение, переезд, погашение долгов</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
                <Icon name="Clock" className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Нет времени на продажу</h3>
                <p className="text-gray-600">Командировка, переезд в другой город</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <Icon name="Car" className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Покупка другого авто</h3>
                <p className="text-gray-600">Нужны деньги на первый взнос</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <Icon name="Home" className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Крупная покупка</h3>
                <p className="text-gray-600">Недвижимость, ремонт, бизнес</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Как проходит срочный выкуп?</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Звоните — 1 минута</h3>
                  <p className="text-gray-600">Позвоните нам по телефону +7(984)177-15-88 или оставьте заявку на сайте. Сообщите марку, модель, год и состояние авто.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Приезжаем к вам — 30-60 минут</h3>
                  <p className="text-gray-600">Наш оценщик приезжает в любую точку Хабаровска и края в течение часа после звонка.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Оцениваем — 10 минут</h3>
                  <p className="text-gray-600">Осматриваем авто, проверяем документы, называем окончательную цену.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Оформляем сделку — 15 минут</h3>
                  <p className="text-gray-600">Подписываем договор купли-продажи, акт приёма-передачи. Все документы готовим сами.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">5</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Получаете деньги — сразу</h3>
                  <p className="text-gray-600">Выдаём деньги наличными на руки или переводим на карту (по вашему желанию).</p>
                </div>
              </div>
            </div>

            <div className="bg-green-600 text-white p-8 rounded-lg mb-8 not-prose">
              <h3 className="text-2xl font-bold mb-4">⚡ Итого: от звонка до денег — 60-90 минут!</h3>
              <p className="text-lg">Это самый быстрый способ продать автомобиль в Хабаровске.</p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Почему мы платим сразу?</h2>
            
            <div className="bg-blue-50 p-8 rounded-lg mb-8 not-prose">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>У нас всегда есть наличные</strong> — работаем с крупным оборотом, деньги всегда в наличии</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Официальная компания</strong> — ИП с лицензией, все документы в порядке</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Опыт 7+ лет</strong> — выкупили более 1000 автомобилей в крае</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Собственные площадки</strong> — перепродаём авто сами, не работаем через посредников</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Какие авто выкупаем срочно?</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8 not-prose">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                <Icon name="CheckCircle" className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold">Отличные</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                <Icon name="CheckCircle" className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold">Хорошие</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                <Icon name="AlertCircle" className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-semibold">Средние</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                <Icon name="Car" className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="font-semibold">Битые</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                <Icon name="Wrench" className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="font-semibold">Не на ходу</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                <Icon name="CreditCard" className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold">В кредите</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Часто задаваемые вопросы</h2>
            
            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Сколько денег сразу на руки можете дать?</summary>
              <p className="mt-3 text-gray-700">До 3 миллионов рублей наличными на руки в день сделки. Если сумма больше — часть наличными, часть переводом на карту.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Можно ли продать в выходные?</summary>
              <p className="mt-3 text-gray-700">Да, работаем 7 дней в неделю без выходных. Звоните в любой день.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">А если авто в залоге или кредите?</summary>
              <p className="mt-3 text-gray-700">Выкупаем кредитные авто. Едем в банк вместе, закрываем кредит, получаем ПТС и оформляем сделку. Разницу получаете на руки.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Занижаете ли вы цену?</summary>
              <p className="mt-3 text-gray-700">Нет, мы оцениваем по рынку. Можем показать аналоги на Авито и Drom.ru. Наша цена — честная рыночная стоимость минус 10-15% за срочность.</p>
            </details>

            <div className="bg-red-600 text-white p-8 rounded-lg text-center mt-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">🚨 Срочно нужны деньги? Звоните прямо сейчас!</h3>
              <p className="mb-6 text-lg">Приедем в течение часа, деньги на руки за 15 минут</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.location.href = 'tel:+79841771588'}
                  className="bg-white text-red-600 hover:bg-gray-100 text-lg"
                >
                  <Icon name="PhoneCall" className="mr-2" />
                  Позвонить сейчас
                </Button>
                <Button 
                  size="lg"
                  onClick={() => navigate('/evaluation')}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg"
                >
                  <Icon name="Calculator" className="mr-2" />
                  Оценить онлайн
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <WhatsAppButton />
    </div>
  );
};

export default UrgentBuyout;
