const data = [
  {
    menuKey: "menuManage",
    menuValue: "菜单管理",
    fatherMenuId: null,
    menuId: "a7x01e3uieq",
    id: 13,
    icon: null
},
{
    menuKey: "1",
    menuValue: "1",
    fatherMenuId: null,
    menuId: "nq5x6d5q8v",
    id: 24,
    icon: null
},
{
    menuKey: "1-1",
    menuValue: "1-1",
    fatherMenuId: "nq5x6d5q8v",
    menuId: "tev6o4uon8f",
    id: 25,
    icon: null
}
]
// const parentId = 'fatherMenuId'
// console.log(data[0][`${parentId}`])
 const  listToTree = (list, parentId, id) => {
  let array = []
  list .forEach(item => { // 遍历对象数组
      item.children = list.filter(info => info[`${parentId}`] === item[`${id}`]) // 找到每个对象的子节点 
      // console.log(item)

      if (item[`${parentId}`] === null) {
          array.push(item) // 将一层节点放入新数组中
      }
  })
  return array //循环结束，返回结果
}

console.log(listToTree(data, 'fatherMenuId', 'menuId'))