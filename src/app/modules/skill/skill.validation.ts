import { z } from 'zod';

export const createSkillValidationSchema = z.object({
  body: z.object({
    order: z.number({
      required_error: 'Order is required',
      invalid_type_error: 'Order must be a number',
    }),
    image: z.string({
      required_error: 'Image is required',
      invalid_type_error: 'Image must be a string (URL)',
    }),
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    isDeleted: z.boolean({
      required_error: 'isDeleted status is required',
      invalid_type_error: 'isDeleted must be a boolean',
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
      image: z
        .string({
          required_error: 'Image must be a string (URL)',
          invalid_type_error: 'Image must be a string (URL)',
        })
        .optional(),
      name: z
        .string({
          required_error: 'Name must be a string',
          invalid_type_error: 'Name must be a string',
        })
        .optional(),
      isDeleted: z
        .boolean({
          required_error: 'isDeleted must be a boolean',
          invalid_type_error: 'isDeleted must be a boolean',
        })
        .optional(),
    })
    .refine(
      (data) => Object.values(data).some((value) => value !== undefined),
      { message: 'At least one field must be provided for update' },
    ),
});
