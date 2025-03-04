import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-detail-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-detail-dialog.component.html',
  styleUrl: './customer-detail-dialog.component.css'
})
export class CustomerDetailDialogComponent {
  httpClient = inject(HttpClient);
  activeModal = inject(NgbActiveModal);

  apiUrl = 'https://localhost:7104/api/Customer';

  @Input() customerData = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    registrationDate: ''
  };

  onSubmit(): void {
    if (this.customerData.id) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  createCustomer(): void {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'TestCodeiz-auth-token',
        'Content-Type': 'application/json'
      })
    };

    this.httpClient.post(this.apiUrl, this.customerData, httpOptions).subscribe(
      () => {
        alert('تمت إضافة العميل بنجاح!');
        this.activeModal.close();
      },
      (error) => {
        console.error('خطأ أثناء الإضافة:', error);
      }
    );
  }

  updateCustomer(): void {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'TestCodeiz-auth-token',
        'Content-Type': 'application/json'
      })
    };

    this.httpClient.put(`${this.apiUrl}/${this.customerData.id}`, this.customerData, httpOptions).subscribe(
      () => {
        alert('تم تحديث البيانات بنجاح!');
        this.activeModal.close();
      },
      (error) => {
        console.error('خطأ أثناء التحديث:', error);
      }
    );
  }
}
