import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Edit endpoint - coming in Phase 5' });
});

export default router;