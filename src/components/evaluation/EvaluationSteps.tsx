import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface FormData {
  brand: string;
  model: string;
  year: string;
  condition: string;
  legalStatus: string;
  description: string;
  location: string;
  contactMethod: string;
  phone: string;
}

interface EvaluationStepsProps {
  currentStep: number;
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNext: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  photos: string[];
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
  isDetectingLocation: boolean;
  detectLocation: () => void;
}

const EvaluationSteps = ({
  currentStep,
  formData,
  handleChange,
  handleNext,
  handleSubmit,
  photos,
  handlePhotoUpload,
  removePhoto,
  isDetectingLocation,
  detectLocation
}: EvaluationStepsProps) => {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Информация об автомобиле</h2>
              <p className="text-gray-600 text-sm md:text-base">Расскажите основные данные о вашем авто</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="brand" className="text-sm md:text-base">Марка автомобиля</Label>
                <Input
                  id="brand"
                  type="text"
                  placeholder="Например: Toyota"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="mt-1.5 h-11 md:h-12 text-sm md:text-base"
                />
              </div>

              <div>
                <Label htmlFor="model" className="text-sm md:text-base">Модель</Label>
                <Input
                  id="model"
                  type="text"
                  placeholder="Например: Camry"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="mt-1.5 h-11 md:h-12 text-sm md:text-base"
                />
              </div>

              <div>
                <Label htmlFor="year" className="text-sm md:text-base">Год выпуска</Label>
                <Input
                  id="year"
                  type="text"
                  placeholder="Например: 2018"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="mt-1.5 h-11 md:h-12 text-sm md:text-base"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={handleNext}
              disabled={!formData.brand || !formData.model || !formData.year}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 md:h-12 text-sm md:text-base"
            >
              Далее →
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Состояние автомобиля</h2>
              <p className="text-gray-600 text-sm md:text-base">Укажите техническое и юридическое состояние</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm md:text-base mb-3 block">Техническое состояние</Label>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {[
                    { value: 'excellent', label: 'Отличное', icon: 'ThumbsUp' },
                    { value: 'good', label: 'Хорошее', icon: 'Check' },
                    { value: 'fair', label: 'Удовлетворительное', icon: 'AlertCircle' },
                    { value: 'average', label: 'Среднее', icon: 'Minus' },
                    { value: 'poor', label: 'Плохое', icon: 'AlertTriangle' },
                    { value: 'broken', label: 'Битое/на запчасти', icon: 'XCircle' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        const event = {
                          target: { id: 'condition', value: option.value }
                        } as React.ChangeEvent<HTMLInputElement>;
                        handleChange(event);
                      }}
                      className={`p-3 md:p-4 rounded-lg border-2 transition text-left ${
                        formData.condition === option.value
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={option.icon as any} size={18} className="flex-shrink-0 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm md:text-base mb-3 block">Юридическое состояние</Label>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {[
                    { value: 'clean', label: 'Чистое', icon: 'CheckCircle2' },
                    { value: 'issues', label: 'Есть нюансы', icon: 'AlertCircle' },
                    { value: 'unclear', label: 'Не уверен', icon: 'HelpCircle' },
                    { value: 'pledge', label: 'Залог', icon: 'Lock' },
                    { value: 'ban', label: 'Запрет на рег. действия', icon: 'Ban' },
                    { value: 'wanted', label: 'В розыске', icon: 'Search' },
                    { value: 'problematic', label: 'Проблемное', icon: 'XCircle' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        const event = {
                          target: { id: 'legalStatus', value: option.value }
                        } as React.ChangeEvent<HTMLInputElement>;
                        handleChange(event);
                      }}
                      className={`p-3 md:p-4 rounded-lg border-2 transition text-left ${
                        formData.legalStatus === option.value
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={option.icon as any} size={18} className="flex-shrink-0 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm md:text-base">Дополнительное описание (необязательно)</Label>
                <Textarea
                  id="description"
                  placeholder="Опишите особенности, дефекты, тюнинг и другие детали..."
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1.5 min-h-[100px] text-sm md:text-base"
                />
              </div>

              <div>
                <Label className="text-sm md:text-base mb-3 block">Фотографии автомобиля (необязательно)</Label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex items-center justify-center gap-2 w-full p-4 md:p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition cursor-pointer bg-gray-50"
                  >
                    <Icon name="Camera" size={24} />
                    <span className="text-sm md:text-base text-gray-600">Добавить фото</span>
                  </label>

                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo}
                            alt={`Фото ${index + 1}`}
                            className="w-full h-32 md:h-40 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleNext}
              disabled={!formData.condition || !formData.legalStatus}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 md:h-12 text-sm md:text-base"
            >
              Далее →
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Местоположение</h2>
              <p className="text-gray-600 text-sm md:text-base">Где находится автомобиль?</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Icon name="MapPin" size={20} className="text-blue-600 flex-shrink-0" />
                <span className="text-sm md:text-base text-blue-900">
                  {isDetectingLocation ? 'Определяем местоположение...' : 'Выберите город из списка ниже'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'khabarovsk', label: 'Хабаровск', icon: 'Building2' },
                  { value: 'komsomolsk', label: 'Комсомольск-на-Амуре', icon: 'Building' },
                  { value: 'amursk', label: 'Амурск', icon: 'Home' },
                  { value: 'sovetskaya-gavan', label: 'Советская Гавань', icon: 'Anchor' },
                  { value: 'bikin', label: 'Бикин', icon: 'MapPin' },
                  { value: 'vyazemsky', label: 'Вяземский', icon: 'MapPin' },
                  { value: 'nikolaevsk', label: 'Николаевск-на-Амуре', icon: 'Ship' },
                  { value: 'vanino', label: 'Ванино', icon: 'Anchor' },
                  { value: 'pereyaslavka', label: 'Переяславка', icon: 'MapPin' },
                  { value: 'khabarovsky-raion', label: 'Хабаровский район', icon: 'Map' },
                  { value: 'komsomolsky-raion', label: 'Комсомольский район', icon: 'Map' },
                  { value: 'other', label: 'Другой населённый пункт', icon: 'MoreHorizontal' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const event = {
                        target: { id: 'location', value: option.value }
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleChange(event);
                    }}
                    className={`p-3 md:p-4 rounded-lg border-2 transition text-left ${
                      formData.location === option.value
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={option.icon as any} size={20} className="flex-shrink-0" />
                      <span className="text-sm md:text-base font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="button"
              onClick={handleNext}
              disabled={!formData.location}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 md:h-12 text-sm md:text-base"
            >
              Далее →
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Контактные данные</h2>
              <p className="text-gray-600 text-sm md:text-base">Как с вами связаться?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm md:text-base mb-3 block">Предпочитаемый способ связи</Label>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {[
                    { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
                    { value: 'telegram', label: 'Telegram', icon: 'Send' },
                    { value: 'phone', label: 'Звонок', icon: 'Phone' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        const event = {
                          target: { id: 'contactMethod', value: option.value }
                        } as React.ChangeEvent<HTMLInputElement>;
                        handleChange(event);
                      }}
                      className={`p-3 md:p-4 rounded-lg border-2 transition ${
                        formData.contactMethod === option.value
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon name={option.icon as any} size={24} />
                        <span className="text-xs md:text-sm font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm md:text-base">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1.5 h-11 md:h-12 text-sm md:text-base"
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-base text-gray-900 font-medium mb-1">Что дальше?</p>
                  <p className="text-xs md:text-sm text-gray-600">
                    После отправки заявки наш эксперт свяжется с вами в течение 5 минут для уточнения деталей и назначения встречи
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!formData.contactMethod || !formData.phone}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-11 md:h-12 text-sm md:text-base"
            >
              Отправить заявку
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderStep()}</form>;
};

export default EvaluationSteps;
