import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TEducation } from './education.interface';
import { Education } from './education.model';

const createEducation = catchAsync(async (req, res) => {
  const payload = req?.body as TEducation;
  const educationData = { ...payload };
  if (!educationData?.order) {
    const totalProjectCount = await Education.find().countDocuments();
    educationData['order'] = totalProjectCount + 1;
  }

  // const isSameOrderExist = await Education.find({ order: educationData?.order });
  // if (isSameOrderExist) {
  //   const allOrderData = await Education.find().select('order');
  //   const allOrders = allOrderData?.map((item) => item?.order).join(', ');
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //   );
  // }
  const result = await Education.create(educationData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education is created successfully',
    data: result,
  });
});

const getAllEducation = catchAsync(async (req, res) => {
  const query = req?.query;
  const isDeleted = req?.query?.isDeleted === 'true' ? true : false;
  const educationQuery = new QueryBuilder(Education.find({ isDeleted }), query)
    .filter()
    .sort()
    .paginate();
  const meta = await educationQuery.countTotal();
  const data = await educationQuery.modelQuery;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All educations are retrieved successfully',
    data: { data, meta },
  });
});

const getSingleEducation = catchAsync(async (req, res) => {
  const result = await Education.findById(req?.params?.id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This education is not found');
  } else if (result?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This education is deleted. Retrieve it to see it again',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education is retrieved successfully',
    data: result,
  });
});

const updateEducation = catchAsync(async (req, res) => {
  const payload = req?.body as Partial<TEducation>;
  const educationId = req.params?.id;
  const isExist = await Education.findById(educationId);

  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This education is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This education is deleted. Retrieve it to update it again',
    );
  }

  // if (payload?.order && isExist?.order !== payload?.order) {
  //   const isSameOrderExist = await Education.find({ order: payload?.order });
  //   if (isSameOrderExist) {
  //     const allOrderData = await Education.find().select('order');
  //     const allOrders = allOrderData?.map((item) => item?.order).join(', ');

  //     throw new AppError(
  //       httpStatus.BAD_REQUEST,
  //       `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //     );
  //   }
  // }

  const updatedData: Partial<TEducation> = { ...payload };

  const result = await Education.findByIdAndUpdate(educationId, updatedData, {
    new: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education is updated successfully',
    data: result,
  });
});

const deleteEducation = catchAsync(async (req, res) => {
  const educationId = req?.params?.id;
  const isExist = await Education.findById(educationId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This education is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This education is already deleted.',
    );
  }
  const result = await Education.findByIdAndUpdate(educationId, {
    isDeleted: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education is deleted successfully',
    data: result,
  });
});

const retreivedEducation = catchAsync(async (req, res) => {
  const educationId = req?.params?.id;
  const isExist = await Education.findById(educationId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This education is not found');
  } else if (!isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This education is already available.',
    );
  }
  const result = await Education.findByIdAndUpdate(educationId, {
    isDeleted: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education is retreived successfully',
    data: result,
  });
});

export const EducationController = {
  createEducation,
  getAllEducation,
  getSingleEducation,
  updateEducation,
  deleteEducation,
  retreivedEducation,
};
