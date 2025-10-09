package com.cmr.visitor.eg0;

public class HtmlText extends DocumentPart {
    public HtmlText(String text) {
        setText(text);
    }
    public String toPlainText() {
        return "**" + this.getText() + "**";   
    }

    public String toHtml() {
        return "<b>" + this.getText() + "</b>";
    }
}