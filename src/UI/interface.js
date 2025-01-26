let mode;

let nodes = []

let addButton;
let linkButton;
let optionDropDown;
let solveButton;
let startSelect;
let goalSelect;

let Autograph = new Graph(); //called autograph for automated testing

let options = ["Dijkstra","A*"]

function createUI(){
  addButton = createButton("Add Node")
  linkButton = createButton("Link Nodes")
  optionDropDown = createSelect()
  optionDropDown.option(options[0])
  optionDropDown.option(options[1])
  solveButton = createButton("Solve Button")
  startSelect = createSelect()
  goalSelect = createSelect()
}


let clicks = 0;
function addNodeToGraph(){
  clicks = 0
  mode = "Add Node"
}

function linkNodes(){
  clicks = 0
  mode = "Link Node"
}
