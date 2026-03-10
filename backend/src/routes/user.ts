import { Router } from 'express';
import User from '../models/User';

const router = Router();

// Sync user from Firebase to MongoDB
router.post('/sync', async (req, res) => {
    try {
        const { firebaseUid, email, name } = req.body;

        if (!firebaseUid || !email) {
            res.status(400).json({ error: 'firebaseUid and email are required' });
            return;
        }

        // Find existing user or create a new one
        let user = await User.findOne({ firebaseUid });

        if (!user) {
            user = await User.create({
                firebaseUid,
                email,
                name: name || 'User',
            });
        }

        res.status(200).json(user);
    } catch (error: any) {
        console.error('Error syncing user:', error);
        res.status(500).json({ error: 'Failed to sync user', details: error.message });
    }
});

// Append a search to the user's history
router.post('/history', async (req, res) => {
    try {
        const { firebaseUid, prompt } = req.body;

        if (!firebaseUid || !prompt) {
            res.status(400).json({ error: 'firebaseUid and prompt are required' });
            return;
        }

        const user = await User.findOneAndUpdate(
            { firebaseUid },
            {
                $push: {
                    searchHistory: {
                        $each: [{ prompt, timestamp: new Date() }],
                        $slice: -100 // Keep only last 100 searches
                    }
                }
            },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating history:', error);
        res.status(500).json({ error: 'Failed to update history' });
    }
});

// Update user profile (name and avatarUrl)
router.post('/update', async (req, res) => {
    try {
        const { firebaseUid, name, avatarUrl } = req.body;

        if (!firebaseUid) {
            res.status(400).json({ error: 'firebaseUid is required' });
            return;
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (avatarUrl) updateData.avatarUrl = avatarUrl; // we will accept base64 or straight URLs

        const user = await User.findOneAndUpdate(
            { firebaseUid },
            { $set: updateData },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Failed to update user profile' });
    }
});

// Delete a specific search history item
router.delete('/history', async (req, res) => {
    try {
        const { firebaseUid, timestamp } = req.body;

        if (!firebaseUid || !timestamp) {
            res.status(400).json({ error: 'firebaseUid and timestamp are required' });
            return;
        }

        const user = await User.findOneAndUpdate(
            { firebaseUid },
            {
                $pull: {
                    searchHistory: { timestamp: new Date(timestamp) }
                }
            },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error deleting history item:', error);
        res.status(500).json({ error: 'Failed to delete history item' });
    }
});

export default router;
