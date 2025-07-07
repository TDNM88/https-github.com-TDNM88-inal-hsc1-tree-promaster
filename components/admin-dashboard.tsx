"use client"

import { useState, useEffect } from "react"
import {
  Home,
  Users,
  History,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  Settings,
  Bell,
  HelpCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Eye,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserMenu } from "@/components/user-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

type PageType =
  | "dashboard"
  | "customers"
  | "order-history"
  | "trading-sessions"
  | "deposit-requests"
  | "withdrawal-requests"
  | "settings"

const menuItems = [
  {
    id: "dashboard" as PageType,
    title: "Dashboard",
    icon: Home,
  },
  {
    id: "customers" as PageType,
    title: "Khách hàng",
    icon: Users,
  },
  {
    id: "order-history" as PageType,
    title: "Lịch sử đặt lệnh",
    icon: History,
  },
  {
    id: "trading-sessions" as PageType,
    title: "Phiên giao dịch",
    icon: TrendingUp,
  },
  {
    id: "deposit-requests" as PageType,
    title: "Yêu cầu nạp tiền",
    icon: ArrowUpCircle,
  },
  {
    id: "withdrawal-requests" as PageType,
    title: "Yêu cầu rút tiền",
    icon: ArrowDownCircle,
  },
  {
    id: "settings" as PageType,
    title: "Cài đặt",
    icon: Settings,
  },
]

