
var FileSystem = function () {
    FileSystem.prototype.root = new TrieNode();
    FileSystem.prototype.root.value = 0;
    FileSystem.prototype.current = FileSystem.prototype.root;
    FileSystem.prototype.indexOfLastForwardSlash = 0;
};

/** 
 * @param {string} path 
 * @param {number} value
 * @return {boolean}
 */
FileSystem.prototype.createPath = function (path, value) {
    const fileSystem = FileSystem.prototype;
    fileSystem.current = fileSystem.root;
    let size = path.length;

    fileSystem.indexOfLastForwardSlash = 0;
    for (let i = size - 1; i >= 0; i--) {
        if (path.charAt(i) === '/') {
            fileSystem.indexOfLastForwardSlash = i;
            break;
        }
    }

    if (!fileSystem.hasParentPath(path)) {
        return false;
    }

    for (let i = fileSystem.indexOfLastForwardSlash; i < size; i++) {
        let index = fileSystem.getIndexInTrieBranch(path.charAt(i));
        if (fileSystem.current.branches[index] === undefined) {
            fileSystem.current.branches[index] = new TrieNode();
        }
        fileSystem.current = fileSystem.current.branches[index];
    }

    /*
     If (current == root && root.value = -1) this boollean statement will return incorrectly.
     That's why root.value is initiated to '0'.
     */
    if (fileSystem.current.value !== -1) {
        return false;
    }
    fileSystem.current.value = value;
    return true;
};

/** 
 * @param {string} path
 * @return {number}
 */
FileSystem.prototype.get = function (path) {
    const fileSystem = FileSystem.prototype;
    fileSystem.current = fileSystem.root;
    let size = path.length;
    for (let i = 0; i < size; i++) {
        let index = fileSystem.getIndexInTrieBranch(path.charAt(i));
        if (fileSystem.current.branches[index] === undefined) {
            return -1;
        }
        fileSystem.current = fileSystem.current.branches[index];
    }
    return fileSystem.current.value;
};

/** 
 * @param {string} path 
 * @return {boolean}
 */
FileSystem.prototype.hasParentPath = function (path) {
    const fileSystem = FileSystem.prototype;
    for (let i = 0; i < fileSystem.indexOfLastForwardSlash; i++) {
        let index = fileSystem.getIndexInTrieBranch(path.charAt(i));
        if (fileSystem.current.branches[index] === undefined) {
            return false;
        }
        fileSystem.current = fileSystem.current.branches[index];
    }
    return  fileSystem.current.value !== -1;
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
