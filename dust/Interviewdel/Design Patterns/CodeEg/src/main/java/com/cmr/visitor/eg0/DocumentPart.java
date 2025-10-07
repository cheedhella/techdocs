package com.cmr.visitor.eg0;

public abstract class DocumentPart {
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    // Operations
    public abstract String toPlainText();
    public abstract String toHtml();
}