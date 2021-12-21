
var FileSystem = function () {
    this.root = new TrieNode();
    this.root.value = 0;
    this.current = this.root;
    this.indexOfLastForwardSlash = 0;
};

/** 
 * @param {string} path 
 * @param {number} value
 * @return {boolean}
 */
FileSystem.prototype.createPath = function (path, value) {

    this.current = this.root;
    let size = path.length;

    this.indexOfLastForwardSlash = 0;
    for (let i = size - 1; i >= 0; i--) {
        if (path.charAt(i) === '/') {
            this.indexOfLastForwardSlash = i;
            break;
        }
    }

    if (!this.hasParentPath(path)) {
        return false;
    }

    for (let i = this.indexOfLastForwardSlash; i < size; i++) {
        let index = this.getIndexInTrieBranch(path.charAt(i));
        if (this.current.branches[index] === undefined) {
            this.current.branches[index] = new TrieNode();
        }
        this.current = this.current.branches[index];
    }

    /*
     If (current == root && root.value = -1) this boollean statement will return incorrectly.
     That's why root.value is initiated to '0'.
     */
    if (this.current.value !== -1) {
        return false;
    }
    this.current.value = value;
    return true;
};

/** 
 * @param {string} path
 * @return {number}
 */
FileSystem.prototype.get = function (path) {

    this.current = this.root;
    let size = path.length;
    for (let i = 0; i < size; i++) {
        let index = this.getIndexInTrieBranch(path.charAt(i));
        if (this.current.branches[index] === undefined) {
            return -1;
        }
        this.current = this.current.branches[index];
    }
    return this.current.value;
};

/** 
 * @param {string} path 
 * @return {boolean}
 */
FileSystem.prototype.hasParentPath = function (path) {

    for (let i = 0; i < this.indexOfLastForwardSlash; i++) {
        let index = this.getIndexInTrieBranch(path.charAt(i));
        if (this.current.branches[index] === undefined) {
            return false;
        }
        this.current = this.current.branches[index];
    }
    return  this.current.value !== -1;
};

/** 
 * @param {string} ch 
 * @return {number}
 */
FileSystem.prototype.getIndexInTrieBranch = function (ch) {
    //97 => ascii code for 'a'.
    //26 => last array index.
    return ch !== '/' ? ch.codePointAt(0) - 97 : 26;
};

class TrieNode {
    constructor() {
        //(alphabet + forward slash) = (26 + 1) = 27
        this.branches = new Array(27);
        this.value = -1;
    }
}
