import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "./register/register.component";
import { UserListComponent } from "../../compartidos/user-list/user-list.component";

@Component({
  selector: 'app-user-control',
  standalone: true,
  imports: [CommonModule, RegisterComponent, UserListComponent],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.css',
})
export class UserControlComponent {
  dropdownOpen1 = false;
  dropdownOpen2 = false;

  toggleDropdown(n: number) {
    switch (n) {
      case 1:
        this.dropdownOpen1 = !this.dropdownOpen1;
        break;

      case 2:
        this.dropdownOpen2 = !this.dropdownOpen2;
        break;
    }
  }

}
