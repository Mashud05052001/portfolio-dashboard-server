import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TImageFile } from '../../interface/image.interface';
import { Blog } from './blogs.model';
import AppError from '../../errors/AppError';
import { TBlog } from './blogs.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const createBlog = catchAsync(async (req, res) => {
  const payload = req?.body as TBlog;
  const image = req?.file as TImageFile;
  const blogData = { ...payload, image: image?.path };
  if (!blogData?.order) {
    const totalProjectCount = await Blog.find().countDocuments();
    blogData['order'] = totalProjectCount + 1;
  }

  // const isSameOrderExist = await Blog.find({ order: blogData?.order });
  // if (isSameOrderExist) {
  //   const allOrderData = await Blog.find().select('order');
  //   const allOrders = allOrderData?.map((item) => item?.order).join(', ');
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //   );
  // }
  const result = await Blog.create(blogData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const query = req?.query;
  const isDeleted = req?.query?.isDeleted === 'true' ? true : false;
  const blogQuery = new QueryBuilder(Blog.find({ isDeleted }), query)
    .filter()
    .sort()
    .paginate();
  const meta = await blogQuery.countTotal();
  const result = await blogQuery.modelQuery;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Blogs are retrieved successfully',
    data: { result, meta },
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await Blog.findById(req?.params?.id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This blog is not found');
  } else if (result?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This blog is deleted. Retrieve it to see it again',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const img = req?.file as TImageFile;
  const payload = req?.body as Partial<TBlog>;
  const blogId = req.params?.id;

  const isExist = await Blog.findById(blogId);

  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This blog is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This blog is deleted. Retrieve it to update it again',
    );
  }

  // if (payload?.order && isExist?.order !== payload?.order) {
  //   const isSameOrderExist = await Blog.find({ order: payload?.order });
  //   if (isSameOrderExist) {
  //     const allOrderData = await Blog.find().select('order');
  //     const allOrders = allOrderData?.map((item) => item?.order).join(', ');

  //     throw new AppError(
  //       httpStatus.BAD_REQUEST,
  //       `This same order already exist. Please choose another instead of them [ ${allOrders} ]`,
  //     );
  //   }
  // }

  const updatedData: Partial<TBlog> = { ...payload };
  if (img && img!.path) {
    updatedData['image'] = img?.path;
  }

  const result = await Blog.findByIdAndUpdate(blogId, updatedData, {
    new: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req?.params?.id;
  const isExist = await Blog.findById(blogId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This blog is not found');
  } else if (isExist?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This blog is already deleted.');
  }
  const result = await Blog.findByIdAndUpdate(blogId, { isDeleted: true });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is deleted successfully',
    data: result,
  });
});

const retreivedBlog = catchAsync(async (req, res) => {
  const blogId = req?.params?.id;
  const isExist = await Blog.findById(blogId);
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This blog is not found');
  } else if (!isExist?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This blog is already available.',
    );
  }
  const result = await Blog.findByIdAndUpdate(blogId, { isDeleted: false });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retreived successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  retreivedBlog,
};
