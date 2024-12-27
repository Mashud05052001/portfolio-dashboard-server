import cors from 'cors';
import httpStatus from 'http-status';
// import { AllRoutes } from './app/routes';
import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { AllRoutes } from './app/routes';

const app: Application = express();

// parser
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://mashuds-portfolio-dashboard.vercel.app',
      'https://mashud.vercel.app',
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: `🔥 Welcome to the Mashud's Portfolio API`,
  });
});

app.use('/api', AllRoutes);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
