import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
import validateImageFileRequest from '../../middleware/validateImageFileRequest';
import { ImageFileZodSchema } from '../../zod/image.validation';
import { parseBody } from '../../middleware/bodyParser';
import {
  createSkillValidationSchema,
  updateSkillValidationSchema,
} from './skill.validation';
import { SkillController } from './skill.service';

const router = Router();

router.post(
  '/',
  auth,
  multerUpload.single('file'),
  validateImageFileRequest(ImageFileZodSchema, true),
  parseBody,
  validateRequest(createSkillValidationSchema),
  SkillController.createSkill,
);

router.get('/', SkillController.getAllSkills);
router.get('/:id', SkillController.getSingleSkill);
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
  validateRequest(updateSkillValidationSchema, true),
  SkillController.updateSkill,
);
router.delete('/:id', auth, SkillController.deleteSkill);
router.patch('/retreived/:id', auth, SkillController.retreivedSkill);

export const SkillRoutes = router;
