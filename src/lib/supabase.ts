import { createClient } from '@supabase/supabase-js';

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Criar cliente apenas se as credenciais estiverem disponíveis
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabase);
};

export type Database = {
  products: {
    id: string;
    name: string;
    quantity: number;
    unit: 'kg' | 'un';
    buy_price: number;
    sell_price: number;
    category: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  movements: {
    id: string;
    product_id: string;
    product_name: string;
    type: 'entrada' | 'saida';
    quantity: number;
    value: number;
    user_id: string;
    created_at: string;
  };
  tasks: {
    id: string;
    title: string;
    description: string;
    assigned_to: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    points: number;
    due_date: string;
    category: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  team_members: {
    id: string;
    name: string;
    avatar: string;
    level: number;
    points: number;
    tasks_completed: number;
    streak: number;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
};
