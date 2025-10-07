package com.cmr.visitor.eg1;

public class HtmlText extends DocumentPart {
    public HtmlText(String text) {
        setText(text);
    }
    public String accept(IVisitor visitor) {
        return visitor.visit(this);
    }
}