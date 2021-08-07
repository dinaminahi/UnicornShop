// server/index.js

const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(
  "mongodb+srv://admin-diana:unicornLvivpassTest123@cluster0.2sgn4.mongodb.net/unicornDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const productSchema = new mongoose.Schema({
  name: String,
  color: Array,
  pattern: String,
  sizes: Array,
  price: Number,
  keyFeatures: Array,
  description: String,
  fabric: Array,
  age: String,
  sex: String,
  category: String,
  type: String,
  photos: Array,
});

const Product = mongoose.model('Product', productSchema);

const product = new Product({
  name: 'Bucket Hat',
  color: ['blue'],
  pattern: null,
  sizes: null,
  price: 15,
  keyFeatures: [{description: 'Puts a smile on their face!', icon: '<CheckCircleIcon />'}, {description: 'Perfect for baby', icon: '<FavoriteIcon />'}],
  description: 'He\'s ready for outdoor adventures in this cute sun protected hat!',
  fabric: ['100% man-made materials', 'Imported', 'Machine washable'],
  age: 'baby',
  sex: 'boy',
  category: 'accessories',
  type: 'hat',
  photos: ['https://i.ibb.co/FwmMtBm/1K660610.jpg','https://i.ibb.co/zZCKT9S/1-K660610-1.jpg'],
});



product.save();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/products", async (req, res) => {
  const { age, sex, category } = req.query;
  const searchedProducts = await Product.find({
    age,
    sex,
    category: { "$regex": category},
  }).exec();
  res.json(searchedProducts);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
