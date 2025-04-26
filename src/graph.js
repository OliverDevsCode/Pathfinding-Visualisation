class Graph {
  adjacencyList;

  constructor() {
    // Just an array of Node instances (no [node] wrapper)
    this.adjacencyList = [];
  }

  addNode(node) {
    this.adjacencyList.push(node);
  }

  DijkstraSearch(start, goal) {
    let path = [];
    let cost = 0;
    let table = [];

    // populate table: pickOrder, node, cost, parent
    // start node cost=0, all others = Infinity
    for (let node of this.adjacencyList) {
      if (node === start) {
        table.push([1, node, 0,    null]);
      } else {
        table.push([null, node, Infinity, null]);
      }
    }
    console.table(table);

    let visitOrder = 1;

    let startRow = table.find(r => r[1] === start);
    for (let [nbr, w] of start.neighbours) {
      let nbrRow = table.find(r => r[1] === nbr);
      if (w < nbrRow[2]) {
        nbrRow[2] = w;
        nbrRow[3] = start;
      }
    }
    

    while (true) {
      let smallestCost = Infinity;
      let nextIndex = -1;
      for (let i = 0; i < table.length; i++) {
        if (table[i][0] === null && table[i][2] < smallestCost) {
          smallestCost = table[i][2];
          nextIndex = i;
        }
      }
      if (nextIndex < 0) break;             // no more reachable nodes
      visitOrder++;
      table[nextIndex][0] = visitOrder;     // mark as picked
      let [ , currentNode, currentCost ] = table[nextIndex];
      console.log(`Visiting node: ${currentNode.num} , cost: ${currentCost}`);

      for (let [nbr, w] of currentNode.neighbours) {
        let nbrRow = table.find(r => r[1] === nbr);
        let alt = currentCost + w;
        if (alt < nbrRow[2]) {
          nbrRow[2] = alt;
          nbrRow[3] = currentNode;
        }
      }
      
    }

    // 4) Reconstruct path + cost
    let goalRow = table.find(r => r[1] === goal);
    cost = goalRow[2];
    let cursor = goalRow[1];
    while (cursor) {
      path.push(cursor.num);
      let parent = table.find(r => r[1] === cursor)[3];
      cursor = parent;
    }
    path.reverse();

    console.log(`Path: [${path.join(" → ")}], Cost: ${cost}`);
    return [path, cost, table];
  }

  draw() {
    for (let node of this.adjacencyList) {
      for (let [nbr, w] of node.neighbours) {
        line(node.x, node.y, nbr.x, nbr.y);
        let midX = (node.x + nbr.x) / 2;
        let midY = (node.y + nbr.y) / 2;
        push();
          textSize(25);
          text(w, midX, midY);
        pop();
      }
    }
    for (let node of this.adjacencyList) {
      node.draw();
    }
  }
}
