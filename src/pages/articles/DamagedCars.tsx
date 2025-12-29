import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Header from "@/components/index/Header";
import WhatsAppButton from "@/components/index/WhatsAppButton";
import { useState } from "react";

const DamagedCars = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Выкуп битых авто Хабаровск - Срочный выкуп после ДТП | +7(984)177-15-88";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Выкуп битых автомобилей после ДТП в Хабаровске. Оценка за 15 минут, деньги сразу. Не на ходу, с повреждениями — выкупаем любые. Звоните +7(984)177-15-88');
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Выкуп битых авто в Хабаровске</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">После ДТП не знаете, что делать с автомобилем? Мы выкупим битое авто по честной цене за 15 минут. Деньги сразу наличными.</p>

            <img 
              src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg" 
              alt="Выкуп битых авто"
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <h2 className="text-3xl font-bold mt-12 mb-6">Какие битые авто выкупаем?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
              <div className="bg-gray-50 p-6 rounded-lg">
                <Icon name="AlertCircle" className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">После лобового удара</h3>
                <p className="text-gray-600">Повреждена передняя часть, двигатель, радиатор</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Icon name="Car" className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">После бокового удара</h3>
                <p className="text-gray-600">Повреждены двери, крылья, стойки</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Icon name="Wrench" className="w-10 h-10 text-gray-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">Не на ходу</h3>
                <p className="text-gray-600">Не заводится, требует эвакуации</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Icon name="AlertTriangle" className="w-10 h-10 text-yellow-600 mb-3" />
                <h3 className="font-bold text-xl mb-2">После переворота</h3>
                <p className="text-gray-600">Повреждена крыша, все стороны</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Как происходит выкуп?</h2>
            
            <ol className="space-y-4 mb-8">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <strong>Звоните нам</strong> по телефону +7(984)177-15-88 или оставляете заявку на сайте
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <strong>Приезжаем к вам</strong> в течение 30-60 минут в любую точку Хабаровска и края
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <strong>Оцениваем авто</strong> — осматриваем повреждения, делаем расчет стоимости
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <div>
                  <strong>Оформляем договор</strong> — все документы берём на себя
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                <div>
                  <strong>Выплачиваем деньги</strong> сразу наличными или переводом
                </div>
              </li>
            </ol>

            <h2 className="text-3xl font-bold mt-12 mb-6">Почему выгодно продать нам?</h2>
            
            <div className="bg-green-50 p-8 rounded-lg mb-8 not-prose">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Не нужно восстанавливать</strong> — выкупаем в том состоянии, в котором есть</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Не нужно искать покупателя</strong> — продажа за 1 день</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Честная оценка</strong> — платим справедливую цену с учётом всех деталей</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Бесплатная эвакуация</strong> — если авто не на ходу</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Часто задаваемые вопросы</h2>
            
            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Сколько стоит битое авто?</summary>
              <p className="mt-3 text-gray-700">Цена зависит от степени повреждений, марки, года, пробега. В среднем битое авто стоит 30-60% от рыночной цены целого авто. Точную оценку делаем после осмотра.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Нужны ли документы для продажи?</summary>
              <p className="mt-3 text-gray-700">Да, нужен паспорт собственника и ПТС. Если документов нет или они в банке — поможем восстановить.</p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg mb-4">
              <summary className="font-bold text-lg cursor-pointer">Выкупаете ли авто после серьезного ДТП?</summary>
              <p className="mt-3 text-gray-700">Да, выкупаем автомобили с любыми повреждениями: после лобового, бокового удара, переворота, затопления.</p>
            </details>

            <div className="bg-blue-600 text-white p-8 rounded-lg text-center mt-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Продайте битое авто прямо сейчас!</h3>
              <p className="mb-6 text-lg">Оценка за 15 минут, деньги сразу</p>
              <Button 
                size="lg"
                onClick={() => navigate('/evaluation')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Icon name="Calculator" className="mr-2" />
                Оценить битое авто
              </Button>
            </div>
          </div>
        </div>
      </article>

      <WhatsAppButton />
    </div>
  );
};

export default DamagedCars;
