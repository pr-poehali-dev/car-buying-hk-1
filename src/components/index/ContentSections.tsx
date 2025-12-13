import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ContentSectionsProps {
  handleEvaluationClick: () => void;
  handlePhoneClick: () => void;
}

const ContentSections = ({ handleEvaluationClick, handlePhoneClick }: ContentSectionsProps) => {
  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Какие автомобили выкупаем</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Выкупаем авто в любом состоянии</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Отличное</h3>
                <p className="text-gray-600 text-sm">без повреждений</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Хорошее</h3>
                <p className="text-gray-600 text-sm">мелкие дефекты</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Среднее</h3>
                <p className="text-gray-600 text-sm">требует ремонта</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="Car" size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Битое</h3>
                <p className="text-gray-600 text-sm">после ДТП</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="Wrench" size={24} className="text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Не на ходу</h3>
                <p className="text-gray-600 text-sm">не заводится, требует эвакуации</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="CreditCard" size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">В кредите</h3>
                <p className="text-gray-600 text-sm">поможем закрыть</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
              <Icon name="FileText" size={24} className="text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Без документов</h3>
                <p className="text-gray-600 text-sm">решим вопрос</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Где мы работаем</h2>
          <p className="text-center text-gray-600 mb-12">Выкупаем автомобили по всему Хабаровскому краю</p>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Хабаровск</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Комсомольск-на-Амуре</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Амурск</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Советская Гавань</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Бикин</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Вяземский</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Николаевск-на-Амуре</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Ванино</span>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-gray-900 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Переяславка</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600">А также Хабаровский район, Комсомольский район и все населённые пункты края</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="Clock" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Быстрая сделка</h3>
                <p className="text-gray-600">Оформление за 30 минут</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="ShieldCheck" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Честная оценка</h3>
                <p className="text-gray-600">Реальная рыночная цена</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="Banknote" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Оплата наличными</h3>
                <p className="text-gray-600">Получите деньги сразу после сделки</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg">
              <Icon name="FileText" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Все документы</h3>
                <p className="text-gray-600">Берём на себя все вопросы с документами</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Частые вопросы</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-lg">Сколько времени занимает выкуп автомобиля?</summary>
              <p className="mt-3 text-gray-600">Весь процесс от оценки до получения денег занимает 15-30 минут. Приезжаем в удобное для вас время, осматриваем авто, оформляем договор и сразу выплачиваем деньги.</p>
            </details>
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-lg">Выкупаете ли вы битые автомобили?</summary>
              <p className="mt-3 text-gray-600">Да, мы выкупаем автомобили в любом состоянии: битые после ДТП, не на ходу, с проблемами двигателя или коробки передач. Оценка зависит от реального состояния.</p>
            </details>
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-lg">Можно ли продать машину в кредите?</summary>
              <p className="mt-3 text-gray-600">Да, выкупаем кредитные автомобили. Помогаем закрыть кредит в банке и оформить все документы. Разница выплачивается вам сразу после погашения кредита.</p>
            </details>
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-lg">Какие документы нужны для продажи?</summary>
              <p className="mt-3 text-gray-600">Для продажи нужен только паспорт собственника и ПТС/СТС. Если документов нет — помогаем восстановить. Договор купли-продажи оформляем сами на месте.</p>
            </details>
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer text-lg">Выезжаете ли вы за город?</summary>
              <p className="mt-3 text-gray-600">Да, выезжаем по всему Хабаровскому краю: Комсомольск-на-Амуре, Амурск, Советская Гавань, Бикин, Вяземский и другие города. Выезд оценщика бесплатный.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы продать авто?</h2>
          <p className="text-xl mb-8 text-gray-300">Получите оценку прямо сейчас</p>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleEvaluationClick}
            className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
          >
            Оценить авто
          </Button>
        </div>
      </section>

      <a 
        href="https://wa.me/79841771588" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition z-50"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </a>

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
            <a href="tel:+79841771588" onClick={handlePhoneClick} className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContentSections;
