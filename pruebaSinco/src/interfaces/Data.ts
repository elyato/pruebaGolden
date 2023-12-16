export interface vehiculo {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  cilindraje?: string;
  numeroVelocidad?: number;
  image: string;
}

export interface Precios {
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  fechaRegistro: string;
  cilindraje?: string;
  numeroVelocidad?: number;
}
