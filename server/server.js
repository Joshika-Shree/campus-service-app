const express = require('express');
const cors = require('cors');
const requestRoutes = require('./routes/requests');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/requests', requestRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
