import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

httpClient =inject(HttpClient);

  inventoryData = {
    productId:"",
    productName:"",
    stockAvailble:0,
    reorderStock:0
  }

  onSubmit():void {
    let apiUrl = "https://localhost:7104/api/Inventory";
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization:'TestCodeiz-auth-token',
        'Content-Type' : 'application/json'
      })
    }
    this.httpClient.post(apiUrl,this.inventoryData,httpOptions).subscribe((result) => {
      alert('Form Submitted'+ JSON.stringify(this.inventoryData));

    })
  }
}
