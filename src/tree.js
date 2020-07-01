/*
 * @Description: 第十章 二叉树的学习
 * @Author: 郭军伟
 * @Date: 2020-07-01 10:23:33
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-07-01 15:54:35
 */
const log = console.log;
// 树的特点： 非线性、分层；查找、添加、删除速度非常快
// 树相关概念：根节点、父节点、子节点、叶子结点、深度
// 二叉树：每个节点的子节点不允许超过两个的树；
// 二叉树相关概念：左节点、右节点
// 二叉查找树：一种特殊的二叉树，相对较小的值保存在左节点，较大的值保存在右节点

// 10.2.1 实现二叉查找树
// 创建二叉树节点类
// class Node {
//   constructor(data, left, right) {
//     this.data = data;
//     this.left = left;
//     this.right = right;
//   }
//   show() {
//     return this.data;
//   }
// }
// class BST {
//   constructor() {
//     this.root = null;
//   }
//   insert(data) {
//     let node = new Node(data, null, null);
//     if (this.root == null) {
//       this.root = node;
//     } else {
//       let current = this.root;
//       while (true) {
//         if (data <= current.show()) {
//           if (current.left == null) {
//             current.left = node;
//             break;
//           } else {
//             current = current.left;
//           }
//         } else {
//           if (current.right == null) {
//             current.right = node;
//             break;
//           } else {
//             current = current.right;
//           }
//         }
//       }
//     }
//   }
//   getMin() {
//     let current = this.root;
//     while (true) {
//       if (current.left == null) {
//         return current.data;
//       }
//       current = current.left;
//     }
//   }
//   getSmallest(node) {
//     // 找到二叉查找树中值最小的节点
//     while (true) {
//       if (node.left == null) {
//         return node;
//       }
//       node = node.left;
//     }
//   }
//   getMax() {
//     let current = this.root;
//     while (true) {
//       if (current.right == null) {
//         return current.data;
//       }
//       current = current.right;
//     }
//   }
//   find(data) {
//     let current = this.root;
//     while (current != null) {
//       if (current.data === data) {
//         return current;
//       } else if (data < current.data) {
//         current = current.left;
//       } else {
//         current = current.right;
//       }
//     }
//     return undefined;
//   }
//   remove(data) {
//     /**
//      * 从 BST 中删除节点的第一步是判断当前节点是否包含待删除的数据，
//      * 如果包含，则删除该 节点；如果不包含，则比较当前节点上的数据和待删除的数据。
//      * 如果待删除数据小于当前 节点上的数据，则移至当前节点的左子节点继续比较；
//      * 如果删除数据大于当前节点上的数 据，则移至当前节点的右子节点继续比较。
//      * 如果待删除节点是叶子节点（没有子节点的节点），那么只需要将从父节点指向它的链接
//      * 指向 null。如果待删除节点只包含一个子节点，那么原本指向它的节点久得做些调整，
//      * 使其指向它的 子节点。最后，如果待删除节点包含两个子节点，正确的做法有两种：
//      * 要么查找待删除节点左子树 上的最大值，要么查找其右子树上的最小值。这里我们选择后一种方式。
//      * 我们需要一个查找子树上最小值的方法，后面会用它找到的最小值创建一个临时节点。
//      * 将临时节点上的值复制到待删除节点，然后再删除临时节点。
//      */
//     this.root = this.removeNode(this.root, data);
//   }
//   removeNode(node, data) {
//     if (node == null) {
//       // 空节点
//       return null;
//     }
//     if (node.data === data) {
//       // node为待删除的节点时
//       if (node.left == null && node.right == null) {
//         // 没有子节点
//         return null;
//       }
//       if (node.left == null) {
//         // 只有右节点
//         return node.right;
//       }
//       if (node.right == null) {
//         // 只有左节点
//         return node.left;
//       }
//       // 左右节点均存在
//       let tempNode = this.getSmallest(node.right);
//       node.data = tempNode.data;
//       node.right = this.removeNode(node.right, tempNode.data);
//       return node;
//     }
//     if (data < node.data) {
//       node.left = this.removeNode(node.left, data);
//       return node;
//     } else {
//       node.right = this.removeNode(node.right, data);
//       return node;
//     }
//   }
// }

