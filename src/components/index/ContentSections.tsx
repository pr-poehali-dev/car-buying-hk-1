import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ContentSectionsProps {
  handleEvaluationClick: () => void;
  handlePhoneClick: () => void;
}

const ContentSections = ({ handleEvaluationClick, handlePhoneClick }: ContentSectionsProps) => {
  return (
    <>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-gray-900">Какие автомобили выкупаем</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">Выкупаем авто в любом состоянии</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Отличное</h3>
                <p className="text-gray-600 text-xs md:text-sm">без повреждений</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Хорошее</h3>
                <p className="text-gray-600 text-xs md:text-sm">мелкие дефекты</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Среднее</h3>
                <p className="text-gray-600 text-xs md:text-sm">требует ремонта</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="Car" size={20} className="text-orange-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Битое</h3>
                <p className="text-gray-600 text-xs md:text-sm">после ДТП</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="Wrench" size={20} className="text-gray-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Не на ходу</h3>
                <p className="text-gray-600 text-xs md:text-sm">не заводится, требует эвакуации</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CreditCard" size={20} className="text-blue-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">В кредите</h3>
                <p className="text-gray-600 text-xs md:text-sm">поможем закрыть</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex items-start gap-3 md:col-span-2 md:max-w-sm md:mx-auto">
              <Icon name="FileText" size={20} className="text-gray-600 flex-shrink-0 mt-0.5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Без документов</h3>
                <p className="text-gray-600 text-xs md:text-sm">решим вопрос</p>
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
                <span className="text-gray-900 font-medium text-sm md:text-base">Хабаровск</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Комсомольск-на-Амуре</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Амурск</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Советская Гавань</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Бикин</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Вяземский</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Николаевск-на-Амуре</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Ванино</span>
              </div>
              <div className="flex items-center gap-2 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={18} className="text-gray-900 flex-shrink-0 md:w-5 md:h-5" />
                <span className="text-gray-900 font-medium text-sm md:text-base">Переяславка</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm md:text-base">А также Хабаровский район, Комсомольский район и все населённые пункты края</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="flex gap-3 md:gap-4 items-start p-4 md:p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="Clock" size={20} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900 text-sm md:text-base">Быстрая сделка</h3>
                <p className="text-gray-600 text-sm md:text-base">Оформление за 30 минут</p>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 items-start p-4 md:p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="ShieldCheck" size={20} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900 text-sm md:text-base">Честная оценка</h3>
                <p className="text-gray-600 text-sm md:text-base">Реальная рыночная цена</p>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 items-start p-4 md:p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="Banknote" size={20} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900 text-sm md:text-base">Оплата наличными</h3>
                <p className="text-gray-600 text-sm md:text-base">Получите деньги сразу после сделки</p>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 items-start p-4 md:p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="FileText" size={20} className="text-gray-900 flex-shrink-0 mt-1 md:w-6 md:h-6" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900 text-sm md:text-base">Все документы</h3>
                <p className="text-gray-600 text-sm md:text-base">Берём на себя все вопросы с документами</p>
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

      <section className="py-12 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Готовы продать авто?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-300">Получите оценку прямо сейчас</p>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleEvaluationClick}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto max-w-xs mx-auto touch-manipulation"
          >
            Оценить авто
          </Button>
        </div>
      </section>

      <a 
        href="https://wa.me/79841771588" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg transition z-50 touch-manipulation"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} className="md:w-8 md:h-8" />
      </a>

      <footer className="bg-white border-t border-gray-200 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Car" size={20} className="text-gray-900 md:w-6 md:h-6" />
              <span className="font-semibold text-gray-900 text-sm md:text-base">АвтоВыкуп</span>
            </div>
            <div className="text-gray-600 text-xs md:text-sm text-center">
              © 2024 Выкуп автомобилей в Хабаровске
            </div>
            <a href="tel:+79841771588" onClick={handlePhoneClick} className="text-gray-900 font-bold text-base md:text-lg touch-manipulation">+7 (984) 177-15-88</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContentSections;
