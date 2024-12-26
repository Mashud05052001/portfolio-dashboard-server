import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
import validateImageFileRequest from '../../middleware/validateImageFileRequest';
import { ImageFileZodSchema } from '../../zod/image.validation';
import { parseBody } from '../../middleware/bodyParser';
import {
  createProjectValidationSchema,
  updateProjectValidationSchema,
} from './project.validation';
import { ProjectController } from './project.service';

const router = Router();

router.post(
  '/',
  auth,
  multerUpload.single('file'),
  validateImageFileRequest(ImageFileZodSchema, true),
  parseBody,
  validateRequest(createProjectValidationSchema),
  ProjectController.createProject,
);

router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getSingleProject);
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
  validateRequest(updateProjectValidationSchema, true),
  ProjectController.updateProject,
);
router.delete('/:id', auth, ProjectController.deleteProject);
router.patch('/retreived/:id', auth, ProjectController.retreivedProject);

export const ProjectRoutes = router;
