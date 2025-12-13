import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import EvaluationHeader from "@/components/evaluation/EvaluationHeader";
import EvaluationProgress from "@/components/evaluation/EvaluationProgress";
import EvaluationSteps from "@/components/evaluation/EvaluationSteps";

const Evaluation = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    document.title = "Онлайн оценка автомобиля Хабаровск - Узнайте стоимость авто за 2 минуты";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Бесплатная онлайн оценка автомобиля в Хабаровске. Узнайте стоимость вашего авто за 2 минуты. Оставьте заявку и получите звонок эксперта. Честная цена');
    }
  }, []);

  useEffect(() => {
    if (currentStep === 3 && !formData.location) {
      detectLocation();
    }
  }, [currentStep]);

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(3000)
      });
      
      if (!response.ok) throw new Error('Network error');
      
      const data = await response.json();
      const city = data.city || '';
      const region = data.region || '';
      let detectedLocation = 'khabarovsk';

      const cityMap: Record<string, string> = {
        'Хабаровск': 'khabarovsk',
        'Khabarovsk': 'khabarovsk',
        'Комсомольск-на-Амуре': 'komsomolsk',
        'Komsomolsk-on-Amur': 'komsomolsk',
        'Амурск': 'amursk',
        'Amursk': 'amursk'
      };

      if (city && cityMap[city]) {
        detectedLocation = cityMap[city];
      }

      setFormData({...formData, location: detectedLocation});
      toast({
        title: "Местоположение определено",
        description: city || region || "Хабаровский край"
      });
    } catch (error) {
      setFormData({...formData, location: 'khabarovsk'});
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
      'fair': 'Удовлетворительное',
      'average': 'Среднее',
      'poor': 'Плохое',
      'broken': 'Битое/на запчасти'
    };
    
    const legalMap: Record<string, string> = {
      'clean': 'Чистое',
      'issues': 'Есть нюансы',
      'unclear': 'Не уверен',
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
      'khabarovsky-raion': 'Хабаровский район',
      'komsomolsky-raion': 'Комсомольский район',
      'other': 'Другой населённый пункт'
    };
    
    const contactMap: Record<string, string> = {
      'whatsapp': 'WhatsApp',
      'telegram': 'Telegram',
      'phone': 'Телефон'
    };
    
    let totalLeads = 0;
    try {
      const leadsCountResponse = await fetch('https://functions.poehali.dev/a8f2aee8-9a59-444c-8d70-39de338b39c8');
      if (leadsCountResponse.ok) {
        const leadsData = await leadsCountResponse.json();
        totalLeads = leadsData.count || 0;
      }
    } catch (error) {
      // Счётчик недоступен, продолжаем без него
    }
    
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
• Телефон: ${formData.phone}

📊 Всего заявок: ${totalLeads}`;

    try {
      const botToken = '7827853509:AAHLZ8JQkdRmucBRQOGh7r1XkJMDw4vxC0w';
      const chatId = '6275725133';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      });
      
      const data = await response.json();
      
      if (data.ok && photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          try {
            const base64Data = photos[i].split(',')[1];
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let j = 0; j < binaryString.length; j++) {
              bytes[j] = binaryString.charCodeAt(j);
            }
            const blob = new Blob([bytes], { type: 'image/jpeg' });
            
            const photoFormData = new FormData();
            photoFormData.append('chat_id', chatId);
            photoFormData.append('photo', blob, `photo${i + 1}.jpg`);
            photoFormData.append('caption', `📷 Фото автомобиля ${i + 1}`);
            
            await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
              method: 'POST',
              body: photoFormData
            });
            
            await new Promise(resolve => setTimeout(resolve, 500));
          } catch (photoError) {
            console.error('Ошибка отправки фото:', photoError);
          }
        }
      }
      
      if (data.ok) {
        // Отправляем цель в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(104279599, 'reachGoal', 'evaluation_request');
        }
        
        // Отправляем событие в VK Pixel
        if (typeof window !== 'undefined' && (window as any).VK && (window as any).VK.Retargeting) {
          (window as any).VK.Retargeting.Event('lead');
        }
        
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

    const maxPhotos = 6;
    const maxFileSize = 10 * 1024 * 1024;

    if (photos.length + files.length > maxPhotos) {
      toast({
        title: "Слишком много фото",
        description: `Максимум ${maxPhotos} фотографий`,
        variant: "destructive"
      });
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.size > maxFileSize) {
        toast({
          title: "Файл слишком большой",
          description: "Максимальный размер фото: 10 МБ",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'phone_click');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EvaluationHeader 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handlePhoneClick={handlePhoneClick}
      />

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
            <EvaluationProgress 
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleBack={handleBack}
            />

            <EvaluationSteps
              currentStep={currentStep}
              formData={formData}
              handleChange={handleChange}
              handleNext={handleNext}
              handleSubmit={handleSubmit}
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              isDetectingLocation={isDetectingLocation}
              detectLocation={detectLocation}
            />
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
              <Icon name="Shield" size={18} />
              <span className="text-sm">Ваши данные защищены</span>
            </div>
            <p className="text-xs text-gray-500">
              Нажимая кнопку "Отправить заявку", вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Evaluation;