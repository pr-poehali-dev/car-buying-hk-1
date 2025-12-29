import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Header from "@/components/index/Header";
import WhatsAppButton from "@/components/index/WhatsAppButton";
import { useState } from "react";

const CreditCars = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Выкуп кредитных авто Хабаровск - Поможем закрыть кредит | +7(984)177-15-88";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Выкуп автомобилей в кредите в Хабаровске. Поможем закрыть кредит в банке. Деньги сразу. Все вопросы берем на себя. Звоните +7(984)177-15-88');
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Выкуп кредитных авто в Хабаровске</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">Автомобиль в кредите и нужно продать? Мы поможем закрыть кредит в банке и выкупим ваше авто. Работаем со всеми банками края.</p>

            <img 
              src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg" 
              alt="Выкуп кредитных авто"
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <h2 className="text-3xl font-bold mt-12 mb-6">Как продать кредитное авто?</h2>
            
            <ol className="space-y-6 mb-8">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</span>
                <div>
                  <h3 className="font-bold text-xl mb-2">Звоните нам</h3>
                  <p className="text-gray-600">Сообщаете марку, модель, год авто и название банка, где кредит</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</span>
                <div>
                  <h3 className="font-bold text-xl mb-2">Узнаем остаток кредита</h3>
                  <p className="text-gray-600">Вы звоните в банк или мы помогаем узнать сумму долга</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</span>
                <div>
                  <h3 className="font-bold text-xl mb-2">Оцениваем авто</h3>
                  <p className="text-gray-600">Приезжаем, осматриваем, называем цену с учетом кредита</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</span>
                <div>
                  <h3 className="font-bold text-xl mb-2">Закрываем кредит</h3>
                  <p className="text-gray-600">Едем в банк, гасим кредит, получаем ПТС и справку</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">5</span>
                <div>
                  <h3 className="font-bold text-xl mb-2">Оформляем сделку</h3>
                  <p className="text-gray-600">Подписываем договор, вы получаете разницу деньгами</p>
                </div>
              </li>
            </ol>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 not-prose">
              <div className="flex gap-3">
                <Icon name="Info" className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Важно знать</h3>
                  <p>Если стоимость авто больше остатка кредита — разницу получаете вы. Если меньше — нужно доплатить банку. Мы поможем рассчитать все заранее.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">С какими банками работаем?</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8 not-prose">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">Сбербанк</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">ВТБ</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">Альфа-Банк</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">Тинькофф</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">Газпромбанк</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-semibold">Другие банки</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Преимущества работы с нами</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border-2 border-green-600">
                <Icon name="Shield" className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">Берём все на себя</h3>
                <p className="text-gray-600">Поездка в банк, оформление документов, снятие с учёта</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                <Icon name="Clock" className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">Быстро</h3>
                <p className="text-gray-600">Закрываем кредит и оформляем сделку за 1-2 дня</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
                <Icon name="FileText" className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">Юридически чисто</h3>
                <p className="text-gray-600">Все документы оформляем правильно, никаких рисков</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                <Icon name="Banknote" className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">Честная цена</h3>
                <p className="text-gray-600">Оцениваем по рынку, без занижения</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Часто задаваемые вопросы</h2>
            
            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Можно ли продать авто, если оно в залоге?</summary>
              <p className="mt-3 text-gray-700">Да, можно. Мы поможем закрыть кредит в банке, получить ПТС и оформить продажу законно.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Сколько времени занимает сделка?</summary>
              <p className="mt-3 text-gray-700">Обычно 1-2 дня: в первый день оцениваем авто и узнаём остаток кредита, во второй едем в банк, закрываем кредит и оформляем продажу.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Что если кредит больше стоимости авто?</summary>
              <p className="mt-3 text-gray-700">Если остаток кредита больше рыночной цены авто, вам нужно будет доплатить разницу банку. Но мы поможем рассчитать всё заранее.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Работаете ли вы с банками из других регионов?</summary>
              <p className="mt-3 text-gray-700">Да, работаем с любыми банками России. Процедура одинаковая для всех.</p>
            </details>

            <div className="bg-blue-600 text-white p-8 rounded-lg text-center mt-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Продайте кредитное авто без проблем!</h3>
              <p className="mb-6 text-lg">Поможем закрыть кредит и оформить сделку</p>
              <Button 
                size="lg"
                onClick={() => navigate('/evaluation')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Icon name="Calculator" className="mr-2" />
                Оценить кредитное авто
              </Button>
            </div>
          </div>
        </div>
      </article>

      <WhatsAppButton />
    </div>
  );
};

export default CreditCars;
