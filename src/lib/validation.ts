import {z} from "zod";

export const UserSchema = z.object({
    image: z.instanceof(File)
        .optional()
        .refine((file) => {
            if (file && file?.size <= 0){
                return true
            }
            if (file && file.size > 0){
                const validMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
                return validMimeTypes.includes(file.type);
            }
        }, "A imagem precisa ter um formato válido: png, jpeg, jpg")
        .refine((file) =>{
            if(file && file.size <= 0) {
                return true
            }

            if (file && file.size > 0){
                return file.size <= 2 * Math.pow(1024, 2)
            }

        }, 'O arquivo deve ter no máximo 2MB')
    ,
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.string().email('Email inválido.').min(1, 'O email é obrigatório'),
    password: z.string().min(3, 'A senha deve ter ao menos 3 caracteres'),
})

export type UserValidation = z.infer<typeof UserSchema>

export const UserEditSchema = z.object({
    image: z.instanceof(File)
        .optional()
        .refine((file) => {
            if (file && file.size <= 0){
                return true;
            }
            if (file && file.size > 0){
                const validMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
                return validMimeTypes.includes(file.type);
            }
        }, "A imagem precisa ter um formato válido: png, jpeg, jpg")
        .refine((file) =>{
            if(file && file.size <= 0) {
                return true;
            }
            if (file && file.size > 0){
                return file.size <= 2 * Math.pow(1024, 2);
            }
        }, 'O arquivo deve ter no máximo 2MB'),
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.string().email('Email inválido.').min(1, 'O email é obrigatório'),
    password: z.string().optional()
});

export const ActivitySchema = z.object({
    title: z.string().min(1, 'O título é obrigatório'),
    description: z.string().min(1, "A descrição é obrigatória."),
    file: z.instanceof(File).optional(),
})

export type UserEditValidation = z.infer<typeof UserEditSchema>;
