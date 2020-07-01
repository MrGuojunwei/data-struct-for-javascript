/*
 * @Description: 第十一章  图的学习
 * @Author: 郭军伟
 * @Date: 2020-07-01 15:55:55
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-07-01 19:45:57
 */

// 图：由边的集合及顶点的集合组成 顶点也有权重，也称为成本
// 顶点对有序的图，称为有向图， 边可以绘制箭头来表示有向
// 顶点无序的图，称之为无向图
// 一系列顶点构成路径  路径长度由路径中第一个顶点到最后一个顶点之间边的数量表示
// 指向自身的顶点组成的路径称为环，环的长度为0
// 圈：至少一条边的路径，且路径第一个顶点和最后一个顶点相同
// 无论是有向图还是无向图，只要是没有重复边或重复顶点的圈，就是一个简单圈
// 除了第一个和最后一个顶点以外，路径的其他顶点有重复的圈称为平凡圈
// 如果两个顶点之间有路径，那么这两个顶点就是强连通的；。如果有向图的所有的顶点都是强连通的，那么这个有向图也是强连通的。

// 现实中的图：交通流量、航空运输、互联网、消费市场
const log = console.log;

class Vertex {
  constructor(label) {
    this.label = label;
  }
}
// 图的实际信息都保存在边上，表示图的边的方法称为邻接表或邻接表数组，这种方法将边存储为由顶点的相邻顶点列表构成的数组，并以此顶点作为索引
// 另一种表示图边的方法被称为邻接矩阵，它是一个二维数组，其中的元素表示两个顶点之间是否有一条边

// 构建图
class Graph {
  constructor(v) {
    this.vertices = v; // 顶点数量
    this.edges = 0;
    this.edgeTo = [];
    this.adj = [];
    this.marked = [];
    for (let i = 0; i < this.vertices; i++) {
      this.adj[i] = [];
      this.marked[i] = false;
      // this.adj[i].push('');
    }
  }
  addEdge(v, w) {
    // v,w表示两个订单
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  }
  showGraph() {
    let str = '';
    for (let i = 0; i < this.vertices; i++) {
      str = '';
      for (let j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] != undefined) {
          str += `${this.adj[i][j]} `;
        }
      }
      log(`${i} -> ${str}`);
    }
  }
  dfs(v) {
    this.marked[v] = true;
    if (this.adj[v] != undefined) {
      log(`"Visited vertex: ${v}`);
    }
    for (let i = 0; i < this.adj[v].length; i++) {
      let w = this.adj[v][i];
      if (!this.marked[w]) {
        this.dfs(w);
      }
    }
  }
  bfs(s) {
    let queue = [];
    queue.push(s);
    while (queue.length > 0) {
      let v = queue.shift();
      if (v != undefined) {
        this.marked[v] = true;
        // log(`Visisted vertex: ${v}`);
      }
      for (let i = 0; i < this.adj[v].length; i++) {
        let w = this.adj[v][i];
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          queue.push(w);
        }
      }
    }
  }
  pathTo(v) {
    let source = 0; // 起始位置
    this.bfs(source); // 首先进行广度优先遍历进行标记和edgeTo数据添加
    if (!this.marked[v]) {
      return undefined;
    }
    let paths = [];
    let i = v;
    do {
      paths.push(i);
      i = this.edgeTo[i];
    } while (i != source);
    paths.push(i);
    return paths.sort();
  }
}
g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
// g.showGraph();
// g.dfs(0);
// g.bfs(0);

// 11.4 搜索图  搜索算法：深度优先 广度优先
// 深度优先搜索算法比较简单：访问一个没有访问过的顶点，将它标记为已访问，再递归地 去访问在初始顶点的邻接表中其他没有访问过的顶点。
// (1) 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中；
// (2) 从图中取出下一个顶点 v，添加到已访问的顶点列表；
// (3) 将所有与 v 相邻的未访问顶点添加到队列。

// 11.5 查找最短路径
// 图最常见的操作之一就是寻找从一个顶点到另一个顶点的最短路径。
// 广度优先搜索对应的最短路径
var vertex = 4;
var paths = g.pathTo(vertex);
if (paths != undefined) {
  log(paths.join('-'));
}

// 拓扑排序  拓扑排序会对有向图的所有顶点进行排序，使有向边从前面的顶点指向后面的顶点
// 拓扑排序算法与深度优先搜索类似。不同的是，拓扑排序算法不会立即输出已访问的顶 点，
// 而是访问当前顶点邻接表中的所有相邻顶点，直到这个列表穷尽时，才将当前顶点压入栈中
