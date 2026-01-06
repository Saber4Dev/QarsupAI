/**
 * Input Validation Schemas
 * 
 * OWASP Best Practices:
 * - Schema-based validation with strict type checking
 * - Length limits to prevent DoS attacks
 * - Sanitization of user inputs
 * - Reject unexpected fields
 */

import { z } from 'zod';

/**
 * Email validation schema
 * - Validates email format
 * - Enforces length limits (max 254 chars per RFC 5321)
 * - Trims whitespace
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(254, 'Email must be less than 254 characters')
  .email('Invalid email format')
  .trim()
  .toLowerCase();

/**
 * Password validation schema
 * - Minimum 8 characters (OWASP recommendation)
 * - Maximum 128 characters (prevent DoS)
 * - Must contain at least one letter and one number
 * - No whitespace allowed
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .refine((val) => !/\s/.test(val), 'Password cannot contain spaces');

/**
 * Login form schema
 * - Strict validation: only expected fields allowed
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required').max(128),
}).strict(); // Reject unexpected fields

/**
 * Signup form schema
 * - Strict validation: only expected fields allowed
 */
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
}).strict(); // Reject unexpected fields

/**
 * Contact form schema
 * - Name: 1-100 characters, alphanumeric + spaces/hyphens
 * - Email: validated email format
 * - Subject: 1-200 characters
 * - Message: 1-5000 characters (prevent DoS)
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-'\.]+$/, 'Name contains invalid characters')
    .trim(),
  email: emailSchema,
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters')
    .trim(),
  comments: z
    .string()
    .min(1, 'Message is required')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
}).strict();

/**
 * Reset password schema
 * - Only email required
 */
export const resetPasswordSchema = z.object({
  email: emailSchema,
}).strict();

/**
 * Sanitize string input
 * - Removes potentially dangerous characters
 * - Trims whitespace
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Sanitize email
 * - Lowercase and trim
 */
export function sanitizeEmail(input: string): string {
  return emailSchema.parse(input);
}

