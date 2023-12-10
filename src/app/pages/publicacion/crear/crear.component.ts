import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Publicacion } from '../../../modelos/publicacion.model';
import { PublicacionService } from '../../../servicios/publicacion.service';
import { OnInit } from "@angular/core";
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_publicacion: string = "";
  intentoEnvio: boolean = false;
  lapublicacion: Publicacion = {
    titulo: "",
    isbn: "",
    fecha: "",
    programa: ""
  };

  constructor(
    private miServicioPublicacion: PublicacionService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_publicacion) {
      this.modoCreacion = false;
      this.id_publicacion = this.rutaActiva.snapshot.params.id_publicacion;
      this.getPublicacion(this.id_publicacion);
    } else {
      this.modoCreacion = true;
    }
  }

  getPublicacion(id: string) {
    this.miServicioPublicacion.getPublicacion(id).subscribe(data => {
      this.lapublicacion = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioPublicacion.crear(this.lapublicacion).subscribe(data => {
        Swal.fire(
          'Creado',
          'La publicacion ha sido creada correctamente',
          'success'
        );
        this.router.navigate(["pages/publicacion/listar"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioPublicacion
        .editar(this.lapublicacion._id, this.lapublicacion)
        .subscribe(data => {
          Swal.fire(
            'Actualizada',
            'La pubicacion ha sido actualizada correctamente',
            'success'
          );
          this.router.navigate(["pages/publicacion/listar"]);
        });
    }
  }

  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.lapublicacion.titulo == "" ||
      this.lapublicacion.isbn == "" ||
      this.lapublicacion.fecha == "" ||
      this.lapublicacion.programa == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
