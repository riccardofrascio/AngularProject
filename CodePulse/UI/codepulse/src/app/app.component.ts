import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';

//import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, RouterModule, HttpClientModule, MarkdownModule, FormsModule]
})
export class AppComponent {
  title = 'codepulse';
}
