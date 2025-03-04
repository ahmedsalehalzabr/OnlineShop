import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailDialogComponent } from '../customer-detail-dialog/customer-detail-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  private modalService = inject(NgbModal);
  httpClient = inject(HttpClient);

  apiUrl = 'https://localhost:7104/api/Customer';
  customers: any[] = []; // قائمة العملاء

  loadCustomer(): void {
    this.httpClient.get<any[]>(this.apiUrl).subscribe((data) => {
      this.customers = data;
    });
  }

  openModal(customer?: any) {
    const modalRef = this.modalService.open(CustomerDetailDialogComponent);
    if (customer) {
      modalRef.componentInstance.customerData = { ...customer }; // تمرير بيانات العميل للتعديل
    }
    modalRef.result.then(
      () => this.loadCustomer(), // تحديث القائمة بعد الإغلاق
      () => {} // تجاهل الإغلاق العادي
    );
  }

  deleteCustomer(id: number): void {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'TestCodeiz-auth-token',
        'Content-Type': 'application/json'
      })
    };

    if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      this.httpClient.delete(`${this.apiUrl}/${id}`, httpOptions).subscribe(
        () => {
          alert('تم الحذف بنجاح!');
          this.loadCustomer();
        },
        (error) => {
          console.error('خطأ أثناء الحذف:', error);
        }
      );
    }
  }

  ngOnInit() {
    this.loadCustomer();
  }
}
