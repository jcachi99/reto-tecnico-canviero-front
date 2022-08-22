import {Component, OnInit} from '@angular/core';
import { ClientsService } from "./services/clients.service";
import { Clients } from "./models/Clients";
import {MatTableDataSource} from "@angular/material/table";
import {ThemePalette} from "@angular/material/core";
import {FormControl, Validators} from "@angular/forms";
import {MaxSizeValidator} from "@angular-material-components/file-input";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'entities-web-app';

  testing: Clients[] = [];
  dataSource = new MatTableDataSource(this.testing);
  dataSourceE = new MatTableDataSource(this.testing);
  displayedColumns: string[] = ['id','nombre','apellido','documento','telefono','email'];
  displayedColumnsE: string[] = ['nombre','apellido','documento','telefono','email'];
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: any;
  maxSize = 16;
  nbFiles = 0;
  files: any;
  fileTmp: any;

  fileControl: FormControl;

  constructor(private service: ClientsService) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
  }

  ngOnInit(): void {
    // this.service.getAll().subscribe(testing => {
    //   this.testing = testing;
    //   this.dataSource = new MatTableDataSource(this.testing);
    //   console.log(this.testing);
    // })

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
      this.fileTmp = {
        fileRaw:files,
        fileName:files.name
      }
    })
  }

  applyFilter(filterValue : string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterE(filterValue : string){
    this.dataSourceE.filter = filterValue.trim().toLowerCase();
  }

  sendFile():void{
    const body = new FormData();
    body.append('file', this.fileTmp.fileRaw, this.fileTmp.fileName)
    this.service.sendFile(body).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.clients_saved);
      this.dataSourceE = new MatTableDataSource(res.clients_error);
    })
  }



}
