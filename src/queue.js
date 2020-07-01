/*
 * @Description: 第五章  队列
 * @Author: 郭军伟
 * @Date: 2020-06-28 15:19:32
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-07-01 09:59:22
 */
let log = console.log;
const fs = require('fs');
const path = require('path');
// 队列是一种列表，特点是先进先出，一端进，另一端出
// 队列常见操作：入队，出队， 读取队头， 队长， 清空
// 使用数组来实现队列
class Queue {
  constructor() {
    this.dataStore = [];
  }

  enqueue(element) {
    this.dataStore.push(element);
  }
  dequeue() {
    return this.dataStore.shift();
  }
  front() {
    return this.dataStore[0];
  }
  back() {
    return this.dataStore[this.dataStore.length - 1];
  }
  toString() {
    return this.dataStore.join('\n');
  }
  isEmpty() {
    return !this.dataStore.length;
  }
  count() {
    return this.dataStore.length;
  }
}

// var q = new Queue();
// q.enqueue('Meredith');
// q.enqueue('Cynthia');
// q.enqueue('Jennifer');
// q.dequeue();
// log(q.toString());
// log('Front of queue: ' + q.front());
// log('Back of queue: ' + q.back());

// 队列案例
// 案例1： 方块舞的舞伴分配
function Dancer(name, sex) {
  this.name = name;
  this.sex = sex;
}
// 读取舞者信息
function getDancers(males, females) {
  return new Promise((resolve) => {
    let names = fs
      .readFileSync(path.resolve(__dirname, './dancers.txt'))
      .toString();
    names = names.split('\n').map((name) => {
      return name.trim();
    });
    names.forEach((dancer) => {
      dancer = dancer.split(' ');
      let sex = dancer[0];
      let name = dancer[1];
      if (sex == 'F') {
        females.enqueue(new Dancer(name, sex));
      } else {
        males.enqueue(new Dancer(name, sex));
      }
    });
    resolve();
  });
}

function dance(males, females) {
  while (!males.isEmpty() && !females.isEmpty()) {
    log(
      `Female dancer is ${females.dequeue().name} and Male dancer is ${
        males.dequeue().name
      }`
    );
  }
  log('\n');
  if (males.count() > 0) {
    log(`There are ${males.count()} male dancers waiting to dance.`);
  } else {
    log(`There are ${females.count()} male dancers waiting to dance.`);
  }
}

let maleDancers = new Queue();
let femaleDancers = new Queue();
getDancers(maleDancers, femaleDancers).then(() => {
  // dance(maleDancers, femaleDancers);
});

// 案例2：使用队列队数据进行排序 0-99
// 将数字分配到相应队列
function distribute(nums, queues, digit) {
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    if (digit === 1) {
      //个位
      queues[nums[i] % 10].enqueue(nums[i]);
    } else if (digit === 2) {
      // 十位
      queues[(~~(nums[i] / 10)) % 10].enqueue(nums[i]);
    } else if (digit === 3) {
      queues[~~(nums[i] / 100)].enqueue(nums[i]);
    }
  }
}
// 从队列中收集数字的函数
function collect(queues) {
  var i = 0,
    nums = [];
  for (var digit = 0; digit < queues.length; digit++) {
    while (!queues[digit].isEmpty()) {
      nums[i++] = queues[digit].dequeue();
    }
  }
  // console.log('nums',nums);
  return nums;
}

let queues = new Array(10).fill(0).map(() => new Queue());
let nums1 = [455, 724, 963, 551, 214, 164, 750, 451, 257, 314];
let nums2 = [76, 77, 185, 84, 79, 71, 689, 99, 6, 54];
function disArr(nums, queues) {
  distribute(nums, queues, 1);
  nums = collect(queues);
  distribute(nums, queues, 2);
  nums = collect(queues);
  distribute(nums, queues, 3);
  nums = collect(queues);
  log(nums.join(' '));
}

disArr(nums1, queues);
disArr(nums2, queues);

// 优先级队列  打破了先进先出的规则，根据优先级来调整队列出去的顺序，实现就是在删除的时候，利用splice删除优先级最高的元素
function Patient(name, code) {
  this.name = name;
  this.code = code;
}
function dequeue() {
  var priority = this.front().code;
  for (var i = 1; i < this.dataStore.length; i++) {
    if (this.dataStore[i] > priority) {
      priority = this.dataStore[i].code;
    }
  }
  this.dataStore.splice(
    this.dataStore.findIndex((item) => item.code === priority),
    1
  );
}
