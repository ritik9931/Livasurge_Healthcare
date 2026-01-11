import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from '../../pages/footer/footer';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule,
     FooterComponent, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('isAdminLoggedIn');
    this.router.navigate(['/login']);
  }

  /* TABLE COLUMNS */
  displayedColumns: string[] = [
    'fullName',
    'phone',
    'email',
    'subject',
    'message'
  ];

  /* SAMPLE DATA (Replace with API later) */
  dataSource = [
    {
      fullName: 'Rohit Sharma',
      phone: '9876543210',
      email: 'rohit@gmail.com',
      subject: 'Cardiology',
      message: 'Chest pain consultation'
    },
    {
      fullName: 'Anita Verma',
      phone: '9123456789',
      email: 'anita@gmail.com',
      subject: 'Neurology',
      message: 'Migraine issue'
    }
  ];

   filteredData = [...this.dataSource];

  /* 🔍 SEARCH */
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.filteredData = this.dataSource.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(value)
      )
    );
  }

  /* 📄 PDF DOWNLOAD */
  async downloadPDF() {
  try {
    const jsPDF = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4' // ✅ A4 size
    });

    doc.setFontSize(14);
    doc.text('Contact Requests', 14, 15);

    const tableBody = this.filteredData.map(item => ([
      item.fullName,
      item.phone,
      item.email,
      item.subject,
      item.message
    ]));

    autoTable(doc, {
      head: [[
        'Full Name',
        'Phone',
        'Email',
        'Subject',
        'Message'
      ]],
      body: tableBody,
      startY: 20,
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [0, 123, 255]
      },
      margin: { top: 20 }
    });

    doc.save('contacts.pdf'); // ✅ WORKS
  } catch (error) {
    console.error('PDF generation error:', error);
  }
}


}
