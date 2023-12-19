export interface Moto {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  cilindraje: number;
  numeroVelocidad: number;
  image: string;
}

export interface Carro {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  image: string;
}

export interface Precios {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  fechaRegistro: string;
  cilindraje?: string;
  numeroVelocidad?: number;
}

export interface respuestaPeticion {
  estado: boolean;
  mensaje: string;
}

export interface Cliente {
  id: 0;
  nombreCompleto: string;
  cedula: string;
}
