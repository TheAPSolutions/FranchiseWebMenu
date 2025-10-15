import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MenuItemsServiceService } from '../../Services/menu-items.service.service';
import { jsPDF } from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable for tables
import { CategoryService } from '../../Services/category.service';
import { getAllCategories } from '../../models/Categories Requests DTO/get-categroies.model';
import { MenuItem } from '../../models/add-menuItem-request/menuItem.model';
import * as XLSX from 'xlsx'; // Import XLSX
import { saveAs } from 'file-saver'; // Import file-saver for saving the file
import { NotificationService } from '../../Services/notification.service';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-page-export-menu',
  templateUrl: './page-export-menu.component.html',
  styleUrl: './page-export-menu.component.scss',
})
export class PageExportMenuComponent implements OnInit {
  //Logic Variables
  header: any = null;
  tableData: any[] = [];
  selectedCategory?: getAllCategories;
  categories: { name: string; id: number }[] = [];
  Items!: MenuItem[];

  //Injecting Services
  private menuItemsService = inject(MenuItemsServiceService);
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);

  private languageService = inject(LanguageService);
  ExportMenu: WritableSignal<string> = signal('');
  ExportMenuExcel: WritableSignal<string> = signal('');
  ExportMenuPDF: WritableSignal<string> = signal('');
  SelectCategory: WritableSignal<string> = signal('');
  language = 'En';

  ngOnInit(): void {
    this.loadCategories();

    this.menuItemsService.getAllMenuItemsUnPaged().subscribe({
      next: (response) => {
        this.tableData = response;
      },
      error: (err) => {
        this.showErrorMessage();
      },
    });

    this.languageService.currentLanguage$.subscribe(() => {
      this.updateTitles();
    });
  }

  updateTitles() {
    this.ExportMenu = this.languageService.ExportMenu;
    this.ExportMenuExcel = this.languageService.ExportMenuExcel;
    this.ExportMenuPDF = this.languageService.ExportMenuPDF;
    this.SelectCategory = this.languageService.SelectCategory;
    this.language = this.languageService.getLanguage();
    this.loadCategories();
  }

  //When Category is Selected get the selected category id and name
  onCategorySelect(id: number) {
    //console.log('category id', id);
    this.categoryService.getcategory(id).subscribe({
      next: (response) => {
        this.selectedCategory = response;
        //console.log(response);
      },
      error: (err) => {
        this.showErrorMessage();
      },
    });

    //Fetching Menu Items with Id selectd in the dropdown
    this.menuItemsService.getAllItemByCategoryId(id).subscribe({
      next: (itemsResponse) => {
        this.Items = itemsResponse;
        //console.log(this.Items);
        this.tableData = this.Items;
      },
      error: (err) => {
        this.showErrorMessage();
      },
    });
  }

  //Loading Categories to the dropdown
  loadCategories() {
    if(this.language == 'En'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data); // Log the whole data to see its structure
          this.categories = data.map((category) => ({
            name: category.nameEn, // Adjust 'name' to the actual property name for category names
            id: category.id, // Adjust 'id' to the actual property name for category IDs
          }));
          //console.log('categories En', this.categories); // Log the whole data to see its structure
        },
        error: (err) => {
          this.showErrorMessage();
          //console.error('Error occurred while fetching categories:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    } else if(this.language == 'Tr'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data); // Log the whole data to see its structure
          this.categories = data.map((category) => ({
            name: category.nameTr, // Adjust 'name' to the actual property name for category names
            id: category.id, // Adjust 'id' to the actual property name for category IDs
          }));
          //console.log('categories En', this.categories); // Log the whole data to see its structure
        },
        error: (err) => {
          this.showErrorMessage();
          //console.error('Error occurred while fetching categories:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    } else if(this.language == 'Ar'){
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          //console.log(data); // Log the whole data to see its structure
          this.categories = data.map((category) => ({
            name: category.nameAr, // Adjust 'name' to the actual property name for category names
            id: category.id, // Adjust 'id' to the actual property name for category IDs
          }));
          //console.log('categories En', this.categories); // Log the whole data to see its structure
        },
        error: (err) => {
          this.showErrorMessage();
          //console.error('Error occurred while fetching categories:', err);
          if (err.error) {
            //console.error('Error details:', err.error);
          }
        },
      });
    }

  }

  //PDF download
  downloadPDF() {
    const doc = new jsPDF();

    // Define columns and rows
    const columns = [
      'ID',
      'NameTr',
      'DescriptionTr',
      'PriceTr',
      'DiscountedPriceTr',
    ]; // Adjust columns to match your data
    const rows = this.tableData.map((item) => [
      item.id,
      item.nameTr,
      item.DescriptionTr,
      item.PriceTr,
      item.DiscountedPriceTr,
    ]);

    // Generate PDF with table
    doc.text('Menu Items Hungry Birds', 14, 10);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save('Hungry_Birds.pdf');
    this.showSuccessMessage();
  }

  //Excel Download
  exportToExcel(): void {
    // Step 1: Create a worksheet from the table data
    const worksheet = XLSX.utils.json_to_sheet(this.tableData);

    // Step 2: Create a workbook and add the worksheet
    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };

    // Step 3: Write the workbook to a binary file
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Step 4: Save the file using file-saver
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Hungry_Birds.xlsx');
    this.showSuccessMessage();
  }

  //Notifications
  showSuccessMessage() {
    this.notificationService.showMessage('Successfully Saved', 'success');
  }

  showErrorMessage() {
    this.notificationService.showMessage('Failed To Save File', 'danger');
  }
}
