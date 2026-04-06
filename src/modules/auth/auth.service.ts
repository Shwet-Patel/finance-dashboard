import bcrypt from "bcryptjs";
import { AppError } from "@/utils/appError.util.js";
import { generateToken } from "@/utils/jwt.util.js";
import { LoginSchema } from "@/modules/auth/auth.validation.js";
import * as authRepository from "@/modules/auth/auth.repository.js";

export const loginService = async (data: LoginSchema) => {
    const { email, password } = data;

    // step-1 : find user
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw new AppError(404, "User not found");
    }

    // step-2 : check if it's active
    if (!user.isActive) {
        throw new AppError(400, "User is not active. please contact admin");
    }

    // step-3 : match passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError(401, "Invalid credentials");
    }

    // step-4 : generate tokens and return em.
    const accessToken = generateToken(
        {
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        { expiresIn: "1h" },
    );

    return {
        user: {
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        accessToken,
    };
}