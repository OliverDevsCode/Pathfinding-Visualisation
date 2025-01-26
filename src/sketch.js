function setup() {
  createCanvas(800, 800);
  graph = new Graph()
  node1 = new Node(500,500,1)
  node2 = new Node(200,200,2)
  node3 = new Node(600,300,3)

  //Add Neighbours
  node1.addNeighbour(node2,4)
  node1.addNeighbour(node3,2)

  node2.addNeighbour(node1,4)
  node3.addNeighbour(node1,2)

  //Add to graph
  graph.addNode(node1)
  graph.addNode(node2)
  graph.addNode(node3)

  graph.DijkstraSearch(node2,node3) //returns [path,cost]

}

function draw() {
  background(220);
  graph.draw() 
}
