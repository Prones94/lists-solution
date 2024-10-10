class Node {
  constructor(val){
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList{
  constructor(vals=[]){
    this.head = null
    this.tail = null
    this.length = 0

    for (let val of vals) this.push(val)
  }

  /** push(val): adds new value tothe end of a list */
  push(val){
    const newNode = new Node(val)

    if (!this.head){
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length += 1
  }

  /** unshift(val): add new value to start of list */
  unshift(val){
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    this.length += 1
  }

  /** pop(): remove & return the last item */
  pop() {
    if (!this.tail) return null
    const poppedNode = this.tail

    if (this.length === 1){
      this.head = null
      this.tail = null
    }

    this.length -= 1
    return poppedNode.val
  }

  /** shift(): remove & return the first item */
  shift(){
    if (!this.head) return null

    const shiftedNode = this.head
    if (this.length === 1){
      this.head = null
      this.tail = null
    } else {
      this.head = shiftedNode.next
      this.head.prev = null
    }

    this.length -= 1
    return this.shiftedNode.val
  }

  /** getAt(idx): get the value at idx */
  getAt(idx){
    if (idx < 0 || idx >= this.length){
      throw new Error("Index out of range")
    }

    let current
    if (idx <= this.length / 2){
      current = this.head
      for (let i = 0; i < idx; i++) {
        current = current.next
      }
    } else {
      current = this.tail
      for (let i = this.length - 1; i > idx; i--){
        current = current.prev
      }
    }
    return current.val
  }

  /** setAt(idx,val): set the value at idx to val */
  setAt(idx, val){
    if (idx < 0 || idx >= this.length){
      throw new Error("Index out of range")
    }
    let current
    if (idx <= this.length / 2){
      current = this.head
      for (let i = 0; i < idx; i++){
        current = current.next
      }
    } else {
      current = this.tail
      for (let i = this.length -1; i > idx; i--){
        current = current.prev
      }
    }
    current.val = val
  }

  /** insertAt(idx, val): insert a new node with val before idx */
  insertAt(idx, val){
    if (idx < 0 || idx > this.length){
      throw new Error("Index out of range")
    }

    if (idx === 0) return this.unshift(val)
    if (idx === this.length) return this.push(val)

    const newNode = new  Node(val)
    let current

    if (idx <= this.length / 2){
      current = this.head
      for (let i =0;i < idx; i++){
        current = current.next
      }
    } else {
      current = this.tail
      for (let i = this.length - 1; i> idx; i--){
        current = current.prev
      }
    }

    newNode.next = current
    newNode.prev = current.prev
    current.prev.next = newNode
    current.prev = newNode

    this.length += 1
  }

  /** removeAt(idx): remove & return node at idx */
  removeAt(idx){
    if (idx < 0 || idx >= this.length){
      throw new Error("Index out of range")
    }

    if (idx === 0) return this.shift()
    if (idx === this.length - 1)return this.pop()

    let current

    if (idx <= this.length / 2) {
      current = this.head
      for (let i = 0; i < idx; i++){
        current = current.next
      }
    } else {
      current = this.tail
      for (let i = this.length - 1; i > idx; i--){
        current = current.prev
      }
    }
    current.prev.next = current.next
    current.next.prev = current.prev

    this.length -= 1
    return current.val
  }


  /** average(): return the average of all values in the list */
  average(){
    if (this.length === 0) return 0

    let total = 0
    let current = this.head

    while (current) {
      total += current.val
      current = current.next
    }

    return total / this.length
  }

  /** reverse(): Reverse a doubly linked list in place */
  reverse(){
    let current = this.head
    let temp = null

    // Traverse the list and swap next and prev pointers for each node
    while (current !== null){
      temp = current.prev
      current.prev = current.next
      current.next = temp
      current = current.prev // Move to the next node, which is now current.prev
    }

    // After loop, swap head and tail
    if (temp !== null){
      this.tail = this.head
      this.head = temp.prev
    }
  }

  /** pivot(pivotVal): pivots list around the value in a doubly linked list */
  pivot(pivotVal){
    let lessHead = null, lessTail = null
    let greaterHead = null, greaterTail = null
    let current = this.head

    while (current !== null){
      const nextNode = current.next // Stores next node
      current.next = null // Detaches current node from the rest of the list
      current.prev = null

      if (current.val < pivotVal){
        // Add to the "less than pivot" list
        if (!lessHead){
          lessHead = current
          lessTail = current
        } else {
          lessTail.next = current
          current.prev = lessTail
          lessTail = current
        }
      } else {
        // Add to the "greater than or equal to pivot" list
        if (!greaterHead){
          greaterHead = current
          greaterTail = current
        } else {
          greaterTail.next = current
          current.prev = greaterTail
          greaterTail = current
        }
      }
      current = nextNode // Move to the next node
    }

    // If there are no "less" elements, the head becomes the greater list
    if (!lessHead){
      this.head = greaterHead
      this.tail = greaterTail
    } else {
      // Connect the two lists
      this.head = lessHead
      lessTail.next = greaterHead

      if (greaterHead) {
        greaterHead.prev = lessTail
      }

      this.tail = greaterTail || lessTail // Updates tail reference
    }
  }
}

/** mergeSortedDoublyLists(a,b): Merge two sorted doubly linked lists */
function mergeSortedDoublyLists(a,b){
  const mergedList = new DoublyLinkedList()
  let currentA = a.head
  let currentB = b.head

  // Traverse both lists and compare values
  while (currentA !== null && currentB !== null){
    if (currentA.val <= currentB.val){
      mergedList.push(currentA.val)
      currentA = currentA.next
    } else {
      mergedList.push(currentB.val)
      currentB = currentB.next
    }
  }

  // If one list has remaining elements, append them
  while (currentA !== null){
    mergedList.push(currentA.val)
    currentA = currentA.next
  }

  while (currentB !== null){
    mergedList.push(currentB.val)
    currentB = currentB.next
  }

  return mergedList
}

module.exports = {DoublyLinkedList, mergeSortedDoublyLists}