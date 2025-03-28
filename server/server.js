if (process.env.NODE_ENV !== "production") require("dotenv").config();

import express from "express";
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const path = require("path");

const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

const app = express();
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectToDb();

app.post("/signup", usersController.signUp);
app.post("/login", usersController.logIn);
app.get("/logout", usersController.logOut);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/notes", requireAuth, notesController.fetchNotes);
app.post("/notes", requireAuth, notesController.createNote);
app.put("/notes/:id", requireAuth, notesController.updateNote);



const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
