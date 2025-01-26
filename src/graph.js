class Graph{
  adjacencyList;

  constructor(){
    this.adjacencyList = []
  }

  addNode(node){
    this.adjacencyList.push([node])
    console.log(this.adjacencyList)
  }

  DijkstraSearch(start,goal){
    let path = []
    let cost = 0;
    let table = [];
    //populate table
    //Structure Pick, Node, Cost, Parent
    for(let i = 0; i < this.adjacencyList.length;i++){
      if(this.adjacencyList[i][0]==start){
        table.push([1,this.adjacencyList[i][0],null,null])
      }else{
        table.push([null,this.adjacencyList[i][0],Infinity,undefined])
      }
    }
    //OUTPUT THE TABLE
    console.table(table)

    //Perform the algorithm
    let visted = []
    let startNode;
    for(let i = 0; i <table.length; i++){
      if(table[i][0] == 1){
        startNode = table[i][1]
      }
    }
    console.log(`Start Node ${startNode.num}`)
    //Check neigbours of node
    for(let i = 0; i < startNode.neighbours.length;i++){
      let nodeToCheck = startNode.neighbours[i][0]
      let nodeCost = startNode.neighbours[i][1]
      console.log("Node:",nodeToCheck,"Cost:",nodeCost)
      //Find Node on table
      for(let j = 0; j <table.length;j++){
        if(table[j][1] == nodeToCheck){
          //Now Check Price and Update Parent
          console.log("Found, Cost =",table[j][2])
          console.log("Found, Parent =",table[j][3])


          if(table[j][2]>nodeCost){
            //Changing Cost
            table[j][2] = nodeCost
            table[j][3] = startNode

            //Verify Update
            console.log("Cost =",table[j][2])
            console.log("Parent =",table[j][3])

          }
          
        }
      }//Update Table While
    }//First Node While

    visted.push(startNode.num)//.num for debugging

    //Table after first update
    console.log("Table after first visit")
    console.table(table)

    //Loop over all the other nodes now
    for(let k = 0; k < table.length-1;k++){ //change back to table.length-1 - was for testing only
      let nextNode = Infinity;
      let tableRow; //for add previous cost
      for(let j=0; j<table.length;j++){
        if(table[j][0] == null){
          if(table[j][2] < nextNode){
            nextNode = table[j][1]
            visted.push(nextNode.num)
            table[j][0] = visted.length
            tableRow = j
          }
        }
      }
      //Checking Next Node
      console.log("Next Node =",nextNode.num)

      //Check neigbours of node
      for(let i = 0; i < nextNode.neighbours.length;i++){
        let nodeToCheck = nextNode.neighbours[i][0]
        let nodeCost = nextNode.neighbours[i][1]
        console.log("Node:",nodeToCheck,"Cost:",nodeCost)
        //Find Node on table
        for(let j = 0; j <table.length;j++){
          if(table[j][1] == nodeToCheck){
            //Now Check Price and Update Parent
            console.log("Found, Cost =",table[j][2])
            console.log("Found, Parent =",table[j][3])


            if(table[j][2]>nodeCost + table[tableRow][2]){
              //Changing Cost
              table[j][2] = nodeCost + table[tableRow][2]
              table[j][3] = nextNode

              //Verify Update
              console.log("Cost =",table[j][2] + table[tableRow][2])
              console.log("Parent =",table[j][3])

            }
            
          }
        }//Update Table While

      //Table after node visted
    }//First Node While
    console.log("Table after node visit")
    console.table(table)
    }

    console.log("Order visted =",visted)

    //Table after all visted
    console.log("--------------------------------------------------")
    console.log("--------------------------------------------------")
    console.log("Complete Table")
    console.table(table)

    //Calculate the route cost
    let goal_index;
    for(let i =0;i<table.length; i++){
      if(table[i][1]==goal){
        cost = table[i][2]
        goal_index = i
      }
    }

    console.log("Cost of path =", cost)

    //calculate path
    path.push(table[goal_index][1].num)
    let nextNode = table[goal_index][3]
    while(nextNode != null){
      for(let i = 0; i < table.length;i++){
        if(table[i][1]==nextNode){
          path.push(table[i][1].num)
          nextNode = table[i][3]
        }
      }
    }

    //reverse path
    path.reverse()
    console.log("Path", path)
    return [path,cost]

  }


  draw(){
    for(let i=0; i < this.adjacencyList.length;i++){
      if(this.adjacencyList[i][0].neighbours != undefined){
      for(let j =0; j < this.adjacencyList[i][0].neighbours.length;j++){
        line(this.adjacencyList[i][0].x,this.adjacencyList[i][0].y,this.adjacencyList[i][0].neighbours[j][0].x,this.adjacencyList[i][0].neighbours[j][0].y)
        let midpoint = [(this.adjacencyList[i][0].x+this.adjacencyList[i][0].neighbours[j][0].x)/2,(this.adjacencyList[i][0].y+this.adjacencyList[i][0].neighbours[j][0].y)/2]
        push()
        textSize(25)
        text(this.adjacencyList[i][0].neighbours[j][1],midpoint[0],midpoint[1])
        pop()
      }
    }
    }
    for(let i=0; i < this.adjacencyList.length;i++){
      this.adjacencyList[i][0].draw()
    }
  }

}