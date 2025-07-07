'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { 
  Loader2, Home, Users, History, TrendingUp, ArrowUpCircle, ArrowDownCircle, Settings, Bell, HelpCircle, Edit, Trash2, ChevronLeft, ChevronRight, Upload, FileText, CheckCircle, XCircle, Clock, Eye, User, RefreshCw, AlertCircle,
  CreditCard, LogOut, Search, MoreVertical, Check, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { CustomersTab } from '@/components/admin/CustomersTab';
import useSWR from 'swr';
import UserMenu from '@/components/user-menu';
import router from 'next/router';
import { Customer } from '@/hooks/useCustomers';

// Verification Image Modal Component
interface VerificationImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  frontImage: string;
  backImage: string;
  userName: string;
}

function VerificationImageModal({ 
  isOpen, 
  onClose, 
  frontImage, 
  backImage, 
  userName 
}: VerificationImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Ảnh CCCD/CMND - {userName}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Mặt trước</h4>
            <img 
              src={frontImage} 
              alt="Mặt trước CCCD/CMND" 
              className="w-full h-auto rounded border border-gray-700"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Mặt sau</h4>
            <img 
              src={backImage} 
              alt="Mặt sau CCCD/CMND" 
              className="w-full h-auto rounded border border-gray-700"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Define PageType as a type
type PageType = 
  | 'dashboard' 
  | 'customers' 
  | 'order-history' 
  | 'trading-sessions' 
  | 'deposit-requests' 
  | 'withdrawal-requests' 
  | 'settings' 
  | 'identity-verification';

interface MenuItem {
  id: PageType;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Dashboard', icon: Home },
  { id: 'customers', title: 'Khách hàng', icon: Users },
  { id: 'order-history', title: 'Lịch sử đặt lệnh', icon: History },
  { id: 'trading-sessions', title: 'Phiên giao dịch', icon: TrendingUp },
  { id: 'deposit-requests', title: 'Yêu cầu nạp tiền', icon: ArrowUpCircle },
  { id: 'withdrawal-requests', title: 'Yêu cầu rút tiền', icon: ArrowDownCircle },
  { id: 'settings', title: 'Cài đặt', icon: Settings },
  { id: 'identity-verification', title: 'Xác minh danh tính', icon: FileText },
];

const fetcher = async (url: string, token: string): Promise<any> => {
  const response = await fetch(url, { 
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } 
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch data');
  }
  return response.json();
};

// Using Customer type from @/hooks/useCustomers

// Customers Page Component
function CustomersPage({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetcher('/api/admin/customers', token);
        setCustomers(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch customers';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchCustomers();
    }
  }, [token, toast]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        customer.username.toLowerCase().includes(searchLower) ||
        (customer.fullName?.toLowerCase().includes(searchLower) ?? false);
      
      const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && customer.status === 'active') ||
                          (statusFilter === 'inactive' && customer.status === 'inactive');
      
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error loading customers</h2>
        <p className="text-gray-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customers</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.username}</TableCell>
                  <TableCell>{customer.fullName || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${customer.balance?.available?.toLocaleString() || '0'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Common props for page components with date range
interface DateRangeProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  token: string;
}

// Placeholder components for missing pages
function OrderHistoryPage({ startDate, setStartDate, endDate, setEndDate, token }: DateRangeProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Order History</h2>
      <div className="flex items-center space-x-4">
        <div>
          <Label htmlFor="start-date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="end-date">End Date</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <p>Order history will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TradingSessionsPage({ token }: { token: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trading Sessions</h2>
      <Card>
        <CardContent className="p-6">
          <p>Trading sessions will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function DepositRequestsPage({ startDate, setStartDate, endDate, setEndDate, token }: DateRangeProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Deposit Requests</h2>
      <div className="flex items-center space-x-4">
        <div>
          <Label htmlFor="deposit-start-date">Start Date</Label>
          <Input
            id="deposit-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="deposit-end-date">End Date</Label>
          <Input
            id="deposit-end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <p>Deposit requests will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function WithdrawalRequestsPage({ startDate, setStartDate, endDate, setEndDate, token }: DateRangeProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Withdrawal Requests</h2>
      <div className="flex items-center space-x-4">
        <div>
          <Label htmlFor="withdrawal-start-date">Start Date</Label>
          <Input
            id="withdrawal-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="withdrawal-end-date">End Date</Label>
          <Input
            id="withdrawal-end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <p>Withdrawal requests will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsPage({ token }: { token: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card>
        <CardContent className="p-6">
          <p>Settings will be configured here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function IdentityVerificationPage({ token }: { token: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Identity Verification</h2>
      <Card>
        <CardContent className="p-6">
          <p>Identity verification requests will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Dashboard Page Component
interface DashboardPageProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  token: string;
}

interface StatsData {
  newUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalUsers: number;
}

interface Order {
  user: string;
  session: string;
  type: string;
  amount: number;
  result: string;
  time: string;
}

interface User {
  fullName: string;
  username: string;
  balance: { available: number };
  loginInfo: string;
  role: string;
}

function DashboardPage({ startDate, setStartDate, endDate, setEndDate, token }: DashboardPageProps) {
  const { toast } = useToast();
  const { data: statsData, isLoading: statsLoading } = useSWR<StatsData>(
    token ? `/api/admin/stats?startDate=${startDate}&endDate=${endDate}` : null,
    (url: string) => fetcher(url, token)
  );

  const { data: ordersData, isLoading: ordersLoading } = useSWR<Order[]>(
    token ? `/api/admin/orders?startDate=${startDate}&endDate=${endDate}&limit=8` : null,
    (url: string) => fetcher(url, token)
  );

  const { data: usersData, isLoading: usersLoading } = useSWR<User[]>(
    token ? '/api/admin/users?limit=5' : null,
    (url: string) => fetcher(url, token)
  );

  const stats = statsData || { newUsers: 131, totalDeposits: 10498420000, totalWithdrawals: 6980829240, totalUsers: 5600000 };
  const orders = ordersData || [];
  const users = usersData || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Dashboard</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <span className="text-sm font-medium">Thời gian</span>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full sm:w-32 h-8" />
          <span>-</span>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full sm:w-32 h-8" />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">Đặt lại</Button>
        <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">Áp dụng</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Tài khoản mới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-500">{statsLoading ? '...' : stats.newUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Tổng tiền nạp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{statsLoading ? '...' : stats.totalDeposits.toLocaleString()} đ</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Tổng tiền rút</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">{statsLoading ? '...' : stats.totalWithdrawals.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Tài khoản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-500">{statsLoading ? '...' : stats.totalUsers}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">Lệnh mới</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {ordersLoading ? (
            <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Người dùng</TableHead>
                  <TableHead className="text-white">Phiên</TableHead>
                  <TableHead className="text-white">Loại</TableHead>
                  <TableHead className="text-white">Số tiền</TableHead>
                  <TableHead className="text-white">Kết quả</TableHead>
                  <TableHead className="text-white">Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-teal-500 font-medium">{order.user}</TableCell>
                    <TableCell className="text-white">{order.session}</TableCell>
                    <TableCell>
                      <Badge
                        variant={order.type === 'Lên' ? 'default' : 'destructive'}
                        className={order.type === 'Lên' ? 'bg-green-500 hover:bg-green-500' : 'bg-red-500 hover:bg-red-500'}
                      >
                        {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{order.amount.toLocaleString()}đ</TableCell>
                    <TableCell className="text-green-500 font-semibold">{order.result}</TableCell>
                    <TableCell className="text-gray-400">{order.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Card className="mt-6 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">Người dùng mới</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {usersLoading ? (
            <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Tên</TableHead>
                  <TableHead className="text-white">Tên đăng nhập</TableHead>
                  <TableHead className="text-white">Tiền</TableHead>
                  <TableHead className="text-white">Ip login</TableHead>
                  <TableHead className="text-white">Vai trò</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-teal-500 font-medium">{user.fullName}</TableCell>
                    <TableCell className="text-white">{user.username}</TableCell>
                    <TableCell className="text-white">{user.balance?.available.toLocaleString()}</TableCell>
                    <TableCell className="text-white">{user.loginInfo}</TableCell>
                    <TableCell className="text-white">{user.role === 'admin' ? 'Quản trị' : 'Khách hàng'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// API Response Types
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

interface EditForm {
  username: string;
  password: string;
  fullName: string;
  balance: string;
  frozenBalance: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  email: string;
  phone: string;
}

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in admin dashboard:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Đã xảy ra lỗi</h2>
          <p className="text-gray-400 mb-4">Không thể tải trang quản trị. Vui lòng thử lại sau.</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tải lại trang
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const token = user?.id || '';

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Helper function to render the current page with proper props
  const renderPage = (page: PageType) => {
    const commonProps = { token };
    const dateRangeProps = {
      ...commonProps,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
    };

    switch (page) {
      case 'dashboard':
        return <DashboardPage {...dateRangeProps} />;
      case 'customers':
        return <CustomersPage {...commonProps} />;
      case 'order-history':
        return <OrderHistoryPage {...dateRangeProps} />;
      case 'trading-sessions':
        return <TradingSessionsPage {...commonProps} />;
      case 'deposit-requests':
        return <DepositRequestsPage {...dateRangeProps} />;
      case 'withdrawal-requests':
        return <WithdrawalRequestsPage {...dateRangeProps} />;
      case 'settings':
        return <SettingsPage {...commonProps} />;
      case 'identity-verification':
        return <IdentityVerificationPage {...commonProps} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-gray-700 flex flex-col justify-between sm:sticky top-0`}>
          <div>
            <div className="flex items-center justify-between p-2 sm:p-4">
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="sm:hidden">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </Button>
              {!isSidebarCollapsed && <span className="text-sm sm:text-lg font-semibold">Admin Dashboard</span>}
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden sm:block">
                {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'secondary' : 'ghost'}
                  className={`w-full justify-start ${currentPage === item.id ? 'bg-gray-700' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {!isSidebarCollapsed && <span className="text-sm">{item.title}</span>}
                </Button>
              ))}
            </nav>
          </div>
          <div className="p-2 sm:p-4">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="h-5 w-5 mr-2" />
              {!isSidebarCollapsed && <span className="text-sm">Hỗ trợ</span>}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-4">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Thông báo</span>
            </div>
            <UserMenu user={user} logout={logout} />
          </header>
          <main className="flex-1 p-2 sm:p-6 overflow-auto">
            {renderPage(currentPage)}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}