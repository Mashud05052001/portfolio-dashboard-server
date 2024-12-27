import { z } from 'zod';

export const createExperienceValidationSchema = z.object({
  body: z.object({
    order: z
      .number({
        invalid_type_error: 'Order must be a number',
      })
      .optional(),
    company: z.string({
      required_error: 'Company name is required',
      invalid_type_error: 'Company name must be a string',
    }),
    designation: z.string({
      required_error: 'Designation is required',
      invalid_type_error: 'Designation must be a string',
    }),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    location: z
      .string({
        invalid_type_error: 'Location must be a string',
      })
      .optional(),
    technologies: z
      .array(
        z.string({
          required_error: 'Technology name is required',
          invalid_type_error: 'Technology name must be a string',
        }),
      )
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

export const updateExperienceValidationSchema = z.object({
  body: z
    .object({
      company: z
        .string({
          invalid_type_error: 'Company name must be a string',
        })
        .optional(),
      designation: z
        .string({
          invalid_type_error: 'Designation must be a string',
        })
        .optional(),
      description: z
        .string({
          invalid_type_error: 'Description must be a string',
        })
        .optional(),
      location: z
        .string({
          invalid_type_error: 'Location must be a string',
        })
        .optional(),
      technologies: z
        .array(
          z.string({
            required_error: 'Technology name is required',
            invalid_type_error: 'Technology name must be a string',
          }),
        )
        .optional(),
      startDate: z
        .string({
          invalid_type_error: 'Start date must be a string',
        })
        .optional(),
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
