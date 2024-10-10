/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length += 1
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    this.length += 1
  }

  /** pop(): return & remove last item. */

  pop() {
    if (!this.head) return null

    let current = this.head
    let newTail = current

    while (current.next) {
      newTail = current
      current = current.next
    }
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.tail = newTail
      this.tail.next = null
    }

    this.length -= 1
    return current.val
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) return null

    const currentHead = this.head
    this.head = currentHead.next
    this.length -= 1

    if (this.length === 0) {
      this.tail = null
    }
    return currentHead.val
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw newError("Index out of range")
    }

    let current = this.head
    let count = 0

    while (count != idx) {
      current = current.next
      count++
    }

    return current.val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Index out of range")
    }
    let current = this.head
    let count = 0

    while (count !== idx) {
      current = current.next
      count++
    }
    current.val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Index out of range")
    }

    if (idx === 0) return this.unshift(val)
    if (idx === this.length) return this.push(val)

    const newNode = new Node(val)
    let current = this.head
    let count = 0

    while (count != idx - 1) {
      current = current.next
      count++
    }
    newNode.next = current.next
    current.next = newNode
    this.length += 1
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Index out of range")
    }

    if (idx === 0) return this.shift()
    if (idx === this.length - 1) return this.pop()

    let current = this.head
    let count = 0

    while (count != idx - 1) {
      current = current.next
      count++
    }

    const removedNode = current.next
    current.next = removedNode.next

    this.length -= 1
    return removedNode.val
  }

  /** average(): return an average of all values in the list */
  average() {
    if (this.length === 0) return 0

    let total = 0
    let current = this.head

    while (current) {
      total += current.val
      current = current.next
    }

    return total / this.length
  }

  /** reverse(): Reverse the list in place */
  reverse() {
    let prev = null
    let current = this.head
    let next = null

    while (current !== null) {
      next = current.next // Stores next node
      current.next = prev // Reverse current node's pointer
      prev = current // Moves previous and current one step forward
      current = next
    }

    // After the loop, previous will be the new head
    this.tail = this.head
    this.head = prev
  }

  /** pivot(pivotVal): pivot list around a value */
  pivot(pivotVal){
    let lessHead = null, lessTail = null
    let greaterHead = null, greaterTail = null
    let current = this.head

    while (current !== null){
      if (current.val < pivotVal){
        // Add to the "less than pivot" list
        if (!lessHead){
          lessHead = current
          lessTail = current
        } else {
          lessTail.next = current
          lessTail = current
        }
      } else {
        // Add to the "greater than or equal to pivot" list
        if (!greaterHead){
          greaterHead = current
          greaterTail = current
        } else {
          greaterTail.next = current
          greaterTail = current
        }
      }
      current = current.next
    }

    // If there are no "less" elements, the head becomes the greater list
    if (!lessHead) {
      this.head = greaterHead
    } else {
      //Connect the two lists
      this.head = lessHead
      lessTail.next = greaterHead
    }

    // If there are no "greater" elements, the tail becomes the lessTail
    if (greaterTail){
      greaterTail.next = null // Ensure the last node points to null
    }
  }
}

function mergeSortedLists(a, b) {
  const mergedList = new LinkedList()
  let currentA = a.head
  let currentB = b.head

  // traverse both lists and compare values
  while (current !== null && currentB !== null) {
    if (currentA.val <= currentB.val) {
      mergedList.push(currentA.val)
      currentA = currentA.next
    } else {
      mergedList.push(currentB.val)
      currentB = currentB.next
    }
  }

  // If one list has remaining elements, append them
  while (currentA !== null) {
    mergedList.push(currentA.val)
    currentA = currentA.next
  }

  while (currentB !== null) {
    mergedList.push(currentB.val)
    currentB = currentB.next
  }

  return mergedList
}

module.exports = {LinkedList, mergeSortedLists}
