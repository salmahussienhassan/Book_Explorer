import { Component } from '@angular/core';
import { Book } from '../../../core/models/book';
import { BookService } from '../../../core/services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditBookModalComponent } from '../add-edit-book-modal/add-edit-book-modal.component';
import { SortType } from '../../../core/enum/SortType.enum';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-dashboard.component.html',
  styleUrl: './book-dashboard.component.css',
})
export class BookDashboardComponent {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  sortedBooks: Book[] = [];

  readonly sortTypeEnum = SortType;
  sortOption: SortType = SortType.unSort;

  searchSubject = new Subject<string>();
  searchTerm: string = '';

  constructor(private modalService: NgbModal, private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooksData();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.updateDisplayedBooks();
    });
  }

  getBooksData() {
    this.bookService.getBooks().subscribe((res) => {
      this.books = res;
      this.updateDisplayedBooks();
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(AddEditBookModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });
    modalRef.result.then((shouldRefresh) => {
      if (shouldRefresh) {
        this.getBooksData();
      }
    });
  }

  openEditModal(book: Book) {
    const modalRef = this.modalService.open(AddEditBookModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });
    modalRef.componentInstance.book = book;
    modalRef.result.then((shouldRefresh) => {
      if (shouldRefresh) {
        this.getBooksData();
      }
    });
  }

  deleteBook(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This book will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then(result => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            this.books = this.books.filter(book => book._id !== id);
            this.updateDisplayedBooks();
            Swal.fire('Deleted!', 'The book has been deleted.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'Something went wrong while deleting.', 'error');
          }
        });
      }
    });
  }

  updateDisplayedBooks() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(book => book.title.toLowerCase().includes(term));
    this.sortBooks(this.sortOption);
  }


  sortBooks(type: SortType) {
    this.sortOption = type;

    if (type === SortType.unSort) {
      this.sortedBooks = [...this.filteredBooks];
      return;
    }

    this.sortedBooks = [...this.filteredBooks].sort((a, b) => {
      switch (type) {
        case SortType.priceAsc:
          return a.price - b.price;
        case SortType.priceDesc:
          return b.price - a.price;
        case SortType.titleAsc:
          return a.title.localeCompare(b.title);
        case SortType.titleDesc:
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }

  getSortLabel(type: SortType): string {
    switch (type) {
      case SortType.priceAsc:
        return 'Price: Low to High';
      case SortType.priceDesc:
        return 'Price: High to Low';
      case SortType.titleAsc:
        return 'Title (A-Z)';
      case SortType.titleDesc:
        return 'Title (Z-A)';
      default:
        return 'Sort By';
    }
  }
}
