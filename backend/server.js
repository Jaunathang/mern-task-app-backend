// dotenv is a package needed to read from the .env file
const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const taskRoutes = require('./routes/taskRoute');
const cors = require('cors');

const app = express();

const SERVER_PORT = process.env.SERVER_PORT;

// Middleware
// Note: the middlewares are run in a sequence meaning that the order matters!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    // Note: The origin property below accepts multiple URIs
    origin: ["http://localhost:3000"]
}));
app.use("/api/tasks",taskRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

const startServer = async () => {
    /**
     * We want to make sure that the DB is connected before starting the server. Otherwiser, we risk sending
     * queries to MongoDB before it's ready.
     */
    try {
        // Connect the DB
        await connectDB();
        // Open port to listen to the world!
        app.listen(SERVER_PORT, () => {
            console.log(`Server running on port ${SERVER_PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();