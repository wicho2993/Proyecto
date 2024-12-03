import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import * as XLSX from 'xlsx'; // Importar XLSX para generar Excel
import { saveAs } from 'file-saver'; // Importar FileSaver para descargar el archivo

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  hospitales$!: Observable<any[]>; // Observable para hospitales
  hospitales: any[] = []; // Array local para almacenar los datos

  constructor(
    private navController: NavController,
    private db: AngularFireDatabase // Inyección de Firebase Database
  ) {}

  ngOnInit() {
    this.getHospitales(); // Llamar a la función para obtener los hospitales
  }

  // Obtener hospitales desde Firebase Realtime Database
  getHospitales() {
    this.hospitales$ = this.db.list('hospitales').valueChanges();
    this.hospitales$.subscribe((data) => {
      this.hospitales = data; // Guardar los datos en el array local
    });
  }

  // Función para exportar los hospitales a un archivo Excel
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.hospitales); // Crear hoja de cálculo
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'], // Nombre de la hoja
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx', // Formato del archivo
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'hospitales'); // Llamar a la función para descargar el archivo
  }

  // Función para guardar el archivo Excel
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`); // Descargar el archivo con FileSaver
  }

  // Navegar entre páginas
  navigateTo(page: string) {
    if (page === 'home') {
      this.navController.navigateForward('/tabs/tab1');
    } else if (page === 'about') {
      this.navController.navigateForward('/tabs/tab2');
    } else if (page === 'contact') {
      this.navController.navigateForward('/tabs/tab3');
    }
  }
}
