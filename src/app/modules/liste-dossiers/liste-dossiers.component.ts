import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-liste-dossiers',
  templateUrl: './liste-dossiers.component.html',
  styleUrls: ['./liste-dossiers.component.scss']
})
export class ListeDossiersComponent implements OnInit {
  items=[];
  id:number;
  pageTitle = 'Liste des dossiers de visites';
    imageWidth = 45;
    imageMargin = 1;
    showImage = true;
    _listFilter = '';
    startindex =0;
    endindex=10;
    nb:any;
    filteredDossier= [];
    dossier= [];
  constructor(private router:Router,private Myservice:DashboardService) { 
    this.filteredDossier = this.dossier;
    this.listFilter = '';
  }
  
  ngOnInit() {
    this.Myservice.getDossierVisite().subscribe(data => {
      console.log(data);
      for (let key in data)
      if(data.hasOwnProperty(key))
      this.dossier.push(data[key]);
      this.nb=Math.round(Object.keys(data).length/10)+1;
    });
  }

  
    get listFilter(): string {
        return this._listFilter;
    }
 
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredDossier = this.listFilter ? this.doFilter(this.listFilter) : this.dossier;
    }
 
    doFilter(filterBy: string):any  [] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.dossier.filter((dossier: any) =>
        dossier.sujet.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    updateindex(pageIndex){
      this.startindex= pageIndex * 10;
      this.endindex= this.startindex + 10;
      console.log(this.startindex)
      console.log(this.endindex)
      }
    
      getarray(length){
        return new Array(length);
      }

    edit(element:any){
      console.log(element.target.value);
      this.Myservice.id_dossier=element.target.value;
      this.router.navigateByUrl('/dashboard/dossiervisite');
    }
    changeStatut(){
      let body = {
        "statut": ""
    };
    }
}
