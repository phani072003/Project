// server//index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRegisterRoute = require('./controller/userRegister');
const userLoginRoute = require('./controller/userLogin');
const newsRoute = require('./controller/newsRoute');
const postsRoutes = require('./routes/postRoutes'); // Import the posts route
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes

const app = express();
const port = 4000;
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://testing:2222@cluster0.4c5km6y.mongodb.net/", {

  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use("/userRegister", userRegisterRoute);
app.use("/userLogin", userLoginRoute);
app.use("/newsRoute", newsRoute);
app.use("/api", postsRoutes);
app.use("/user", userRoutes); // Use the userRoutes
app.post('/user/userInfo', (req, res) => {
  // Handle the POST request and send a response
  res.send('UserInfo endpoint is working!');
  res.json({ name: 'John Doe', email: 'john@example.com' });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.route('/user/userInfo')
  .get((req, res) => {
    // Handle GET request for user information (if needed)
    res.status(200).json({ message: 'GET request received for user information' });
  })
  .post((req, res) => {
    // Handle POST request for user information
    // Replace this with your actual logic to fetch user information based on the request parameters (e.g., email)
    // ...

    // Example response
    res.status(200).json({ name: 'John Doe', email: 'john@example.com' });
  });
