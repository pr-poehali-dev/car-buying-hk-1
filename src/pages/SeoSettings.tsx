import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function SeoSettings() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Ключевые запросы сохранены');
      
    } catch (error) {
      toast.error('Ошибка при сохранении');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
          <h1 className="text-2xl font-bold">Добавление ключевых запросов</h1>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Список запросов (только запросы в ТОП-100 иначе клик не будет засчитан)
            </label>
            <Textarea
              placeholder="Ключевые запросы, каждый на новой строке"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Загрузить из файла
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="бустер.рф"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled
              />
              <Button variant="outline" className="gap-2">
                <Icon name="Upload" size={18} />
                Выбрать файл
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={isLoading || !keywords.trim()}
              className="flex-1"
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
