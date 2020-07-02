/*
 * @Description: 第十二章 排序算法
 * @Author: 郭军伟
 * @Date: 2020-07-02 10:33:48
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-07-02 14:59:11
 */
const log = console.log;
const time = console.time;
const end = console.timeEnd;
// 12.1 数组测试平台
class CArray {
  constructor(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    for (let i = 0; i < numElements; i++) {
      this.dataStore[i] = i;
    }
  }
  setData() {
    for (var i = 0; i < this.numElements; i++) {
      this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
    }
    // this.dataStore = [6, 10, 0, 6, 5, 8, 7, 4, 2, 7];
  }
  clear() {
    for (var i = 0; i < this.dataStore.length; i++) {
      this.dataStore[i] = 0;
    }
  }
  insert(element) {
    this.dataStore[this.pos++] = element;
  }
  toString() {
    var restr = '';
    for (var i = 0; i < this.dataStore.length; i++) {
      restr += this.dataStore[i] + ' ';
      if ((i > 0) & (i % 10 == 0)) {
        restr += '\n';
      }
    }
    return restr;
  }
  swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
  }
  bubbleSort() {
    // 冒泡排序算法
    let numElements = this.numElements;
    for (let i = 0; i < numElements - 1; i++) {
      for (let j = 0; j < numElements - i; j++) {
        if (this.dataStore[j] > this.dataStore[j + 1]) {
          this.swap(this.dataStore, j, j + 1);
        }
      }
    }
  }
  selectionSort() {
    // 选择排序算法
    let numElements = this.dataStore.length;
    let min;
    for (let i = 0; i < numElements - 1; i++) {
      min = i;
      for (let j = i + 1; j < numElements; j++) {
        if (this.dataStore[min] > this.dataStore[j]) {
          min = j;
        }
      }
      if (min !== i) {
        this.swap(this.dataStore, i, min);
      }
    }
  }
  insertionSort() {
    // 插入排序算法
    let numElements = this.numElements;
    let temp;
    for (let outer = 1; outer < numElements; outer++) {
      temp = this.dataStore[outer];
      let inner = outer;
      while (inner > 0 && temp < this.dataStore[inner - 1]) {
        this.dataStore[inner] = this.dataStore[inner - 1];
        inner--;
      }
      this.dataStore[inner] = temp;
    }
  }
}
// let numElements = 100;
// let myNums = new CArray(numElements);
// myNums.setData();
// log(myNums.toString());
// 12.2 基本排序算法
// 12.2.1 冒泡排序  最慢

var numElements = 10000;

time('bubbleSort');
var mynums = new CArray(numElements);
mynums.setData();
mynums.bubbleSort();
// log(mynums.toString());
end('bubbleSort');

time('selectionSort');
var mynums = new CArray(numElements);
mynums.setData();
mynums.bubbleSort();
// log(mynums.toString());
end('selectionSort');

time('insertionSort');
var mynums = new CArray(numElements);
mynums.setData();
mynums.bubbleSort();
// log(mynums.toString());
end('insertionSort');

// 高级排序算法
// 处理大型数据集的最高效排序算法

// 希尔排序
/**
 * 希尔排序的核心理念与插入排序 不同，它会首先比较距离较远的元素，
 * 而非相邻的元素。和简单地比较相邻元素相比，使
 * 用这种方案可以使离正确位置很远的元素更快地回到合适的位置。
 * 当开始用这个算法遍历 数据集时，所有元素之间的距离会不断减小，
 * 直到处理到数据集的末尾，这时算法比较的 就是相邻元素了
 */
