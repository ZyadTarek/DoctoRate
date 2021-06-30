import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  data:any
  places:any;
  flag=false
  dataFlag=true
  url;
  about=true;
  fav=false;
  constructor(private clientService:ClientService,private confirmationService:ConfirmationService,private messageService:MessageService,
    private authService:AuthService) { }

  ngOnInit(): void {

    const promise = new Promise((resolve,reject)=>{


      resolve(this.clientService.getUser());

    });

    promise.then((res)=>{

     //this.clientService.getUser();

     setTimeout(()=>{
     console.log(this.clientService.currentUser);
     this.data = this.clientService.currentUser;
     this.url=this.data.user.user_Image;
     console.log(this.data);
     console.log(this.data.username);
   },700)


    });

    promise.catch((err)=>{

    });

    promise.finally(()=>{

    });
  }
  getUserFavorites():any{
    this.dataFlag = false;
    this.clientService.getUserFavorites(this.data.user.id).subscribe(a=>{
      this.places = a;
      console.log("user favorites: ",a);
      return a;

    },
    err=>{
      console.log(err.error.text);
      return err.error.text;

    }
    )
  }
  RemoveFromFavorites(place_id){
    this.clientService.RemoveUserFavorite(this.data.user.id,place_id).subscribe(a=>{
      console.log(a);
    })
  }
  AddStar(){
    const starIcon = document.createElement('i');
    starIcon.classList.add('pi');
    starIcon.classList.add('pi-star');
    let badge = document.getElementById('badge');
    badge.appendChild(starIcon);
  }
  getRating(rate){
    //this.AddStar();
  if(rate == null) return 0 + ".0";
  else return Math.ceil(rate) + ".0";
  }
  confirm(event: Event,place_id) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'هل انت متأكد من حذف هذا المكان من المفضلات ؟',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"نعم",
        rejectLabel:"لا",
        acceptButtonStyleClass:"p-button-danger",
        rejectButtonStyleClass:"p-button-secondary",
        accept: () => {
            this.RemoveFromFavorites(place_id);
            this.messageService.add({severity:'info', summary:'تم الحذف', detail:'تم الحذف من المفضلات'});
            setTimeout(()=>{
              window.location.reload();
            },200)
        },
        reject: () => {
            //reject action
        }
    });
}
  getPhoneNumber(){
    if(this.data.user.user_Phone == null){
     // $("#phone").html('<a href="#"> Add Phone Number </a>');
     return "There is not any registered number";
    }
    else return this.data.user.user_Phone;
  }
  getProfilePicture(){
    if(this.data.user.user_Image == null){

      return false;
    }
    else return true;
    // this.data.user.user_Image;
  }
  editProfile()
{
  this.flag=true;
  this.dataFlag=false;
  this.about=false;
  this.fav=false;
}
onSelectFile(event) { // called each time file input changes
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
      console.log("urll: "+ this.url);
      const newData=new User("",this.data.username,"","",this.url);

  this.authService.EditUserPhoto(newData).subscribe(a=>{console.log(a);});
    }
  }
  window.location.reload();
}
DeleteProfilePicture(){
  console.log("Deleting Profile Picture: ",this.data.user.id);
  this.authService.DeleteProfilePicture(this.data.user.id).subscribe(a=>{console.log("Deleting Profile Picture: ",a);});
  window.location.reload();
}
reload(){
  window.location.reload();
}
showFav()
{
  this.flag=false;
  this.dataFlag=false;
}
}
