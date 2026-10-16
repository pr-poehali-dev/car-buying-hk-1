import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const API_URL = 'https://functions.poehali.dev/49a85b96-a551-48cb-9bb1-4d40d73f8885';
const TOKEN_KEY = 'admin_leads_token';

interface Lead {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  car_info: string;
  telegram_sent: boolean;
  whatsapp_sent: boolean;
  processed: boolean;
}

type Filter = 'new' | 'all';

export default function AdminLeads() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [filter, setFilter] = useState<Filter>('new');

  const load = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers: { 'X-Auth-Token': t } });
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken('');
        setAuthorized(false);
        if (t) toast.error('Неверный пароль');
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setAuthorized(true);
      localStorage.setItem(TOKEN_KEY, t);
    } catch {
      toast.error('Не удалось загрузить заявки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setToken(password);
    load(password);
  };

  const toggle = async (lead: Lead) => {
    const processed = !lead.processed;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, processed } : l)));
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
      body: JSON.stringify({ id: lead.id, processed }),
    });
    if (!res.ok) {
      toast.error('Не удалось сохранить отметку');
      load(token);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setPassword('');
    setAuthorized(false);
    setLeads([]);
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-sm p-6">
          <form onSubmit={login} className="space-y-4">
            <h1 className="text-xl font-bold">Заявки</h1>
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full" disabled={loading || !password}>
              {loading ? 'Проверяю...' : 'Войти'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const visible = filter === 'new' ? leads.filter((l) => !l.processed) : leads;
  const newCount = leads.filter((l) => !l.processed).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h1 className="text-2xl font-bold">Заявки</h1>
          <div className="flex gap-2">
            <Button variant={filter === 'new' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('new')}>
              Новые ({newCount})
            </Button>
            <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
              Все ({leads.length})
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => load(token)} disabled={loading}>
              <Icon name="RefreshCw" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>

        {visible.length === 0 && (
          <Card className="p-6 text-center text-gray-500">Заявок нет</Card>
        )}

        {visible.map((lead) => (
          <Card key={lead.id} className={`p-4 space-y-2 ${lead.processed ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs text-gray-500">
                  #{lead.id} · {lead.created_at}
                </div>
                <div className="font-semibold">{lead.car_info}</div>
                <a href={`tel:${lead.phone}`} className="text-blue-600 font-medium inline-flex items-center gap-1">
                  <Icon name="Phone" size={14} />
                  {lead.phone}
                </a>
              </div>
              <Button
                size="sm"
                variant={lead.processed ? 'outline' : 'default'}
                onClick={() => toggle(lead)}
              >
                {lead.processed ? 'Вернуть' : 'Обработана'}
              </Button>
            </div>
            <div className="flex gap-3 text-xs text-gray-500">
              <span>WhatsApp: {lead.whatsapp_sent ? 'доставлено' : 'нет'}</span>
              <span>Telegram: {lead.telegram_sent ? 'доставлено' : 'нет'}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
