let mode;

let nodes = []

let addButton;
let linkButton;
let optionDropDown;
let solveButton;
let startSelect;
let goalSelect;
let resetButton;

let pathText;
let costText;

let graph = new Graph(); //called graph for automated testing

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
  resetButton = createButton("Reset")
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
    drawResults(graph.DijkstraSearch(start,goal)) //The values in the box need altering since they are referneces not the actual nodes
  }
}

function drawResults([path,cost,table]){
  if(pathText != undefined){
    pathText.remove()
  }
  //Turn path into readable format
  let formatPath = ""
  for(let i = 0; i < path.length; i++){
    if(i == path.length-1){
      formatPath += path[i] + " " 
    }else{
      formatPath += path[i] + " " + ">" +" "
    }
  }
  rect(width,height-20,100,20)
  pathText = createP(`Path: ${formatPath} Cost: ${cost}`)
  pathText.style('font-family', 'Consolas')
  //format table
  for(let i = 0; i< table.length;i++){
    if(table[i][3] != null){
      table[i][3] =table[i][3].num
    }
    table[i][1] =table[i][1].num
  }

  let formattedTable = [["Pick","Node","Cost","Parent"]]
  for(let i = 0; i < table.length; i++){
    formattedTable.push(table[i])
  }

  console.table(formattedTable)

}

function reset(){
  nodes =[]
  graph = new Graph();
  if(pathText != undefined){
    pathText.remove()
  }
  startSelect.remove()
  goalSelect.remove()
  resetButton.remove()
  startSelect = createSelect()
  goalSelect = createSelect()
  resetButton = createButton("Reset")
}

function doubleClicked(){
  if(mode == "Link Node"){
      console.log("Node Clicked")
      //calculate if node pressed
      for(let i = 0; i < nodes.length;i++){
        range = dist(mouseX,mouseY,nodes[i].x,nodes[i].y)
        if(range < 50){
          console.log("In Range")
          nodesToLink.push(nodes[i])
          clicks ++
          if(clicks > 1){
            linkNodes(nodesToLink)
            console.log("Mode Reset")
            mode = "view"
            clicks = 0
          }
        }
      }
  }
  
  if(mode == "Add Node"){
    let num = nodes.length + 1
    let node = new Node(mouseX,mouseY,num)
    nodes.push(node)
    startSelect.option(node.num)
    goalSelect.option(node.num)
    graph.addNode(node)
    console.log("Node Added")
    mode = "view"
    console.log("Mode Reset")
  }
}
