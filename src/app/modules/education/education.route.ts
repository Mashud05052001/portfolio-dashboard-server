import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';

import auth from '../../middleware/auth';

import { EducationController } from './education.service';
import {
  createEducationValidationSchema,
  updateEducationValidationSchema,
} from './education.validation';

const router = Router();

router.post(
  '/',
  auth,
  validateRequest(createEducationValidationSchema),
  EducationController.createEducation,
);

router.get('/', EducationController.getAllEducation);
router.get('/:id', EducationController.getSingleEducation);
router.patch(
  '/:id',
  auth,
  validateRequest(updateEducationValidationSchema),
  EducationController.updateEducation,
);
router.delete('/:id', auth, EducationController.deleteEducation);
router.patch('/retreived/:id', auth, EducationController.retreivedEducation);

export const EducationRoutes = router;
