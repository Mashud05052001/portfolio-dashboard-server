import { Router } from 'express';
import { AuthRoutes } from '../modules/user/user.route_controller_service';
import { BlogRoutes } from '../modules/blogs/blogs.route';
import { ProjectRoutes } from '../modules/projects/project.route';
import { SkillRoutes } from '../modules/skill/skill.route';
import { ExperienceRoutes } from '../modules/experience/experience.route';
import { EducationRoutes } from '../modules/education/education.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', element: AuthRoutes },
  { path: '/blog', element: BlogRoutes },
  { path: '/project', element: ProjectRoutes },
  { path: '/skill', element: SkillRoutes },
  { path: '/experience', element: ExperienceRoutes },
  { path: '/education', element: EducationRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.element));

export const AllRoutes = router;
