const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not registered! Please register first." });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Incorrect password. Please try again." });
    }

    // Send username and email separately
    return res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      username: user.username, 
      email: user.email 
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { login };
