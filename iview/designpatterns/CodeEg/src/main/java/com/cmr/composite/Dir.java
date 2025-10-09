package com.cmr.composite;

import java.util.ArrayList;
import java.util.List;

public class Dir implements Entry {
	private String name;
	private List<Entry> entries;

	public Dir(String name) {
		this.name = name;
		entries = new ArrayList<Entry>();
	}

	public void add(Entry entry) {
		this.entries.add(entry);
	}

	public void remove(Entry entry) {
		this.entries.remove(entry);
	}

	@Override
	public String name() {
		return name;
	}

	@Override
	public int size() {
		return this.entries.stream().mapToInt(Entry::size).sum();
	}
}