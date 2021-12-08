
using namespace std;

struct TrieNode {

	//(alphabet + forward slash) = (26 + 1) = 27
	TrieNode* branches[27] = { nullptr };
	int value = -1;
};


class FileSystem {
public:
	TrieNode* root;
	TrieNode* current;
	int indexOfLastForwardSlash;

	FileSystem() {
		root = new TrieNode();
		root->value = 0;//'0' is applied in method 'createPath', check comments there.
	}

	bool createPath(string path, int value) {
		current = root;
		int size = path.length();

		//start search from end, instead of applying the in-built method 'find_last_of()'
		indexOfLastForwardSlash = 0;
		for (int i = size - 1; i >= 0; i--) {
			if (path[i] == '/') {
				indexOfLastForwardSlash = i;
				break;
			}
		}

		if (!hasParentPath(path)) {
			return false;
		}

		for (int i = indexOfLastForwardSlash; i < size; i++) {
			int index = getIndexInTrieBranch(path[i]);
			if (current->branches[index] == nullptr) {
				current->branches[index] = new TrieNode();
			}
			current = current->branches[index];
		}

		/*
		If (current == root && root.value = -1) this boollean statement will return incorrectly.
		That's why root is initiated to '0'.
		 */
		if (current->value != -1) {
			return false;
		}
		current->value = value;
		return true;
	}

	int get(string path) {
		current = root;
		int size = path.length();
		for (int i = 0; i < size; i++) {
			int index = getIndexInTrieBranch(path[i]);
			if (current->branches[index] == nullptr) {
				return -1;
			}
			current = current->branches[index];
		}
		return current->value;
	}

	bool hasParentPath(string path) {
		for (int i = 0; i < indexOfLastForwardSlash; i++) {
			int index = getIndexInTrieBranch(path[i]);
			if (current->branches[index] == nullptr) {
				return false;
			}
			current = current->branches[index];
		}
		return current->value != -1;
	}

	int getIndexInTrieBranch(char ch) {
		return ch != '/' ? ch - 'a' : 26;
	}
};
