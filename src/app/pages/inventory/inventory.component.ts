import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  httpClient = inject(HttpClient);

  apiUrl = 'https://localhost:7104/api/Inventory';

  inventoryData = {
    id: null, // تم إضافته للتعديل
    productId: '',
    productName: '',
    stockAvailable: 0,
    reorderStock: 0
  };

  inventories: any[] = []; // تخزين البيانات القادمة من API

  onSubmit(): void {
    if (this.inventoryData.id) {
      // تحديث البيانات إذا كان هناك ID موجود
      this.updateInventory();
    } else {
      // إضافة بيانات جديدة
      this.createInventory();
    }
  }

  createInventory(): void {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'TestCodeiz-auth-token',
        'Content-Type': 'application/json'
      })
    };

    this.httpClient.post(this.apiUrl, this.inventoryData, httpOptions).subscribe(
      () => {
        alert('تمت إضافة المخزون بنجاح!');
        this.resetForm();
        this.loadInventory();
      },
      (error) => {
        console.error('خطأ أثناء الإضافة:', error);
      }
    );
  }

  updateInventory(): void {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'TestCodeiz-auth-token',
        'Content-Type': 'application/json'
      })
    };

    this.httpClient.put(`${this.apiUrl}/${this.inventoryData.id}`, this.inventoryData, httpOptions).subscribe(
      () => {
        alert('تم تحديث البيانات بنجاح!');
        this.resetForm();
        this.loadInventory();
      },
      (error) => {
        console.error('خطأ أثناء التحديث:', error);
      }
    );
  }

  deleteInventory(id: number): void {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'TestCodeiz-auth-token',
        'Content-Type': 'application/json'
      })
    };

    if (confirm('Are you shore for dlete this item')) {
      this.httpClient.delete(`${this.apiUrl}/${id}`, httpOptions).subscribe(
        () => {
          alert('تم الحذف بنجاح!');
          this.loadInventory();
        },
        (error) => {
          console.error('خطأ أثناء الحذف:', error);
        }
      );
    }
  }

  editInventory(item: any): void {
    this.inventoryData = { ...item }; //نسخ البيانات إلى النموذج 
  }
  loadInventory(): void { 
    this.httpClient.get<any[]>(this.apiUrl).subscribe((data) => {
      this.inventories = data;
    });
  }

  resetForm(): void {
    this.inventoryData = {
      id: null,
      productId: '',
      productName: '',
      stockAvailable: 0,
      reorderStock: 0
    };
  }

  ngOnInit() {
    this.loadInventory();
  }
}
