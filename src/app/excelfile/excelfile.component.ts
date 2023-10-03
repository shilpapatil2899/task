import { Component, OnInit } from '@angular/core';
import { ExcelserviceService } from '../services/excelservice.service';

@Component({
  selector: 'app-excelfile',
  templateUrl: './excelfile.component.html',
  styleUrls: ['./excelfile.component.css']
})
export class ExcelfileComponent implements OnInit {
  excelData: any[] = [];
  filteredData: any[] = [];
  selEmpFilter: Map<number, number> = new Map<number, number>();

  constructor(private excelService: ExcelserviceService) {}

  ngOnInit() {
    // You can choose to load the Excel data when needed, not necessarily in ngOnInit
  }

  onFileSelected(event: any) {
      const selectedFile: File = event.target.files[0];

      if (selectedFile) {
        this.loadExcelData(selectedFile);
      }
    }

    loadExcelData(file: File) {
      this.excelService.readExcelFile(file).then((data) => {
        this.excelData = data;
        this.filteredData = [...this.excelData]; // Initialize filtered data with all data
      });
    }

  searchByName(name: string) {
    if (!name) {
      this.filteredData = [...this.excelData];
      return;
    }

    this.filteredData = this.excelData.filter((item) =>
      item.Name.toLowerCase().includes(name.toLowerCase())
    );
  }

  searchByCompanyName(companyNames: string) {
    if (!companyNames) {
      this.filteredData = [...this.excelData];
      return;
    }
  
    const companyNamesArray = companyNames
      .split(',')
      .map((name) => name.trim().toLowerCase());
  
    if (companyNamesArray.length === 0) {
      this.filteredData = [...this.excelData];
      return;
    }
  
    this.filteredData = this.excelData.filter((item) =>
      companyNamesArray.includes(item['Company Name'].toLowerCase())
    );
  }
  
  
  searchByJobTitles(jobTitles: string) {
    if (!jobTitles) {
      this.filteredData = [...this.excelData];
      return;
    }
  
    const jobTitlesArray = jobTitles
      .split(',')
      .map((title) => title.trim().toLowerCase());
  
    if (jobTitlesArray.length === 0) {
      this.filteredData = [...this.excelData];
      return;
    }
  
    this.filteredData = this.excelData.filter((item) =>
      jobTitlesArray.includes(item['Job Titles'].toLowerCase())
    );
  }
  
  
  updateEmployeeSizeFilters(minSize: number, maxSize: number, label: string) {
    if (this.selEmpFilter.has(minSize)) {
      // Remove the filter if the checkbox is unchecked
      this.selEmpFilter.delete(minSize);
    } else {
      // Add or update the filter if the checkbox is checked
      this.selEmpFilter.set(minSize, maxSize);
    }
  
    // Apply the filters based on the selected checkboxes
    this.applyEmployeeSizeFilters();
  }
  
  applyEmployeeSizeFilters() {
    if (this.selEmpFilter.size === 0) {
      // If no checkboxes are selected, show all data
      this.filteredData = [...this.excelData];
      return;
    }
  
    // Filter data based on selected checkboxes
    this.filteredData = this.excelData.filter((item) => {
      const companySize = parseInt(item['Company Size'], 10);
      for (const [minSize, maxSize] of this.selEmpFilter) {
        if (companySize >= minSize && companySize <= maxSize) {
          return true; // Include the item if it matches any selected filter
        }
      }
      return false;
    });
  }
}
