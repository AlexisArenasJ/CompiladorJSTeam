class Compilar {
  constructor(file) {
    this.file = file;
    this.content;
    this.lineas = [];
    this.lineasToJS = [];
    this.palabrasReservadas = ["si", "sino", "mostrar", "#", "_", "+", "-"];
  }

  // Lee el txt
  readTextFile() {
    const rawFile = new XMLHttpRequest();

    rawFile.open("GET", this.file, false);
    rawFile.send(null);

    this.content = rawFile.responseText;
    this.content = this.content.replace(/(\r\n|\n|\r)/gm, "");

    this.separarLineas();
  }

  // Separa las lineas de codigo en donde termina _
  separarLineas() {
    let armarLineas = "";
    for (let index = 0; index < this.content.length; index++) {
      armarLineas = armarLineas + this.content[index];

      armarLineas = armarLineas.replace(" ", "");

      if (this.content[index] == "_") {
        this.lineas.push(armarLineas);
        armarLineas = "";
      }
    }
    this.armarVariables();
  }

  armarVariables() {
    let variableJS = "";
    let nombreVariable = "";
    this.lineas.map((data) => {
      for (let index = 0; index < data.length; index++) {
        if (data[index] != "#" && data[index] != "_") {
          nombreVariable = nombreVariable + data[index];
        }

        if (data[index] == "#") {
          variableJS = "let ";
        }

        if (data[index] == "_") {
          variableJS = variableJS + nombreVariable + ";";
          this.lineasToJS.push(variableJS);
          variableJS = "";
          nombreVariable = "";
        }
      }
    });
    this.ejecutarLineas();
  }

    ejecutarLineas() {
        console.log('---LINEAS SEPARADAS DEL TXT (la instruccion termina con un "_")----');
        this.lineas.map(data => {
            console.log(data);
        })
        console.log('---LINEAS  DEL TXT A JS ----');
        this.lineasToJS.map(data => {
            console.log(data);
        })
    }

}
