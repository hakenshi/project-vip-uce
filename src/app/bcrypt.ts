import bcrypt from 'bcrypt';

export const saltAndEncrypt = async (password:string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    catch (error) {
        console.error(error);
    }
};