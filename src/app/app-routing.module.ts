import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
{

  path:'',
  pathMatch:'full',
  redirectTo:'welcome'
},
{
  path:'welcome',
  component: WelcomeComponent

},
{

  path:'singup',
  component: SingupComponent

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
