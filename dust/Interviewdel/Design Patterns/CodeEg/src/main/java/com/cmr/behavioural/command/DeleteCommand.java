package com.cmr.behavioural.command;

public class DeleteCommand implements Command {
	@Override
	public void execute() {
		System.out.println("Deleting file");
	}
}