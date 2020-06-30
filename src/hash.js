/*
 * @Description: 第8章 散列
 * @Author: 郭军伟
 * @Date: 2020-06-30 09:38:15
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-06-30 15:00:10
 */
const fs = require('fs');
const path = require('path');
const log = console.log;
// 在散列表上插入、删除、取用数据都非常快，但是查找操作却效率低下
// 散列表基于数据进行设计，所有元素根据键值保存在数据的特定位置，使用散列表时，通过散列函数将键映射为一个数字，这个数字的
// 范围是0到散列表的长度。
/**
 * 理想情况下，散列函数会为每个键值映射为一个唯一的数组索引，但是实际情况有可能两个键映射同一个值，这种现象称为碰撞
 * 最后一个问题是：数组应该有多大，这是编写散列函数时必须要考虑的，数组长度应该是个质数
 */
// 散列函数：最简单的就是对数组的长度对键取余，这也是为什么长度取质数的原因之一，称为除留余数法
// 在很多应用中，键是字符串类型。算法1：每个字符的ASCII码值相加然后除以数组长度进行取余
// HashTable类  散列化字符串键
// class HashTable {
//   constructor() {
//     this.table = new Array(137);
//   }
//   simpleHash(string) {
//     // 除留余数法散列函数
//     let total = 0;
//     for (let i = 0; i < string.length; i++) {
//       total += string.charCodeAt(i);
//     }
//     log(`hash value: ${string} -> ${total}`);
//     return total % this.table.length;
//   }
//   betterHash(string) {
//     // 采用霍纳算法计算键值 每次求和时乘以一个质数
//     let total = 0;
//     let H = 31;
//     for (let i = 0; i < string.length; i++) {
//       total += total * H + string.charCodeAt(i);
//     }
//     // log(`hash value: ${string} -> ${total}`);
//     return total % this.table.length;
//   }
//   put(data) {
//     let pos = this.betterHash(data);
//     this.table[pos] = data;
//   }
//   showDistro() {
//     for (let i = 0; i < this.table.length; i++) {
//       if (this.table[i] !== undefined) {
//         log(`${i}: ${this.table[i]}`);
//       }
//     }
//   }
// }

// let someNames = [
//   'David',
//   'Jennifer',
//   'Donnie',
//   'Raymond',
//   'Cynthia',
//   'Mike',
//   'Clayton',
//   'Danny',
//   'Jonathan',
// ];
// let hTable = new HashTable();
// for (let i = 0; i < someNames.length; ++i) {
//   hTable.put(someNames[i]);
// }
// hTable.showDistro();

// 散列化整形键
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function genStuData(arr) {
  for (let i = 0; i < arr.length; i++) {
    let num = '';
    for (let j = 1; j <= 9; j++) {
      num += Math.floor(Math.random() * 10);
    }
    num += getRandomInt(50, 100);
    arr[i] = num;
  }
}
// class HashTable {
//   constructor() {
//     this.table = new Array(137);
//   }
//   simpleHash(string) {
//     // 除留余数法散列函数
//     let total = 0;
//     for (let i = 0; i < string.length; i++) {
//       total += string.charCodeAt(i);
//     }
//     // log(`hash value: ${string} -> ${total}`);
//     return total % this.table.length;
//   }
//   betterHash(string) {
//     // 采用霍纳算法计算键值 每次求和时乘以一个质数
//     let total = 0;
//     let H = 31;
//     for (let i = 0; i < string.length; i++) {
//       total += (total * H + string.charCodeAt(i));
//     }
//     // log(`hash value: ${string} -> ${total}`);
//     return total % this.table.length;
//   }
//   put(data) {
//     let pos = this.betterHash(data);
//     this.table[pos] = data;
//   }
//   showDistro() {
//     for (let i = 0; i < this.table.length; i++) {
//       if (this.table[i] !== undefined) {
//         log(`${i}: ${this.table[i]}`);
//       }
//     }
//   }
// }
// let numStudents = 10;
// let arrSize = 97;
// let idLen = 9;
// let students = new Array(numStudents);
// genStuData(students);
// log('Student data: ');
// for (let i = 0; i < students.length; ++i) {
//   log(students[i].substring(0, 8) + ' ' + students[i].substring(9));
// }
// log('Data distribution: \n');
// let hTable = new HashTable();
// for (let i = 0; i < students.length; ++i) {
//   hTable.put(students[i]);
// }
// hTable.showDistro();

// 8.2.4 对散列表排序， 从散列表中取值
// class HashTable {
//   constructor() {
//     this.table = new Array(137);
//   }
//   simpleHash(string) {
//     // 除留余数法散列函数
//     let total = 0;
//     for (let i = 0; i < string.length; i++) {
//       total += string.charCodeAt(i);
//     }
//     return total % this.table.length;
//   }
//   betterHash(string) {
//     // 采用霍纳算法计算键值 每次求和时乘以一个质数
//     let total = 0;
//     let H = 31;
//     for (let i = 0; i < string.length; i++) {
//       total += total * H + string.charCodeAt(i);
//     }
//     // log(`hash value: ${string} -> ${total}`);
//     return total % this.table.length;
//   }
//   put(key, data) {
//     let pos = this.betterHash(key);
//     this.table[pos] = data;
//   }
//   showDistro() {
//     for (let i = 0; i < this.table.length; i++) {
//       if (this.table[i] !== undefined) {
//         log(`${i}: ${this.table[i]}`);
//       }
//     }
//   }
//   get(key) {
//     let pos = this.betterHash(key);
//     return this.table[pos];
//   }
// }
// let pnumbers = new HashTable();
// pnumbers.put('guo', '15037163033');
// pnumbers.put('zhang', '13333836952');
// pnumbers.put('liu', '15263235125');
// log('guo', pnumbers.get('guo'));
// log('zhang', pnumbers.get('zhang'));
// log('liu', pnumbers.get('liu'));

