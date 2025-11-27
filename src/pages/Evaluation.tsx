import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

const Evaluation = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    condition: "",
    legalStatus: "",
    description: "",
    location: "",
    name: "",
    phone: ""
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({
      brand: "",
      model: "",
      year: "",
      condition: "",
      legalStatus: "",
      description: "",
      location: "",
      name: "",
      phone: ""
    });
    setCurrentStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.brand && formData.model && formData.year;
    }
    if (currentStep === 2) {
      return formData.condition && formData.legalStatus;
    }
    if (currentStep === 3) {
      return formData.location && formData.name && formData.phone;
    }
    return false;
  };

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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Оценка автомобиля</h1>
            <p className="text-lg text-gray-600 mb-8">Ответьте на несколько вопросов для быстрой оценки</p>

            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        step < currentStep ? 'bg-gray-900' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Данные авто</span>
                <span>Состояние</span>
                <span>Местоположение</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor="brand">Марка автомобиля</Label>
                    <Input 
                      id="brand" 
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Toyota" 
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="model">Модель</Label>
                    <Input 
                      id="model" 
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="Camry" 
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="year">Год выпуска</Label>
                    <Input 
                      id="year" 
                      type="number"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="2020" 
                      required 
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor="condition">Состояние автомобиля</Label>
                    <select
                      id="condition"
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Выберите состояние</option>
                      <option value="excellent">Отличное</option>
                      <option value="good">Хорошее</option>
                      <option value="fair">Среднее</option>
                      <option value="poor">Требует ремонта</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="legalStatus">Юридическая чистота</Label>
                    <select
                      id="legalStatus"
                      value={formData.legalStatus}
                      onChange={(e) => setFormData({...formData, legalStatus: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Выберите статус</option>
                      <option value="clean">Чистая</option>
                      <option value="issues">Есть нюансы</option>
                      <option value="unclear">Не уверен</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="description">Дополнительная информация</Label>
                    <Textarea 
                      id="description" 
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Комплектация, особенности, повреждения..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor="location">Где находится автомобиль?</Label>
                    <select
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Выберите город</option>
                      <option value="khabarovsk">Хабаровск</option>
                      <option value="komsomolsk">Комсомольск-на-Амуре</option>
                      <option value="lazo">Район имени Лазо</option>
                      <option value="other">Другой населённый пункт</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов" 
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__" 
                      required 
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Назад
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex-1"
                  >
                    Далее
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={!isStepValid()}
                    className="flex-1"
                  >
                    Отправить заявку
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-12 space-y-4 border-t border-gray-200 pt-8">
              <div className="flex gap-3 items-start">
                <Icon name="CheckCircle2" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
                <p className="text-gray-600">Бесплатная оценка в течение 1 часа</p>
              </div>
              <div className="flex gap-3 items-start">
                <Icon name="CheckCircle2" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
                <p className="text-gray-600">Выезд специалиста для осмотра</p>
              </div>
              <div className="flex gap-3 items-start">
                <Icon name="CheckCircle2" size={24} className="text-gray-900 flex-shrink-0 mt-1" />
                <p className="text-gray-600">Оплата сразу после сделки</p>
              </div>
            </div>
          </div>
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

export default Evaluation;