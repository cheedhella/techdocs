package com.cmr.visitor.eg1;

import java.util.List;

/* 
    Imagine each document object as a page that you want to convert;
    Each document can have a list of plain/html fragments;
    Document.toPlainText() converts entire page to plain text;
    Document.toHtml() converts entire page to HTML;
*/
public class Document {
    private List<DocumentPart> m_parts;
    public Document(List<DocumentPart> m_parts) {
        this.m_parts = m_parts;
    }

    public String accept(IVisitor visitor) {
        String output = "";
        for(DocumentPart part: m_parts) {
            output += " " + part.accept(visitor);
        }
        return output;
    }
}