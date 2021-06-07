export interface IContestFields {
  title: string;
  description: string;
  prize: number;
  deadline: Date | string;
  images: string[];
}

export interface IContestErrors {
  title: boolean;
  description: boolean;
  prize: boolean;
  deadline: boolean;
}
