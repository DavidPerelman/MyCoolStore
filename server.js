const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const corsOptions = require('./config/corsOptions');
const data = require('./data.js');
const connectDB = require('./config/connectDB');

// var admin = require('firebase-admin');

// var serviceAccount = require('./config/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const { authMiddlware } = require('./middleware/auth-middleware');

dotenv.config();

connectDB();
const app = express();

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// Routers
const authRouter = require('./routers/authRouter');
app.use('/api/auth', authRouter);

const categoriesRouter = require('./routers/categoriesRouter');
app.use('/api/categories', categoriesRouter);

const productsRouter = require('./routers/productsRouter');
app.use('/api/products', productsRouter);

const ordersRouter = require('./routers/ordersRouter');
app.use('/api/orders', ordersRouter);

app.get('/', function (req, res) {
  res.send('<h1>Hello Server</h1>');
});

// app.use(express.static(path.join(__dirname, './client/build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
