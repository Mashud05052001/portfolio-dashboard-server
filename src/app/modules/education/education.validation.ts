import { z } from 'zod';

export const createEducationValidationSchema = z.object({
  body: z.object({
    order: z
      .number({
        invalid_type_error: 'Order must be a number',
      })
      .optional(),
    course: z.string({
      required_error: 'Company name is required',
      invalid_type_error: 'Company name must be a string',
    }),
    institution: z.string({
      required_error: 'Designation is required',
      invalid_type_error: 'Designation must be a string',
    }),
    location: z
      .string({
        invalid_type_error: 'Location must be a string',
      })
      .optional(),
    startDate: z.string({
      required_error: 'Start date is required',
      invalid_type_error: 'Start date must be a string',
    }),
    endDate: z
      .string({
        invalid_type_error: 'End date must be a string',
      })
      .nullable()
      .optional(),
  }),
});

export const updateEducationValidationSchema = z.object({
  body: z
    .object({
      order: z
        .number({
          invalid_type_error: 'Order must be a number',
        })
        .optional(),
      course: z.string({
        required_error: 'Company name is required',
        invalid_type_error: 'Company name must be a string',
      }),
      institution: z.string({
        required_error: 'Designation is required',
        invalid_type_error: 'Designation must be a string',
      }),
      location: z
        .string({
          invalid_type_error: 'Location must be a string',
        })
        .optional(),
      startDate: z.string({
        required_error: 'Start date is required',
        invalid_type_error: 'Start date must be a string',
      }),
      endDate: z
        .string({
          invalid_type_error: 'End date must be a string',
        })
        .nullable()
        .optional(),
    })
    .refine(
      (data) => Object.values(data).some((value) => value !== undefined),
      { message: 'At least one field must be provided for update' },
    ),
});
