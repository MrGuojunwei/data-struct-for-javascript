/*
 * @Description: 第三章 列表
 * @Author: 郭军伟
 * @Date: 2020-06-28 11:19:08
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-06-28 11:41:47
 */

class List {
  constructor() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
  }

  clear() {
    this.listSize = 0;
    this.pos = 0;
    delete this.dataStore;
    this.dataStore = [];
  }

  toString() {
    return this.dataStore;
  }

  getElement(index) {
    return this.dataStore[index];
  }

  insert(current, newItem) {
    let currentIndex = this.find(current);
    if (~currentIndex) {
      this.dataStore.splice(currentIndex, 0, newItem);
      this.listSize++;
      return true;
    }
    return false;
  }

  append(element) {
    this.dataStore[this.listSize++] = element;
  }

  remove(element) {
    let findIndex = this.find(element);
    if (~findIndex) {
      this.dataStore.splice(findIndex, 1);
      --this.listSize;
      return true;
    }
    return false;
  }

  find(element) {
    return this.dataStore.findIndex(element);
  }

  length() {
    return this.listSize;
  }

  contains(element) {
    return !!(~this.find(element))
  }
  front() {
    this.pos = 0;
  }
  end() {
    this.pos = this.listSize - 1;
  }
  
}
