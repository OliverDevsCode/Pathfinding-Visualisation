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
  exportButton.mousePressed(exportGraph)
}
