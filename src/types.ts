export type UserRole = 'buyer' | 'restaurant' | 'seller';

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
}

export interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  time: string;
  status: 'preparing' | 'ready' | 'delivered';
  paymentMethod: 'cash' | 'card';
  details?: { name: string; quantity: number }[];
}

export interface Sandwich {
  id: string;
  name: string;
  price: number;
  image: string;
  calories: number;
  description: string;
}

export interface OrderItem {
  sandwichId: string;
  quantity: number;
  price: number;
}

export interface SaleRecord {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
}

export interface RestaurantConfig {
  phone: string;
  location: string;
  workingHours: {
    weekdays: string;
    friday: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

export interface Branch {
  id: string;
  name: string; // Branch Name
  manager: string; // Responsible Employee
  phone: string;
  isApproved: boolean;
  joinedDate: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  popularItems: { name: string; count: number }[];
  salesByDay: { day: string; amount: number }[];
}