// function inOrder(node) {
//   // 中序遍历
//   if (node != null) {
//     inOrder(node.left);
//     log(node.show() + ' ');
//     inOrder(node.right);
//   }
// }
// function preOrder(node) {
//   // 先序遍历
//   if (node != null) {
//     log(node.show() + ' ');
//     preOrder(node.left);
//     preOrder(node.right);
//   }
// }
// function postOrder(node) {
//   // 后序遍历
//   if (node != null) {
//     postOrder(node.left);
//     postOrder(node.right);
//     log(node.show() + ' ');
//   }
// }

// var nums = new BST();
// nums.insert(23);
// nums.insert(45);
// nums.insert(16);
// nums.insert(37);
// nums.insert(3);
// nums.insert(99);
// nums.insert(22);
// log('Inorder traversal: ');
// inOrder(nums.root);
// log('preorder traversal: ');
// preOrder(nums.root);
// log('postorder traversal: ');
// postOrder(nums.root);

// 10.3 在二叉树上进行查找
// 三种类型的查找  查找给定值，查找最大值getMax，查找最小值getMin
// var min = nums.getMin();
// log('The minimum value of the BST is: ' + min);
// var max = nums.getMax();
// log('The maximum value of the BST is: ' + max);
// 查找给定值
// inOrder(nums.root);
// var found = nums.find(23);
// if (found != null) {
//   log('Found ' + 23 + ' in the BST.');
// } else {
//   log(23 + ' was not found in the BST.');
// }

// 测试删除节点
// nums.remove(45);
// log('Inorder traversal: ');
// log(nums.root);
// inOrder(nums.root);

// 计数
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.count = 1;
    this.left = left;
    this.right = right;
  }
  show() {
    return this.data;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.count = 0;
  }
  insert(data) {
    let node = new Node(data, null, null);
    if (this.root == null) {
      this.root = node;
      this.count++;
    } else {
      let current = this.root;
      while (true) {
        if (data <= current.show()) {
          if (current.left == null) {
            current.left = node;
            this.count++;
            break;
          } else {
            current = current.left;
          }
        } else {
          if (current.right == null) {
            current.right = node;
            this.count++;
            break;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
  update(data) {
    let grade = this.find(data);
    grade.count++;
    return grade;
  }
  length() {
    return this.count;
  }
  getEdge() {
    // 获取树的边条数
    return this.count - 1;
  }
  getMin() {
    let current = this.root;
    while (true) {
      if (current.left == null) {
        return current.data;
      }
      current = current.left;
    }
  }
  getSmallest(node) {
    // 找到二叉查找树中值最小的节点
    while (true) {
      if (node.left == null) {
        return node;
      }
      node = node.left;
    }
  }
  getMax() {
    let current = this.root;
    while (true) {
      if (current.right == null) {
        return current.data;
      }
      current = current.right;
    }
  }
  find(data) {
    let current = this.root;
    while (current != null) {
      if (current.data === data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }
}

function genArray(len) {
  let nums = [];
  for (let i = 0; i < len; i++) {
    nums.push(~~(Math.random() * 40) + 60);
  }
  return nums;
}
function batchInsert(nums, bst) {
  for (let i = 0; i < nums.length; i++) {
    if (bst.find(nums[i])) {
      bst.update(nums[i]);
    } else {
      bst.insert(nums[i]);
    }
  }
}
function batchLog(values, bst) {
  let node;
  for (let i = 0; i < values.length; i++) {
    if ((node = bst.find(values[i]))) {
      log(`Occurrences of ${values[i]}: ${node.count}`);
    } else {
      log(`No occurrences of ${values[i]} `);
    }
  }
}
let nums = genArray(10);
let bst = new BST();
batchInsert(nums, bst);
let values = [61, 69, 68, 85, 81, 75];
batchLog(values, bst);
log(`节点数量: ${bst.length()}`);
log(`边数量: ${bst.getEdge()}`);
