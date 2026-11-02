import express from 'express';
import { body, validationResult } from 'express-validator';
import { Subscriber } from '../models/Subscriber.js';
import { newsletterLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/',
  newsletterLimiter,
  [
    body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { email } = req.body;
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';

      const existing = await Subscriber.findOne({ email });
      if (existing) {
        return res.status(200).json({
          success: true,
          alreadySubscribed: true,
          message: 'You are already subscribed to the TenzoAds newsletter!',
        });
      }

      await Subscriber.create({ email, ipAddress });

      return res.status(201).json({
        success: true,
        message: 'Thank you for subscribing! You will receive our monthly engineering insights.',
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(200).json({
          success: true,
          alreadySubscribed: true,
          message: 'You are already subscribed to the TenzoAds newsletter!',
        });
      }
      next(err);
    }
  }
);

export default router;

