import express from 'express';
import { body, validationResult } from 'express-validator';
import { Contact } from '../models/Contact.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { sendContactNotifications } from '../config/mailer.js';

const router = express.Router();

const validServices = [
  'Mobile App Development',
  'Website Development',
  'CMS & No-Code',
  'AI Integration',
  'UI/UX Design',
  'Graphic Design',
];

const validBudgets = [
  'Under $2,000',
  '$2,000-$5,000',
  '$5,000-$10,000',
  '$10,000-$25,000',
  '$25,000+',
  'Not sure yet',
];

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }).escape(),
    body('email').trim().isEmail().withMessage('Valid email address is required').normalizeEmail(),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 30 }).escape(),
    body('service').isIn(validServices).withMessage('Please select a valid service'),
    body('budget').isIn(validBudgets).withMessage('Please select a valid budget range'),
    body('message').trim().notEmpty().withMessage('Project details cannot be empty').isLength({ min: 10 }).withMessage('Please share at least a few details (min 10 characters)'),
    body('preferredDateTime').optional({ checkFalsy: true }).trim().escape(),
    body('_honey').optional(),
  ],
  async (req, res, next) => {
    try {
      // Check honeypot
      if (req.body._honey) {
        // Silently accept bots without saving
        return res.status(200).json({
          success: true,
          message: 'Thank you! We received your message.',
        });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
          })),
        });
      }

      const { name, email, phone, service, budget, message, preferredDateTime } = req.body;
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';

      const contact = await Contact.create({
        name,
        email,
        phone: phone || '',
        service,
        budget,
        message,
        preferredDateTime: preferredDateTime || '',
        ipAddress,
      });

      // Send emails asynchronously
      sendContactNotifications(contact).catch((err) =>
        console.error('[Contact Route] Mail error:', err.message)
      );

      return res.status(201).json({
        success: true,
        message: 'Your quote request has been received. Our team will review your project and get back to you within 24 hours!',
        data: {
          id: contact._id,
          name: contact.name,
          service: contact.service,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

