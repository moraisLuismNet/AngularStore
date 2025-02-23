import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoreService } from '../store.service';
import { ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ICategory, IProduct } from '../store.interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ConfirmationService]
})
export class ProductsComponent implements OnInit {
  constructor(private storeService: StoreService, private confirmationService: ConfirmationService) {}
  @ViewChild('form') form!: NgForm;
  @ViewChild('fileInput') fileInput!: ElementRef;
  visibleError = false;
  errorMessage = '';
  products: IProduct[] = [];
  categories: ICategory[] = [];
  visibleConfirm = false;
  urlImage = '';
  visiblePhoto = false;
  photo = '';

  product: IProduct = {
    idProduct: 0,
    productName: '',
    price: 0,
    photo: null,
    discontinued: false,
    categoryId: null,
    categoryName: '',
  };

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.storeService.getCategories().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.categories = data;
      },
      error: (err) => {
        this.controlError(err);
      }
    });
  }

  getProducts() {
    this.storeService.getProducts().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.products = data;
        console.log(this.products);
      },
      error: (err) => {
        this.controlError(err);
      }
    });
  }

  onChange(event: any) {
    const file = event.target.files;

    if (file && file.length > 0) {
      this.product.photo = file[0];
      this.product.photoName = file[0].name;
    }
  }

  onAceptar() {
    this.fileInput.nativeElement.value = '';
  }

  showImage(product: IProduct) {
    if (this.visiblePhoto && this.product === product) {
      // If the image is already visible and the same product was selected, hide the dialog
      this.visiblePhoto = false;
    } else {
      // If it is a new product or the dialog is hidden, show the image
      this.product = product;
      this.photo = product.photoUrl!;
      this.visiblePhoto = true;
    }
  }

  save() {
    if (this.product.idProduct === 0) {
      this.storeService.addProduct(this.product).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.form.reset();
          this.getProducts();
        },
        error: (err) => {
          console.log(err);
          this.visibleError = true;
          this.controlError(err);
        },
      });
    } else {
      console.log("Updating product ID:", this.product.idProduct);
      this.storeService.updateProduct(this.product).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelEdition();
          this.form.reset();
          this.getProducts();
        },
        error: (err) => {
          this.visibleError = true;
          this.controlError(err);
        },
      });
    }
  }

  confirmDelete(product: IProduct) {
    this.confirmationService.confirm({
      message: `Remove product ${product.productName}?`,
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        if (product.idProduct !== undefined) {
          this.deleteProduct(product.idProduct);
        }
      }
    });
  }

  deleteProduct(id: number) {
    this.storeService.deleteProduct(id).subscribe({
      next: (data: IProduct) => {
        this.visibleError = false;
        this.getProducts();
      },
      error: (err: any) => {
        this.controlError(err);
      }
    });
  }

  edit(product: IProduct) {
    const categoryFounded = this.categories.find(c => c.categoryName === product.categoryName);
    this.product = { ...product };
    this.product.categoryId = categoryFounded?.idCategory ?? null;
    this.product.photoName = product.photoUrl
      ? this.extractImageName(product.photoUrl)
      : '';
  }

  extractImageName(url: string): string {
    return url.split('/').pop() || '';
  }

  cancelEdition() {
    this.product = {
      idProduct: 0,
      productName: '',
      price: 0,
      discontinued: false,
      categoryId: null,
      categoryName: '',
    };
  }
  controlError(err: any){
    this.visibleError = true;
    if (err.error && typeof err.error === 'object' && err.error.message) {
      this.errorMessage = err.error.message;
    } else if (typeof err.error === 'string') {
      // If `err.error` is a string, it is assumed to be the error message
      this.errorMessage = err.error;
    } else {
      // Handles the case where no useful error message is received
      this.errorMessage = 'An unexpected error has occurred';
    }
  }
}
