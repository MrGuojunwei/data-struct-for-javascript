/*
 * @Description: 第七章 字典
 * @Author: 郭军伟
 * @Date: 2020-06-29 19:46:53
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-06-29 20:23:04
 */
const log = console.log;
// 添加，删除， 查找 展示所有， 长度，清空， 排序
// class Dictionary {
//   constructor() {
//     this.dataStore = new Array();
//   }
//   add(key, value) {
//     this.dataStore[key] = value;
//   }
//   remove(key) {
//     delete this.dataStore[key];
//   }
//   find(key) {
//     return this.dataStore[key];
//   }
//   showAll() {
//     let keys = Object.keys(this.dataStore).sort();
//     for (let i = 0; i < keys.length; i++) {
//       log(`${keys[i]} -> ${this.dataStore[keys[i]]}`);
//     }
//   }
//   count() {
//     return Object.keys(this.dataStore).length;
//   }
//   clear() {
//     let keys = Object.keys(this.dataStore);
//     for (let i = 0; i < keys.length; i++) {
//       delete this.dataStore[keys[i]];
//     }
//   }
// }

// var pbook = new Dictionary();
// pbook.add('Raymond', '123');
// pbook.add('David', '345');
// pbook.add('Cynthia', '456');
// log('Number of entries: ' + pbook.count());
// log("David's extension: " + pbook.find('David'));
// pbook.showAll();
// pbook.clear();
// log('Number of entries: ' + pbook.count());
// 排序功能测试
// var pbook = new Dictionary();
// pbook.add('Raymond', '123');
// pbook.add('David', '345');
// pbook.add('Cynthia', '456');
// pbook.add('Mike', '723');
// pbook.add('Jennifer', '987');
// pbook.add('Danny', '012');
// pbook.add('Jonathan', '666');
// pbook.showAll();

// 练习第二题
/**
 *  使用 Dictionary 类写一个程序，该程序用来存储一段文本中各个单词出现的次数。
 * 该程 序显示每个单词出现的次数，但每个单词只显示一次。
 * 比如下面一段话“the brown fox jumped over the blue fox”，程序的输出应为：
 * the: 2
 * brown: 1
 *  fox: 2
 * jumped: 1
 * over: 1
 * blue: 1
 */
class Dictionary {
  constructor(words) {
    this.dataStore = new Array();
    words = words.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (this.find(words[i]) == undefined) {
        this.add(words[i], 1);
      } else {
        this.add(words[i], this.find(words[i]) + 1);
      }
    }
  }
  add(key, value) {
    this.dataStore[key] = value;
  }
  find(key) {
    return this.dataStore[key];
  }
  parseWords() {}

  showAll() {
    let keys = Object.keys(this.dataStore);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      log(`${key}: ${this.find(key)}`);
    }
  }

  showAllWithSort() {
    let keys = Object.keys(this.dataStore).sort();
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      log(`${key}: ${this.find(key)}`);
    }
  }
}
let dictionary = new Dictionary('the brown fox jumped over the blue fox');
// dictionary.showAll();
dictionary.showAllWithSort()
