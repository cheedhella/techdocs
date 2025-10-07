package com.cmr.behavioural.memento;

import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

// Originator
// The object whose state needs to be captured is referred to as the originator.
public class Editor {
	private Stack<List<EmployeeMemento>> history;
	private List<EmployeeMemento> nextSavePoint;

	public Editor() {
		history = new Stack<List<EmployeeMemento>>();
		nextSavePoint = new LinkedList<EmployeeMemento>();
	}

	public void write(String name, String email) {
		nextSavePoint.add(new EmployeeMemento(name, email));
	}

	public void createCheckPoint() {
		history.push(nextSavePoint);
		nextSavePoint = new LinkedList<EmployeeMemento>();
	}

	public void undo() {
		List<EmployeeMemento> popped = history.pop();
		System.out.println("Removed: " + popped);
	}

	public void undoAll() {
		history.removeAllElements();
	}

	// Memento Represents the state of the application.
	private class EmployeeMemento {
		private String name;
		private String email;

		public EmployeeMemento(String name, String email) {
			this.name = name;
			this.email = email;
		}

		@Override
		public String toString() {
			return "name=" + name + ", email=" + email;
		}
	}
}