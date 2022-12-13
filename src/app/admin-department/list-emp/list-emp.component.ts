import { Component,OnInit,Input  } from '@angular/core';
import { PublicService } from 'src/app/services/public.service'

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.scss']
})
export class ListEmpComponent implements OnInit {

  constructor(private service:PublicService) { }

  EmployeeList:any=[];
  name_filter!:string;
  without_filter:any=[];
  ModalTitle!:string;
  ActivateAddEditEmpComp:boolean=false;
  ActivateviewEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      emp_id:0,
      emp_name:"",
      email:"",
      contact_Number:"",
      emergency_Contact_Number:"",
      address:"",
      position:"",
      dob:"",
      martial_Status:"",
      job_Title:"",
      work_Location:"",
      date_Of_Joining:"",
      reporting_To:"",
      linkedin_Link:"",
      Photo_File_Name:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item: any){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
    this.ActivateviewEmpComp=false;
  }

  deleteClick(item: { emp_id: any; }){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.emp_id).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }
  // view
  viewClick(item: any){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Employee Details";
    this.ActivateviewEmpComp=true;
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
    window.location.reload();
  }


  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.without_filter=data;
    });
  }

  FilterFn(){
    var  name_filter = this.name_filter;
   


    this.EmployeeList = this.without_filter.filter(function (el:any){
        // return el.EmployeeId.toString().toLowerCase().includes(
        //employee_id_filter.toString().trim().toLowerCase(
        // )&&
        return el.emp_name.toString().toLowerCase().includes(
         name_filter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop:any,asc:any){
    this.EmployeeList = this.without_filter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }
}

