function setup() {
  createCanvas(800, 800);

  createUI()

  graph = new Graph()
  node1 = new Node(500,500,1)
  node2 = new Node(200,200,2)
  node3 = new Node(600,300,3)
  node4 = new Node(440,150,4)

  //Add Neighbours
  node1.addNeighbour(node2,4)
  node1.addNeighbour(node3,2)

  node2.addNeighbour(node1,4)
  node2.addNeighbour(node4,3)

  node3.addNeighbour(node1,2)


  node4.addNeighbour(node2,3)

  //Add to graph
  graph.addNode(node1)
  graph.addNode(node2)
  graph.addNode(node3)
  graph.addNode(node4)

  graph.DijkstraSearch(node2,node3) //returns [path,cost]

}

function draw() {
  background(220);
  graph.draw() 
  Autograph.draw()
  addButton.mousePressed(addNodeToGraph)
  linkButton.mousePressed(linkNodes)
}

function doubleClicked(){

  if(mode == "Link Node"){
    if(clicks >= 2){
      console.log("Mode Reset")
      mode = "view"
      clicks = 0
    }else{
      console.log("Node Clicked")
    clicks ++
    } 
  }

  if(mode == "Add Node"){
    let num = nodes.length + 1
    let node = new Node(mouseX,mouseY,num)
    nodes.push(node)
    startSelect.option(node.num)
    goalSelect.option(node.num)
    Autograph.addNode(node)
    console.log("Node Added")
    mode = "view"
    console.log("Mode Reset")
  }
  
}
