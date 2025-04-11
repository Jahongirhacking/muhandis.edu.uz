export interface ITableProps<T> {
  count: number;
  results: T[];
}

export interface IExpert {
  id: 0;
  pinfl: string;
  document: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: number;
  birth_date: Date;
  phone_number: string;
  email: string;
  check_type: string;
}
