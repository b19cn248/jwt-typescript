import Book from "./book.model";

export class BookService {
    async create(bookData: { title: string; author: string }) {
        try {
            const newBook = await Book.create({
                title: bookData.title,
                author: bookData.author
            });

            return newBook;
        } catch (error) {
            throw new Error(`Không thể tạo sách mới`);
        }
    }
}