// 8.3 碰撞处理
// 8.3.1 开链法  开链法是指实现散列表的底层数组中，每个数组元素又是一个新的数据结构，比如另一个数组，这样就能存储多个键了，使用这种
// 技术，即使两个键散列后的值相同，依然被保存在同样的位置，只不过它们在第二个数组中的位置不一样罢了。

// class HashTable {
//   constructor() {
//     this.table = new Array(137);
//     this.buildChains();
//   }
//   buildChains() {
//     for (let i = 0; i < this.table.length; i++) {
//       this.table[i] = new Array();
//     }
//   }
//   betterHash(string) {
//     let total = 0;
//     let H = 31;
//     for (let i = 0; i < string.length; i++) {
//       total += total * H + string.charCodeAt(i);
//     }
//     return total % this.table.length;
//   }
//   showDistro() {
//     let n = 0;
//     for (let i = 0; i < this.table.length; i++) {
//       if (this.table[i][0] !== undefined) {
//         log(`${i}: ${this.table[i]}`); // 此处使用了隐式转换，数组转换为字符串
//       }
//     }
//   }
//   put(key, data) {
//     let pos = this.betterHash(key);
//     let index = 0;
//     while (this.table[pos][index] != undefined) {
//       index += 2;
//     }
//     this.table[pos][index] = key;
//     this.table[pos][index + 1] = data;
//   }
//   get(key) {
//     let pos = this.betterHash(key);
//     let index = 0;
//     while (this.table[pos][index] !== key || index >= this.table[pos].length) {
//       index += 2;
//     }
//     return this.table[pos][index + 1];
//   }
// }

// let pnumbers = new HashTable();
// pnumbers.put('zhang', '15037163033');
// pnumbers.put('zhang', '13333836952');
// pnumbers.put('liu', '15263235125');
// pnumbers.showDistro();

// 8.3.2 线性探索法
// 开放寻址散列， 当发生碰撞时，线性探索法检查散列表中的下一个位置是否为空，如果为空就将数据
// 存入该位置；如果不为空，则继续检查下一个位置，直到找到一个空的位置为止。
// 两种方法选择依据：如果数组的大小是待存储数据个数的1.5倍，那么使用开链法，如果数组的大小是待存储数据的
// 两倍及两倍以上，那么使用线性探测法
// class HashTable {
//   constructor() {
//     this.table = new Array(137);
//     this.values = [];
//   }
//   betterHash(string) {
//     let total = 0;
//     let H = 31;
//     for (let i = 0; i < string.length; i++) {
//       total = total * H + string.charCodeAt(i);
//     }
//     return total % this.table.length;
//   }
//   put(key, data) {
//     let pos = this.betterHash(key);
//     while (this.table[pos] != undefined) {
//       pos++;
//     }
//     this.table[pos] = key;
//     this.values[pos] = data;
//   }
//   get(key, data) {
//     let pos = this.betterHash(key);
//     while (this.table[pos] !== key && pos < this.table.length) {
//       pos++;
//     }
//     return this.values[pos];
//   }
// }
// let pnumbers = new HashTable();
// pnumbers.put('zhang', '15037163033');
// pnumbers.put('zhang', '13333836952');
// pnumbers.put('liu', '15263235125');
// log('guo', pnumbers.get('guo'));
// log('zhang', pnumbers.get('zhang'));
// log('liu', pnumbers.get('liu'));

// 8.4 练习 第3题   读取一个文本文件，使用散列显示该文件中出现的单词和它们在文件中出现的次数。
class HashTable {
  constructor() {
    this.table = new Array(293);
    this.values = [];
  }
  betterHash(string) {
    let total = 0;
    let H = 31;
    for (let i = 0; i < string.length; i++) {
      total = total * H + string.charCodeAt(i);
    }
    return total % this.table.length;
  }
  put(key, data) {
    let pos = this.betterHash(key);
    this.table[pos] = key;
    this.values[pos] = data;
  }
  get(key, data) {
    let pos = this.betterHash(key);
    while (this.table[pos] !== key && pos < this.table.length) {
      pos++;
    }
    return this.values[pos];
  }
  showDistro() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i] !== undefined) {
        log(`${this.table[i]}: ${this.values[i]}`); // 此处使用了隐式转换，数组转换为字符串
      }
    }
  }
}

let wnumbers = new HashTable();
fs.readFile(path.resolve(__dirname, 'words.txt'), (err, data) => {
  if (err) {
    log(err);
  }
  data
    .toString()
    .split(' ')
    .forEach((string) => {
      if ((n = wnumbers.get(string))) {
        // 不是第一次出现
        wnumbers.put(string, n + 1);
      } else {
        // 第一次出现
        wnumbers.put(string, 1);
      }
    });

  wnumbers.showDistro();
});
