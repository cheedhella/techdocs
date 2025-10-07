package com.oracle.eventflow.infinity.actors;

public class TrieApp {
    public static void main(String[] args) {
        Trie t1 = new Trie();
        t1.insert("the");
        t1.insert("a");
        t1.insert("there");
        t1.insert("answer");
        t1.insert("any");
        t1.insert("by");
        t1.insert("bye");
        t1.insert("their");

        if (t1.contains("the"))
            System.out.println("the is present!");
        else
            System.out.println("the is not present!");

        if (t1.contains("these"))
            System.out.println("these is present!");
        else
            System.out.println("these is not present!");

        if (t1.contains("their"))
            System.out.println("their is present!");
        else
            System.out.println("their is not present!");

        if (t1.contains("thaw"))
            System.out.println("thaw is present!");
        else
            System.out.println("thaw is not present!");

        t1.delete("their");
        System.out.println("Deleting the word!");

        if (t1.contains("their"))
            System.out.println("the is present!");
        else
            System.out.println("the is not present!");
    }
}