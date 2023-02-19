/*
 * @Author: lixianxing 63960045+lixianxing@users.noreply.github.com
 * @Date: 2022-08-29 21:07:10
 * @LastEditors: lixianxing 63960045+lixianxing@users.noreply.github.com
 * @LastEditTime: 2022-12-07 19:40:46
 * @FilePath: \test-api\src\utils\index.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by lixianxing 63960045+lixianxing@users.noreply.github.com, All Rights Reserved. 
 */
export const randomString = () => Math.random().toString(36).slice(2);

export const listToTree = (list, parentId, id) => {
  let array = [];
  list.forEach((item) => {
    // 遍历对象数组
    item.children = list.filter(
      (info) => info[`${parentId}`] === item[`${id}`],
    ); // 找到每个对象的子节点
    if (item.children.length == 0) {
      delete item.children;
    }

    if (item[`${parentId}`] === null) {
      array.push(item); // 将一层节点放入新数组中
    }
  });
  return array; //循环结束，返回结果
};

export const listToTree1 = (data) => {
  return data.reduce((prev, curr, index, arr) => {
    curr.children = arr.filter((v) => v.fatherMenuId === curr.menuId);
    if (curr.children.length == 0) {
      delete curr.children;
    }
    if (!curr.fatherMenuId) {
      prev.push(curr);
    }
    return prev;
  }, []);
};
