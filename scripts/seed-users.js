// Script to seed sample users data
const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "binary_trading"

const sampleUsers = [
  {
    username: "user001",
    password: "password123",
    fullName: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901234567",
    balance: {
      available: 5000000,
      frozen: 0,
    },
    status: {
      active: true,
      suspended: false,
      emailVerified: true,
    },
    verification: {
      verified: true,
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front",
      cccdBack: "/placeholder.svg?height=300&width=400&text=CCCD+Back",
    },
    bank: {
      name: "Vietcombank",
      accountNumber: "1234567890",
      accountHolder: "Nguyễn Văn An",
    },
    role: "user",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    lastLoginIp: "192.168.1.100",
  },
  {
    username: "user002",
    password: "password123",
    fullName: "Trần Thị Bình",
    email: "tranthibinh@email.com",
    phone: "0912345678",
    balance: {
      available: 3500000,
      frozen: 500000,
    },
    status: {
      active: true,
      suspended: false,
      emailVerified: true,
    },
    verification: {
      verified: false,
      cccdFront: "",
      cccdBack: "",
    },
    bank: {
      name: "BIDV",
      accountNumber: "9876543210",
      accountHolder: "Trần Thị Bình",
    },
    role: "user",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    lastLoginIp: "192.168.1.101",
  },
  {
    username: "user003",
    password: "password123",
    fullName: "Lê Văn Cường",
    email: "levancuong@email.com",
    phone: "0923456789",
    balance: {
      available: 0,
      frozen: 0,
    },
    status: {
      active: false,
      suspended: true,
      emailVerified: false,
    },
    verification: {
      verified: false,
      cccdFront: "",
      cccdBack: "",
    },
    bank: {
      name: "",
      accountNumber: "",
      accountHolder: "",
    },
    role: "user",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    lastLoginIp: "192.168.1.102",
  },
  {
    username: "user004",
    password: "password123",
    fullName: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0934567890",
    balance: {
      available: 7500000,
      frozen: 2500000,
    },
    status: {
      active: true,
      suspended: false,
      emailVerified: true,
    },
    verification: {
      verified: true,
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Phạm+Thị+Dung",
      cccdBack: "/placeholder.svg?height=300&width=400&text=CCCD+Back+Phạm+Thị+Dung",
    },
    bank: {
      name: "ACB",
      accountNumber: "5555666677",
      accountHolder: "Phạm Thị Dung",
    },
    role: "user",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    lastLoginIp: "192.168.1.103",
  },
  {
    username: "user005",
    password: "password123",
    fullName: "Hoàng Văn Em",
    email: "hoangvanem@email.com",
    phone: "0945678901",
    balance: {
      available: 2200000,
      frozen: 0,
    },
    status: {
      active: true,
      suspended: false,
      emailVerified: false,
    },
    verification: {
      verified: false,
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Hoàng+Văn+Em",
      cccdBack: "",
    },
    bank: {
      name: "Techcombank",
      accountNumber: "9999888877",
      accountHolder: "Hoàng Văn Em",
    },
    role: "user",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    lastLoginIp: "192.168.1.104",
  },
]

async function seedUsers() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)
    const usersCollection = db.collection("users")

    // Clear existing users (except admin)
    await usersCollection.deleteMany({ role: { $ne: "admin" } })
    console.log("Cleared existing users")

    // Insert sample users
    const result = await usersCollection.insertMany(sampleUsers)
    console.log(`Inserted ${result.insertedCount} users`)

    console.log("Sample users seeded successfully!")
  } catch (error) {
    console.error("Error seeding users:", error)
  } finally {
    await client.close()
  }
}

seedUsers()
