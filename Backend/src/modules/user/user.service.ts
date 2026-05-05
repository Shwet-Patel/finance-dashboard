import bcrypt from "bcryptjs";
import { AppError } from "@/utils/appError.util.js";
import { CreateUserSchema, UpdateUserSchema } from "@/modules/user/user.validation.js";
import * as userRepository from "@/modules/user/user.repository.js";
import { ListingInput } from "@/shared/listing.validation.js";

export const getUsersListService = async (query: ListingInput) => {
    const result = await userRepository.getUsersList(query);
    return result;
}

export const getUserByIdService = async (id: number) => {
    const data = await userRepository.getUserById(id);
    if (data.length === 0) {
        throw new AppError(404, "User not found");
    }

    const userWithoutPassword = { ...data[0], password: "" };
    return userWithoutPassword;
}

export const createUserService = async (data: CreateUserSchema, userId: number) => {
    // check for existing user by email.
    const existingUserByEmail = await userRepository.getUserByEmail(data.email);
    if (existingUserByEmail.length > 0) {
        throw new AppError(400, "User with given email already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // store the user
    const createdUser = await userRepository.createUser({ ...data, password: hashedPassword }, userId);
    return createdUser;
}

export const updateUserService = async (data: UpdateUserSchema, id: number, userId: number) => {
    // check for existing user by id
    const existingUserById = await userRepository.getUserById(id);
    if (existingUserById.length === 0) {
        throw new AppError(404, "User not found");
    }

    //hash the password if provided
    if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
    } else {
        data.password = existingUserById[0].password;
    }

    // update the user
    const updatedUser = await userRepository.updateUser(data, id, userId);
    return updatedUser;
}

export const deleteUserService = async (id: number, userId: number) => {
    // check for existing user by id
    const existingUserById = await userRepository.getUserById(id);
    if (existingUserById.length === 0) {
        throw new AppError(404, "User not found");
    }

    // delete the user
    const deletedUser = await userRepository.deleteUser(id, userId);
    return deletedUser;
}