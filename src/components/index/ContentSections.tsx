import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ContentSectionsProps {
  handleEvaluationClick: () => void;
  handlePhoneClick: () => void;
}

const ContentSections = ({ handleEvaluationClick, handlePhoneClick }: ContentSectionsProps) => {
  return (
    <>
      <section className="py-8 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-3xl font-bold text-center mb-2 text-gray-900">Какие авто выкупаем</h2>
          <p className="text-center text-gray-600 mb-6 md:mb-12 max-w-2xl mx-auto text-base md:text-base">В любом состоянии, быстро и дорого</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-4 md:p-4 rounded-xl border-2 border-gray-200 flex items-start gap-3 shadow-sm">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-base">Отличное</h3>
                <p className="text-gray-600 text-sm md:text-sm">без повреждений</p>
              </div>
            </div>
            <div className="bg-white p-4 md:p-4 rounded-xl border-2 border-gray-200 flex items-start gap-3 shadow-sm">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-base">Хорошее</h3>
                <p className="text-gray-600 text-sm md:text-sm">мелкие дефекты</p>
              </div>
            </div>
            <div className="bg-white p-4 md:p-4 rounded-xl border-2 border-gray-200 flex items-start gap-3 shadow-sm">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-base">Среднее</h3>
                <p className="text-gray-600 text-sm md:text-sm">требует ремонта</p>
              </div>
            </div>
            <div className="bg-white p-4 md:p-4 rounded-xl border-2 border-gray-200 flex items-start gap-3 shadow-sm">
              <Icon name="Car" size={24} className="text-orange-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-base">Битое</h3>
                <p className="text-gray-600 text-sm md:text-sm">после ДТП</p>
              </div>
            </div>
            <div className="bg-white p-4 md:p-4 rounded-xl border-2 border-gray-200 flex items-start gap-3 shadow-sm">
              <Icon name="Wrench" size={24} className="text-gray-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-base">Не на ходу</h3>
                <p className="text-gray-600 text-sm md:text-sm">не заводится, требует эвакуации</p>
              </div>
            </div>
            <div className="bg-white p-4 md:p-4 rounded-xl border-2 border-gray-200 flex items-start gap-3 shadow-sm">
              <Icon name="CreditCard" size={24} className="text-blue-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-base">В кредите</h3>
                <p className="text-gray-600 text-sm md:text-sm">поможем закрыть</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3 md:col-span-2 md:max-w-sm md:mx-auto">
              <Icon name="FileText" size={24} className="text-gray-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-base">Без документов</h3>
                <p className="text-gray-600 text-sm md:text-sm">решим вопрос</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-gray-900">Где мы работаем</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base">Выкупаем автомобили по всему Хабаровскому краю</p>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Хабаровск</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/komsomolsk" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Комсомольск-на-Амуре</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/amursk" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Амурск</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/sovetskaya-gavan" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Советская Гавань</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/bikin" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Бикин</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/vyazemsky" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Вяземский</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/nikolaevsk-na-amure" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Николаевск-на-Амуре</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/vanino" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Ванино</Link>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <Link to="/pereyaslavka" className="text-gray-900 font-medium text-sm md:text-base hover:underline">Переяславка</Link>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-900 font-bold text-sm md:text-base">А также Хабаровский район, Комсомольский район и все населённые пункты края</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-gray-900">Почему мы?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="flex gap-4 md:gap-4 items-start p-5 md:p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-600 rounded-xl relative overflow-hidden shadow-md">
              <div className="absolute top-2 right-2 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-lg">№ 1</div>
              <Icon name="TrendingUp" size={28} className="text-green-600 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold mb-1 text-gray-900 text-lg md:text-base">Выкупаем дороже</h3>
                <p className="text-gray-900 font-semibold text-base md:text-base">На 15% выше конкурентов</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-4 items-start p-5 md:p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
              <Icon name="Clock" size={28} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold mb-1 text-gray-900 text-lg md:text-base">Быстрая сделка</h3>
                <p className="text-gray-600 text-base md:text-base">Оформление за 30 минут</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-4 items-start p-5 md:p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
              <Icon name="ShieldCheck" size={28} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold mb-1 text-gray-900 text-lg md:text-base">Честная оценка</h3>
                <p className="text-gray-600 text-base md:text-base">Реальная рыночная цена</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-4 items-start p-5 md:p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
              <Icon name="Banknote" size={28} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold mb-1 text-gray-900 text-lg md:text-base">Оплата наличными</h3>
                <p className="text-gray-600 text-base md:text-base">Деньги сразу после сделки</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-4 items-start p-5 md:p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm md:col-span-2 md:max-w-md md:mx-auto">
              <Icon name="FileText" size={28} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold mb-1 text-gray-900 text-lg md:text-base">Все документы</h3>
                <p className="text-gray-600 text-base md:text-base">Берём на себя все вопросы</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">Частые вопросы</h2>
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            <details className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-base md:text-lg touch-manipulation">Сколько времени занимает выкуп автомобиля?</summary>
              <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">Весь процесс от оценки до получения денег занимает 15-30 минут. Приезжаем в удобное для вас время, осматриваем авто, оформляем договор и сразу выплачиваем деньги.</p>
            </details>
            <details className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-base md:text-lg touch-manipulation">Выкупаете ли вы битые автомобили?</summary>
              <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">Да, мы выкупаем автомобили в любом состоянии: битые после ДТП, не на ходу, с проблемами двигателя или коробки передач. Оценка зависит от реального состояния.</p>
            </details>
            <details className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-base md:text-lg touch-manipulation">Можно ли продать машину в кредите?</summary>
              <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">Да, выкупаем кредитные автомобили. Помогаем закрыть кредит в банке и оформить все документы. Разница выплачивается вам сразу после погашения кредита.</p>
            </details>
            <details className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-base md:text-lg touch-manipulation">Какие документы нужны для продажи?</summary>
              <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">Для продажи нужен только паспорт собственника и ПТС/СТС. Если документов нет — помогаем восстановить. Договор купли-продажи оформляем сами на месте.</p>
            </details>
            <details className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-base md:text-lg touch-manipulation">Выезжаете ли вы за город?</summary>
              <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">Да, выезжаем по всему Хабаровскому краю: Комсомольск-на-Амуре, Амурск, Советская Гавань, Бикин, Вяземский и другие города. Выезд оценщика бесплатный.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-gray-900">Отзывы клиентов</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base">Более 500 довольных клиентов за 2024 год</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                  А
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Александр</div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">Продал Камри 2015 года. Оценили реально дороже, чем в других местах. Приехали быстро, деньги отдали сразу наличными. Рекомендую!</p>
              <div className="mt-3 text-xs md:text-sm text-gray-500">Хабаровск, 2 недели назад</div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                  М
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Марина</div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">Машина была битая после ДТП. Думала, что никто не возьмёт. Ребята приехали, осмотрели и сразу предложили хорошую цену. Всё оформили за 20 минут. Спасибо большое!</p>
              <div className="mt-3 text-xs md:text-sm text-gray-500">Комсомольск-на-Амуре, месяц назад</div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                  Д
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Дмитрий</div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                    <Icon name="Star" size={14} className="fill-yellow-500 md:w-4 md:h-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">Выкупили машину в кредите. Помогли закрыть кредит в банке, всё сами оформили. Очень удобно и без лишней волокиты. Буду обращаться ещё!</p>
              <div className="mt-3 text-xs md:text-sm text-gray-500">Хабаровск, 3 недели назад</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-green-600 text-white px-5 py-3 rounded-xl font-bold text-lg md:text-base mb-4 shadow-lg">
            💰 Предложим на 15% больше рынка
          </div>
          <h2 className="text-3xl md:text-3xl font-bold mb-3 md:mb-4">Готовы продать авто?</h2>
          <p className="text-xl md:text-xl mb-6 md:mb-8 text-gray-200">Получите оценку прямо сейчас</p>
          <Button 
            size="lg" 
            onClick={handleEvaluationClick}
            className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg md:text-lg px-8 md:px-8 py-6 md:py-6 h-auto w-full sm:w-auto max-w-sm mx-auto touch-manipulation shadow-xl"
          >
            Оценить авто
          </Button>
        </div>
      </section>



      <Footer />
    </>
  );
};

export default ContentSections;