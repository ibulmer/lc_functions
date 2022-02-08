/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 
 */
class PriorityQueue {
  constructor(comparator, maxSize) {
    this.comparator =
      comparator ||
      function (a, b) {
        return a - b;
      };
    this.maxSize = maxSize || Infinity;
    this._storage = [0];
  }

  getSize() {
    return this._storage.length - 1;
  }

  push(item) {
    this._storage.push(item);
    this._percolateUp();
  }

  pop() {
    if (!this.getSize()) return null;
    const highestPriority = this._storage[1];
    [this._storage[1], this._storage[this.getSize()]] = [
      this._storage[this.getSize()],
      this._storage[1],
    ];
    this._storage.splice(this.getSize());
    this._percolateDown();
    return highestPriority;
  }

  _inOrder(parentIndex, childIndex) {
    return (
      this.comparator(this._storage[parentIndex], this._storage[childIndex]) <=
      0
    );
  }

  _percolateUp() {
    let childIndex = this._storage.length - 1;
    let parentIndex = Math.floor(childIndex / 2);
    while (parentIndex >= 1 && !this._inOrder(parentIndex, childIndex)) {
      [this._storage[childIndex], this._storage[parentIndex]] = [
        this._storage[parentIndex],
        this._storage[childIndex],
      ];
      [childIndex, parentIndex] = [parentIndex, Math.floor(parentIndex / 2)];
    }
  }

  _percolateDown(i = 1) {
    // 0 4 5 6 7, length: 4]3
    while (i <= this.getSize() / 2 ) {
      let min = this._getMinChild(i);
      if (this.comparator(this._storage[i], this._storage[min]) > 0) {
        this._swap(i, min)
      }
      i = min;
    }
  }

  _getMinChild(i) {
    // 0 1 2 3 4
    if (i *2 +1 > this.getSize()) {
      return i * 2;
    }
    
    return this.comparator(this._storage[i * 2], this._storage[i * 2 + 1]) < 0 ? i * 2 : i * 2 + 1
  }

  _swap(iA, iB) {
    [this._storage[iA], this._storage[iB]] = [
      this._storage[iB],
      this._storage[iA],
    ];
  }
}



var kClosest = function(points, k) {
    let queue = new PriorityQueue((a, b) => b[0] * b[0] + b[1] * b[1] - a[0] * a[0] - a[1] * a[1])
    for (let i = 0; i < points.length; i++) {
        queue.push(points[i]);
        if (queue.getSize() > k) queue.pop();
    }
    let result = []; 
    while (queue.getSize()) {
        result.push(queue.pop());
    }
    return result;
};
