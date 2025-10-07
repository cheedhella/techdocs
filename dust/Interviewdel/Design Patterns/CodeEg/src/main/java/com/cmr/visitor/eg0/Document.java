package com.cmr.visitor.eg0;

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
    public String toPlainText() {
        String output = "";
        for(DocumentPart part: m_parts) {
            output += " " + part.toPlainText();
        }
        return output;
    }
    public String toHtml() {
        String output = "";
        for(DocumentPart part: m_parts) {
            output += " " + part.toHtml();
        }
        return output;
    }
}