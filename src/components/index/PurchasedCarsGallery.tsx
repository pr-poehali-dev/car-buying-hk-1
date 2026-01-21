import { Card } from "@/components/ui/card";

const purchasedCars = [
  {
    id: 1,
    image: "https://avatars.mds.yandex.net/get-autoru-vos/1640662/26275bb4df37874a90de806ebcef4059/1200x900",
    model: "Toyota Mark II 2004",
    price: "450 000",
    date: "18 января 2025"
  },
  {
    id: 2,
    image: "https://avatars.mds.yandex.net/get-autoru-vos/2165021/643da49380b15a200850500ef6e8335c/1200x900",
    model: "Nissan Primera 2006",
    price: "320 000",
    date: "16 января 2025"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop",
    model: "Mazda Demio 2008",
    price: "280 000",
    date: "14 января 2025"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1549927681-0b673b8243a6?w=800&auto=format&fit=crop",
    model: "Subaru Forester 2005",
    price: "520 000",
    date: "12 января 2025"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop",
    model: "Honda Fit 2007",
    price: "340 000",
    date: "10 января 2025"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&auto=format&fit=crop",
    model: "Toyota Corolla 2003",
    price: "380 000",
    date: "8 января 2025"
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