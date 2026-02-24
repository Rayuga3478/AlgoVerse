import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'AlgoVerse Backend is running!' });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
