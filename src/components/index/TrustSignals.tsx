import Icon from "@/components/ui/icon";

const TrustSignals = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Почему нам доверяют</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
          <Icon name="FileCheck" size={24} className="text-green-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Официальная компания</div>
            <div className="text-sm text-gray-600">ИП Иванов А.С., ОГРНИП 324270000042134</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
          <Icon name="Scale" size={24} className="text-blue-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Работаем легально</div>
            <div className="text-sm text-gray-600">Договор купли-продажи, все документы по закону</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
          <Icon name="Users" size={24} className="text-purple-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Опытная команда</div>
            <div className="text-sm text-gray-600">5 лет на рынке, более 2000 выкупленных авто</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3">
          <Icon name="ShieldCheck" size={24} className="text-green-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Гарантия безопасности</div>
            <div className="text-sm text-gray-600">Конфиденциальность данных, страхование сделок</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
