const express = require('express'); // Corrige el typo
const corsMiddleware = require('./middlewares/corsMiddleware');
const dotenv = require('dotenv');

// Configura las variables de entorno
dotenv.config();

// Inicializa express
const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Importa las rutas
const authRoutes = require('./routes/authRoutes');

// Base route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});