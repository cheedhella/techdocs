package com.cmr.visitor.eg0;

public class PlainText extends DocumentPart {
    public PlainText(String text) {
        setText(text);
    }
    public String toPlainText() {
        return getText();
    }

    public String toHtml() {
        return "<span>" + getText() + "</span>";
    }
}