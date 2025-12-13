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
    <section className="fixed inset-0 bg-gray-900/80 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="container mx-auto px-4 md:px-0">
        <div className="max-w-md mx-auto bg-white rounded-t-2xl md:rounded-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Заказать обратный звонок</h2>
            <button 
              onClick={() => setShowCallbackForm(false)}
              className="text-gray-500 hover:text-gray-900 p-2 -mr-2 touch-manipulation"
            >
              <Icon name="X" size={28} />
            </button>
          </div>
          <form onSubmit={handleCallbackSubmit} className="space-y-5 md:space-y-6">
            <div>
              <Label htmlFor="callback-phone" className="text-sm md:text-base">Номер телефона</Label>
              <Input
                id="callback-phone"
                type="tel"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
                className="mt-2 text-base h-12 touch-manipulation"
              />
            </div>
            <div>
              <Label className="block mb-3 text-sm md:text-base">Способ связи</Label>
              <div className="space-y-3 md:space-y-2">
                <label className="flex items-center gap-3 cursor-pointer touch-manipulation p-2 -ml-2 rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    name="callback-method"
                    value="phone"
                    checked={callbackMethod === "phone"}
                    onChange={(e) => setCallbackMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-900 text-sm md:text-base">Телефон</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer touch-manipulation p-2 -ml-2 rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    name="callback-method"
                    value="whatsapp"
                    checked={callbackMethod === "whatsapp"}
                    onChange={(e) => setCallbackMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-900 text-sm md:text-base">WhatsApp</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer touch-manipulation p-2 -ml-2 rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    name="callback-method"
                    value="telegram"
                    checked={callbackMethod === "telegram"}
                    onChange={(e) => setCallbackMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-900 text-sm md:text-base">Telegram</span>
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 h-12 md:h-auto text-base md:text-lg touch-manipulation">
              Подтвердить
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CallbackForm;