package com.cmr.visitor.eg1;

public class HtmlVisitor implements IVisitor {
    public String visit(PlainText documentPart) {
        return "<span>" + documentPart.getText() + "</span>";
    }

    public String visit(HtmlText documentPart) {
        return "<b>" + documentPart.getText() + "</b>";
    }
}