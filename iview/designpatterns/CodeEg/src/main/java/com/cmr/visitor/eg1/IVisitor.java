package com.cmr.visitor.eg1;

public interface IVisitor {
    String visit(PlainText documentPart);
    String visit(HtmlText documentPart);
}