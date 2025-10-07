package com.cmr.visitor.eg1;

import java.util.ArrayList;
import java.util.List;

/*
    The problem with this approach is, every class needs know about every possible operation;
    In other words, if you want to add a new operation OR modify existing operation, you need to 
    modify all the model classes;

    You can use Visitor pattern to decouple the operation from model object;
*/
public class MyClient {
    public static void main(String args[]) {
        List<DocumentPart> m_parts = new ArrayList<DocumentPart>(); // It could be an array or tree!
        m_parts.add(new PlainText("plainText"));
        m_parts.add(new HtmlText("boldText"));
        Document d1 = new Document(m_parts);

        IVisitor v1 = new PlainTextVisitor();
        String plainDoc = d1.accept(v1);
        System.out.println("Plain Doc: " + plainDoc);

        IVisitor v2 = new HtmlVisitor();
        String htmlDoc = d1.accept(v2);
        System.out.println("Html Doc: " + htmlDoc);
    }
}
