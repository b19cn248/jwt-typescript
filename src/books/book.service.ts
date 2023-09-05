import Book from "./book.model";
import {BookRequest} from "./book.type";
import {CREATE_BOOK_ERROR, DELETE_BOOK_ERROR, GET_BOOK_ERROR, UPDATE_BOOK_ERROR} from "../constant/book.message";

export class BookService {
    async create(request:BookRequest) {
        try {
            return await Book.create({
                title: request.title,
                author: request.author
            });
        } catch (error) {
            throw new Error(CREATE_BOOK_ERROR);
        }
    }


    async getBookById(id: number): Promise<any> {
        try {
            return await Book.findOne({
                where: {id},
            });
        } catch (error) {
            throw new Error(GET_BOOK_ERROR);
        }
    }

    async update(id: number, request: BookRequest): Promise<any> {
        try {
            await Book.update(request, {
                where: { id },
            });
            return await Book.findOne({
                where: {id},
            });
        } catch (error) {
            throw new Error(UPDATE_BOOK_ERROR);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await Book.destroy({
                where: { id },
            });
        } catch (error) {
            throw new Error(`${DELETE_BOOK_ERROR} ID ${id}`);
        }
    }

}

