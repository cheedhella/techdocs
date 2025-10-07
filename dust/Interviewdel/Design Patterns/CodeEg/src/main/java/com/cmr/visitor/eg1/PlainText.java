package com.cmr.visitor.eg1;

public class PlainText extends DocumentPart {
    public PlainText(String text) {
        setText(text);
    }
    public String accept(IVisitor visitor) {
        return visitor.visit(this);
    }
}