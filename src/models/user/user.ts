export interface User {
  uid: string;
  displayName?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  company?: string;
  phone?: string;
  projects?: string[];
  preorders?: string[];
  orders?: string[];
}
