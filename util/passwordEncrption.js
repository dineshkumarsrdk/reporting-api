import bcrypt from 'bcrypt';

export const hashPassword = async(password, next)=>{
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.log(error);
        next(new CustomError('Error while hashing password', 500));
    }
}

export const compareHashedPassword = async (password, hashedPassword, next) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log(error);
        next(new CustomError('Error while comparing passwords', 500))
    }
}