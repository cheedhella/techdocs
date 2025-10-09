package com.cmr.behavioural.memento;

// Only the originator that created a memento is allowed to access it.

// A client (caretaker) can request a memento from the originator (to save the internal state of the originator) and pass 
// a memento back to the originator (to restore to a previous state). 
// This enables to save and restore the internal state of an originator without violating its encapsulation.

public class CareTaker {
	public static void main(String args[]) {
		Editor e = new Editor();
		e.write("e101", "e101@gmail.com");
		e.createCheckPoint();
		e.write("e102", "e102@gmail.com");
		e.write("e103", "e103@gmail.com");
		e.createCheckPoint();
		e.write("e104", "e104@gmail.com");
		e.write("e105", "e105@gmail.com");
		e.createCheckPoint();
		e.undo();
		e.undo();
	}
}