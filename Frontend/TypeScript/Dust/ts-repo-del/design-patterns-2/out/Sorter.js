"use strict";
// import { NumbersCollection } from './NumbersCollection';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorter = void 0;
var Sorter = /** @class */ (function () {
    // constructor(public collection: NumbersCollection) { }
    function Sorter(collection) {
        this.collection = collection;
    }
    Sorter.prototype.sort = function () {
        var length = this.collection.length; // value and type of length comes from collection; // const length = this.collection.length;
        // Bubble sorting implementation
        /*
        for(let i = 0; i < length ; i++) {
            for(let j = 0; j < length - i - 1; j++) {
                if(this.collection[j] > this.collection[j + 1]) {
                    const temp = this.collection[j];
                    this.collection[j] = this.collection[j + 1];
                    this.collection[j + 1] = temp;
                }
            }
        }
        */
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - i - 1; j++) {
                if (this.collection.compare(j, j + 1)) {
                    this.collection.swap(j, j + 1);
                }
            }
        }
    };
    return Sorter;
}());
exports.Sorter = Sorter;
