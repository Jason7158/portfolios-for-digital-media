# Code Snippets in JavaScript

## Tree Iterator

```javascript
/**
 * @param node tree onde Object
 * @param keyMap just like
 {
    childrenKey: 'CHILD',
    idKey: 'ID',
    nameKey: 'NAME'
    }
 * @param cb callBack function
 * @param pathFieldArr the nodeField need record to path
 * @param currPath type {
 *     pathKey: pathArray
 * }
 */
export function iterateTreeDeepFirst(node, keyMap, cb, pathFieldArr, currPath) {
  if (Array.isArray(node)) {
    node.forEach(item => {
      iterateTreeDeepFirst(item, keyMap, cb, pathFieldArr, currPath);
    });
  } else {
    keyMap = keyMap || {};
    keyMap = Object.assign(
      {
        childrenKey: "children",
        idKey: "id"
      },
      keyMap
    );

    if (node) {
      // 处理path:Array
      if (pathFieldArr && pathFieldArr.length) {
        if (currPath) {
          node._tree_node_path = cloneDeep(currPath);
        } else {
          node._tree_node_path || (node._tree_node_path = {});
        }
        for (let j = 0; j < pathFieldArr.length; j++) {
          const pathKey = pathFieldArr[j];
          node._tree_node_path[pathKey] || (node._tree_node_path[pathKey] = []);
          node._tree_node_path[pathKey].push(node[pathKey]);
        }
      }

      if (cb && !cb.postorder) {
        //先序
        cb(node);
      }

      const children = node[keyMap.childrenKey];
      if (children && children.length) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          iterateTreeDeepFirst(
            child,
            keyMap,
            cb,
            pathFieldArr,
            node._tree_node_path
          );
        }
      }

      if (cb && cb.postorder) {
        cb(node);
      }
    }
  }
}
```

## 策略模式

## Front-end Package Deployment Script In Node.js
```javascript
"use strict";

const client = require("scp2");
const ora = require("ora");
const chalk = require("chalk");
const spinner = ora(chalk.green("Deploying..."));
spinner.start();
client.scp(
  "./dist/",
  {
    host: "172.24.1.171",
    port: "22",
    username: "root",
    password: "Password01!",
    path: "/path/to/dist",
  },
  (err) => {
    spinner.stop();
    if (!err) {
      console.log("\nDeployment completed");
    } else {
      console.log("err", err);
    }
  }
);
```