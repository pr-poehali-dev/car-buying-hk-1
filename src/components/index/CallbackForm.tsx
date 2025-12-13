import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface CallbackFormProps {
  showCallbackForm: boolean;
  setShowCallbackForm: (show: boolean) => void;
  callbackPhone: string;
  setCallbackPhone: (phone: string) => void;
  callbackMethod: string;
  setCallbackMethod: (method: string) => void;
  handleCallbackSubmit: (e: React.FormEvent) => void;
}

const CallbackForm = ({
  showCallbackForm,
  setShowCallbackForm,
  callbackPhone,
  setCallbackPhone,
  callbackMethod,
  setCallbackMethod,
  handleCallbackSubmit
}: CallbackFormProps) => {
  if (!showCallbackForm) return null;

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Заказать обратный звонок</h2>
            <button 
              onClick={() => setShowCallbackForm(false)}
              className="text-gray-500 hover:text-gray-900"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
          <form onSubmit={handleCallbackSubmit} className="space-y-6">
            <div>
              <Label htmlFor="callback-phone">Номер телефона</Label>
              <Input
                id="callback-phone"
                type="tel"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label className="block mb-3">Способ связи</Label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="callback-method"
                    value="phone"
                    checked={callbackMethod === "phone"}
                    onChange={(e) => setCallbackMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900">Телефон</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="callback-method"
                    value="whatsapp"
                    checked={callbackMethod === "whatsapp"}
                    onChange={(e) => setCallbackMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900">WhatsApp</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="callback-method"
                    value="telegram"
                    checked={callbackMethod === "telegram"}
                    onChange={(e) => setCallbackMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900">Telegram</span>
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
              Подтвердить
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CallbackForm;
