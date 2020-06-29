/*
 * @Description: 链表结构
 * @Author: 郭军伟
 * @Date: 2020-06-29 15:37:37
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-06-29 19:42:36
 */
const log = console.log;

// 单向链表
// function Node(element) {
//   this.element = element;
//   this.next = null;
// }
// 链表类的操作  插入 删除 查找  显示列表元素
// class LList {
//   constructor() {
//     this.head = new Node('head');
//   }

//   insert(element, item) {
//     // 在item节点后面插入新节点
//     let newNode = new Node(element);
//     let currentNode = this.find(item);
//     newNode.next = currentNode.next;
//     currentNode.next = newNode;
//   }

//   remove(item) {
//     let prevNode = this.findPrev(item); // 找到删除节点的前一个节点
//     if (prevNode.next !== null) {
//       prevNode.next = prevNode.next.next;
//     }
//   }

//   find(item) {
//     let currentNode = this.head;
//     while (currentNode !== null && currentNode.element !== item) {
//       currentNode = currentNode.next;
//     }
//     return currentNode;
//   }

//   findPrev(item) {
//     let prevNode = this.head;
//     while (prevNode.next !== null && prevNode.next.element !== item) {
//       prevNode = prevNode.next;
//     }
//     return prevNode;
//   }

//   display() {
//     let currentNode = this.head.next;
//     while (currentNode !== null) {
//       // 从头节点的下一个节点开始
//       log(currentNode.element);
//       currentNode = currentNode.next;
//     }
//   }
// }

// 单项链表测试
// var cities = new LList();
// cities.insert('Conway', 'head');
// cities.insert('Russellville', 'Conway');
// cities.insert('Carlisle', 'Russellville');
// cities.insert('Alma', 'Carlisle');
// cities.display();
// cities.remove('Carlisle');
// cities.display();

// 双向链表
// function Node(element) {
//   this.element = element;
//   this.next = null;
//   this.previous = null;
// }
// class LList {
//   constructor() {
//     this.head = new Node('head');
//   }
//   insert(element, item) {
//     // 在item节点后插入element元素节点
//     let newNode = new Node(element);
//     let currentNode = this.find(item);
//     newNode.next = currentNode.next; // 修改插入节点的next和privious
//     newNode.previous = currentNode;
//     if (currentNode.next !== null) {
//       // currentNode不是最后一个节点
//       currentNode.next.previous = newNode; // 修改currentNode节点后面节点的previous
//     }
//     currentNode.next = newNode; // 修改currentNode节点的next
//   }
//   find(item) {
//     let currentNode = this.head;
//     while (currentNode !== null && currentNode.element !== item) {
//       currentNode = currentNode.next;
//     }
//     return currentNode;
//   }
//   remove(item) {
//     let currentNode = this.find(item);
//     if (currentNode.next !== null) {
//       // 删除的不是最后一个节点
//       currentNode.previous.next = currentNode.next;
//       currentNode.next.previous = currentNode.previous;
//       currentNode.next = null;
//       currentNode.previous = null;
//     } else {
//       // 删除的是最后一个节点
//       currentNode.previous.next = null;
//       currentNode.next = null;
//       currentNode.previous = null;
//     }
//   }
//   display() {
//     let currentNode = this.head.next;
//     while (currentNode !== null) {
//       log(currentNode.element);
//       currentNode = currentNode.next;
//     }
//   }
//   // 查找最后一个节点
//   findLast() {
//     let currentNode = this.head;
//     while (currentNode.next !== null) {
//       currentNode = currentNode.next;
//     }
//     return currentNode;
//   }
//   // 反向打印节点, 不打印head节点
//   displayReverse() {
//     let lastNode = this.findLast();
//     while (lastNode.previous !== null) {
//       log(lastNode.element);
//       lastNode = lastNode.previous;
//     }
//   }
// }

// var cities = new LList();
// cities.insert('Conway', 'head');
// cities.insert('Russellville', 'Conway');
// cities.insert('Carlisle', 'Russellville');
// cities.insert('Alma', 'Carlisle');
// cities.display();
// log();
// cities.remove('Carlisle');
// cities.display();
// log();
// cities.displayReverse();

// 创建循环链表  最后一个节点的next 执行头节点
function Node(element) {
  this.element = element;
  this.next = null;
}
// 链表类的操作  插入 删除 查找  显示列表元素
class LList {
  constructor() {
    this.head = new Node('head');
    this.head.next = this.head;
  }

  insert(element, item) {
    // 在item节点后面插入新节点
    let newNode = new Node(element);
    let currentNode = this.find(item);
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }

  remove(item) {
    let prevNode = this.findPrev(item); // 找到删除节点的前一个节点
    if (prevNode.next !== this.head) {
      prevNode.next = prevNode.next.next;
    }
  }

  find(item) {
    let currentNode = this.head;
    while (currentNode.element !== item && currentNode.next !== this.head) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  findPrev(item) {
    let prevNode = this.head;
    while (prevNode.next.element !== item && prevNode.next.next !== this.head) {
      prevNode = prevNode.next;
    }
    return prevNode;
  }

  display() {
    let currentNode = this.head.next;
    while (currentNode !== this.head) {
      // 从头节点的下一个节点开始
      log(currentNode.element);
      currentNode = currentNode.next;
    }
  }
}

var cities = new LList();
cities.insert('Conway', 'head');
cities.insert('Russellville', 'Conway');
cities.insert('Carlisle', 'Russellville');
cities.insert('Alma', 'Carlisle');
cities.display();
cities.remove('Carlisle');
cities.display();
