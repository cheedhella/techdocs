import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([10, 5, 18, -3]);
const sorter = new Sorter(numbersCollection);
sorter.sort();
console.log(numbersCollection.data); // Print sorted collection;

const charsCollection = new CharactersCollection('Xaayb');
const sorter2 = new Sorter(charsCollection);
sorter2.sort();
console.log(charsCollection.data);

const linkedList1 = new LinkedList();
linkedList1.add(500);
linkedList1.add(-10);
linkedList1.add(-3);
linkedList1.add(4);
const sorter3 = new Sorter(linkedList1);
sorter3.sort();
linkedList1.print();

// Problem: Instead of creating Sorter for each collection, why can't each collection support sort() directly?
// One way of achieving it is: Every collection should extend Sorter;