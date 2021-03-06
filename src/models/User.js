import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const { CONFIRM_MAIL_TOKEN_SECRET } = process.env;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: [2, "first name too short! must be at least 2 letters long "]
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: [5, "Email too short!"],
      validate: {
        validator: email => User.doesntExist({ email }),
        message: ({ value }) => `Mail already exists `
      }
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: [2, "username too short! must be at least 2 letters long "],
      validate: {
        validator: username => User.doesntExist({ username }),
        message: ({ value }) => `User already exists`
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "password must be at least 7 letters long "]
    },
    email_token: {
      type: String
    },
    email_confirmed: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    const token = jwt.sign({ id: this.id }, CONFIRM_MAIL_TOKEN_SECRET);
    this.email_token = token;
  }
});

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};
userSchema.methods.passwordMatch = function(password) {
  return compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
