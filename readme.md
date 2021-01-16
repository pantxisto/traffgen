El programa se trata de un script que se ejecuta a traves del npm.

Se ha optado por la implementación de una clase cupón que hereda la clase methods (anecdíticamente, para implementar el método abstracto showCupones).
Esta clase tiene las siguientes propiedades y métodos:
-_result: es la lista de cupones generados. Es una propiedad privada por lo que para accederla desde fuera tendríamos que usar el get que hay creado y que se llama result;
-sorteo: propiedad anecdótica de solo lectura para informarnos de que tipo de sorteo es el que se está realizando.
-conf: es una propiedad declarada a traves del constructorr y definida a través de la interfaz
ConfInterface.
-result: Es un getter para la propiedad privada _result.
-algoritmoAleatorio: es el método que nos generará la lista de cupones aleatorios. Pública porue se accede desde index.ts.
-algoritmoCapicuaAleatorio: es el método que nos generará la lista de cupones capicua aleatorios. Publica porque se accede desde index.ts.
-stopAlgorithm: método que solo se usa en la propia clase para detener ambos algoritmos si alguna de las propiedades modificadas, no tiene sentido, como por ejemplo que no haya ninguna bola. Es protected porque solo se usa en la clase y es heredada de MethodsClass
-createCuponListFile: método que genera el archivo txt con la lista de cupones. Es privada porque solo se usa en la propia clase.

Se ha añadido un archivo docker-compose para generar los mismo archivos a través de un bind mount en la misma carpeta listas. Si se tiene instalado docker-compose evitará ensuciar el entorno de la máquina si llegara el caso.

El fichero de configuración definirá los cupones a través de las variables: 
    -Cantidad de cupones a generar.
    -Números que queremos utilizar para generar cada cupón.
    -Cantidad de números que tiene que tener cada cupón.

El prorama está compuesto por 2 algoritmos:
    -algoritmoAleatorio: Genera una lista de cupones aleatorios (sus numeros) y crea un archivo txt con la
    lista en la carpeta lista.
    -algoritmoCapicuaAleatorio: Genera una lista de cupones aleatorios (sus numeros) capicuas y crea un archivo txt con la lista en la carpeta lista.


Se puede ejecutar la aplicación de 3 maneras:
    1-Desarrollo: npm run dev. Genera 2 listas de boletos cada vez que se ejecuta nodemon.
    2-Producción node: npm run start. Genera 2 listas de boletos cada vez que se ejecuta node.
    3-Producción docker: docker-compose up