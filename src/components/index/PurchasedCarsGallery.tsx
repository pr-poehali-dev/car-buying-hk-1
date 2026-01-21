import { Card } from "@/components/ui/card";

const purchasedCars = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&auto=format&fit=crop",
    model: "Toyota Camry 2018",
    price: "1 250 000",
    date: "15 января 2025"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop",
    model: "Nissan X-Trail 2019",
    price: "980 000",
    date: "12 января 2025"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617531653520-bd466ee81f5d?w=800&auto=format&fit=crop",
    model: "Mazda CX-5 2020",
    price: "1 450 000",
    date: "10 января 2025"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop",
    model: "Honda CR-V 2017",
    price: "890 000",
    date: "8 января 2025"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop",
    model: "Hyundai Tucson 2019",
    price: "1 100 000",
    date: "5 января 2025"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop",
    model: "Kia Sportage 2018",
    price: "950 000",
    date: "3 января 2025"
  }
];

export default function PurchasedCarsGallery() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-3xl font-bold text-center mb-3 text-gray-900">
          Примеры выкупленных авто в январе
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
          Реальные сделки с нашими клиентами
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {purchasedCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.model}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{car.model}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{car.date}</p>
                    <p className="text-xl font-bold text-green-600">
                      {car.price} ₽
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Выкуплено
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}