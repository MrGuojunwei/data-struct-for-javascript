/*
 * @Description: 第9章 集合
 * @Author: 郭军伟
 * @Date: 2020-06-30 15:03:36
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-06-30 16:09:23
 */
log = console.log;
// 集合定义 成员有一定相关性、不重复、无序
// 空集（无成员）  集合相等（成员完全相同）  子集（成员包含另一个集合的所有成员）
// 集合操作 并集 交集 补集
// class Set {
//   constructor() {
//     this.dataStore = [];
//   }
//   add(data) {
//     if (!~this.dataStore.indexOf(data)) {
//       this.dataStore.push(data);
//       return true;
//     }
//     return false;
//   }
//   remove(data) {
//     let pos = this.dataStore.indexOf(data);
//     if (pos > -1) {
//       this.dataStore.splice(pos, 1);
//       return true;
//     }
//     return false;
//   }
//   show() {
//     return '' + this.dataStore;
//   }
// }

// let names = new Set();
// names.add('David');
// names.show();

// names.add('Jennifer');
// names.add('Cynthia');
// names.add('Mike');
// names.add('Raymond');
// if (names.add('Mike')) {
//   log('Mike added');
// } else {
//   log("Can't add Mike, must already be in set");
// }
// log(names.show());
// let removed = 'Mike';
// if (names.remove(removed)) {
//   log(removed + ' removed.');
// } else {
//   log(removed + ' not removed.');
// }
// names.add('Clayton');
// log(names.show());
// removed = 'Alisa';
// if (names.remove('Mike')) {
//   log(removed + ' removed.');
// } else {
//   log(removed + ' not removed.');
// }

// 9.3 更多集合操作
class Set {
  constructor() {
    this.dataStore = [];
  }
  add(data) {
    if (!~this.dataStore.indexOf(data)) {
      this.dataStore.push(data);
      return true;
    }
    return false;
  }
  remove(data) {
    let pos = this.dataStore.indexOf(data);
    if (pos > -1) {
      this.dataStore.splice(pos, 1);
      return true;
    }
    return false;
  }
  show() {
    return '' + this.dataStore;
  }
  contains(data) {
    return this.dataStore.indexOf(data) > -1;
  }
  size() {
    return this.dataStore.length;
  }
  union(set) {
    // 合并一个集合
    let tempSet = new Set(); // 返回新的集合，不影响当前集合
    for (let i = 0; i < this.dataStore.length; i++) {
      tempSet.add(this.dataStore[i]);
    }
    for (let i = 0; i < set.dataStore.length; i++) {
      if (!tempSet.contains(set.dataStore[i])) {
        tempSet.dataStore.push(set.dataStore[i]);
      }
    }
    return tempSet;
  }
  intersect(set) {
    // 求交集
    let tempSet = new Set();
    for (let i = 0; i < this.dataStore.length; i++) {
      if (set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }
    return tempSet;
  }
  subset(set) {
    // 判断该集合是否是待比较集合的子集
    if (this.size() > set.size()) return false;
    for (let i = 0; i < this.dataStore.length; i++) {
      if (!set.contains(this.dataStore[i])) {
        return false;
      }
    }
    return true;
  }
  difference(set) {
    // 求补集 该集合存在 待比较集合不存在的补集
    let tempSet = new Set();
    for (let i = 0; i < this.dataStore.length; i++) {
      if (!set.contains(this.dataStore[i])) {
        tempSet.add(this.dataStore[i]);
      }
    }
    return tempSet;
  }
}
// 求并集
// let cis = new Set();
// cis.add('Mike');
// cis.add('Clayton');
// cis.add('Jennifer');
// cis.add('Raymond');
// let dmp = new Set();
// dmp.add('Raymond');
// dmp.add('Cynthia');
// dmp.add('Jonathan');
// let it = new Set();
// it = cis.union(dmp);
// log(it.show());

// 求交集
// let cis = new Set();
// cis.add('Mike');
// cis.add('Clayton');
// cis.add('Jennifer');
// cis.add('Raymond');
// let dmp = new Set();
// dmp.add('Raymond');
// dmp.add('Cynthia');
// dmp.add('Bryan');
// let inter = cis.intersect(dmp);
// log(inter.show());

// 判断子集
// let it = new Set();
// it.add('Cynthia');
// it.add('Clayton');
// it.add('Jennifer');
// it.add('Danny');
// it.add('Jonathan');
// it.add('Terrill');
// it.add('Raymond');
// it.add('Mike');
// let dmp = new Set();
// dmp.add('Cynthia');
// dmp.add('Raymond');
// dmp.add('Jonathan');
// dmp.add('Shirley');
// if (dmp.subset(it)) {
//   log('DMP is a subset of IT.');
// } else {
//   log('DMP is not a subset of IT.');
// }

// 求补集
let cis = new Set();
let it = new Set();
cis.add('Clayton');
cis.add('Jennifer');
cis.add('Danny');
it.add('Bryan');
it.add('Clayton');
it.add('Jennifer');
let diff = new Set();
diff = cis.difference(it);
log(
  '[' + cis.show() + '] difference [' + it.show() + '] -> [' + diff.show() + ']'
);
