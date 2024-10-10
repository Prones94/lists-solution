class CircularArray {
  constructor(){
    this.array = []
    this.start = 0 // Tracks start index in the circular array
  }

  /** Adds a new item to the end of the array */
  addItem(item){
    this.array.push(item) // Appends to the end of the underlying array
  }

  // Prints the current state of the array in its rotated form
  printArray(){
    let result = []
    for (let i = 0; i < this.array.length; i++){
      result.push(this.array[(this.start + i) % this.array.length])
    }
  }

  /** Returns items at the given index, handling circular indexing */
  getByIndex(index){
    if (index < 0 || index >= this.array.length){
      return null
    }
    //Calculate the actual index considering the circular start
    const actualIndex = (this.start + index) % this.array.length
    return this.array[actualIndex]
  }

  /** Rotates the array by the given number of positions */
  rotate(steps){
    const length = this.array.length
    if (length === 0) return

    // Normalize steps to not overstep array bounds
    this.start = (this.start + steps + length) % length
  }
}

module.exports = CircularArray