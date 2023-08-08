require('dotenv').config();
const db = require('mongoose');

db.set('strictQuery', true);

//connect to db
const URI_cloud = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.be8wbb1.mongodb.net/todoDB?retryWrites=true&w=majority`;

const connectDB = async () => {
  await db.connect(URI_cloud, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('DB connected successfully');
};

connectDB().catch((err) => console.log(err));

module.exports = db;
