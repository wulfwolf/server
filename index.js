const express = require("express");
const app = express();
app.use(express.json());
const db = require("./config");
const cors = require("cors");

db.connect();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const adminRouter = require("./routes/admin");
const myFoodRouter = require("./routes/myfood");
const ingredientRouter = require("./routes/ingredient");
const storedFoodRouter = require("./routes/storedfood");
const scheduleRouter = require("./routes/schedule");
const notificationRouter = require("./routes/notification");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/user", userRouter);
app.use("/api/myfood", myFoodRouter);
app.use("/api/ingredient", ingredientRouter);
app.use("/api/storedfood", storedFoodRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/admin/auth", adminRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
