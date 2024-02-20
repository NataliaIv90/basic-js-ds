const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (!data) {
      return;
    }

    const newNode = new Node(data);


    if (this.rootNode === null) {
      this.rootNode = newNode;
      return this;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (currentNode.data === data) {
        return undefined;
      }

      if (data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return this;
        }

        currentNode = currentNode.left;
      }

      if (data > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return this;
        }

        currentNode = currentNode.right;
      }
    }

  }

  has(data) {
    if (!this.rootNode || !data) {
      return false;
    }

    let currentNode = this.rootNode;
    let hasNode = false;

    while (currentNode !== null && !hasNode) {

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        hasNode = true;
      }
    }

    return hasNode;
  }

  find(data) {
    if (!this.rootNode || !data) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode !== null) {

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }

    return null;
  }

  remove(data) {
    if (!this.rootNode || !data) {
      return undefined;
    }

    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(currentNode, data) {
      if (currentNode === null) {
        return null;
      }

      if (data === currentNode.data) {
        if (currentNode.left === null && currentNode.right === null) {
          return null;
        } else if (currentNode.left === null) {
          return currentNode.right;
        } else if (currentNode.right === null) {
          return currentNode.left;
        } else {
          let tempNode = findSmallestRightNode(currentNode.right);
          currentNode.data = tempNode.data;
          currentNode.right = removeNode(currentNode.right, tempNode.data);
          return currentNode;
        }
      } else if (data < currentNode.data) {
        currentNode.left = removeNode(currentNode.left, data);
        return currentNode;
      } else {
        currentNode.right = removeNode(currentNode.right, data);
        return currentNode;
      }
    }

    function findSmallestRightNode(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    }
  }

  min() {
    if (!this.rootNode) {
      return undefined;
    }

    let minValue = this.rootNode.data;
    let currentNode = this.rootNode;

    while (currentNode.left !== null) {
      if (currentNode.left.data < minValue) {
        minValue = currentNode.left.data;
      }

      currentNode = currentNode.left;
    }

    return minValue;
  }

  max() {
    if (!this.rootNode) {
      return undefined;
    }

    let maxValue = this.rootNode.data;
    let currentNode = this.rootNode;

    while (currentNode.right !== null) {
      if (currentNode.right.data > maxValue) {
        maxValue = currentNode.right.data;
      }

      currentNode = currentNode.right;
    }

    return maxValue;
  }
}

module.exports = {
  BinarySearchTree
};