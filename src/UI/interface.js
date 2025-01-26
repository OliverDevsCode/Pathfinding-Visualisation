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

    //add each the nodes to each other nodes neighbours + cost

    //find each node in the Nodes array
    for(let i =0; i < nodes.length;i++){
      if(nodes[i]==nodesToLink[0]){
        nodes[i].addNeighbour(nodesToLink[1],cost)
        console.log("Node 1 after link",nodes[i])
      }
      if(nodes[i]==nodesToLink[1]){
        nodes[i].addNeighbour(nodesToLink[0],cost)
        console.log("Node 2 after link",nodes[i])

      }
    }

  }
}


let nodesToLink = [];
function setModeLink(){
  clicks = 0
  mode = "Link Node"
  nodesToLink = [];
}

function solveGraph(){
  let start = nodes[startSelect.value()-1]
  let goal =  nodes[goalSelect.value()-1]
  if(optionDropDown.value() == "Dijkstra" && (start != "" && goal != "")){
    console.log("Starting Dijkstra")
    Autograph.DijkstraSearch(start,goal) //The values in the box need altering since they are referneces not the actual nodes


  }
}
