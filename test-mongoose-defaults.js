const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  averageRating: { type: Number, default: 10 },
  numReviews: { type: Number, default: 0 }
});

const Book = mongoose.model('TestBook', schema);

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test-db-123');
  
  const b = await Book.create({ name: 'Hello', price: 10, averageRating: 5, numReviews: 5 });
  console.log('Before update:', b.averageRating, b.numReviews);

  const updated = await Book.findByIdAndUpdate(b._id, { price: 20 }, { new: true, runValidators: true });
  console.log('After update:', updated.averageRating, updated.numReviews);

  await mongoose.disconnect();
}
run().catch(console.error);
