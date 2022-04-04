class myPacMen extends HTMLElement {
    constructor() {
      super();
    }
 
  connectedCallback() {
    this.innerHTML = `
    <link rel= "stylesheet" href="styles.css" >
    <body> 
        <div id='game' class = "divgame" >
          <button class = "btn-make" onclick= 'makeOne()' > Add PacMan </button>
          <button class = "btn-update" onclick = 'update()'> Start </button> 
          <button class = "btn-pause" onclick = 'pauseGame()'> Pause </button> 
          <button class = "btn-stop" onclick = 'stopGame()'> Stop </button> 
        </div>
    </body>
    <script src="pacmen.js">     
    </script>
                                                                                                       
    `;
  }
}

customElements.define('pacmen-comp', myPacMen);
