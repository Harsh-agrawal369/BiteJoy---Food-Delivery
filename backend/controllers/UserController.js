import prisma from "../prisma/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Function to create token
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: 3600 });
};

// Login User
const loginUser = async (req, res) => {};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, confirmPass } = req.body;

  try {
    if (!name || !email || !password || !confirmPass) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password !== confirmPass) {
      return res.json({ success: false, message: "Passwords do not match" });
    }

    const user = await prisma.userModel.findUnique({
      where: { email: email },
    });

    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (
      !password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/)
    ) {
      return res.json({ success: false, message: "Password is weak" });
    }

    const salt = await bcrypt.genSalt(10); // Using corrected bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.userModel.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const token = createToken(newUser.id);
    res.json({ success: true, token: token });
  } catch (error) {
    console.error("Error:", error); // Improved error logging
    res.json({ success: false, message: "Internal Server Error" });
  }
};

export { loginUser, registerUser };
