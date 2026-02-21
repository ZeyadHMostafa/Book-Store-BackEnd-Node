const mongoose = require('mongoose');
const Book = require('./src/models/book');

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/book-store-test');
  
  // Create a book with custom ratings
  const book = await Book.create({
    name: 'Test Book',
    author: new mongoose.Types.ObjectId(),
    category: new mongoose.Types.ObjectId(),
    price: 15,
    bookCover: 'http://example.com/cover.jpg',
    averageRating: 4.5,
    numReviews: 10
  });
  console.log('Created Book:', book.averageRating, book.numReviews);

  // Update without specifying averageRating
  const updated = await Book.findByIdAndUpdate(book._id, { price: 20 }, { new: true, runValidators: true });
  console.log('Updated Book:', updated.averageRating, updated.numReviews);
  
  await mongoose.disconnect();
}
run();
