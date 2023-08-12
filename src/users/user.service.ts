import UserModel from "./user.model";
export interface UserCreationParams {
    username: string;
    email: string;
    password: string;
}

export class UsersService {
    public async create(userParams: UserCreationParams): Promise<any> {
        // Logic to create a new user and return the created user
        const newUser = new UserModel(userParams);
        return await newUser.save();
    }

    public async update(userId: string, userParams: UserCreationParams): Promise<any> {
        // Logic to update a user by userId and return the updated user
        const updatedUser = await UserModel.findByIdAndUpdate(userId, userParams, { new: true });
        return updatedUser;
    }

    public async delete(userId: string): Promise<void> {
        // Logic to delete a user by userId
        await UserModel.findByIdAndDelete(userId);
    }

    public async get(userId: string): Promise<any> {
        // Logic to get user by userId
        const user = await UserModel.findById(userId);
        return user;
    }
}
