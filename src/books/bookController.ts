import {
    Body,
    Controller, Delete, Get, Path,
    Post, Put,
    Route, Tags,
} from "tsoa";
import {BookService} from "./book.service";
import {BookRequest} from "./book.type";
import {failedResponse, successResponse} from "../exception/base.exception";
import {BOOK_NOT_FOUND} from "../constant/book.message";
import {INTERNAL_SERVER_ERROR, SUCCESS} from "../constant/common.message";
@Route("books")
@Tags("books")
export class BookController extends Controller {
    private bookService: BookService = new BookService();

    /**
     * Handles HTTP POST requests to create a new book.
     *
     * @param requestBody - The request body containing book data.
     * @returns A Promise that resolves to the newly created book's JSON representation if successful.
     * @throws Any errors encountered during the book creation process.
     */
    @Post()
    public async create(@Body() requestBody: BookRequest): Promise<any> {
        try {
            const newBook = await this.bookService.create(requestBody);
            return successResponse(SUCCESS, newBook)
        } catch (error) {
            this.setStatus(500); // Trả về mã lỗi 500 nếu có lỗi xảy ra.
            return failedResponse(INTERNAL_SERVER_ERROR, 500);
        }
    }

    /**
     * Retrieves a book by its ID.
     *
     * @param id - The ID of the book to retrieve.
     * @returns A Promise that resolves to the book if found, or null if not found.
     */
    @Get("{id}")
    public async get(@Path() id: number): Promise<any> {
        try {
            const book = await this.bookService.getBookById(id);
            if (book) {
                return successResponse(SUCCESS, book);
            } else {
                this.setStatus(404); // Trả về mã lỗi 404 nếu sách không tồn tại.
                return failedResponse(BOOK_NOT_FOUND,404)
            }
        } catch (error) {
            this.setStatus(500); // Trả về mã lỗi 500 nếu có lỗi xảy ra.
            return failedResponse(INTERNAL_SERVER_ERROR, 500);
        }
    }

    /**
     * Handles HTTP PUT requests to update a book by its ID.
     *
     * @param id - The ID of the book to update.
     * @param requestBody - The request body containing book data to update.
     * @returns A Promise that resolves to the updated book's JSON representation if successful,
     *          or an error if not found or other errors occur.
     */
    @Put("{id}")
    public async update(
        @Path() id: number,
        @Body() requestBody: BookRequest
    ): Promise<any> {
        try {
            const updatedBook = await this.bookService.update(id, requestBody);
            return successResponse(SUCCESS,updatedBook);
        } catch (error) {
            this.setStatus(500); // Trả về mã lỗi 500 nếu có lỗi xảy ra.
            return failedResponse(INTERNAL_SERVER_ERROR, 500);
        }
    }

    /**
     * Delete a book based on its ID.
     * @param id - The ID of the book to be deleted.
     * @returns A Promise containing the result of the book deletion.
     */
    @Delete("{id}")
    public async delete(
        @Path() id: number,
    ): Promise<any> {
        try {
            await this.bookService.delete(id);
            return successResponse(SUCCESS, null);
        } catch (error) {
            this.setStatus(500);
            return failedResponse(INTERNAL_SERVER_ERROR, 500);
        }
    }

}
