/*
 * @Description: 第四章 栈结构
 * @Author: 郭军伟
 * @Date: 2020-06-28 14:26:05
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-06-28 15:19:02
 */
let log = console.log;

// 对栈的操作  初始化栈、入栈、出栈、获取栈顶元素
// 栈得特点 后进先出LIFO
// 定义stack类
class Stack {
  constructor() {
    this.dataStore = []; // 栈
    this.top = 0; // 栈顶
  }
  push(element) {
    this.dataStore[this.top++] = element;
  }
  pop() {
    return this.dataStore[--this.top];
  }
  peek() {
    return this.dataStore[this.top - 1];
  }
  clear() {
    this.dataStore = [];
    this.top = 0;
  }
  length() {
    return this.top;
  }
}
// 案例1：数制间的相互转换 15 2
// 15 / 2 = 7...1;
// 7 / 2 = 3...1;
// 3 / 2 = 1 ...1;
// 1 / 2 = 0 ... 1;
// result = 1111
function mulBase(num, base) {
  let s = new Stack();
  let result = '';
  do {
    s.push(num % base);
    num = ~~(num / base);
  } while (num > 0);
  while (s.length() > 0) {
    result += s.pop();
  }
  return result;
}

log(`32 converted to base 2 is ${mulBase(32, 2)}`);
log(`125 converted to base 8 is ${mulBase(125, 8)}`);

// 案例2： 判断一个数字或单词是否是回文数
function isPalindrome(word) {
  let s = new Stack();
  for (let i = 0; i < word.length; i++) {
    s.push(word[i]);
  }
  let rword = '';
  while (s.length() > 0) {
    rword += s.pop();
  }
  return word === rword;
}

function print(word) {
  if (isPalindrome(word)) {
    log(`${word} is a palindrome`);
  } else {
    log(`${word} is not a palindrome`);
  }
}

print('hello');
print('racecar');

// 案例3： 使用栈来实现阶乘
// 递归实现方法
function factorial(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
log(factorial(5));
// 使用栈来实现阶乘
function fact(n) {
  let s = new Stack();
  let result = 1;
  while (n >= 1) {
    s.push(n--);
  }
  while (s.length() > 0) {
    result *= s.pop();
  }
  return result;
}

log(`fact(5) = ${fact(5)}`)
