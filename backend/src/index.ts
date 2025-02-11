import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Example API endpoint
app.get('/api/health', (req, res) => {
  res.send({ status: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
