import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put, Query,
    Route, Tags,
} from "tsoa";
import { UsersService } from "./user.service";
import {UserCreationParams, UserLoginParams} from "./user.dto";

@Route("users")
@Tags("users")
export class UsersController extends Controller {
    private usersService: UsersService = new UsersService();

    @Get("{userId}")
    public async getUser(@Path() userId: string): Promise<any> {
        return await this.usersService.get(userId);
    }

    // @SuccessResponse("201", "Created")
    // @Post()
    // public async createUser(
    //     @Body() requestBody: UserCreationParams
    // ): Promise<any> {
    //     return await this.usersService.create(requestBody);
    // }

    @Post("register")
    public async register(
        @Body() requestBody: UserCreationParams
    ): Promise<any> {
        return await this.usersService.signup(requestBody);
    }

    @Post("login")
    public async login(
        @Body() requestBody: UserLoginParams
    ): Promise<any> {
        return await this.usersService.signin(requestBody);
    }

    @Put("{userId}")
    public async updateUser(
        @Path() userId: string,
        @Body() requestBody: UserCreationParams
    ): Promise<any> {
        return await this.usersService.update(userId, requestBody);
    }

    @Delete("{userId}")
    public async deleteUser(@Path() userId: string): Promise<void> {
        await this.usersService.delete(userId);
    }

    @Get("users/filter")
    public async filter(@Query() name: string): Promise<any> {
        console.log("dbrr")
        const filteredUsers = await this.usersService.filterUsers(name);
        return filteredUsers;
    }
}
