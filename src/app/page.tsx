"use client";

import { useState } from "react";
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus,
  Search,
  Filter,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  Users,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Product = {
  id: string;
  name: string;
  quantity: number;
  unit: "kg" | "un";
  buyPrice: number;
  sellPrice: number;
  category: string;
  lastMovement: string;
};

type Movement = {
  id: string;
  productName: string;
  type: "entrada" | "saida";
  quantity: number;
  date: string;
  value: number;
};

export default function StockWise() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Café Premium",
      quantity: 150,
      unit: "kg",
      buyPrice: 25.00,
      sellPrice: 45.00,
      category: "Bebidas",
      lastMovement: "Há 2 horas"
    },
    {
      id: "2",
      name: "Açúcar Cristal",
      quantity: 200,
      unit: "kg",
      buyPrice: 3.50,
      sellPrice: 6.00,
      category: "Alimentos",
      lastMovement: "Há 5 horas"
    },
    {
      id: "3",
      name: "Canetas Azuis",
      quantity: 500,
      unit: "un",
      buyPrice: 1.20,
      sellPrice: 2.50,
      category: "Papelaria",
      lastMovement: "Há 1 dia"
    }
  ]);

  const [movements, setMovements] = useState<Movement[]>([
    { id: "1", productName: "Café Premium", type: "entrada", quantity: 50, date: "2024-01-15", value: 1250.00 },
    { id: "2", productName: "Açúcar Cristal", type: "saida", quantity: 30, date: "2024-01-15", value: 180.00 },
    { id: "3", productName: "Canetas Azuis", type: "entrada", quantity: 200, date: "2024-01-14", value: 240.00 }
  ]);

  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + (p.quantity * p.sellPrice), 0);
  const totalProfit = products.reduce((acc, p) => acc + (p.quantity * (p.sellPrice - p.buyPrice)), 0);
  const avgMargin = products.length > 0 
    ? products.reduce((acc, p) => acc + ((p.sellPrice - p.buyPrice) / p.sellPrice * 100), 0) / products.length 
    : 0;

  const recentEntries = movements.filter(m => m.type === "entrada").slice(0, 3);
  const recentExits = movements.filter(m => m.type === "saida").slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-emerald-100/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  StockWise
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Nível 5</span>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
                <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Novo Produto</span>
                <span className="sm:hidden">Novo</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">Total de Produtos</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Package className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{totalProducts}</div>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +12% este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">Valor Total</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +8% este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">Lucro Potencial</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +15% este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">Margem Média</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{avgMargin.toFixed(1)}%</div>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +3% este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-emerald-100/50 shadow-lg p-1 h-auto flex-wrap gap-1">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base"
            >
              Produtos
            </TabsTrigger>
            <TabsTrigger 
              value="movements" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base"
            >
              Movimentações
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base"
            >
              Análises
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Entries */}
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900">Entradas Recentes</CardTitle>
                      <CardDescription>Últimas movimentações de entrada</CardDescription>
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{entry.productName}</p>
                          <p className="text-sm text-slate-500">{entry.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">+{entry.quantity}</p>
                        <p className="text-sm text-slate-500">R$ {entry.value.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Exits */}
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900">Saídas Recentes</CardTitle>
                      <CardDescription>Últimas movimentações de saída</CardDescription>
                    </div>
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentExits.map((exit) => (
                    <div key={exit.id} className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl hover:bg-red-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <ArrowDownRight className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{exit.productName}</p>
                          <p className="text-sm text-slate-500">{exit.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">-{exit.quantity}</p>
                        <p className="text-sm text-slate-500">R$ {exit.value.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Gamification Section */}
            <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">Conquistas & Badges</CardTitle>
                    <CardDescription className="text-purple-100">Continue gerenciando bem seu estoque!</CardDescription>
                  </div>
                  <Award className="w-8 h-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Award className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Mestre do Estoque</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Lucro Máximo</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Package className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">100 Produtos</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Trabalho em Equipe</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">Gerenciar Produtos</CardTitle>
                    <CardDescription>Adicione, edite e visualize seus produtos</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="Buscar produtos..." 
                        className="pl-10 bg-white border-slate-200 w-full sm:w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="border-slate-200">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {products.map((product) => {
                    const margin = ((product.sellPrice - product.buyPrice) / product.sellPrice * 100).toFixed(1);
                    return (
                      <div 
                        key={product.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:shadow-md gap-4"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 truncate">{product.name}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                                {product.category}
                              </Badge>
                              <span className="text-xs text-slate-500">{product.lastMovement}</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-6">
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-slate-500">Quantidade</p>
                            <p className="font-bold text-slate-900">{product.quantity} {product.unit}</p>
                          </div>
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-slate-500">Compra</p>
                            <p className="font-bold text-slate-900">R$ {product.buyPrice.toFixed(2)}</p>
                          </div>
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-slate-500">Venda</p>
                            <p className="font-bold text-emerald-600">R$ {product.sellPrice.toFixed(2)}</p>
                          </div>
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-slate-500">Margem</p>
                            <p className="font-bold text-purple-600">{margin}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Movements Tab */}
          <TabsContent value="movements" className="space-y-6">
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">Movimentações</CardTitle>
                    <CardDescription>Histórico completo de entradas e saídas</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white flex-1 sm:flex-initial">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Entrada
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 flex-1 sm:flex-initial">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Saída
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {movements.map((movement) => (
                    <div 
                      key={movement.id} 
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md gap-3 ${
                        movement.type === "entrada" 
                          ? "bg-emerald-50/50 hover:bg-emerald-50" 
                          : "bg-red-50/50 hover:bg-red-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          movement.type === "entrada"
                            ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                            : "bg-gradient-to-br from-red-500 to-red-600"
                        }`}>
                          {movement.type === "entrada" 
                            ? <ArrowUpRight className="w-5 h-5 text-white" />
                            : <ArrowDownRight className="w-5 h-5 text-white" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 truncate">{movement.productName}</h3>
                          <p className="text-sm text-slate-500">{movement.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-slate-500">Quantidade</p>
                          <p className={`font-bold ${
                            movement.type === "entrada" ? "text-emerald-600" : "text-red-600"
                          }`}>
                            {movement.type === "entrada" ? "+" : "-"}{movement.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Valor</p>
                          <p className="font-bold text-slate-900">R$ {movement.value.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Análise de Lucratividade</CardTitle>
                  <CardDescription>Produtos com maior margem de lucro</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products
                      .sort((a, b) => {
                        const marginA = (a.sellPrice - a.buyPrice) / a.sellPrice;
                        const marginB = (b.sellPrice - b.buyPrice) / b.sellPrice;
                        return marginB - marginA;
                      })
                      .map((product) => {
                        const margin = ((product.sellPrice - product.buyPrice) / product.sellPrice * 100);
                        const profit = (product.sellPrice - product.buyPrice) * product.quantity;
                        return (
                          <div key={product.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-slate-900">{product.name}</span>
                              <span className="font-bold text-emerald-600">{margin.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(margin, 100)}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-500">
                              Lucro potencial: R$ {profit.toFixed(2)}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Compartilhar Insights</CardTitle>
                  <CardDescription>Colabore com sua equipe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-blue-900">Equipe Ativa</h4>
                    </div>
                    <p className="text-sm text-blue-700 mb-4">
                      Compartilhe relatórios e insights com sua equipe em tempo real.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                      Convidar Membros
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900">Atividade Recente da Equipe</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          JD
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">João adicionou 50kg de Café Premium</p>
                          <p className="text-xs text-slate-500">Há 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          MS
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">Maria atualizou preços de venda</p>
                          <p className="text-xs text-slate-500">Há 5 horas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
