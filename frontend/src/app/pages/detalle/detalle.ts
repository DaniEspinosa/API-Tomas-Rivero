import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../core/services/inmuebles.service';
import { ActivatedRoute } from '@angular/router';
import { Inmueble } from '../../core/models/inmueble.model';
import { NgIf, TitleCasePipe, CurrencyPipe, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { ContactBarTs } from '../../shared/components/contact-bar.ts/contact-bar.ts';
import { Navbar } from '../../shared/components/navbar/navbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    ContactBarTs,
    Navbar,
    Footer,
    NgIf,
    NgFor,
    MatButtonModule,
    TitleCasePipe,
    CurrencyPipe,
    RouterModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './detalle.html',
  styleUrls: ['./detalle.css']
})
export class Detalle implements OnInit {
  inmueble?: Inmueble;

  constructor(
    private service: InmueblesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getInmueble(id).subscribe((i) => {
      this.inmueble = i;
      console.log('📌 Características:', this.inmueble.caracteristicas);
    });
  }
}
