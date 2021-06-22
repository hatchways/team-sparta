export interface Contest {
  _id: string;
  title: string;
  description: string;
  price: number;
  start_date: Date | string;
  end_date: Date | string;
  creator: string;
  images: string[];
  submissions?: [
    {
      _id: string;
      files: string[];
      creator: string;
    },
  ];
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
