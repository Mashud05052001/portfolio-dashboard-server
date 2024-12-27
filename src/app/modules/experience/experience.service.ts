import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TExperience } from './experience.interface';
import { Experience } from './experience.model';

const createExperience = catchAsync(async (req, res) => {
  const payload = req?.body as TExperience;
  const experienceData = { ...payload };
  if (!experienceData?.order) {
    const totalProjectCount = await Experience.find().countDocuments();
    experienceData['order'] = totalProjectCount + 1;
  }

  // const isSameOrderExist = await Experience.find({ order: experienceData?.order });
  // if (isSameOrderExist) {
  //   const allOrderData = await Experience.find().select('order');
  //   const allOrders = allOrderData?.map((item) => item?.order).join(', ');
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //   );
  // }
  const result = await Experience.create(experienceData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is created successfully',
    data: result,
  });
});

const getAllExperience = catchAsync(async (req, res) => {
  const query = req?.query;
  const isDeleted = req?.query?.isDeleted === 'true' ? true : false;
  const experienceQuery = new QueryBuilder(
    Experience.find({ isDeleted }),
    query,
  )
    .filter()
    .sort()
    .paginate();
  const meta = await experienceQuery.countTotal();
  const data = await experienceQuery.modelQuery;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All experiencies are retrieved successfully',
    data: { data, meta },
  });
});

const getSingleExperience = catchAsync(async (req, res) => {
  const result = await Experience.findById(req?.params?.id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This experience is not found');
  } else if (result?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This experience is deleted. Retrieve it to see it again',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is retrieved successfully',
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const payload = req?.body as Partial<TExperience>;
  const experienceId = req.params?.id;
  const isExist = await Experience.findById(experienceId);

  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This experience is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This experience is deleted. Retrieve it to update it again',
    );
  }

  // if (payload?.order && isExist?.order !== payload?.order) {
  //   const isSameOrderExist = await Experience.find({ order: payload?.order });
  //   if (isSameOrderExist) {
  //     const allOrderData = await Experience.find().select('order');
  //     const allOrders = allOrderData?.map((item) => item?.order).join(', ');

  //     throw new AppError(
  //       httpStatus.BAD_REQUEST,
  //       `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //     );
  //   }
  // }

  const updatedData: Partial<TExperience> = { ...payload };

  const result = await Experience.findByIdAndUpdate(experienceId, updatedData, {
    new: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is updated successfully',
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const experienceId = req?.params?.id;
  const isExist = await Experience.findById(experienceId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This experience is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This experience is already deleted.',
    );
  }
  const result = await Experience.findByIdAndUpdate(experienceId, {
    isDeleted: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is deleted successfully',
    data: result,
  });
});

const retreivedExperience = catchAsync(async (req, res) => {
  const experienceId = req?.params?.id;
  const isExist = await Experience.findById(experienceId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This experience is not found');
  } else if (!isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This experience is already available.',
    );
  }
  const result = await Experience.findByIdAndUpdate(experienceId, {
    isDeleted: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is retreived successfully',
    data: result,
  });
});

export const ExperienceController = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience,
  retreivedExperience,
};
