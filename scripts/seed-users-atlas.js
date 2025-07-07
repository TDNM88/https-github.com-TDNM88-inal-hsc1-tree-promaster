// Script to seed sample users data for MongoDB Atlas
const { MongoClient, ServerApiVersion } = require("mongodb")

// MongoDB Atlas connection string - replace with your actual connection string
const uri =
  process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority"
const dbName = "binary_trading"

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

const sampleUsers = [
  {
    username: "user001",
    password: "password123", // In production, this should be hashed
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
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Nguyen+Van+An",
      cccdBack: "/placeholder.svg?height=300&width=400&text=CCCD+Back+Nguyen+Van+An",
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
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Pham+Thi+Dung",
      cccdBack: "/placeholder.svg?height=300&width=400&text=CCCD+Back+Pham+Thi+Dung",
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
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Hoang+Van+Em",
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
  {
    username: "user006",
    password: "password123",
    fullName: "Võ Thị Giang",
    email: "vothigiang@email.com",
    phone: "0956789012",
    balance: {
      available: 1800000,
      frozen: 200000,
    },
    status: {
      active: true,
      suspended: false,
      emailVerified: true,
    },
    verification: {
      verified: true,
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Vo+Thi+Giang",
      cccdBack: "/placeholder.svg?height=300&width=400&text=CCCD+Back+Vo+Thi+Giang",
    },
    bank: {
      name: "Sacombank",
      accountNumber: "1111222233",
      accountHolder: "Võ Thị Giang",
    },
    role: "user",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    lastLoginIp: "192.168.1.105",
  },
  {
    username: "user007",
    password: "password123",
    fullName: "Đặng Văn Hùng",
    email: "dangvanhung@email.com",
    phone: "0967890123",
    balance: {
      available: 4200000,
      frozen: 800000,
    },
    status: {
      active: true,
      suspended: false,
      emailVerified: false,
    },
    verification: {
      verified: false,
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Dang+Van+Hung",
      cccdBack: "",
    },
    bank: {
      name: "VPBank",
      accountNumber: "4444555566",
      accountHolder: "Đặng Văn Hùng",
    },
    role: "user",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    lastLoginIp: "192.168.1.106",
  },
  {
    username: "user008",
    password: "password123",
    fullName: "Bùi Thị Lan",
    email: "buithilan@email.com",
    phone: "0978901234",
    balance: {
      available: 6500000,
      frozen: 1500000,
    },
    status: {
      active: true,
      suspended: false,
      emailVerified: true,
    },
    verification: {
      verified: true,
      cccdFront: "/placeholder.svg?height=300&width=400&text=CCCD+Front+Bui+Thi+Lan",
      cccdBack: "/placeholder.svg?height=300&width=400&text=CCCD+Back+Bui+Thi+Lan",
    },
    bank: {
      name: "MB Bank",
      accountNumber: "7777888899",
      accountHolder: "Bùi Thị Lan",
    },
    role: "user",
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date(),
    lastLoginAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    lastLoginIp: "192.168.1.107",
  },
]

async function seedUsersAtlas() {
  const client = new MongoClient(uri, options)

  try {
    console.log("🔄 Connecting to MongoDB Atlas...")
    await client.connect()
    console.log("✅ Connected to MongoDB Atlas")

    // Verify connection
    await client.db("admin").command({ ping: 1 })
    console.log("✅ MongoDB Atlas connection verified")

    const db = client.db(dbName)
    const usersCollection = db.collection("users")

    // Check if admin user exists, if not create one
    const adminExists = await usersCollection.findOne({ role: "admin" })
    if (!adminExists) {
      const adminUser = {
        username: "admin",
        password: "admin123", // In production, this should be hashed
        fullName: "System Administrator",
        email: "admin@system.com",
        phone: "",
        balance: {
          available: 0,
          frozen: 0,
        },
        status: {
          active: true,
          suspended: false,
          emailVerified: true,
        },
        verification: {
          verified: true,
          cccdFront: "",
          cccdBack: "",
        },
        bank: {
          name: "",
          accountNumber: "",
          accountHolder: "",
        },
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        lastLoginIp: "127.0.0.1",
      }

      await usersCollection.insertOne(adminUser)
      console.log("✅ Admin user created")
    }

    // Clear existing non-admin users
    const deleteResult = await usersCollection.deleteMany({ role: { $ne: "admin" } })
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing users`)

    // Insert sample users
    const result = await usersCollection.insertMany(sampleUsers)
    console.log(`✅ Inserted ${result.insertedCount} sample users`)

    // Create indexes for better performance
    await usersCollection.createIndex({ username: 1 }, { unique: true })
    await usersCollection.createIndex({ email: 1 })
    await usersCollection.createIndex({ phone: 1 })
    await usersCollection.createIndex({ "status.active": 1 })
    await usersCollection.createIndex({ "verification.verified": 1 })
    await usersCollection.createIndex({ createdAt: -1 })
    await usersCollection.createIndex({ lastLoginAt: -1 })
    console.log("✅ Database indexes created")

    console.log("\n🎉 Sample users seeded successfully to MongoDB Atlas!")
    console.log("\n📊 Summary:")
    console.log(`   • Database: ${dbName}`)
    console.log(`   • Collection: users`)
    console.log(`   • Total users: ${result.insertedCount + 1} (including admin)`)
    console.log(`   • Admin credentials: admin / admin123`)
    console.log("\n🔗 You can now access the admin dashboard and see the dynamic user data!")
  } catch (error) {
    console.error("❌ Error seeding users to MongoDB Atlas:", error)
    process.exit(1)
  } finally {
    await client.close()
    console.log("🔌 MongoDB Atlas connection closed")
  }
}

// Run the seeding function
if (require.main === module) {
  seedUsersAtlas()
}

module.exports = { seedUsersAtlas }
