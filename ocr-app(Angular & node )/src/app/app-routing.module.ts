import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ScanedImageComponent } from './scaned-image/scaned-image.component';


const routes: Routes = [
  {path:'' , component : PostListComponent},
  {path:'create' , component : PostCreateComponent},
  {path:'edit/:postId' , component : PostCreateComponent},
  {path:'login' , component : LoginComponent},
  {path:'signup' , component : SignupComponent},
  {path:'scaned-image' , component : ScanedImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
