import mongoose, { type Document, Schema, type Model } from "mongoose"

export interface IUser extends Document {
  username: string
  password: string
  fullName?: string
  email?: string
  phone?: string
  role: "admin" | "user" | "agent"
  balance: {
    available: number
    frozen: number
  }
  bank?: {
    name: string
    accountNumber: string
    accountHolder: string
  }
  verification: {
    status: "pending" | "verified" | "rejected"
    cccdFront?: string
    cccdBack?: string
    verifiedAt?: Date
    verifiedBy?: string
    rejectionReason?: string
  }
  status: {
    active: boolean
    betLocked: boolean
    withdrawLocked: boolean
    lastActive?: Date
  }
  loginInfo?: string
  lastLogin?: Date
  lastLoginIp?: string
  createdAt: Date
  updatedAt: Date
  registeredIp?: string
  referrer?: string
  notes?: string
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    fullName: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    phone: {
      type: String,
      trim: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "agent"],
      default: "user",
    },
    balance: {
      available: {
        type: Number,
        default: 0,
        min: 0,
      },
      frozen: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    bank: {
      name: {
        type: String,
        default: "",
      },
      accountNumber: {
        type: String,
        default: "",
      },
      accountHolder: {
        type: String,
        default: "",
      },
    },
    verification: {
      status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
      cccdFront: { type: String },
      cccdBack: { type: String },
      verifiedAt: { type: Date },
      verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
      rejectionReason: { type: String },
    },
    status: {
      active: {
        type: Boolean,
        default: true,
      },
      betLocked: {
        type: Boolean,
        default: false,
      },
      withdrawLocked: {
        type: Boolean,
        default: false,
      },
      lastActive: {
        type: Date,
      },
    },
    loginInfo: {
      type: String,
    },
    lastLoginIp: {
      type: String,
    },
    registeredIp: {
      type: String,
    },
    referrer: {
      type: String,
      ref: "User",
    },
    notes: {
      type: String,
    },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

let UserModel: Model<IUser>
try {
  UserModel = mongoose.model<IUser>("User")
} catch {
  UserModel = mongoose.model<IUser>("User", userSchema)
}

export default UserModel
