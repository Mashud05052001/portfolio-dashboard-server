import { z } from 'zod';

export const createSkillValidationSchema = z.object({
  body: z.object({
    order: z
      .number({
        invalid_type_error: 'Order must be a number',
      })
      .optional(),
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
  }),
});

export const updateSkillValidationSchema = z.object({
  body: z
    .object({
      order: z
        .number({
          required_error: 'Order must be a number',
          invalid_type_error: 'Order must be a number',
        })
        .optional(),
      name: z
        .string({
          required_error: 'Name must be a string',
          invalid_type_error: 'Name must be a string',
        })
        .optional(),
    })
    .refine(
      (data) => Object.values(data).some((value) => value !== undefined),
      { message: 'At least one field must be provided for update' },
    ),
});
