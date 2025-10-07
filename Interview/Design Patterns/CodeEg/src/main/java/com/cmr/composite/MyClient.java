package com.cmr.composite;

/*
 * Both individual object(File) and composite(Dir) implements the same interface.
 * Client need not to know whether object is individual object or composite.
 */
/*
 * home
 * 	- d1
 * 		- f1 - 10KB
 * 		- f2 - 20KB
 * 	- d2
 * 		- f3 - 30KB
 * 		- f4 - 40KB
 */
public class MyClient {
	public static void main(String args[]) {
		Dir home = new Dir("home");

		Dir d1 = new Dir("d1");
		File f1 = new File("f1", 10);
		File f2 = new File("f2", 20);
		d1.add(f1);
		d1.add(f2);
		home.add(d1);

		Dir d2 = new Dir("d2");
		File f3 = new File("f3", 30);
		File f4 = new File("f4", 40);
		d2.add(f3);
		d2.add(f4);
		home.add(d2);

		System.out.println("home size: " + home.size());
		System.out.println("d2 size: " + d2.size());
		System.out.println("f2 size: " + f2.size());
	}
}