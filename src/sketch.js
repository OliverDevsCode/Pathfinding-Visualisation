function setup() {
  createCanvas(800, 800);

  createUI()


}

function draw() {
  background(220);
  graph.draw()
  addButton.mousePressed(addNodeToGraph)
  linkButton.mousePressed(setModeLink)
  solveButton.mousePressed(solveGraph)
  resetButton.mousePressed(reset)
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
