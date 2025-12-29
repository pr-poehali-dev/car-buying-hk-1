import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp } from "lucide-react";

const PriceCalculator = () => {
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [condition, setCondition] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    if (!year || !mileage || !condition) return;

    const basePrice = 500000;
    const yearValue = parseInt(year);
    const mileageValue = parseInt(mileage);
    
    let price = basePrice;
    
    // Расчет по году
    if (yearValue >= 2020) price *= 1.5;
    else if (yearValue >= 2015) price *= 1.2;
    else if (yearValue >= 2010) price *= 0.9;
    else price *= 0.6;
    
    // Расчет по пробегу
    if (mileageValue < 50000) price *= 1.2;
    else if (mileageValue < 100000) price *= 1.0;
    else if (mileageValue < 150000) price *= 0.85;
    else price *= 0.7;
    
    // Расчет по состоянию
    if (condition === "excellent") price *= 1.15;
    else if (condition === "good") price *= 1.0;
    else if (condition === "average") price *= 0.8;
    else if (condition === "damaged") price *= 0.5;
    
    setEstimatedPrice(Math.round(price));
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="w-6 h-6 text-blue-600" />
          Быстрая оценка авто
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Марка авто</Label>
            <Input
              id="brand"
              placeholder="Toyota, Honda, Nissan..."
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Год выпуска</Label>
            <Input
              id="year"
              type="number"
              placeholder="2020"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mileage">Пробег (км)</Label>
            <Input
              id="mileage"
              type="number"
              placeholder="50000"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Состояние</Label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Выберите состояние</option>
              <option value="excellent">Отличное</option>
              <option value="good">Хорошее</option>
              <option value="average">Среднее</option>
              <option value="damaged">Битое/После ДТП</option>
            </select>
          </div>
        </div>

        <Button 
          onClick={calculatePrice}
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
          disabled={!year || !mileage || !condition}
        >
          <Calculator className="w-5 h-5 mr-2" />
          Узнать примерную стоимость
        </Button>

        {estimatedPrice && (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-green-700" />
              <p className="text-lg font-semibold text-green-900">Ориентировочная стоимость:</p>
            </div>
            <p className="text-4xl font-bold text-green-700 mb-2">
              {estimatedPrice.toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-sm text-green-800">
              Точную оценку сделаем после осмотра авто
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;