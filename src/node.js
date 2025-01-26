class Node{
  x;
  y;
  num;
  neighbours;

  constructor(x,y,num){
    this.x = x;
    this.y = y;
    this.num = num
    this.neighbours = []
  }

  draw(){
    circle(this.x,this.y,50)
    push()
    textAlign(CENTER)
    textStyle(BOLD)
    textSize(25)
    text(this.num,this.x,this.y+6)
    pop()
  }


  addNeighbour(node,cost){
    this.neighbours.push([node,cost])
    // console.log(this.neighbours)
  }


}