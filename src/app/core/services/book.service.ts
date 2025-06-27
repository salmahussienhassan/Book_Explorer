import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, NewBook } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://crudcrud.com/api/7f6facfb7bf84d2c8fa55acdb9f9dde7/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: NewBook): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}`, book);
  }

  updateBook(id:string,book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
