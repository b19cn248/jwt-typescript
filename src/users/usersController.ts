import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Route,
    SuccessResponse,
} from "tsoa";
import { UsersService, UserCreationParams } from "./user.service";

@Route("users")
export class UsersController extends Controller {
    private usersService: UsersService = new UsersService();

    @Get("{userId}")
    public async getUser(@Path() userId: string): Promise<any> {
        return await this.usersService.get(userId);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<any> {
        return await this.usersService.create(requestBody);
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
}
