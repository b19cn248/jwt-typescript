import UserModel from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserCreationParams, UserLoginParams} from "./user.dto";

export class UsersService {

    private readonly JWT_SECRET = "your-secret-key";

    public async signup(signupParams: UserCreationParams): Promise<any> {
        const {username, email, role, password} = signupParams;

        // Mã hoá mật khẩu trước khi lưu vào database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            role,
            password: hashedPassword
        });

        const createdUser = await newUser.save();

        // Tạo access token và refresh token bằng JWT
        const accessToken = jwt.sign({username: createdUser.username}, this.JWT_SECRET, {expiresIn: "15m"});
        const refreshToken = jwt.sign({username: createdUser.username}, this.JWT_SECRET, {expiresIn: "7d"});

        return {
            username: createdUser.username,
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    public async signin(loginParams: UserLoginParams): Promise<any> {
        const {username, password} = loginParams;


        const user = await UserModel.findOne({username});

        if (!user) {
            return {error: "User not found"};
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {error: "Wrong password"};
        }

        // Tạo access token và refresh token bằng JWT
        const accessToken = jwt.sign({username: user.username}, this.JWT_SECRET, {expiresIn: "15m"});
        const refreshToken = jwt.sign({username: user.username}, this.JWT_SECRET, {expiresIn: "7d"});

        return {
            username: user.username,
            access_token: accessToken,
            refresh_token: refreshToken
        };

    }

    public async update(userId: string, userParams: UserCreationParams): Promise<any> {
        // Logic to update a user by userId and return the updated user
        const updatedUser = await UserModel.findByIdAndUpdate(userId, userParams, {new: true});
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

    public async filterUsers(name: string): Promise<any> {
        const filteredUsers = await UserModel.find({
            username: { $regex: new RegExp(name, 'i') }
        });
        console.log(filteredUsers);
        return filteredUsers;
    }


}
