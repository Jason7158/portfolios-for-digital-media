# Code Snippets in JavaScript

## Tree Preorder and Postorder Traversal Function
```typescript
// file index.d.ts
export interface PathObj {
  [key: string]: string[]
}
```
```javascript
/**
 * @typedef {object} KeyMap
 * @property {string} [childrenKey=children]
 * @property {string} [idKey=id]
 * @property {string} nameKey
 */
/**
 * @typedef {object} PathObj
 * @property {string} childrenKey
 * @property {string} idKey
 * @property {string} nameKey
 */
/**
 * @callback CallBack
 * @param {object} treeNode
 */
/**
 * @param {object} node - tree node Object
 * @param {KeyMap} keyMap
 * @param {CallBack} cb - callBack function
 * @param {string[]} pathFieldArr the nodeField need record to path
 * @param {import(index).PathObj} currentPath 
 */
function iterateTreeDeepFirst(node, keyMap, cb, pathFieldArr, currentPath) {
  if (Array.isArray(node)) {
    node.forEach(item => {
      iterateTreeDeepFirst(item, keyMap, cb, pathFieldArr, currentPath);
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
      if (pathFieldArr && pathFieldArr.length) {
        if (currentPath) {
          node._tree_node_path = cloneDeep(currentPath);
        } else {
          node._tree_node_path || (node._tree_node_path = {});
        }
        for (let j = 0; j < pathFieldArr.length; j++) {
          const pathKey = pathFieldArr[j];
          node._tree_node_path[pathKey] || (node._tree_node_path[pathKey] = []);
          node._tree_node_path[pathKey].push(node[pathKey]);
        }
      }

      if (cb && !cb.preorder) {
        // Preorder Traversal
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
        // Postorder Traversal
        cb(node);
      }
    }
  }
}
```

## Strategy Pattern in JavaScript

```javascript
// Define a family of algorithms

class ConcreteStrategyA {
  execute() {
    return "Strategy A";
  }
}

class ConcreteStrategyB {
  execute() {
    return "Strategy B";
  }
}

class ConcreteStrategyC {
  execute() {
    return "Strategy C";
  }
}

// Context class that uses a strategy

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    return this.strategy.execute();
  }
}

// Example usage

const context = new Context(new ConcreteStrategyA());
console.log(context.executeStrategy()); // Output: "Strategy A"

context.setStrategy(new ConcreteStrategyB());
console.log(context.executeStrategy()); // Output: "Strategy B"

context.setStrategy(new ConcreteStrategyC());
console.log(context.executeStrategy()); // Output: "Strategy C"
```

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
    host: "172.24.1.171", // ip of the server
    port: "22",
    username: "root",
    password: "Password",
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