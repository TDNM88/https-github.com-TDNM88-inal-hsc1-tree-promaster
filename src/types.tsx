<<<<<<< HEAD
// User types
export interface User {
  _id: string
  username: string
  fullName: string
  phone: string
  email?: string
  balance: number
  role: "user" | "admin"
  bankInfo?: BankInfo
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Bank information
=======
export interface User {
  id: string
  username: string
  email: string
  fullName?: string
  phone?: string
  role: "admin" | "user"
  balance: {
    available: number
    frozen: number
  }
  status: {
    active: boolean
    betLocked: boolean
    withdrawLocked: boolean
  }
  verification: {
    status: "verified" | "pending" | "rejected"
    documents?: {
      frontId?: string
      backId?: string
    }
  }
  createdAt: string
  lastLogin?: string
}

export interface Deposit {
  id: string
  userId: string
  amount: number
  status: "pending" | "approved" | "rejected"
  bankInfo: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  createdAt: string
  approvedAt?: string
  rejectedAt?: string
  notes?: string
}

export interface Withdrawal {
  id: string
  userId: string
  amount: number
  status: "pending" | "processing" | "completed" | "rejected"
  bank: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  createdAt: string
  processedAt?: string
  completedAt?: string
  rejectedAt?: string
  notes?: string
}

export interface TradingSession {
  id: string
  name: string
  startTime: string
  endTime: string
  status: "active" | "closed" | "pending"
  result?: "up" | "down"
  openPrice?: number
  closePrice?: number
}

export interface Order {
  id: string
  userId: string
  sessionId: string
  type: "up" | "down"
  amount: number
  status: "pending" | "won" | "lost"
  result?: "win" | "lose"
  payout?: number
  createdAt: string
  settledAt?: string
}

>>>>>>> 45475aa807b74683eec393af01d071e54b7296cd
export interface BankInfo {
  bankName: string
  accountNumber: string
  accountName: string
}

<<<<<<< HEAD
// Trading session
export interface Session {
  _id: string
  sessionId: string
  result: "up" | "down" | "pending"
  startTime: string
  endTime: string
  startPrice?: number
  endPrice?: number
  isActive: boolean
  isCompleted: boolean
  createdAt: string
}

// Deposit request
export interface Deposit {
  _id: string
  user: User | string
  amount: number
  bankInfo: {
    bankName: string
    accountNumber: string
    accountName: string
    transferContent?: string
  }
  status: "pending" | "approved" | "rejected"
  proofImage?: string
  notes?: string
  approvedBy?: User | string
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

// Withdrawal request
export interface Withdrawal {
  _id: string
  user: User | string
  amount: number
  bank: BankInfo
  status: "pending" | "processing" | "completed" | "rejected"
  notes?: string
  processedBy?: User | string
  processedAt?: string
  createdAt: string
  updatedAt: string
}

// Order
export interface Order {
  _id: string
  user: User | string
  session: Session | string
  type: "up" | "down"
  amount: number
  result: "win" | "lose" | "pending"
  payout: number
  createdAt: string
  updatedAt: string
}

// System settings
export interface Settings {
  _id: string
=======
export interface AuthResponse {
  token: string
  user: User
}

export interface ErrorResponse {
  message: string
  error?: string
}

export interface Settings {
  id: string
>>>>>>> 45475aa807b74683eec393af01d071e54b7296cd
  bankDetails: BankInfo[]
  depositLimits: {
    min: number
    max: number
  }
  withdrawalLimits: {
    min: number
    max: number
  }
  tradingLimits: {
    min: number
    max: number
  }
  cskhLink: string
  maintenanceMode: boolean
  payoutRate: number
  updatedAt: string
}
<<<<<<< HEAD

// Authentication
export interface AuthResponse {
  token: string
  user: User
}

// Error response
export interface ErrorResponse {
  message: string
  error?: string
}
=======
>>>>>>> 45475aa807b74683eec393af01d071e54b7296cd
