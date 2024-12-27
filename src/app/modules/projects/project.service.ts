import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TImageFile } from '../../interface/image.interface';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TProject } from './project.interface';
import { Project } from './project.model';

const createProject = catchAsync(async (req, res) => {
  const payload = req?.body as TProject;
  const image = req?.file as TImageFile;
  const projectData = { ...payload, image: image?.path };
  if (!projectData?.order) {
    const totalProjectCount = await Project.find().countDocuments();
    projectData['order'] = totalProjectCount + 1;
  }

  const result = await Project.create(projectData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is created successfully',
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const query = req?.query;
  const isDeleted = req?.query?.isDeleted === 'true' ? true : false;
  const projectQuery = new QueryBuilder(Project.find({ isDeleted }), query)
    .filter()
    .sort()
    .paginate();
  const meta = await projectQuery.countTotal();
  const data = await projectQuery.modelQuery;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All projects are retrieved successfully',
    data: { data, meta },
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const result = await Project.findById(req?.params?.id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Project is not found');
  } else if (result?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This project is deleted. Retrieve it to see it again',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is retrieved successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const img = req?.file as TImageFile;
  const payload = req?.body as Partial<TProject>;
  const projectId = req.params?.id;

  const isExist = await Project.findById(projectId);

  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This project is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This project is deleted. Retrieve it to update it again',
    );
  }

  //   if (payload?.order && isExist?.order !== payload?.order) {
  //     const isSameOrderExist = await Project.find({ order: payload?.order });
  //     if (isSameOrderExist) {
  //       const allOrderData = await Project.find().select('order');
  //       const allOrders = allOrderData?.map((item) => item?.order).join(', ');

  //       throw new AppError(
  //         httpStatus.BAD_REQUEST,
  //         `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //       );
  //     }
  //   }

  const updatedData: Partial<TProject> = { ...payload };
  if (img && img!.path) {
    updatedData['image'] = img?.path;
  }

  const result = await Project.findByIdAndUpdate(projectId, updatedData, {
    new: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const projectId = req?.params?.id;
  const isExist = await Project.findById(projectId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This project is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This project is already deleted.',
    );
  }
  const result = await Project.findByIdAndUpdate(projectId, {
    isDeleted: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is deleted successfully',
    data: result,
  });
});

const retreivedProject = catchAsync(async (req, res) => {
  const projectId = req?.params?.id;
  const isExist = await Project.findById(projectId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This project is not found');
  } else if (!isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This project is already available.',
    );
  }
  const result = await Project.findByIdAndUpdate(projectId, {
    isDeleted: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is retreived successfully',
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  retreivedProject,
};
