import express  from "express"
import cors from "cors"
import {connectDB} from "./config/db.js"
import foodRouter from "./routes/foodroute.js"
import { addFood } from "./controllers/foodcontroler.js"
import userRouter from "./routes/userroute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartroute.js"
import orderRouter from "./routes/autoroute.js"



// app config
const app = express();
const port = 4000;

// connect to database
connectDB();

// middleware
app.use(cors()); // Apply CORS middleware
app.use(express.json()); // Parse JSON bodies



// API endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// Serve static images
app.use("/images", express.static('uploads'));


// Root route
app.get("/", (req, res) => {
    res.send("API Working");
  });



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500: Internal Server Error");
});

// start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

//mongodb+srv://drdarkcraters:Zqo0cUSzwcc58KNR@cluster0.npebz3y.mongodb.net/?