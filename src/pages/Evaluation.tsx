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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({
      name: "",
      phone: "",
      brand: "",
      model: "",
      year: "",
      mileage: "",
      description: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
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
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Оценка автомобиля</h1>
            <p className="text-lg text-gray-600 mb-12">Заполните форму, и мы свяжемся с вами для оценки вашего автомобиля</p>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/753add99-68a6-474d-aae2-47f03011789a.jpg"
                  alt="Оценка автомобиля"
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-8 space-y-4">
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

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="mileage">Пробег, км</Label>
                    <Input 
                      id="mileage" 
                      type="number"
                      value={formData.mileage}
                      onChange={handleChange}
                      placeholder="50000" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Дополнительная информация</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Опишите состояние автомобиля, комплектацию..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Отправить заявку
                </Button>
              </form>
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
