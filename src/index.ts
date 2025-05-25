
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './routes/index.js'; // <-- include your routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Use all routes
app.use('/api', routes); // <-- plug in all routes from /routes

// Test Route
app.get('/', (_req, res) => {
  res.send('✅ Backend is working (ESModules)');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
