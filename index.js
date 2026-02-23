require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const postRoutes = require('./routes/post_route');
const authRoutes = require('./routes/auth_route');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server jalan');
});

// ROUTES
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

// SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/uploads', express.static('uploads'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});