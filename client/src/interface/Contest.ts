
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

export interface Contest {
  contestId: string;
  title: string;
  description: string;
  price: number;
  start_date: Date | string;
  end_date: Date | string;
  creator: string;
  images: string[];
  submissions: string[];

}
