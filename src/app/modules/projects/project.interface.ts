export type TProject = {
  order: number;
  title: string;
  overview: string;
  description: string;
  image: string;
  tech: string[];
  live: string;
  githubClient: string;
  githubServer?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
