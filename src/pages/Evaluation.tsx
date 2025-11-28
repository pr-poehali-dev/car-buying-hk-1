import { useState, useEffect } from "react";
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
  const [photos, setPhotos] = useState<string[]>([]);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    condition: "",
    legalStatus: "",
    description: "",
    location: "",
    contactMethod: "",
    phone: ""
  });

  const totalSteps = 4;

  useEffect(() => {
    if (currentStep === 3 && !formData.location) {
      detectLocation();
    }
  }, [currentStep]);

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const city = data.city || '';
      const region = data.region || '';
      let detectedLocation = 'other';

      const cityMap: Record<string, string> = {
        'Хабаровск': 'khabarovsk',
        'Khabarovsk': 'khabarovsk',
        'Комсомольск-на-Амуре': 'komsomolsk',
        'Komsomolsk-on-Amur': 'komsomolsk',
        'Амурск': 'amursk',
        'Amursk': 'amursk',
        'Советская Гавань': 'sovetskaya-gavan',
        'Sovetskaya Gavan': 'sovetskaya-gavan',
        'Бикин': 'bikin',
        'Bikin': 'bikin',
        'Вяземский': 'vyazemsky',
        'Vyazemsky': 'vyazemsky',
        'Николаевск-на-Амуре': 'nikolaevsk',
        'Nikolayevsk-on-Amure': 'nikolaevsk',
        'Ванино': 'vanino',
        'Vanino': 'vanino',
        'Переяславка': 'pereyaslavka',
        'Pereyaslavka': 'pereyaslavka'
      };

      if (city && cityMap[city]) {
        detectedLocation = cityMap[city];
      } else if (region && region.includes('Хабаровск')) {
        detectedLocation = 'khabarovsk';
      }

      setFormData({...formData, location: detectedLocation});
      toast({
        title: "Местоположение определено",
        description: city || region || "Хабаровский край"
      });
    } catch (error) {
      toast({
        title: "Ошибка определения",
        description: "Выберите местоположение вручную",
        variant: "destructive"
      });
    }
    
    setIsDetectingLocation(false);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const conditionMap: Record<string, string> = {
      'excellent': 'Отличное',
      'good': 'Хорошее',
      'average': 'Среднее',
      'poor': 'Плохое',
      'broken': 'Битое/на запчасти'
    };
    
    const legalMap: Record<string, string> = {
      'clean': 'Чистое',
      'pledge': 'Залог',
      'ban': 'Запрет на рег. действия',
      'wanted': 'В розыске',
      'problematic': 'Проблемное'
    };
    
    const locationMap: Record<string, string> = {
      'khabarovsk': 'Хабаровск',
      'komsomolsk': 'Комсомольск-на-Амуре',
      'amursk': 'Амурск',
      'sovetskaya-gavan': 'Советская Гавань',
      'bikin': 'Бикин',
      'vyazemsky': 'Вяземский',
      'nikolaevsk': 'Николаевск-на-Амуре',
      'vanino': 'Ванино',
      'pereyaslavka': 'Переяславка',
      'other': 'Другое'
    };
    
    const contactMap: Record<string, string> = {
      'whatsapp': 'WhatsApp',
      'telegram': 'Telegram',
      'phone': 'Телефон'
    };
    
    const message = `🚗 Новая заявка на выкуп авто

📋 Данные автомобиля:
• Марка: ${formData.brand}
• Модель: ${formData.model}
• Год: ${formData.year}

🔧 Состояние:
• Техническое: ${conditionMap[formData.condition] || formData.condition}
• Юридическое: ${legalMap[formData.legalStatus] || formData.legalStatus}
• Описание: ${formData.description || 'Не указано'}

📍 Местоположение: ${locationMap[formData.location] || formData.location}

📞 Контакты:
• Способ связи: ${contactMap[formData.contactMethod] || formData.contactMethod}
• Телефон: ${formData.phone}`;

    try {
      const botToken = '7827853509:AAHLZ8JQkdRmucBRQOGh7r1XkJMDw4vxC0w';
      const chatId = '6275725133';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
      
      const data = await response.json();
      
      if (data.ok) {
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
          contactMethod: "",
          phone: ""
        });
        setPhotos([]);
        setCurrentStep(1);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить заявку. Попробуйте позже.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: string[] = [];
    const remainingSlots = 5 - photos.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToProcess; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push(event.target.result as string);
          if (newPhotos.length === filesToProcess) {
            setPhotos([...photos, ...newPhotos]);
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.brand && formData.model && formData.year;
    }
    if (currentStep === 2) {
      return formData.condition && formData.legalStatus;
    }
    if (currentStep === 3) {
      return formData.location;
    }
    if (currentStep === 4) {
      return formData.contactMethod && formData.phone;
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
            <span className="text-gray-600">Оценка авто</span>
          </nav>
          <a href="tel:+79841771588" className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Оценка автомобиля</h1>
            <p className="text-lg text-gray-600 mb-8">Ответьте на несколько вопросов для быстрой оценки</p>

            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        step < currentStep ? 'bg-gray-900' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 text-sm text-gray-600 mt-2">
                <span className="text-center">Данные авто</span>
                <span className="text-center">Состояние</span>
                <span className="text-center">Местоположение</span>
                <span className="text-center">Контакты</span>
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

                  <div>
                    <Label htmlFor="photos">Фото автомобиля (по желанию, до 5 фото)</Label>
                    <Input 
                      id="photos" 
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      disabled={photos.length >= 5}
                      className="cursor-pointer"
                    />
                    {photos.length > 0 && (
                      <div className="grid grid-cols-5 gap-2 mt-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={photo} 
                              alt={`Фото ${index + 1}`}
                              className="w-full h-20 object-cover rounded border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              <Icon name="X" size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-2">Загружено: {photos.length} из 5</p>
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
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="location">Где находится автомобиль?</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={detectLocation}
                        disabled={isDetectingLocation}
                        className="text-xs"
                      >
                        {isDetectingLocation ? (
                          <>
                            <Icon name="Loader2" size={14} className="mr-1 animate-spin" />
                            Определение...
                          </>
                        ) : (
                          <>
                            <Icon name="MapPin" size={14} className="mr-1" />
                            Определить
                          </>
                        )}
                      </Button>
                    </div>
                    <select
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Выберите населённый пункт</option>
                      <option value="khabarovsk">Хабаровск</option>
                      <option value="komsomolsk">Комсомольск-на-Амуре</option>
                      <option value="amursk">Амурск</option>
                      <option value="sovetskaya-gavan">Советская Гавань</option>
                      <option value="bikin">Бикин</option>
                      <option value="vyazemsky">Вяземский</option>
                      <option value="nikolaevsk">Николаевск-на-Амуре</option>
                      <option value="vanino">Ванино</option>
                      <option value="pereyaslavka">Переяславка</option>
                      <option value="khabarovsky-raion">Хабаровский район</option>
                      <option value="komsomolsky-raion">Комсомольский район</option>
                      <option value="other">Другой населённый пункт края</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold mb-3 text-gray-900">Данные автомобиля:</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Марка и модель:</strong> {formData.brand} {formData.model}</p>
                      <p><strong>Год:</strong> {formData.year}</p>
                      <p><strong>Состояние:</strong> {
                        formData.condition === 'excellent' ? 'Отличное' :
                        formData.condition === 'good' ? 'Хорошее' :
                        formData.condition === 'fair' ? 'Среднее' : 'Требует ремонта'
                      }</p>
                      <p><strong>Юридическая чистота:</strong> {
                        formData.legalStatus === 'clean' ? 'Чистая' :
                        formData.legalStatus === 'issues' ? 'Есть нюансы' : 'Не уверен'
                      }</p>
                      <p><strong>Местоположение:</strong> {
                        formData.location === 'khabarovsk' ? 'Хабаровск' :
                        formData.location === 'komsomolsk' ? 'Комсомольск-на-Амуре' :
                        formData.location === 'amursk' ? 'Амурск' :
                        formData.location === 'sovetskaya-gavan' ? 'Советская Гавань' :
                        formData.location === 'bikin' ? 'Бикин' :
                        formData.location === 'vyazemsky' ? 'Вяземский' :
                        formData.location === 'nikolaevsk' ? 'Николаевск-на-Амуре' :
                        formData.location === 'vanino' ? 'Ванино' :
                        formData.location === 'pereyaslavka' ? 'Переяславка' :
                        formData.location === 'khabarovsky-raion' ? 'Хабаровский район' :
                        formData.location === 'komsomolsky-raion' ? 'Комсомольский район' :
                        'Другой населённый пункт края'
                      }</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactMethod">Как с вами связаться?</Label>
                    <select
                      id="contactMethod"
                      value={formData.contactMethod}
                      onChange={(e) => setFormData({...formData, contactMethod: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Выберите способ связи</option>
                      <option value="phone">Телефон</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__" 
                      pattern="[0-9]{11}"
                      minLength={11}
                      maxLength={11}
                      required 
                    />
                    <p className="text-sm text-gray-500 mt-1">Введите 11 цифр без пробелов и символов</p>
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

      {/* Floating WhatsApp Button */}
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
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Car" size={24} className="text-gray-900" />
              <span className="font-semibold text-gray-900">АвтоВыкуп</span>
            </Link>
            <div className="text-gray-600 text-sm">
              © 2024 Выкуп автомобилей в Хабаровске
            </div>
            <a href="tel:+79841771588" className="text-gray-900 font-bold text-lg">+7 (984) 177-15-88</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Evaluation;