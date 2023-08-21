import {
    Body,
    Controller,
    Post,
    Route, Tags,
} from "tsoa";
import {BookService} from "./book.service";
@Route("books")
@Tags("books")
export class BookController extends Controller {
    private bookService: BookService = new BookService();

    @Post()
    public async createBook(@Body() requestBody: { title: string; author: string }): Promise<any> {
        try {
            const newBook = await this.bookService.create(requestBody);
            return newBook.toJSON();
        } catch (error) {

        }
    }
}
