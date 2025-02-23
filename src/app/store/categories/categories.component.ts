import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../store.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ICategory } from '../store.interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [ConfirmationService]
})
export class CategoriesComponent implements OnInit {
  constructor(private storeService: StoreService, private confirmationService: ConfirmationService) {}
  @ViewChild('form') form!: NgForm;
  visibleError = false;
  errorMessage = '';
  categories: ICategory[] = [];
  visibleConfirm = false;

  category: ICategory = {
    idCategory: 0,
    categoryName: ''
  };

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.storeService.getCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.visibleError = false;
        this.categories = data;
      },
      error: (err) => {
        this.controlError(err);
      }
    });
  }

  save() {
    if (this.category.idCategory === 0) {
      this.storeService.addCategory(this.category).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.form.reset();
          this.getCategories();
        },
        error: (err) => {
          this.controlError(err);
        }
      });
    } else {
      this.storeService.updateCategory(this.category).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelEdition();
          this.form.reset();
          this.getCategories();
        },
        error: (err) => {
          this.controlError(err);
        }
      });
    }
  }

  edit(category: ICategory) {
    this.category = { ...category };
  }

  cancelEdition() {
    this.category = {
      idCategory: 0,
      categoryName: ''
    };
  }

  confirmDelete(category: ICategory) {
    this.confirmationService.confirm({
      message: `Delete category ${category.categoryName}?`,
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteCategory(category.idCategory!)
    });
  }

  deleteCategory(id: number) {
    this.storeService.deleteCategory(id).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.form.reset({
          categoryName: ''
        });
        this.getCategories();
      },
      error: (err) => {
        this.visibleError = true;
        this.errorMessage = 'An error has occurred';
      }
    });
  }

  controlError(err: any){
    this.visibleError = true;
    if (err.error && typeof err.error === 'object' && err.error.message) {
      this.errorMessage = err.error.message;
    } else if (typeof err.error === 'string') {
      // Si `err.error` is a string, it is assumed to be the error message
      this.errorMessage = err.error;
    } else {
      // Handles the case where no useful error message is received
      this.errorMessage = 'An unexpected error has occurred';
    }
  }
}