// Dashboard Page Component
function DashboardPage() {
  const [startDate, setStartDate] = useState("01/06/2025")
  const [endDate, setEndDate] = useState("29/06/2025")
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    newAccounts: 131,
    totalDeposits: 10498420000,
    totalWithdrawals: 6980829240,
    totalAccounts: 5600000,
  })

  const [orderData, setOrderData] = useState([
    {
      user: "vuthanhtra",
      session: "29185379",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:59:22",
    },
    {
      user: "vuthanhtra",
      session: "29185378",
      type: "Lên",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:58:20",
    },
    {
      user: "vuthanhtra",
      session: "29185377",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:57:33",
    },
    {
      user: "vuthanhtra",
      session: "29185376",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:56:13",
    },
    {
      user: "vuthanhtra",
      session: "29185375",
      type: "Lên",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:55:18",
    },
    {
      user: "vuthanhtra",
      session: "29185374",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:54:30",
    },
    {
      user: "vuthanhtra",
      session: "29185374",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:54:18",
    },
    {
      user: "vuthanhtra",
      session: "29185373",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:53:36",
    },
  ])

  const handleApplyFilter = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Đã áp dụng bộ lọc",
        description: `Hiển thị dữ liệu từ ${startDate} đến ${endDate}`,
      })
    }, 1000)
  }

  const handleResetFilter = () => {
    setStartDate("01/06/2025")
    setEndDate("29/06/2025")
    toast({
      title: "Đã đặt lại bộ lọc",
      description: "Trở về thiết lập mặc định",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Đang xuất dữ liệu",
      description: "File sẽ được tải xuống trong giây lát",
    })
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Dashboard</span>
      </div>

      {/* Enhanced Date Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Thời gian</span>
              <div className="flex items-center gap-2">
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-40" />
                <span>-</span>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-40" />
              </div>
              <Button variant="outline" size="sm" onClick={handleResetFilter}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Đặt lại
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApplyFilter}
                disabled={isLoading}
              >
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Filter className="h-4 w-4 mr-2" />}
                Áp dụng
              </Button>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Xuất dữ liệu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Tài khoản mới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.newAccounts.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">+12% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <ArrowUpCircle className="h-4 w-4 mr-2" />
              Tổng tiền nạp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalDeposits.toLocaleString()} đ</div>
            <p className="text-xs text-gray-500 mt-1">+8% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <ArrowDownCircle className="h-4 w-4 mr-2" />
              Tổng tiền rút
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.totalWithdrawals.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">+5% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Tài khoản
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.totalAccounts.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Tổng số dư hệ thống</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Lệnh mới</CardTitle>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Phiên</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Kết quả</TableHead>
                  <TableHead>Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData.map((order, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-teal-500 font-medium">{order.user}</TableCell>
                    <TableCell className="font-mono">{order.session}</TableCell>
                    <TableCell>
                      <Badge
                        variant={order.type === "Lên" ? "default" : "destructive"}
                        className={
                          order.type === "Lên"
                            ? "bg-green-500 text-white hover:bg-green-500"
                            : "bg-red-500 text-white hover:bg-red-500"
                        }
                      >
                        {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell className="text-green-500 font-semibold">{order.result}</TableCell>
                    <TableCell className="text-gray-600 text-sm">{order.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced New Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Người dùng mới</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Tên đăng nhập</TableHead>
                  <TableHead>Tiền</TableHead>
                  <TableHead>Ip login</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="text-teal-500 font-medium">Nguyentrang</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-semibold">0</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Khách hàng</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-500">
                      Hoạt động
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="text-teal-500 font-medium">Nguyễn Thu Mai</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-semibold">420,000</TableCell>
                  <TableCell className="text-xs">2a09:bac5:d452:f6d2::246:ee</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Khách hàng</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-500">
                      Hoạt động
                    </Badge>
                  </TableCell>
                </TableRow>
                {/* More rows... */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Customers Page Component
function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editForm, setEditForm] = useState({
    username: "",
    password: "",
    balance: 0,
    frozenBalance: 0,
    fullName: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  })

  const [customers, setCustomers] = useState([
    {
      id: 1,
      username: "Nguyentranh23",
      balance: 0,
      frozenBalance: 0,
      loginInfo: "171.251.237.143, 172.71.124.65",
      fullName: "Nguyễn Thị Tranh",
      isActive: true,
      isVerified: false,
      isBetLocked: false,
      isWithdrawLocked: false,
    },
    {
      id: 2,
      username: "vuthanhtra",
      balance: 420000,
      frozenBalance: 600000,
      loginInfo: "171.224.178.192, 104.233.175.39",
      fullName: "Vũ Thị Thanh Trà",
      isActive: true,
      isVerified: true,
      isBetLocked: false,
      isWithdrawLocked: false,
    },
    {
      id: 3,
      username: "Nguyen Thi Tuyet",
      balance: 150000,
      frozenBalance: 0,
      loginInfo: "2a09:bac5:a459:263c::3cf:30, 172.68.218",
      fullName: "Nguyễn Thị Tuyết",
      isActive: true,
      isVerified: false,
      isBetLocked: false,
      isWithdrawLocked: false,
    },
    {
      id: 4,
      username: "Ma thi Thanh",
      balance: 0,
      frozenBalance: 0,
      loginInfo: "171.254.200.151, 172.68.164.127",
      fullName: "Ma Thị Thanh",
      isActive: false,
      isVerified: false,
      isBetLocked: true,
      isWithdrawLocked: false,
    },
  ])

  const toggleCustomerStatus = async (customerId: number, field: string) => {
    setCustomers((prev) =>
      prev.map((customer) => (customer.id === customerId ? { ...customer, [field]: !customer[field] } : customer)),
    )

    toast({
      title: "Đã cập nhật trạng thái",
      description: "Thay đổi đã được lưu thành công",
    })
  }

  const handleEditCustomer = (customerId: number) => {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      setEditingCustomer(customer)
      setEditForm({
        username: customer.username,
        password: "",
        balance: customer.balance,
        frozenBalance: customer.frozenBalance,
        fullName: customer.fullName,
        bankName: "",
        accountNumber: "",
        accountHolder: "",
      })
      setShowEditModal(true)
    }
  }

  const handleSaveCustomer = async () => {
    if (editingCustomer) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setCustomers((prev) =>
          prev.map((customer) =>
            customer.id === editingCustomer.id
              ? {
                  ...customer,
                  username: editForm.username,
                  balance: editForm.balance,
                  frozenBalance: editForm.frozenBalance,
                  fullName: editForm.fullName,
                }
              : customer,
          ),
        )
        setShowEditModal(false)
        setEditingCustomer(null)
        setIsLoading(false)

        toast({
          title: "Đã cập nhật thông tin",
          description: "Thông tin khách hàng đã được lưu thành công",
        })
      }, 1000)
    }
  }

  const handleDeleteCustomer = async (customerId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      setCustomers((prev) => prev.filter((customer) => customer.id !== customerId))

      toast({
        title: "Đã xóa khách hàng",
        description: "Khách hàng đã được xóa khỏi hệ thống",
        variant: "destructive",
      })
    }
  }

  const handleAddCustomer = () => {
    setEditForm({
      username: "",
      password: "",
      balance: 0,
      frozenBalance: 0,
      fullName: "",
      bankName: "",
      accountNumber: "",
      accountHolder: "",
    })
    setShowAddModal(true)
  }

  const handleSaveNewCustomer = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newCustomer = {
        id: customers.length + 1,
        username: editForm.username,
        balance: editForm.balance,
        frozenBalance: editForm.frozenBalance,
        loginInfo: "New IP",
        fullName: editForm.fullName,
        isActive: true,
        isVerified: false,
        isBetLocked: false,
        isWithdrawLocked: false,
      }

      setCustomers((prev) => [...prev, newCustomer])
      setShowAddModal(false)
      setIsLoading(false)

      toast({
        title: "Đã thêm khách hàng",
        description: "Khách hàng mới đã được tạo thành công",
      })
    }, 1000)
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.isActive) ||
      (statusFilter === "inactive" && !customer.isActive)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Khách hàng</span>
      </div>

      {/* Enhanced Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm theo username, tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label>Trạng thái</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Đặt lại
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Xuất Excel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddCustomer}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm tài khoản
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Customers Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Danh sách khách hàng ({filteredCustomers.length})</CardTitle>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên đăng nhập</TableHead>
                  <TableHead>Số dư</TableHead>
                  <TableHead>Ip login</TableHead>
                  <TableHead>Thông tin xác minh</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell className="text-teal-400 font-medium">{customer.username}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>
                          Số dư:{" "}
                          <span className="font-semibold text-green-600">{customer.balance.toLocaleString()}</span>
                        </div>
                        <div>
                          Số dư đông băng:{" "}
                          <span className="font-semibold text-orange-600">
                            {customer.frozenBalance.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-[200px] truncate">{customer.loginInfo}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium">{customer.fullName}</div>
                        <div className="text-gray-500">CCCD mặt trước: -</div>
                        <div className="text-gray-500">CCCD mặt sau: -</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-20">Trạng thái:</span>
                          <Switch
                            checked={customer.isActive}
                            onCheckedChange={() => toggleCustomerStatus(customer.id, "isActive")}
                          />
                          <span className={`text-xs ${customer.isActive ? "text-green-600" : "text-gray-500"}`}>
                            {customer.isActive ? "Hoạt động" : "Không hoạt động"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-20">Xác minh:</span>
                          <Switch
                            checked={customer.isVerified}
                            onCheckedChange={() => toggleCustomerStatus(customer.id, "isVerified")}
                          />
                          <span className={`text-xs ${customer.isVerified ? "text-green-600" : "text-gray-500"}`}>
                            {customer.isVerified ? "Đã xác minh" : "Chưa xác minh"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-20">Khóa cược:</span>
                          <Switch
                            checked={customer.isBetLocked}
                            onCheckedChange={() => toggleCustomerStatus(customer.id, "isBetLocked")}
                          />
                          <span className={`text-xs ${customer.isBetLocked ? "text-red-600" : "text-gray-500"}`}>
                            {customer.isBetLocked ? "Có" : "Không"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-20">Khóa rút:</span>
                          <Switch
                            checked={customer.isWithdrawLocked}
                            onCheckedChange={() => toggleCustomerStatus(customer.id, "isWithdrawLocked")}
                          />
                          <span className={`text-xs ${customer.isWithdrawLocked ? "text-red-600" : "text-gray-500"}`}>
                            {customer.isWithdrawLocked ? "Có" : "Không"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-2 hover:bg-blue-50 bg-transparent"
                          onClick={() => handleEditCustomer(customer.id)}
                          title="Chỉnh sửa khách hàng"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-2 hover:bg-red-50 bg-transparent"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          title="Xóa khách hàng"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Edit Customer Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Update thông tin
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tên đăng nhập</Label>
                <Input
                  value={editForm.username}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, username: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Mật khẩu</Label>
                <Input
                  type="password"
                  placeholder="Để trống nếu không thay đổi"
                  value={editForm.password}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Số dư</Label>
                <Input
                  type="number"
                  value={editForm.balance}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, balance: Number(e.target.value) }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Số dư đông băng</Label>
                <Input
                  type="number"
                  value={editForm.frozenBalance}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, frozenBalance: Number(e.target.value) }))}
                  className="mt-1"
                />
              </div>
            </div>

            <Separator />

            {/* Identity Verification Section */}
            <div>
              <h3 className="text-lg font-medium text-center mb-4">Thông tin xác minh danh tính</h3>

              <div className="mb-4">
                <Label>Họ tên</Label>
                <Input
                  placeholder="Họ tên đầy đủ"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CCCD mặt trước</Label>
                  <Button variant="outline" className="w-full mt-2 bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Tải lên
                  </Button>
                </div>
                <div>
                  <Label>CCCD mặt sau</Label>
                  <Button variant="outline" className="w-full mt-2 bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Tải lên
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Bank Information Section */}
            <div>
              <h3 className="text-lg font-medium text-center mb-4">Thông tin ngân hàng</h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Tên ngân hàng</Label>
                  <Input
                    placeholder="VD: Vietcombank"
                    value={editForm.bankName}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, bankName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Số tài khoản</Label>
                  <Input
                    placeholder="Số tài khoản ngân hàng"
                    value={editForm.accountNumber}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, accountNumber: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Chủ tài khoản</Label>
                  <Input
                    placeholder="Tên chủ tài khoản"
                    value={editForm.accountHolder}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, accountHolder: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Đóng
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveCustomer} disabled={isLoading}>
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Customer Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Thêm khách hàng mới
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tên đăng nhập *</Label>
                <Input
                  value={editForm.username}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, username: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label>Mật khẩu *</Label>
                <Input
                  type="password"
                  value={editForm.password}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Họ tên *</Label>
              <Input
                value={editForm.fullName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, fullName: e.target.value }))}
                className="mt-1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Số dư ban đầu</Label>
                <Input
                  type="number"
                  value={editForm.balance}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, balance: Number(e.target.value) }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Số dư đông băng</Label>
                <Input
                  type="number"
                  value={editForm.frozenBalance}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, frozenBalance: Number(e.target.value) }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Hủy
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSaveNewCustomer}
                disabled={isLoading || !editForm.username || !editForm.password || !editForm.fullName}
              >
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                Tạo tài khoản
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Deposit Requests Page Component
function DepositRequestsPage() {
  const [customerFilter, setCustomerFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState("2025-06-01")
  const [endDate, setEndDate] = useState("2025-06-29")
  const [isLoading, setIsLoading] = useState(false)

  const [depositData, setDepositData] = useState([
    {
      id: 1,
      time: "29/06/2025 12:39:17",
      customer: "Đinh Thị Tú Anh 1969",
      amount: "500,000đ",
      bill: "Xem",
      status: "pending",
    },
    {
      id: 2,
      time: "29/06/2025 10:58:36",
      customer: "du10tyve",
      amount: "100,000đ",
      bill: "Xem",
      status: "pending",
    },
    {
      id: 3,
      time: "29/06/2025 08:04:50",
      customer: "LuuThiHongMy",
      amount: "300,000đ",
      bill: "Xem",
      status: "pending",
    },
    {
      id: 4,
      time: "28/06/2025 21:31:58",
      customer: "nguoikhongten22@gmail.com",
      amount: "300,000đ",
      bill: "Xem",
      status: "pending",
    },
    {
      id: 5,
      time: "28/06/2025 19:21:08",
      customer: "ThuThao85",
      amount: "300,000đ",
      bill: "Xem",
      status: "approved",
    },
  ])

  const handleUpdateStatus = async (id: number, status: "approved" | "rejected") => {
    setDepositData((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))

    toast({
      title: status === "approved" ? "Đã phê duyệt" : "Đã từ chối",
      description: `Yêu cầu nạp tiền đã được ${status === "approved" ? "phê duyệt" : "từ chối"}`,
    })
  }

  const filteredDeposits = depositData.filter((deposit) => {
    const matchesCustomer = deposit.customer.toLowerCase().includes(customerFilter.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && deposit.status === "pending") ||
      (statusFilter === "approved" && deposit.status === "approved") ||
      (statusFilter === "rejected" && deposit.status === "rejected")
    return matchesCustomer && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Yêu cầu nạp tiền</span>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm khách hàng..."
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                  className="w-48"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label>Trạng thái</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-40" />
                <span>-</span>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-40" />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Đặt lại
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Xuất Excel
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Filter className="h-4 w-4 mr-2" />
                Áp dụng
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Deposit Requests Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Yêu cầu nạp tiền ({filteredDeposits.length})</CardTitle>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>THỜI GIAN</TableHead>
                  <TableHead>KHÁCH HÀNG</TableHead>
                  <TableHead>SỐ TIỀN</TableHead>
                  <TableHead>BILL</TableHead>
                  <TableHead>TRẠNG THÁI</TableHead>
                  <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeposits.map((deposit) => (
                  <TableRow key={deposit.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">{deposit.time}</TableCell>
                    <TableCell className="text-teal-500 font-medium">{deposit.customer}</TableCell>
                    <TableCell className="font-semibold">{deposit.amount}</TableCell>
                    <TableCell>
                      <Button variant="link" className="text-blue-600 p-0 h-auto">
                        <Eye className="h-4 w-4 mr-1" />
                        {deposit.bill}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          deposit.status === "approved"
                            ? "default"
                            : deposit.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                        className={
                          deposit.status === "approved"
                            ? "bg-green-500 text-white hover:bg-green-500"
                            : deposit.status === "rejected"
                              ? "bg-red-500 text-white hover:bg-red-500"
                              : "bg-blue-500 text-white hover:bg-blue-500"
                        }
                      >
                        {deposit.status === "approved"
                          ? "Đã duyệt"
                          : deposit.status === "rejected"
                            ? "Từ chối"
                            : "Chờ duyệt"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {deposit.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleUpdateStatus(deposit.id, "approved")}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Phê duyệt
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                              onClick={() => handleUpdateStatus(deposit.id, "rejected")}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Từ chối
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="text-gray-400 bg-transparent" disabled>
                              <Check className="h-4 w-4 mr-1" />
                              Phê duyệt
                            </Button>
                            <Button size="sm" variant="outline" className="text-gray-400 bg-transparent" disabled>
                              <X className="h-4 w-4 mr-1" />
                              Từ chối
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Continue with other enhanced components...
// (I'll continue with the remaining components in the next part due to length)

// For now, let me add the remaining components with basic enhancements
function OrderHistoryPage() {
  const [customerFilter, setCustomerFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState("01/06/2025")
  const [endDate, setEndDate] = useState("29/06/2025")

  const orderHistoryData = [
    {
      user: "vuthanhtra",
      session: "29185379",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:59:22",
    },
    {
      user: "vuthanhtra",
      session: "29185378",
      type: "Lên",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:58:20",
    },
    {
      user: "vuthanhtra",
      session: "29185377",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:57:33",
    },
    {
      user: "vuthanhtra",
      session: "29185376",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:56:13",
    },
    {
      user: "vuthanhtra",
      session: "29185375",
      type: "Lên",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:55:18",
    },
    {
      user: "vuthanhtra",
      session: "29185374",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:54:30",
    },
    {
      user: "vuthanhtra",
      session: "29185374",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:54:18",
    },
    {
      user: "vuthanhtra",
      session: "29185373",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 21:53:36",
    },
    {
      user: "ThuThao85",
      session: "29185283",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 20:23:11",
    },
    {
      user: "ThuThao85",
      session: "29185282",
      type: "Xuống",
      amount: "1000000đ",
      result: "+190,000",
      time: "28/06/2025 20:22:09",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Lịch sử đặt lệnh</span>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Label>Khách hàng</Label>
              <Input
                placeholder="Tên khách hàng"
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="w-48"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label>Trạng thái</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="buy">Lên</SelectItem>
                  <SelectItem value="sell">Xuống</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Thời gian</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-40" />
              <span>-</span>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-40" />
            </div>
            <Button variant="outline" size="sm">
              Đặt lại
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Áp dụng
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order History Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Phiên</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Kết quả</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderHistoryData.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="text-teal-500 font-medium">{order.user}</TableCell>
                  <TableCell>{order.session}</TableCell>
                  <TableCell>
                    <Badge
                      variant={order.type === "Lên" ? "default" : "destructive"}
                      className={
                        order.type === "Lên"
                          ? "bg-green-500 text-white hover:bg-green-500"
                          : "bg-red-500 text-white hover:bg-red-500"
                      }
                    >
                      {order.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell className="text-green-500 font-semibold">{order.result}</TableCell>
                  <TableCell className="text-gray-600">{order.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">10 / page</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-600 text-white">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="sm">
            5
          </Button>
          <Button variant="outline" size="sm">
            ...
          </Button>
          <Button variant="outline" size="sm">
            73
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

const staticSessions = [
  {
    session: "29185380",
    result: "Xuống",
    startTime: "28/06/2025 22:00:00",
    endTime: "28/06/2025 22:01:00",
  },
  {
    session: "29185379",
    result: "Lên",
    startTime: "28/06/2025 21:59:00",
    endTime: "28/06/2025 22:00:00",
  },
  {
    session: "29185378",
    result: "Xuống",
    startTime: "28/06/2025 21:58:00",
    endTime: "28/06/2025 21:59:00",
  },
  {
    session: "29185377",
    result: "Lên",
    startTime: "28/06/2025 21:57:00",
    endTime: "28/06/2025 21:58:00",
  },
  {
    session: "29185376",
    result: "Xuống",
    startTime: "28/06/2025 21:56:00",
    endTime: "28/06/2025 21:57:00",
  },
  {
    session: "29185375",
    result: "Lên",
    startTime: "28/06/2025 21:55:00",
    endTime: "28/06/2025 21:56:00",
  },
  {
    session: "29185374",
    result: "Xuống",
    startTime: "28/06/2025 21:54:00",
    endTime: "28/06/2025 21:55:00",
  },
  {
    session: "29185373",
    result: "Lên",
    startTime: "28/06/2025 21:53:00",
    endTime: "28/06/2025 21:54:00",
  },
  {
    session: "29185372",
    result: "Xuống",
    startTime: "28/06/2025 21:52:00",
    endTime: "28/06/2025 21:53:00",
  },
  {
    session: "29185371",
    result: "Lên",
    startTime: "28/06/2025 21:51:00",
    endTime: "28/06/2025 21:52:00",
  },
]

function TradingSessionsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const sessionsPerPage = 10
  const allSessions = staticSessions
  const totalPages = Math.ceil(allSessions.length / sessionsPerPage)
  const currentSessions = allSessions.slice((currentPage - 1) * sessionsPerPage, currentPage * sessionsPerPage)

  // Get the current session (first in the list)
  const currentSessionData = allSessions[0]
  const [countdown, setCountdown] = useState(59)

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          // When session ends, move to next session
          return 59
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Phiên giao dịch</span>
      </div>

      {/* Current Session Display */}
      <div className="flex justify-center mb-8">
        <Card className="w-80 text-center">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="text-lg font-semibold">Phiên: {currentSessionData.session}</div>
              <div className="text-3xl font-bold text-red-500">{countdown}s</div>
              <div className="text-sm">
                Kết quả: <span className="font-semibold text-green-600">{currentSessionData.result}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Lịch sử phiên</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phiên</TableHead>
                <TableHead>Kết quả</TableHead>
                <TableHead>Thời gian bắt đầu</TableHead>
                <TableHead>Thời gian kết thúc</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSessions.map((session, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{session.session}</TableCell>
                  <TableCell>
                    <Badge
                      variant={session.result === "Lên" ? "default" : "destructive"}
                      className={
                        session.result === "Lên"
                          ? "bg-green-500 text-white hover:bg-green-500"
                          : "bg-red-500 text-white hover:bg-red-500"
                      }
                    >
                      {session.result}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{session.startTime}</TableCell>
                  <TableCell className="text-gray-600">{session.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">{sessionsPerPage} / page</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant="outline"
              size="sm"
              className={currentPage === page ? "bg-blue-600 text-white" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function WithdrawalRequestsPage() {
  const [customerFilter, setCustomerFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState("01/06/2025")
  const [endDate, setEndDate] = useState("29/06/2025")

  const withdrawalData = [
    {
      time: "29/06/2025 14:56:11",
      customer: "Nguyễn Thu Mai",
      amount: "600,000đ",
      receivedAmount: "570,000đ",
      bank: "LPBANK",
      accountNumber: "051606050001",
      accountHolder: "Nguyễn Thu Mai",
      status: "Chờ duyệt",
    },
    {
      time: "29/06/2025 14:54:26",
      customer: "Nguyễn Thu Mai",
      amount: "100,000đ",
      receivedAmount: "95,000đ",
      bank: "LPBANK",
      accountNumber: "051606050001",
      accountHolder: "Nguyễn Thu Mai",
      status: "Từ chối",
    },
    {
      time: "29/06/2025 13:15:56",
      customer: "nguyenthuy1983",
      amount: "600,000đ",
      receivedAmount: "570,000đ",
      bank: "BIDV",
      accountNumber: "3600688224",
      accountHolder: "Nguyễn thị Hồng Thúy",
      status: "Chờ duyệt",
    },
    {
      time: "29/06/2025 12:29:56",
      customer: "Hangpham1991",
      amount: "510,000đ",
      receivedAmount: "484,500đ",
      bank: "Vietinbank",
      accountNumber: "102877186224",
      accountHolder: "Phạm Thị Thanh Hằng",
      status: "Chờ duyệt",
    },
    {
      time: "28/06/2025 23:00:32",
      customer: "Đinh Thị Tú Anh 1969",
      amount: "5,000,000đ",
      receivedAmount: "4,750,000đ",
      bank: "Vietinbank",
      accountNumber: "104876981067",
      accountHolder: "ĐINH THỊ TÚ ANH",
      status: "Chờ duyệt",
    },
    {
      time: "28/06/2025 23:00:04",
      customer: "Đinh Thị Tú Anh 1969",
      amount: "5,000,000đ",
      receivedAmount: "4,750,000đ",
      bank: "Vietinbank",
      accountNumber: "104876981067",
      accountHolder: "ĐINH THỊ TÚ ANH",
      status: "Chờ duyệt",
    },
    {
      time: "28/06/2025 22:59:43",
      customer: "Đinh Thị Tú Anh 1969",
      amount: "2,000,000đ",
      receivedAmount: "1,900,000đ",
      bank: "Vietinbank",
      accountNumber: "104876981067",
      accountHolder: "ĐINH THỊ TÚ ANH",
      status: "Chờ duyệt",
    },
    {
      time: "28/06/2025 22:22:34",
      customer: "vuthanhtra",
      amount: "600,000đ",
      receivedAmount: "570,000đ",
      bank: "Ngân hàng quân đội",
      accountNumber: "0912652386",
      accountHolder: "Vũ thị thanh trà",
      status: "Chờ duyệt",
    },
    {
      time: "28/06/2025 20:40:04",
      customer: "ThuThao85",
      amount: "600,000đ",
      receivedAmount: "570,000đ",
      bank: "MB",
      accountNumber: "0334191359",
      accountHolder: "Trần Thị Thu Thảo",
      status: "Đã duyệt",
    },
    {
      time: "28/06/2025 20:02:05",
      customer: "Vythao123",
      amount: "600,000đ",
      receivedAmount: "570,000đ",
      bank: "Vietinbank",
      accountNumber: "107004415214",
      accountHolder: "Dương Ngọc nương",
      status: "Đã duyệt",
    },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Yêu cầu rút tiền</span>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Label>Khách hàng</Label>
          <Input
            placeholder="Khách hàng"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="w-48"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>Trạng thái</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label>Thời gian</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-40" />
          <span>-</span>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-40" />
        </div>
        <Button variant="outline" size="sm">
          Đặt lại
        </Button>
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          Áp dụng
        </Button>
      </div>

      {/* Withdrawal Requests Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Số tiền nhận</TableHead>
                <TableHead>Ngân hàng nhận tiền</TableHead>
                <TableHead>Số tài khoản</TableHead>
                <TableHead>Chủ tài khoản</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalData.map((withdrawal, index) => (
                <TableRow key={index}>
                  <TableCell>{withdrawal.time}</TableCell>
                  <TableCell className="text-teal-500">{withdrawal.customer}</TableCell>
                  <TableCell>{withdrawal.amount}</TableCell>
                  <TableCell>{withdrawal.receivedAmount}</TableCell>
                  <TableCell>{withdrawal.bank}</TableCell>
                  <TableCell>{withdrawal.accountNumber}</TableCell>
                  <TableCell>{withdrawal.accountHolder}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        withdrawal.status === "Đã duyệt"
                          ? "default"
                          : withdrawal.status === "Từ chối"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        withdrawal.status === "Đã duyệt"
                          ? "bg-green-500 text-white hover:bg-green-500"
                          : withdrawal.status === "Từ chối"
                            ? "bg-red-500 text-white hover:bg-red-500"
                            : "bg-blue-500 text-white hover:bg-blue-500"
                      }
                    >
                      {withdrawal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {withdrawal.status === "Chờ duyệt" ? (
                        <>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            Phê duyệt
                          </Button>
                          <Button size="sm" variant="outline" className="text-gray-600 bg-transparent">
                            Từ chối
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" className="text-gray-400 bg-transparent" disabled>
                            Phê duyệt
                          </Button>
                          <Button size="sm" variant="outline" className="text-gray-400 bg-transparent" disabled>
                            Từ chối
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Settings Page Component
function SettingsPage() {
  const [bankName, setBankName] = useState("ABBANK")
  const [accountNumber, setAccountNumber] = useState("0387473721")
  const [accountHolder, setAccountHolder] = useState("VU VAN MIEN")
  const [minDeposit, setMinDeposit] = useState("100,000")
  const [minWithdrawal, setMinWithdrawal] = useState("100,000")
  const [maxWithdrawal, setMaxWithdrawal] = useState("100,000")
  const [cskh, setCskh] = useState("https://t.me/DICHVUCSKHLS")

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Cài đặt</span>
      </div>

      <div className="max-w-2xl">
        {/* Bank Information Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Thông tin ngân hàng nạp tiền</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tên ngân hàng</Label>
                <Input value={bankName} onChange={(e) => setBankName(e.target.value)} />
              </div>
              <div>
                <Label>Số tài khoản</Label>
                <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Chủ tài khoản</Label>
              <Input value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Deposit/Withdrawal Limits Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cấu hình nạp rút</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Số tiền nạp tối thiểu</Label>
                <Input value={minDeposit} onChange={(e) => setMinDeposit(e.target.value)} />
              </div>
              <div>
                <Label>Số tiền rút tối thiểu</Label>
                <Input value={minWithdrawal} onChange={(e) => setMinWithdrawal(e.target.value)} />
              </div>
              <div>
                <Label>Số tiền đặt lệnh tối thiểu</Label>
                <Input value={maxWithdrawal} onChange={(e) => setMaxWithdrawal(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CSKH Link Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div>
              <Label>Link CSKH</Label>
              <Input value={cskh} onChange={(e) => setCskh(e.target.value)} className="mb-4" />
              <Button className="bg-green-600 hover:bg-green-700">Lưu</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AppSidebar({
  currentPage,
  setCurrentPage,
}: { currentPage: PageType; setCurrentPage: (page: PageType) => void }) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPage === item.id}
                    className={currentPage === item.id ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                  >
                    <button
                      onClick={() => setCurrentPage(item.id)}
                      className="flex items-center gap-3 w-full text-left"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "customers":
        return <CustomersPage />
      case "order-history":
        return <OrderHistoryPage />
      case "trading-sessions":
        return <TradingSessionsPage />
      case "deposit-requests":
        return <DepositRequestsPage />
      case "withdrawal-requests":
        return <WithdrawalRequestsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1">
          {/* Header */}
          <header className="bg-slate-700 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <SidebarTrigger className="text-white hover:bg-slate-600" />
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-slate-600">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-slate-600">
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <UserMenu />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">{renderCurrentPage()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
