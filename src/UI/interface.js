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

function linkNodes(nodesToLink){
  console.log(nodesToLink)
  //when nodesToLink length = 2, perform link process
  if(nodesToLink.length =2){
    //calculate distance for cost
    let cost = dist(nodesToLink[0].x,nodesToLink[0].y,nodesToLink[1].x,nodesToLink[1].y)
    //Make the Cost smaller and easier to read
    cost = Math.floor(cost/50)
    console.log(cost)


  }
}


let nodesToLink = [];
function setModeLink(){
  clicks = 0
  mode = "Link Node"
  nodesToLink = [];
}
