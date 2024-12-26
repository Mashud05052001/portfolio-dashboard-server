import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  createBlogValidationSchema,
  updateBlogValidationSchema,
} from './blogs.validation';
import { BlogController } from './blogs.service';
import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
import validateImageFileRequest from '../../middleware/validateImageFileRequest';
import { ImageFileZodSchema } from '../../zod/image.validation';
import { parseBody } from '../../middleware/bodyParser';

const router = Router();

router.post(
  '/',
  auth,
  multerUpload.single('file'),
  validateImageFileRequest(ImageFileZodSchema, true),
  parseBody,
  validateRequest(createBlogValidationSchema),
  BlogController.createBlog,
);

router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getSingleBlog);
router.patch(
  '/:id',
  auth,
  multerUpload.single('file'),
  (req, res, next) => {
    if (req.file) {
      validateImageFileRequest(ImageFileZodSchema, true);
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateBlogValidationSchema, true),
  BlogController.updateBlog,
);
router.delete('/:id', auth, BlogController.deleteBlog);
router.patch('/retreived/:id', auth, BlogController.retreivedBlog);

export const BlogRoutes = router;
