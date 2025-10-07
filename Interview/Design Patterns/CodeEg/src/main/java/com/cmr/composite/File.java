package com.cmr.composite;

public class File implements Entry {
	private String name;
	private int size;

	public File(String name, int size) {
		this.name = name;
		this.size = size;
	}

	@Override
	public String name() {
		return name;
	}

	@Override
	public int size() {
		return size;
	}
}