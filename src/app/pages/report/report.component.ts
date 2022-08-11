import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService  } from '../service/api.service'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  displayedColumns:String[] = ["sop_id","sop_name","description","device","duration","date_time","category","status",]
  Customerdetails:any;
  value: any;
  start: string | null | undefined;
  end: string | null | undefined;

  constructor(private router :Router,private Service : ApiService, private formBuilder: FormBuilder,private snake: MatSnackBar,) { 
  }
  Duration = this.formBuilder.group({
    fromdate : [""],
    todate : [""]
  })


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public datasource! :MatTableDataSource<any>
  ngOnInit(): void {
    this.weekly();

    
    this.Duration.controls['fromdate'].patchValue(this.formatDate(new Date()));
    this.Duration.controls['todate'].patchValue(this.formatDate(new Date()));
  }
  
  private formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
 
  postData(){
    let postdata={
      "page_number":1,
      "count_per_page":10,
      "period":this.value,
      "from_date":this.start,
      "to_date":this.end, 
      "filters":{
          "search_name":"",
          "search_key":"",
          "categories":[],
          "status":[]
          }
   }
   console.log(postdata);
   
    this.Service.getdata(postdata).subscribe((res:any)=>{
      this.Customerdetails =res.data;
      this.datasource=new MatTableDataSource<any>(this.Customerdetails);
      this.datasource.paginator = this.paginator;
      console.log(res.data);
    } ) 
  }
  submit(){
    this.Duration.value.fromdate
    this.start=this.Duration.value.fromdate
    this.Duration.value.todate
    this.end=this.Duration.value.todate
    this.postData()
    console.log(this.Duration.value.fromdate);
    
    console.log(this.Duration)
  }
  
  today(){
    
    this.value= "today"
    this.submit()
    this.openSnackBar("Today Data")
  }
  weekly(){
    this.value= "weekly"
    this.submit()
    this.openSnackBar("Weekly Data")

  }
  monthly(){
    this.value= "monthly"
    this.submit()
    this.openSnackBar("Monthly Data")

  }
  Dashboardpage(){
    this.router.navigate(['/dashboard'])
  }
  Repositorypage(){
    this.router.navigate(['/repository'])
  }
  Monitoringpage(){
    this.router.navigate(['/monitor'])
  }
  Reportspage(){
    this.router.navigate(['/report'])
  }
  openSnackBar(mes: any) {
    this.snake.open(mes, 'Ok',
      {
        duration: 2000
      });

  }
}
export interface PeriodicElement {
  id:number;description:any;duration:any;sop_id:any;
  sop_unique_id:any;platform:string;category:string;overall_commands:any;commands_executed:any;
  sop_run_id:any;status:any;updated_at:any;active_index:number;
  sop_name:any;toast_msg:any;created_at:any;user_id:number;global_command:any;
  device:any;airflow_try:any;abort_status:number;complete_status:any;
  last_executed_index:any;name:any;
  
}
