export interface User {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  phone: string;
  projects?: object;
  preorders?: object;
  orders?: object;
}
