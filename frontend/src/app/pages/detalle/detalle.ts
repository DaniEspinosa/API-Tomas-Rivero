import { Component, OnInit, HostListener } from '@angular/core';
import { InmueblesService } from '../../core/services/inmuebles.service';
import { ContactService } from '../../core/services/contact.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Inmueble } from '../../core/models/inmueble.model';
import { TitleCasePipe, CurrencyPipe, CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Footer } from '../../shared/components/footer/footer';
import { ContactBarTs } from '../../shared/components/contact-bar.ts/contact-bar.ts';
import { Navbar } from '../../shared/components/navbar/navbar';
import { MatIconModule } from '@angular/material/icon';
import { ReplaceUnderscorePipe } from '../../replace-underscore-pipe';
import { SafeUrlPipe } from '../../safe-url.pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    ContactBarTs, Navbar, Footer,
    CommonModule, FormsModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    TitleCasePipe, ReplaceUnderscorePipe, CurrencyPipe, SafeUrlPipe,
    RouterModule, MatIconModule,
  ],
  templateUrl: './detalle.html',
  styleUrls: ['./detalle.css'],
})
export class Detalle implements OnInit {
  inmueble?: Inmueble;
  descExpanded = false;
  activePhoto = 0;
  lightboxOpen = false;
  shareToast = false;
  readonly BASE = environment.apiUrl;
  readonly DESC_LIMIT = 350;

  contact = { nombre: '', telefono: '', email: '', mensaje: '' };
  contactSending = false;
  contactSent = false;
  contactError = false;

  constructor(
    private readonly service: InmueblesService,
    private readonly contactService: ContactService,
    private readonly route: ActivatedRoute,
    private readonly viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getInmueble(id).subscribe((i) => {
      this.inmueble = i;
      this.contact.mensaje = `Hola, estoy interesado/a en la propiedad "${i.titulo}". Por favor, contactadme.`;
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.lightboxOpen) return;
    if (e.key === 'Escape') { this.lightboxOpen = false; }
    if (e.key === 'ArrowRight') this.nextPhoto();
    if (e.key === 'ArrowLeft') this.prevPhoto();
  }

  get shortDesc(): string {
    const d = this.inmueble?.descripcion || '';
    return d.length > this.DESC_LIMIT ? d.slice(0, this.DESC_LIMIT) + '...' : d;
  }

  get needsCollapse(): boolean {
    return (this.inmueble?.descripcion?.length ?? 0) > this.DESC_LIMIT;
  }

  get allPhotos(): string[] {
    const photos: string[] = [];
    if (this.inmueble?.fotoPrincipal) photos.push(this.BASE + this.inmueble.fotoPrincipal);
    if (this.inmueble?.fotos?.length) photos.push(...this.inmueble.fotos.map((f) => this.BASE + f));
    if (photos.length === 0) photos.push('https://picsum.photos/seed/fallback/1200/700');
    return photos;
  }

  get mapUrl(): string {
    const q = encodeURIComponent((this.inmueble?.zona || '') + ', Sevilla, España');
    return `https://maps.google.com/maps?q=${q}&output=embed&z=14`;
  }

  selectPhoto(i: number) { this.activePhoto = i; }

  openLightbox(i: number) { this.activePhoto = i; this.lightboxOpen = true; }

  nextPhoto() { this.activePhoto = (this.activePhoto + 1) % this.allPhotos.length; }

  prevPhoto() { this.activePhoto = (this.activePhoto - 1 + this.allPhotos.length) % this.allPhotos.length; }

  async share() {
    const url = globalThis.location.href;
    if (navigator.share) {
      await navigator.share({ title: this.inmueble?.titulo, url });
    } else {
      await navigator.clipboard.writeText(url);
      this.shareToast = true;
      setTimeout(() => (this.shareToast = false), 2500);
    }
  }

  sendContact() {
    if (!this.contact.nombre || !this.contact.telefono || !this.contact.mensaje) return;
    this.contactSending = true;
    this.contactError = false;
    this.contactService.send({
      ...this.contact,
      inmuebleTitulo: this.inmueble?.titulo,
      inmuebleId: this.inmueble?.id,
    }).subscribe({
      next: () => { this.contactSending = false; this.contactSent = true; },
      error: () => { this.contactSending = false; this.contactError = true; },
    });
  }
}
