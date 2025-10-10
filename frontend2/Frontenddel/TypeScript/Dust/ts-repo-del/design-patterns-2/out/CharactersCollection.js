"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersCollection = void 0;
var CharactersCollection = /** @class */ (function () {
    function CharactersCollection(data) {
        this.data = data;
    }
    Object.defineProperty(CharactersCollection.prototype, "length", {
        get: function () {
            return this.data.length;
        },
        enumerable: false,
        configurable: true
    });
    /*
        > "X" > "a"
        false           # Why?
        > "X".charCodeAt(0)
        87
        > "a".charCodeAt(0)
        97
        > 87 > 97
        false
    */
    CharactersCollection.prototype.compare = function (leftIndex, rightIndex) {
        return this.data[leftIndex].toLocaleLowerCase() > this.data[rightIndex].toLocaleLowerCase();
    };
    CharactersCollection.prototype.swap = function (leftIndex, rightIndex) {
        // Approach 1: Convert string to character array, once you have the array you can swap the elements in it; But, it is a overkill;
        var chars = this.data.split('');
        var temp = chars[leftIndex];
        chars[leftIndex] = chars[rightIndex];
        chars[rightIndex] = temp;
        this.data = chars.join('');
    };
    return CharactersCollection;
}());
exports.CharactersCollection = CharactersCollection;
