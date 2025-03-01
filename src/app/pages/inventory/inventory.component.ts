import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule], // تأكد من استيراد CommonModule
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'] // تم تصحيح styleUrl إلى styleUrls
})
export class InventoryComponent {
  httpClient = inject(HttpClient);

  inventoryData = {
    productId: '',
    productName: '',
    stockAvailble: 0,
    reorderStock: 0
  };

  inventories: any[] = []; // تخزين البيانات القادمة من السيرفر

  onSubmit(): void {
    let apiUrl = 'https://localhost:7104/api/Inventory';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'TestCodeiz-auth-token',
        'Content-Type': 'application/json'
      })
    };

    this.httpClient.post(apiUrl, this.inventoryData, httpOptions).subscribe(
      (result) => {
        alert('Form Submitted: ' + JSON.stringify(this.inventoryData));
        this.loadInventory(); // إعادة تحميل البيانات بعد الإضافة
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
  }

  // جلب بيانات المخزون من API
  loadInventory(): void {
    let apiUrl = 'https://localhost:7104/api/Inventory';
    this.httpClient.get<any[]>(apiUrl).subscribe((data) => {
      this.inventories = data;
    });
  }

  // استدعاء البيانات عند تحميل المكون
  ngOnInit() {
    this.loadInventory();
  }
}
