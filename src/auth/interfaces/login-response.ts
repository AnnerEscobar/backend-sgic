import { User } from "../entities/auth.entity";



export interface loginResponse{

    user: User;
    token:string;
}