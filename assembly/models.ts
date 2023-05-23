
import { context, PersistentVector, u128 } from "near-sdk-as";

@nearBindgen
export class Servicio {
  servicio: string;
  descripcion: string;
  owner: string;
  imagen: string;
  direccion: string;
  costo: string;

  constructor(servicio: string, descripcion: string, imagen: string, direccion: string, costo: string) {
    this.owner = context.sender;
    this.servicio = servicio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.direccion = direccion;
    this.costo = costo;
  }
}

@nearBindgen
export class Recomendation {
  user: string;
  constructor() {
    this.user = context.sender;
  }
}

export const allServices = new PersistentVector<Servicio>("v");
export const allRecommendations = new PersistentVector<Recomendation>("c");
export const ONE_NEAR = u128.from('10000000000000000');
