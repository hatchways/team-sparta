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
