
public class FileSystem {

    TrieNode root;
    TrieNode current;
    int indexOfLastForwardSlash;

    public FileSystem() {
        root = new TrieNode();
        root.value = 0;//'0' is applied in method 'createPath', check comments there.
    }

    public boolean createPath(String path, int value) {

        current = root;
        int size = path.length();

        //start search from end, instead of applying the in-built method 'lastIndexOf()'
        indexOfLastForwardSlash = 0;
        for (int i = size - 1; i >= 0; i--) {
            if (path.charAt(i) == '/') {
                indexOfLastForwardSlash = i;
                break;
            }
        }

        if (!hasParentPath(path)) {
            return false;
        }

        for (int i = indexOfLastForwardSlash; i < size; i++) {
            int index = getIndexInTrieBranch(path.charAt(i));
            if (current.branches[index] == null) {
                current.branches[index] = new TrieNode();
            }
            current = current.branches[index];
        }

        /*
        If (current == root && root.value = -1) this boollean statement will return incorrectly.
        That's why root is initiated to '0'.
         */
        if (current.value != -1) {
            return false;
        }
        current.value = value;
        return true;

    }

    public int get(String path) {

        current = root;
        int size = path.length();
        for (int i = 0; i < size; i++) {
            int index = getIndexInTrieBranch(path.charAt(i));
            if (current.branches[index] == null) {
                return -1;
            }
            current = current.branches[index];
        }
        return current.value;
    }

    public boolean hasParentPath(String path) {
        for (int i = 0; i < indexOfLastForwardSlash; i++) {
            int index = getIndexInTrieBranch(path.charAt(i));
            if (current.branches[index] == null) {
                return false;
            }
            current = current.branches[index];
        }
        return current.value != -1;
    }

    public int getIndexInTrieBranch(char ch) {
        return ch != '/' ? ch - 'a' : 26;
    }

}

class TrieNode {

    final int ALPHABET_AND_FORWARD_SLASH = 26 + 1;
    TrieNode[] branches;
    int value;

    public TrieNode() {
        branches = new TrieNode[ALPHABET_AND_FORWARD_SLASH];
        this.value = -1;
    }
}
