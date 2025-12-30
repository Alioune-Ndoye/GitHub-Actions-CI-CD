import express from 'express';
// import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(routes);

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
