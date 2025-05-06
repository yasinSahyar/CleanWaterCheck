const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// Water quality reports routes
app.get('/api/reports', async (req, res) => {
  res.json({ message: 'CORS enabled and backend is running.' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 