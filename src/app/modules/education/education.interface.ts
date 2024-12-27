export type TEducation = {
  order: number;
  course: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
