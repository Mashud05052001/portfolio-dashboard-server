import config from '../config';
import { userRoles } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';
import { bcryptHelper } from './bcryptPassword';

export const seed = async () => {
  try {
    const admin = await User.findOne({
      role: userRoles?.Admin,
      email: config.admin_email,
    });
    if (!admin) {
      const hashedPassword = await bcryptHelper.createHashedPassword(
        config?.admin_password as string,
      );
      await User.create({
        name: 'Admin',
        role: userRoles?.Admin,
        email: config?.admin_email,
        password: hashedPassword,
      });
      console.log('Admin created successfully...');
      console.log('Seeding completed...');
    }
  } catch (error) {
    console.log('Error in seeding', error);
  }
};
