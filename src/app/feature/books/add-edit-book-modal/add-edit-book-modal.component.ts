import { ToastrService } from 'ngx-toastr';
import { BookService } from './../../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../../core/models/book';

@Component({
  selector: 'app-add-edit-book-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-edit-book-modal.component.html',
  styleUrl: './add-edit-book-modal.component.css'
})
export class AddEditBookModalComponent {
  book!:Book
  addEditBookForm!:FormGroup

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder,private bookService:BookService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.addEditBookForm=this.fb.group({
      title:['',[Validators.required]],
      author:['',[Validators.required]],
      price:['',[Validators.min(0)]],
      category:[''],
      description:[''],
    } )
    this.refillBookFormInEditMode();
  }
  onSubmit(){
    if(this.book?._id){
      this.editBook()
    }else{
      this.createBook()
    }
  }
  refillBookFormInEditMode(){
    if (this.book) {
      this.addEditBookForm.patchValue({
        title: this.book.title,
        author: this.book.author,
        price: this.book.price,
        category: this.book.category,
        description: this.book.description
      });
    }
  }
  createBook(){
    if(this.addEditBookForm.valid){
      this.bookService.addBook(this.addEditBookForm.value).subscribe({
      next:(res)=>{
        this.book=res
        this.addEditBookForm.reset();
        this.toastr.success('saved successfully');
        this.closeModal(true);
      },error:(err)=>{
        this.toastr.success('somthing went wrong');        
      }
      })
    }
  }
 editBook(){
  if(this.addEditBookForm.valid){
  this.bookService.updateBook(this.book._id,this.addEditBookForm.value).subscribe({
    next:(res)=>{
      this.toastr.success('saved successfully');
      this.closeModal(true);
    },error:(err)=>{
      this.toastr.success('somthing went wrong'); 
    }
    })
  }
 }
  closeModal(shouldRefresh: boolean = false) {
    this.activeModal.close(shouldRefresh);
  }
}
