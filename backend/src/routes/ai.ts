import { Router, Request, Response } from 'express';
import { generateDSASteps } from '../services/geminiService';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await generateDSASteps(prompt);

        res.json(result);
    } catch (error: any) {
        console.error('Error generating DSA steps:', error);
        res.status(500).json({
            error: 'Failed to generate explanation',
            details: error.message
        });
    }
});

export default router;
