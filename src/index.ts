// Importo linrería necesarias para cargar el json en memoria
import fs from "fs";
import path from "path";

// Importo las interfaces y classes necesarias para trabajar con los cupones y su config.
import { ConfInterface } from "./interfaces/conf.interface";
import { CuponClass } from "./classes/cupon.class";

// Cargo la conf en memoria
const cuponConfJson = fs.readFileSync(
  path.join(__dirname, "conf.json"),
  "utf-8"
);

// Parseo la conf
const cuponConf = JSON.parse(cuponConfJson) as ConfInterface;

// Creo un objeto de la clas Cupon
const cupon1 = new CuponClass(cuponConf);
const cupon2 = new CuponClass(cuponConf);

cupon1.algoritmoAleatorio();
cupon2.algoritmoCapicuaAleatorio();