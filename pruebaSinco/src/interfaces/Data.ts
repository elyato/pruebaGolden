export interface Moto {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  cilindraje?: number;
  numeroVelocidad?: number;
  image: string;
}

export interface Carro {
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
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  fechaRegistro: string;
  cilindraje?: string;
  numeroVelocidad?: number;
}
