import { z } from 'zod';

export const createProjectValidationSchema = z.object({
  body: z.object({
    order: z
      .number({
        invalid_type_error: 'Order must be a number',
      })
      .optional(),
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    overview: z.string({
      required_error: 'Overview is required',
      invalid_type_error: 'Overview must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    tech: z
      .array(
        z.string({
          required_error: 'Technology names are required',
          invalid_type_error: 'Technology names must be strings',
        }),
      )
      .nonempty('At least one technology is required'),
    live: z.string({
      required_error: 'Live URL is required',
      invalid_type_error: 'Live URL must be a string',
    }),
    githubClient: z.string({
      required_error: 'GitHub Client URL is required',
      invalid_type_error: 'GitHub Client URL must be a string',
    }),
    githubServer: z.string().optional(),
  }),
});

export const updateProjectValidationSchema = z.object({
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
      tech: z
        .array(
          z.string({
            required_error: 'Technology names are required',
            invalid_type_error: 'Technology names must be strings',
          }),
        )
        .optional(),
      live: z
        .string({
          required_error: 'Live URL is required',
          invalid_type_error: 'Live URL must be a string',
        })
        .optional(),
      githubClient: z
        .string({
          required_error: 'GitHub Client URL is required',
          invalid_type_error: 'GitHub Client URL must be a string',
        })
        .optional(),
      githubServer: z.string().optional(),
    })
    .refine(
      (data) => Object.values(data).some((value) => value !== undefined),
      { message: 'At least one field must be provided for update' },
    ),
});
