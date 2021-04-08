const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const boton_empezar = document.getElementById('btnEmpezar')
const ultimo_nivel = 3


class Juego{
    constructor() {
      this.inicializar = this.inicializar.bind(this)
      this.inicializar()
      this.generarSecuencia()
      setTimeout(() => {this.siguienteNivel()
      }, 1000);


    }

    inicializar(){
      this.elegirColor = this.elegirColor.bind(this) // con el bind, queda enlazado al contexto del juego y no crea otro evento por separado
      this.siguienteNivel = this.siguienteNivel.bind(this)
      this.toggleboton()

      this.nivel = 1 //Nivel
      this.colores = {celeste, violeta, naranja, verde} // colores para trabajar

    }

    toggleboton(){
      if (boton_empezar.classList.contains('hide')){ // esto funciona como un swicth
      boton_empezar.classList.remove('hide') // agrega una clase al elemento
    } else {
      boton_empezar.classList.add('hide')
    }
  }
    generarSecuencia(){
      this.secuencia = new Array(ultimo_nivel).fill(0).map(n => Math.floor(Math.random() * 4)) //Para hacer secuencia de numeros pero random
    }

    siguienteNivel(){
      this.subnivel = 0
      this.iluminarSecuencia()
      this.agregarEventosClick()
    }

    transformarNumeroAColor(num){
      switch (num) {
        case 0:
          return "celeste"
        case 1:
          return "violeta"
        case 2:
          return "naranja"
        case 3:
          return "verde"
      }
    }

    transformarColorANumero(nombreColor){
      switch (nombreColor) {
        case "celeste":
          return 0
        case "violeta":
          return 1
        case "naranja":
          return 2
        case "verde":
          return 3
    }}


    iluminarColor(color){
      this.colores[color].classList.add('light')
      setTimeout(() => this.removerColor(color), 350);
    }

    removerColor(color){
      this.colores[color].classList.remove('light')
    }

    iluminarSecuencia(){
      for (let i = 0; i < this.nivel; i++){
        let color = this.transformarNumeroAColor(this.secuencia[i])
        setTimeout(() => this.iluminarColor(color), 1000 * i);
      }
    }



    agregarEventosClick(){
      this.colores.celeste.addEventListener('click', this.elegirColor)
      this.colores.naranja.addEventListener('click', this.elegirColor)
      this.colores.violeta.addEventListener('click', this.elegirColor)
      this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
      this.colores.celeste.removeEventListener('click', this.elegirColor)
      this.colores.naranja.removeEventListener('click', this.elegirColor)
      this.colores.violeta.removeEventListener('click', this.elegirColor)
      this.colores.verde.removeEventListener('click', this.elegirColor)

    }

    elegirColor(ev){
      const nombreColor = ev.target.dataset.color //el dataser color viene del html, data-color="celeste"></div>
      const numeroColor = this.transformarColorANumero(nombreColor)
      this.iluminarColor(nombreColor)

      if(numeroColor === this.secuencia[this.subnivel]){
        this.subnivel++
        if (this.subnivel === this.nivel) {
          this.nivel++
          this.eliminarEventosClick()
          if(this.nivel === (ultimo_nivel + 1)){
            this.ganaste()

          }  else{
              setTimeout(this.siguienteNivel, 1500);
        }}
      }
      else {
        this.perdiste()

      }
    }

    ganaste(){
      swal('Felicidades','Ganaste', 'succes')
      .then( this.inicializar.bind(this) )
    }

    perdiste(){
      swal('Oh no!!','Perdiste', 'error')
      .then(()=> {this.eliminarEventosClick()
        this.inicializar()
      })
    }

}



function empezarJuego(){
  var juego = new Juego()
}
