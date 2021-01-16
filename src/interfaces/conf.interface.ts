export interface ConfInterface {
  informacion: {
    sorteo: string;
    fecha: Date;
    premio: string;
  };
  cantidadBoletos: number;
  numerosPorBoleto: number,
  bolasDisponibles: number[];
}
