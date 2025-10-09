package com.cmr.behavioural.visitor.eg1;

/* Visitor 
 * It represents an operation to be performed on the objects of a family of classes.
 * It defines a method for each type of object.
 */
public interface CartVisitor {

	int visit(Book book);

	int visit(Fruit fruit);
}