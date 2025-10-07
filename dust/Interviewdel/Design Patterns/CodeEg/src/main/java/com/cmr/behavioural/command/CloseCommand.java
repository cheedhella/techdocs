package com.cmr.behavioural.command;

public class CloseCommand implements Command {
	@Override
	public void execute() {
		System.out.println("Closing door..");
	}
}