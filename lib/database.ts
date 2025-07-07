import clientPromise from "./mongodb"

export async function getDatabase() {
  const client = await clientPromise
  return client.db("binary_trading")
}

export async function getCustomers() {
  const db = await getDatabase()
  return db.collection("customers").find({}).toArray()
}

export async function getDeposits() {
  const db = await getDatabase()
  return db.collection("deposits").find({}).toArray()
}

export async function getWithdrawals() {
  const db = await getDatabase()
  return db.collection("withdrawals").find({}).toArray()
}

export async function getOrders() {
  const db = await getDatabase()
  return db.collection("orders").find({}).toArray()
}
