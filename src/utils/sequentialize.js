/**
    * Strings lists of asynchronous functions that need to be executed sequentially. Function 
    * calls itself recursively to string together Promises.
    *
    * @param {() => Promise<Any>} asyncFuncs - List of asynchronous functions that return Promise. 
    * @param {number} idx - Index of asynchronous funciton to be executed.
    */
module.exports = async function sequentialize(asyncFuncs, idx = 0) {
    if (idx < asyncFuncs.length) {
        asyncFuncs[idx]().then(() => sequentialize(asyncFuncs, ++idx))
    } else {
        return
    }
}
