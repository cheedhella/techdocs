package com.cmr.behavioural.command;

public class Client {
	public static void main(String args[]) {
		// Client creates Invoker object, command object and configure them
		Menu menu = new Menu();
		menu.setCommand("Create", new CreateCommand());
		menu.setCommand("Delete", new DeleteCommand());
		// Invoker invokes command
		menu.runCommand("Create");
		menu.runCommand("Delete");
	}
}