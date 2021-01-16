import fs from "fs";
import path from "path";

import { MethodsClass } from "./methods.class";
import { ConfInterface } from "../interfaces/conf.interface";

export class CuponClass extends MethodsClass {
  private _result: string;
  readonly sorteo: string;
  constructor(public conf: ConfInterface) {
    super();
    this._result = "\n";
    this.sorteo = conf.informacion.sorteo;
  }

  get result() {
    return this._result;
  }

  // Este algoritmo va a generar una lista de cupones con numeros aleatorios
  algoritmoAleatorio() {
    // Chequeo si el alrotimo debe ejecutarse
    if (this.stopAlgorithm()) return;

    const cantidadBolas = this.conf.bolasDisponibles.length;
    // Genero un bucle que generará un cupón en cada iteración
    for (let i = 0; i < this.conf.cantidadBoletos; i++) {
      let cupon = "";
      // Genero un bucle que añadira un numero al boleto en cada iteración
      for (let j = 0; j < this.conf.numerosPorBoleto; j++) {
        const posicionBolaAleatoria = Math.round(
          Math.random() * (cantidadBolas - 1)
        );
        const bolaAleatoria = this.conf.bolasDisponibles[posicionBolaAleatoria];
        cupon += bolaAleatoria;
      }
      this._result += `${cupon} \n`;
    }
    this.createCuponListFile("AlgoritmoAleatorio", this.result);
  }

  // Este algoritmo va a generar una lista de cupones con numeros aleatorios y capicua
  algoritmoCapicuaAleatorio() {
    // Chequeo si el alrotimo debe ejecutarse
    if (this.stopAlgorithm()) return;

    const numerosPorBoletoPar = this.conf.numerosPorBoleto % 2 === 0;
    const cantidadBolas = this.conf.bolasDisponibles.length;
    // Genero un bucle que generará un cupón en cada iteración
    for (let i = 0; i < this.conf.cantidadBoletos; i++) {
      let cupon = "";
      let cuponSecondPart = "";
      // Genero un bucle que añadira un numero al boleto en cada iteración
      for (let j = 0; j < this.conf.numerosPorBoleto; j++) {
        const posicionBolaAleatoria = Math.round(
          Math.random() * (cantidadBolas - 1)
        );
        const bolaAleatoria = this.conf.bolasDisponibles[posicionBolaAleatoria];
        cupon += bolaAleatoria;

        // Si estoy en un cupon con una cantidad de numeros par termino el bucle e invierto
        // lo numeros acumulados del cupon para añadirselos
        if (numerosPorBoletoPar && j === this.conf.numerosPorBoleto / 2 - 1) {
          for (let z = cupon.length - 1; z >= 0; z--) {
            cuponSecondPart += cupon[z];
          }
          cupon += cuponSecondPart;
          break;
        } else if (
          !numerosPorBoletoPar &&
          j === Math.floor(this.conf.numerosPorBoleto / 2)
        ) {
          for (let z = cupon.length - 2; z >= 0; z--) {
            cuponSecondPart += cupon[z];
          }
          cupon += cuponSecondPart;
          break;
        }
      }
      this._result += `${cupon} \n`;
    }
    this.createCuponListFile("AlgoritmoCapicuaAleatorio", this.result);
  }

  protected stopAlgorithm() {
    // Si no hay bolas disponibles termina la ejecución de la función
    if (this.conf.bolasDisponibles.length === 0) {
      this._result = "No hay bolas y no se pueden generar boletos.";
    }

    // Si no se indica cuantos numeros por boleto se quieren termina la ejecución de la función
    if (this.conf.numerosPorBoleto === 0) {
      this._result =
        "Necesitamos que indiques cuantos números tiene que tener cada boleto.";
    }

    // Si no se indican la cantidad de boletos a generar termina la ejecución de la función
    if (this.conf.cantidadBoletos === 0) {
      this._result = "No se ha generado ningún boleto.";
    }

    if (
      this.conf.bolasDisponibles.length === 0 ||
      this.conf.numerosPorBoleto === 0 ||
      this.conf.cantidadBoletos === 0
    ) {
      this.showCupones();
      return true;
    }
    return false;
  }

  private createCuponListFile(tipoCupon: string, cupon: string) {
    const actualDate = Date.now();
    fs.writeFileSync(
      path.join(__dirname, `../listas/${tipoCupon}${actualDate}.txt`),
      cupon
    );
  }

}
