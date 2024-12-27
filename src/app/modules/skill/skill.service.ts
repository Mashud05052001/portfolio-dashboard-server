import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TImageFile } from '../../interface/image.interface';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TSkillData } from './skill.interface';
import { Skill } from './skill.model';

const createSkill = catchAsync(async (req, res) => {
  const payload = req?.body as TSkillData;
  const image = req?.file as TImageFile;
  const skillData = { ...payload, image: image?.path };
  if (!skillData?.order) {
    const totalSkillCount = await Skill.find().countDocuments();
    skillData['order'] = totalSkillCount + 1;
  }

  const result = await Skill.create(skillData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is created successfully',
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const query = req?.query;
  const isDeleted = req?.query?.isDeleted === 'true' ? true : false;
  const skillQuery = new QueryBuilder(Skill.find({ isDeleted }), query)
    .filter()
    .sort()
    .paginate();
  const meta = await skillQuery.countTotal();
  const data = await skillQuery.modelQuery;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All skills are retrieved successfully',
    data: { data, meta },
  });
});

const getSingleSkill = catchAsync(async (req, res) => {
  const result = await Skill.findById(req?.params?.id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This skill is not found');
  } else if (result?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This skill is deleted. Retrieve it to see it again',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is retrieved successfully',
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const img = req?.file as TImageFile;
  const payload = req?.body as Partial<TSkillData>;
  const skillId = req.params?.id;

  const isExist = await Skill.findById(skillId);

  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This skill is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This skill is deleted. Retrieve it to update it again',
    );
  }

  //   if (payload?.order && isExist?.order !== payload?.order) {
  //     const isSameOrderExist = await Skill.find({ order: payload?.order });
  //     if (isSameOrderExist) {
  //       const allOrderData = await Skill.find().select('order');
  //       const allOrders = allOrderData?.map((item) => item?.order).join(', ');

  //       throw new AppError(
  //         httpStatus.BAD_REQUEST,
  //         `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //       );
  //     }
  //   }

  const updatedData: Partial<TSkillData> = { ...payload };
  if (img && img!.path) {
    updatedData['image'] = img?.path;
  }

  const result = await Skill.findByIdAndUpdate(skillId, updatedData, {
    new: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is updated successfully',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const skillId = req?.params?.id;
  const isExist = await Skill.findById(skillId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This skill is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This skill is already deleted.',
    );
  }
  const result = await Skill.findByIdAndUpdate(skillId, {
    isDeleted: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is deleted successfully',
    data: result,
  });
});

const retreivedSkill = catchAsync(async (req, res) => {
  const skillId = req?.params?.id;
  const isExist = await Skill.findById(skillId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This skill is not found');
  } else if (!isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This skill is already available.',
    );
  }
  const result = await Skill.findByIdAndUpdate(skillId, {
    isDeleted: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is retreived successfully',
    data: result,
  });
});

export const SkillController = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
  retreivedSkill,
};
