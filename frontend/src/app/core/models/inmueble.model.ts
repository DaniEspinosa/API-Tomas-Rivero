export interface Inmueble {
  id?: number;
  titulo: string;
  descripcion?: string;

  operacion: 'alquiler' | 'venta';
  tipo:
    | 'piso'
    | 'atico'
    | 'duplex'
    | 'estudio'
    | 'chalet_pareado'
    | 'chalet_adosado'
    | 'casa_independiente'
    | 'oficina'
    | 'local'
    | 'nave'
    | 'plaza_garaje'
    | 'terreno'
    | 'habitacion'
    | 'trastero';

  zona: string;
  dormitorios: number;
  banos: number;
  metrosUtiles: number;
  metrosConstruidos: number;
  metrosParcela: number;
  precio: number;

  estado: 'a reformar' | 'en buen estado' | 'obra nueva';
  orientacion?: 'norte' | 'sur' | 'este' | 'oeste';
  anoConstruccion?: number;
  calefaccion: 'individual' | 'central' | 'no disponible';
  gastosComunidad?: number;

  caracteristicas?: string[];
  ascensor?: boolean;

  fotoPrincipal?: string;
  urlIdealista?: string;
}
