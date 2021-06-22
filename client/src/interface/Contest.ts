
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


export interface Contest {
  _id: string;
  title: string;
  description: string;
  price: number;
  start_date: Date | string;
  end_date: Date | string;
  creator: string;
  images: string[];
  submissions: string[];
}

export interface ContestFormState {
  title: {
    value: string;
    error: boolean;
  };
  description: {
    value: string;
    error: boolean;
  };
  prize: {
    value: number;
    error: boolean;
  };
  deadline: {
    value: string | Date;
    error: boolean;
  };

}
