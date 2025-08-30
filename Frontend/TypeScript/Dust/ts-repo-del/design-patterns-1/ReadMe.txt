Scope of this App is to randomly generate a user and company(with some random location) and show them on the map using draw.io;

> npm install -g parcel-bundler     # parcel-bundler is a CLI tool(alternative to ts-node) that helps you to run TypeScript code in the browser;
                                    # WebPack is better bundler than both;
> mkdir design-patterns-1
> cd design-patterns-1
> touch index.html
> mkdir src 
> cd src
> touch User.ts
> touch Company.ts
> touch Map.ts
> touch index.ts                # B/C it has no classes, so it starts with lower case file name;
> npm install faker, @types/faker, @types/googlemaps
> parcel index.html

faker # It is used to different type of fake data;


Default exports can be imported without using curly braces; // Eg: export default 'red'; import myRed from './file'; // myRed will have 'red'
One of the convetions is, don't use 'export default'; It is totally fine, but avoid it;
If you are importing any User code, then use import with curly brances; // import User from './User';
That mayn't apply to third party modules, they still might have a default export in-place; // import faker from './faker';


Cmd + Shift + P -> fold level 2 -> used to collapse level 2 
