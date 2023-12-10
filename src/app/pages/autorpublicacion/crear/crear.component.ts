import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Autorpublicacion } from '../../../modelos/autorpublicacion.model';
import { AutorpublicacionService } from '../../../servicios/autorpublicacion.service';
import {OnInit } from '@angular/core';
import { PublicacionService } from '../../../servicios/publicacion.service';
import { AutorService } from '../../../servicios/autor.service';
import { Publicacion } from '../../../modelos/publicacion.model';
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;   // Indica si el componente está en modo creación o edición
  id: string = "";     // Identificador del estudiante (en caso de edición)
  intentoEnvio: boolean = false;  // Indica si se ha intentado enviar el formulario
  elAutorpublicacion: Autorpublicacion = {    // Objeto que representa los datos del estudiante

    volumen: "",
    descripcion: "",
    numeropaginas: "",
    id_autor: "",
    id_publicacion: ""
  }

  autorList: any[] = [];
  publicacionList: any[] = [];

  constructor(private miServicioAutorpublicacion: AutorpublicacionService, private autorService: AutorService,
    private publicacionService: PublicacionService, private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Si se recibe un parámetro "id_estudiante" en la URL, se está en modo edición
    this.getAutor();
    this.getPublicacion();

    if (this.rutaActiva.snapshot.params.id_autorpublicacion) {
      this.modoCreacion = false;
      this.id = this.rutaActiva.snapshot.params.id_autorpublicacion;// Obtiene el valor del parámetro "id_estudiante" de la URL y lo asigna a la variable "id_estudiante"
      this.getAutorpublicacion(this.id)
    } else {
      this.modoCreacion = true; // Si no hay valor para "id_estudiante", establece el modo de creación a verdadero, indica que se encuentra en modo de creación
    }
  }
  getAutor(): void {
    this.autorService.listar().subscribe((data) => {
      this.autorList = data;
    });
  }
  getPublicacion(): void {
    this.publicacionService.listar().subscribe((data) => {
      this.publicacionList = data;
    });
  }



  // Obtiene los datos del estudiante utilizando el servicio de estudiantes
  getAutorpublicacion(id: string) {
    this.miServicioAutorpublicacion.getAutorpublicacion(id).
      subscribe((data) => {
        this.elAutorpublicacion = data;
      });
  }


  agregar(): void {
    // Verifica si los datos están completos antes de agregar el inventario
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;

      // Verifica si los nombres de producto y empleado fueron encontrados
      const nombresautor = this.autorList.find(autor => autor._id === this.elAutorpublicacion.id_autor)?.nombres;
      const titulopublicacion= this.publicacionList.find(publicacion => publicacion._id === this.elAutorpublicacion.id_publicacion)?.titulo;
      console.log('ID dela Autor:', this.elAutorpublicacion.id_autor);
      console.log('ID del Publicacion:', this.elAutorpublicacion.id_publicacion);
      console.log('Autor:', this.autorList);
      console.log('Publicacion:', this.publicacionList);
      // Verifica si los nombres de producto y empleado fueron encontrados
      if (!nombresautor || !titulopublicacion) {
        console.error('No se pudo encontrar el nombre del autor o titulo de la publicacion.');
        return;
      }

      // Crea un nuevo inventario utilizando el servicio de inventarios
      this.miServicioAutorpublicacion.crear({
        volumen: this.elAutorpublicacion.volumen,
        descripcion: this.elAutorpublicacion.descripcion,
        numeropaginas: this.elAutorpublicacion.numeropaginas,
        id_autor: nombresautor,
        id_publicacion: titulopublicacion
      },this.elAutorpublicacion.id_autor,this.elAutorpublicacion.id_publicacion).subscribe((autorpublicacionResponse) => {
        console.log('Respuesta del Servicio:', autorpublicacionResponse)
        Swal.fire(
          'Creado',
          'El Autor publicacionha sido creado correctamente',
          'success'
        );
        // Navega hacia la página de listar inventarios utilizando el objeto "router"
        this.router.navigate(["pages/autorpublicacion/listar"]);
      });
    }
  }

  // ...


  // Edita los datos del estudiante utilizando el servicio de estudiantes

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioAutorpublicacion.editar(this.elAutorpublicacion._id, this.elAutorpublicacion,this.elAutorpublicacion.id_autor,this.elAutorpublicacion.id_publicacion)
        .subscribe((data) => {
          console.log('Edición exitosa:', data);
          Swal.fire(
            'Actualizado',
            'El autor publicacion se  ha sido actualizado correctamente',
            'success'
          );
          this.router.navigate(["pages/autorpublicacion/listar"]);
        });
    }
  }
  // Valida si todos los campos obligatorios están completos
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (this.elAutorpublicacion.volumen == "" ||
      this.elAutorpublicacion.descripcion == "" ||
      this.elAutorpublicacion.numeropaginas == "" ||
      this.elAutorpublicacion.id_autor == "" ||
      this.elAutorpublicacion.id_publicacion == "") {
      return false;
    } else {
      return true;
    }
  }
}