class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.sortedArray = sortArray(array);
    this.root = buildTree(this.sortedArray, 0, this.sortedArray.length - 1);
  }
}

const sortArray = function (numbs) {
  return numbs
    .filter((numb, index) => numbs.indexOf(numb) === index)
    .sort((a, b) => a - b);
};

const buildTree = function (array, start, end) {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const root = new Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
};

const insert = function (value, root) {
  if (root === null) {
    root = new Node(value);
    return root;
  }
  if (value < root.data) root.left = insert(value, root.left);
  else root.right = insert(value, root.right);

  return root;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(data);
prettyPrint(tree.root);

prettyPrint(insert(999999, tree.root));
