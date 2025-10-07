package com.oracle.eventflow.infinity.actors;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

public class Trie {
    private Node root;

    public Trie() {
        root = new Node();
    }

    // Start with root node, current = root;
    // For each character in the given word,
    //      if current node maps a node for the current character, then simply advance to that node;
    //      else create a new node, add it to children, set it's character equal to current character, and advance to new node;
    // Mark the current node as a node that completes the word;
    // Time Complexity: O(N), where N represents the word size;
    public void insert(String word) {
        Node current = root;
        for (char ch : word.toCharArray()) {
            current = current.getChildren().computeIfAbsent(ch, c -> new Node());
        }
        current.setWord(true);
    }

    // Start with root node, current = root;
    // For each character in the given word,
    //      if current node maps a node for the current character, then simply advance to that node;
    //      else stop the search and return false;
    // If the current node is word, return true; else, return false;
    // Time Complexity: O(N), where N represents the word size;
    public boolean contains(String word) {
        Node current = root;
        for (char ch : word.toCharArray()) {
            current = current.getChildren().get(ch);
            if (current == null) {
                return false;
            }
        }
        return current.isWord();
    }

    // Case 1: If the word to deleted is not in the trie, nothing to do;
    // Case 2: If the word to deleted has no common subsequence with other words, then all delete all nodes of that word;
    // Case 3: If the word to deleted is a prefix of another longer word, then set leaf node flag to false;
    // Case 4: If the word to deleted and another word has a common prefix, then that node is deleted along with all the 
    // higher-up nodes until you find a node that has any children OR a node whose isEndWord is false;

    public boolean delete(String word) {
        return deleteHelper(word, root, 0);
    }

    private boolean deleteHelper(String word, Node currentNode, int index) {
        //Base Case: If we have reached at the node which points to the alphabet at the end of the key.
        if (index == word.length()) {
            // If the given word is not in the trie, nothing to do;
            if (!currentNode.isWord()) {
                return false;
            }

            // If the given word is in the trie, mark it as deleted!
            currentNode.setWord(false);
            // If this node doesn't have any children, we can delete this node in the path;
            return currentNode.getChildren().isEmpty();
        }

        char ch = word.charAt(index);
        Node childNode = currentNode.getChildren().get(ch);
        if (childNode == null) {
            return false; // If the given word is not in the trie, nothing to do;
        }
        boolean childDeleted = deleteHelper(word, childNode, index + 1);
        if (childDeleted && !childNode.isWord()) {
            currentNode.getChildren().remove(ch);
            return currentNode.getChildren().isEmpty();
        }
        return false;
    }

    public List<String> suggest(String prefix) {
        List<String> list = new ArrayList<>();
        Node current = root;
        StringBuffer curr = new StringBuffer();
        for (char c : prefix.toCharArray()) {
            current = current.getChildren().get(c);
            if (current == null)
                return list;
            curr.append(c);
        }
        suggestHelper(current, list, new String(curr));
        return list;
    }

    private void suggestHelper(Node root, List<String> list, String curr) {
        if (root.isWord()) {
            list.add(curr.toString());
        }

        if (root.getChildren() == null || root.getChildren().isEmpty())
            return;

        root.getChildren().forEach((ch, node) -> {
            String newCurr = curr + Character.toString(ch);
            suggestHelper(node, list, newCurr);
        });
    }

    public int getWordCount() {
        return getWordCount(root);
    }

    private int getWordCount(Node current) {
        int count = 0;
        if (current.isWord())
            count++;
        for (Entry<Character, Node> entry : current.getChildren().entrySet()) {
            count += this.getWordCount(entry.getValue());
        }
        return count;
    }

    public List<String> getAllWords() {
        ArrayList<String> allWords = new ArrayList<String>();
        getAllWords(root, allWords, "");
        return allWords;
    }

    private void getAllWords(Node current, List<String> allWords, String currentWord) {
        if (current.isWord()) {
            allWords.add(currentWord);
        }
        for (Entry<Character, Node> entry : current.getChildren().entrySet()) {
            String newWord = currentWord + Character.toString(entry.getKey());
            getAllWords(entry.getValue(), allWords, newWord);
        }
    }

    // List returned by getAllWords() is already sorted!
    // Time Complexity: O(N);
    public List<String> sort() {
        return getAllWords();
    }
}

class Node {
    // If your charset contains just lower OR upper case chars, you can replace the map with array of 26 chars;
    private HashMap<Character, Node> children;
    private boolean isWord;

    public Node() {
        this.children = new HashMap<>();
        this.isWord = false;
    }

    public HashMap<Character, Node> getChildren() {
        return children;
    }

    public void setChildren(HashMap<Character, Node> children) {
        this.children = children;
    }

    public boolean isWord() {
        return isWord;
    }

    public void setWord(boolean isWord) {
        this.isWord = isWord;
    }
}
