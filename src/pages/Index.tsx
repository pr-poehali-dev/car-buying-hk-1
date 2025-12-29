import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/index/Header";
import HeroSection from "@/components/index/HeroSection";
import ContentSections from "@/components/index/ContentSections";
import CallbackForm from "@/components/index/CallbackForm";
import PopupOffer from "@/components/index/PopupOffer";
import WhatsAppButton from "@/components/index/WhatsAppButton";
import OnlineCounter from "@/components/index/OnlineCounter";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackMethod, setCallbackMethod] = useState("phone");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [city, setCity] = useState("Хабаровске");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      const popupShown = sessionStorage.getItem('popupShown');
      if (!popupShown) {
        setShowPopup(true);
        sessionStorage.setItem('popupShown', 'true');
      }
    }, 30000);

    return () => clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    const detectCity = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedCity = data.city;
        
        if (detectedCity) {
          const cityName = detectedCity.toLowerCase();
          let newCity = 'Хабаровске';
          let newCityTitle = 'Хабаровск';
          
          if (cityName.includes('хабаровск')) {
            newCity = 'Хабаровске';
            newCityTitle = 'Хабаровск';
          } else if (cityName.includes('комсомольск')) {
            newCity = 'Комсомольске-на-Амуре';
            newCityTitle = 'Комсомольск-на-Амуре';
          } else if (cityName.includes('амурск')) {
            newCity = 'Амурске';
            newCityTitle = 'Амурск';
          } else if (cityName.includes('советск') || cityName.includes('гавань')) {
            newCity = 'Советской Гавани';
            newCityTitle = 'Советская Гавань';
          } else if (cityName.includes('бикин')) {
            newCity = 'Бикине';
            newCityTitle = 'Бикин';
          } else if (cityName.includes('вяземск')) {
            newCity = 'Вяземском';
            newCityTitle = 'Вяземский';
          } else if (cityName.includes('николаевск')) {
            newCity = 'Николаевске-на-Амуре';
            newCityTitle = 'Николаевск-на-Амуре';
          } else if (cityName.includes('ванино')) {
            newCity = 'Ванино';
            newCityTitle = 'Ванино';
          } else if (cityName.includes('переяславк')) {
            newCity = 'Переяславке';
            newCityTitle = 'Переяславка';
          }
          
          setCity(newCity);
          document.title = `Выкуп авто ${newCityTitle} - Срочный выкуп автомобилей за 15 минут | +7(984)177-15-88`;
          
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', `Срочный выкуп автомобилей в ${newCity} и крае за 15 минут. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88`);
          }
        }
      } catch (error) {
        console.log('Не удалось определить город, используем Хабаровск');
      }
    };

    detectCity();
  }, []);

  useEffect(() => {
    const popupShown = sessionStorage.getItem('popupShown');
    
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('popupShown', 'true');
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCallRequest = () => {
    setShowCallbackForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contactMap: Record<string, string> = {
      'whatsapp': 'WhatsApp',
      'telegram': 'Telegram',
      'phone': 'Телефон'
    };

    try {
      const botToken = '7827853509:AAHLZ8JQkdRmucBRQOGh7r1XkJMDw4vxC0w';
      const chatId = '6275725133';
      
      const countResponse = await fetch('https://functions.poehali.dev/a8f2aee8-9a59-444c-8d70-39de338b39c8');
      const countData = await countResponse.json();
      const totalLeads = countData.count + 1;

      const message = `📞 Заказ обратного звонка\n\n• Телефон: ${callbackPhone}\n• Способ связи: ${contactMap[callbackMethod]}\n\n📊 Всего заявок: ${totalLeads}`;

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
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(104279599, 'reachGoal', 'callback_request');
        }
        
        if (typeof window !== 'undefined' && (window as any).VK && (window as any).VK.Retargeting) {
          (window as any).VK.Retargeting.Event('lead');
        }
        
        toast({
          title: "Заявка принята!",
          description: "Мы перезвоним вам в ближайшее время",
        });
        setShowCallbackForm(false);
        setCallbackPhone("");
        setCallbackMethod("phone");
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

  const handleEvaluationClick = () => {
    navigate('/evaluation', { replace: true });
  };

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'phone_click');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSubmit = () => {
    setShowPopup(false);
    handleCallRequest();
    
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'popup_conversion');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handlePhoneClick={handlePhoneClick}
      />
      
      <HeroSection 
        city={city}
        handleEvaluationClick={handleEvaluationClick}
        handleCallRequest={handleCallRequest}
      />
      
      <ContentSections 
        handleEvaluationClick={handleEvaluationClick}
        handlePhoneClick={handlePhoneClick}
      />
      
      <CallbackForm 
        showCallbackForm={showCallbackForm}
        setShowCallbackForm={setShowCallbackForm}
        callbackPhone={callbackPhone}
        setCallbackPhone={setCallbackPhone}
        callbackMethod={callbackMethod}
        setCallbackMethod={setCallbackMethod}
        handleCallbackSubmit={handleCallbackSubmit}
      />
      
      {showPopup && (
        <PopupOffer
          onClose={handlePopupClose}
          onSubmit={handlePopupSubmit}
        />
      )}
      
      <WhatsAppButton />
      <OnlineCounter />
    </div>
  );
};

export default Index;