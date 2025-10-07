package com.cmr.visitor.eg1;

public class PlainTextVisitor implements IVisitor {
    public String visit(PlainText documentPart) {
        return documentPart.getText();
    }

    public String visit(HtmlText documentPart) {
        return "**" + documentPart.getText() + "**";
    }
}