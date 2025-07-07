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

export interface BankInfo {
  bankName: string
  accountNumber: string
  accountName: string
}

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
