import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from '../../pages/footer/footer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatTableModule, 
    MatInputModule, 
    MatFormFieldModule,
    FooterComponent, 
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {

  constructor(private readonly router: Router) {}

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('isAdminLoggedIn');
    this.router.navigate(['/login']);
  }
  /* TABLE DATA */
  displayedColumns: string[] = ['fullName', 'phone', 'email', 'department', 'appointmentDate', 'message'];
  
  dataSource = [
    {
      fullName: 'Rohit Sharma',
      phone: '9876543210',
      email: 'rohit@gmail.com',
      department: 'Cardiology',
      appointmentDate: new Date(2025, 0, 12),
      message: 'Chest pain consultation'
    },
    {
      fullName: 'Anita Verma',
      phone: '9123456789',
      email: 'anita@gmail.com',
      department: 'Neurology',
      appointmentDate: new Date(2025, 1, 5),
      message: 'Migraine issue'
    }
  ];

  filteredData = [...this.dataSource];

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.dataSource.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(value))
    );
  }

  async downloadPDF() {
    try {
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      doc.setFontSize(14);
      doc.text('Appointment Requests', 14, 15);

      const tableBody = this.filteredData.map(item => ([
        item.fullName,
        item.phone,
        item.email,
        item.department,
        new Date(item.appointmentDate).toLocaleDateString('en-GB'),
        item.message
      ]));

      autoTable(doc, {
        head: [['Full Name', 'Phone', 'Email', 'Department', 'Date', 'Message']],
        body: tableBody,
        startY: 20,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [0, 123, 255] }
      });

      doc.save('appointments.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  }
}