import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
            name: z
                .string({ error : "Name must be string" })
                .min(2, { message: "Name too short. Minimum 2 charecter long" })
                .max(50, { message: "Name cannot exceed 50 charecters" }),
            email: z
                .string({error: 'Email must be string '})
                .email({message: 'Invalid email address format'})
                .min(5, {message: 'Email must be 5 charecters long'})
                .max(100, {message: 'Email cannot exceed 100 charecters'}),
            password: z
                .string({error: 'Password must be string'})
                .min(8, {message: 'Password must be 8 charecters long'})
                .regex(/^(?=.*[A-Z])/, {message: "Password must contain at least 1 uppercase letter"})
                .regex(/^(?=.*[@$!%*?&])/, {message: "Password must contain at least 1 special charecter"})
                .regex(/^(.*\d+.*)/, {message: "Password must contain at least 1 number"}),
            phone: z
                .string()
                .regex(/^(?:(?:\+|00)88|01)?\d{11}$/, 'Phone must be bangladeshi number')
                .optional(),
            address: z
                .string({error: 'Address must be string'})
                .max(200, {message: 'Address cannot exceed 200 charecters'})
                .optional()
        });
        
export const updateUserZodSchema = z.object({
            name: z
                .string({ error : "Name must be string" })
                .min(2, { message: "Name too short. Minimum 2 charecter long" })
                .max(50, { message: "Name cannot exceed 50 charecters" })
                .optional(),
            password: z
                .string({error: 'Password must be string'})
                .min(8, {message: 'Password must be 8 charecters long'})
                .regex(/^(?=.*[A-Z])/, {message: "Password must contain at least 1 uppercase letter"})
                .regex(/^(?=.*[@$!%*?&])/, {message: "Password must contain at least 1 special charecter"})
                .regex(/^(.*\d+.*)/, {message: "Password must contain at least 1 number"})
                .optional(),
            phone: z
                .string()
                .regex(/^(?:(?:\+|00)88|01)?\d{11}$/, 'Phone must be bangladeshi number')
                .optional(),
            address: z
                .string({error: 'Address must be string'})
                .max(200, {message: 'Address cannot exceed 200 charecters'})
                .optional(),
            role: z 
                .enum(Object.values(Role) as [string])
                .optional(),
            isActive: z 
                .enum(Object.values(IsActive) as [string])
                .optional(),
            isDeleted: z
                .boolean({error: 'isDeleted must be true or fasle'})
                .optional(),
            isVerified: z
                .boolean({error: 'isVerified must be true or false'})
                .optional(),
        });