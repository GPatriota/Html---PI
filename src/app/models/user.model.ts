export interface User {
  username: string;
  email: string;
  cpf: string;
  birthDate: string;
  password: string;
  confirmPassword?: string;  
  isAdmin: boolean;
}
