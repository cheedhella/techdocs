package com.cmr.visitor.eg1;

public abstract class DocumentPart {
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    /*
        The implementations of Accept() seem to be identical for all child classes of DocumentPart. 
        However, we can’t move the code into the base class because IVisitor doesn’t have an method 
        Visit(DocumentPart) but only for the concrete implementations.
        We could solve this through reflection, though, but would lose compile-time checking.
    */
    public abstract String accept(IVisitor visitor);
}