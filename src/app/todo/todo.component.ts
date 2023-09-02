import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm!:FormGroup;//The '!' sign tells that the value of the element 'todoForm' will be defined later in the program

  tasks:ITask []=[];//First list that would contain the tasks
  inProgress:ITask []=[];//second list that would contain Tasks in progress
  done:ITask []=[];//list that would contaim the completed tasks

  updateIndex !:any;
  isEditEnabled:boolean=false;

  constructor(private fb:FormBuilder){}

ngOnInit():void{
 // Initialization of the form
  this.todoForm=this.fb.group({
    item:['',Validators.required]//Declaration of Form Controller
  })
}

//Method for pushing the data into the list
addTask(){
  this.tasks.push({//Pushing the data into the list through objects 'description' and 'done'
    //Taking value from the input of the form with form controller item
    description:this.todoForm.value.item,
    done:false
  })
  this.todoForm.reset();
}

//Method for editing task
onEdit( item:ITask,i:number){
  this.todoForm.controls['item'].setValue(item.description);//update form and set value
  this. updateIndex=i;//id that has to be updated
  this.isEditEnabled=true;
}
//updation of task
updateTask(){
  this.tasks[this.updateIndex].description=this.todoForm.value.item;
  this.tasks[this.updateIndex].done=false;
  this.todoForm.reset();
  this.updateIndex=undefined;
  this.isEditEnabled=false;
}

//Method for deletion of data 
deleteTask(i:number){
  this.tasks.splice(i,1)//splicing i.e removing the specific task that has been done
}
//deleteion for inprogress
deleteinProgressTask(i:number){
  this.inProgress.splice(i,1)//splicing i.e removing the specific task that has been done
}
//deletion of data from done list
deleteDoneTask(i:number){
  this.done.splice(i,1)//splicing i.e removing the specific task that has been done
}


drop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
}



