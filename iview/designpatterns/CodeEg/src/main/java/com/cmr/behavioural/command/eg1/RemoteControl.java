package com.cmr.behavioural.command.eg1;

// Invoker
// It knows about only Command, it doesn't bother who the Receiver is.
// It can be as dumb as simply delegating the request to the command's execute method.
// It can be as smart as recording the commands executed to support UNDO, REDO operations.
public class RemoteControl {
	private Command command;

	public void setCommand(Command command) {
		this.command = command;
	}

	public void pressButton() {
		command.execute();
	}
}