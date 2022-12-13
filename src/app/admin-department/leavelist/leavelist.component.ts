import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.scss']
})
export class LeavelistComponent implements OnInit {
  constructor(private service:PublicService) { }
  LeaveList:any=[];
  filter!:string;
  date_without_filter:any=[];

  ModalTitle!:string;
  ActivateAddEditEmpComp:boolean=false;
  ActivateviewEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshleaveList();
  }

  addClick(){
    this.emp={
      
        // "apply_date": "",
        "user": 0,
        "nature_of_leave": "",
        "first_Day": "",
        "last_Day": "",
        "number_Of_Days": 0,
        "status": "pending",
       
        
    }
    this.ModalTitle="Add Leave";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item: any){
    console.log(item);

    if (this.emp.status=="pending"){
      this.emp=item;
      this.ModalTitle="Edit leave";
      this.ActivateAddEditEmpComp=true;
      this.ActivateviewEmpComp=false;
    }
    else{
     alert("Can't Edit this leave");
    }
      
  }

  approveleave(item: { lid: any; }){
    if(confirm('Are you sure to approve this leave? ')){
      this.service.deleteleave(item.lid).subscribe(data=>{
        alert(data.toString());
        this.refreshleaveList();

      })

    }

  }

  cancelleave(item: { lid: any; }){
    if(confirm('Are you sure to cancel this leave? ')){
      this.service.deleteleave(item.lid).subscribe(data=>{
        alert(data.toString());
        this.refreshleaveList();

      })

    }

  }
 

  refreshleaveList(){
    this.service.getleaveList().subscribe(data=>{
      this.LeaveList=data;
      this.date_without_filter=data;
    });
  }

 FilterFn(){
    var   filter = this.filter;
    // var  filter = this.nature_filter;

    this.LeaveList = this.date_without_filter.filter(function (el:any){
        // return el.EmployeeId.toString().toLowerCase().includes(
        //  employee_id_filter.toString().trim().toLowerCase()
        // )&&
        return el.nature_of_leave.toString().toLowerCase().includes(
         filter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop:any,asc:any){
    this.LeaveList = this.date_without_filter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }



}



