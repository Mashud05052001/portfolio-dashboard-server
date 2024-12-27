export type TExperience = {
  order: number;
  company: string;
  designation: string;
  description?: string;
  location?: string;
  technologies?: string[];
  startDate: string;
  endDate?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
