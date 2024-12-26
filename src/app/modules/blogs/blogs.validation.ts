import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  body: z.object({
    order: z.number({
      required_error: 'Order is required',
      invalid_type_error: 'Order must be a number',
    }),
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    category: z.string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    }),
    overview: z.string({
      required_error: 'Overview is required',
      invalid_type_error: 'Overview must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
  }),
});

export const updateBlogValidationSchema = z.object({
  body: z
    .object({
      order: z
        .number({
          required_error: 'Order is required',
          invalid_type_error: 'Order must be a number',
        })
        .optional(),
      title: z
        .string({
          required_error: 'Title is required',
          invalid_type_error: 'Title must be a string',
        })
        .optional(),
      category: z
        .string({
          required_error: 'Category is required',
          invalid_type_error: 'Category must be a string',
        })
        .optional(),
      overview: z
        .string({
          required_error: 'Overview is required',
          invalid_type_error: 'Overview must be a string',
        })
        .optional(),
      description: z
        .string({
          required_error: 'Description is required',
          invalid_type_error: 'Description must be a string',
        })
        .optional(),
    })
    .refine(
      (data) => Object.values(data).some((value) => value !== undefined),
      { message: 'At least one field must be provided for update' },
    ),
});
