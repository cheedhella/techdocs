package com.cmr.behavioural.command;

public class CreateCommand implements Command {
	@Override
	public void execute() {
		System.out.println("Creating file");
	}
}