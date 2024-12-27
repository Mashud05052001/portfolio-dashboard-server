import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';

import auth from '../../middleware/auth';
import { ExperienceController } from './experience.service';
import {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
} from './experience.validation';

const router = Router();

router.post(
  '/',
  auth,
  validateRequest(createExperienceValidationSchema),
  ExperienceController.createExperience,
);

router.get('/', ExperienceController.getAllExperience);
router.get('/:id', ExperienceController.getSingleExperience);
router.patch(
  '/:id',
  auth,
  validateRequest(updateExperienceValidationSchema),
  ExperienceController.updateExperience,
);
router.delete('/:id', auth, ExperienceController.deleteExperience);
router.patch('/retreived/:id', auth, ExperienceController.retreivedExperience);

export const ExperienceRoutes = router;
