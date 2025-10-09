package com.cmr.behavioural.command;

public class OpenCommand implements Command {
	@Override
	public void execute() {
		System.out.println("Opening door..");
	}
}