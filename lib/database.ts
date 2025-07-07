import clientPromise from "./mongodb"

export async function getDatabase() {
  const client = await clientPromise
  return client.db("trading_platform")
}

export async function getCustomers() {
  // Mock data for now
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      balance: 1500.0,
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      balance: 2300.5,
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      balance: 750.25,
      status: "suspended",
      joinDate: "2024-03-10",
    },
  ]
}

export async function getDeposits() {
  return [
    {
      id: "1",
      customerId: "1",
      customerName: "John Doe",
      amount: 500.0,
      status: "completed",
      method: "bank_transfer",
      date: "2024-01-20T10:30:00Z",
    },
    {
      id: "2",
      customerId: "2",
      customerName: "Jane Smith",
      amount: 1000.0,
      status: "pending",
      method: "credit_card",
      date: "2024-01-21T14:15:00Z",
    },
  ]
}

export async function getWithdrawals() {
  return [
    {
      id: "1",
      customerId: "1",
      customerName: "John Doe",
      amount: 200.0,
      status: "pending",
      method: "bank_transfer",
      date: "2024-01-22T16:45:00Z",
    },
  ]
}

export async function getOrders() {
  return [
    {
      id: "1",
      customerId: "1",
      customerName: "John Doe",
      asset: "EUR/USD",
      type: "call",
      amount: 100.0,
      status: "completed",
      result: "win",
      payout: 180.0,
      date: "2024-01-23T09:15:00Z",
    },
  ]
}
