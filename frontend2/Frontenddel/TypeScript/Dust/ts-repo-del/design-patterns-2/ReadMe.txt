Input:
    const arr1 = [10, 5, 18, -3];       [-3, 5, 10, 18]
    const arr2 = 'PoaJB';               'aBJoP'
    10 -> -3 -> 27 -> 5                 -3 -> 5 -> 10 -> 27 

Goal of this project is: take data of different data structures and sort it(from lowest to highest);


> mkdir design-patterns-2
> cd design-patterns-2
> mkdir src 
> mkdir out
> cd src 
> touch index.ts 
> cd ..

# You are in design-patterns-2; Goal is to compile the .ts file in src/ and put it in out/
> tsc --init        # Creates tsconfig.json file;
                    # Each time you run tsc, it checks if there is any tsconfig.json. If found, tsc uses it to customize the compiler behaviour;

# tsconfig.json has 2 settings:
#       rootDir: source file directory
#       outDir: output directory
> tsc       # It compiles all ts files in rootDir and places generated js files in outDir;


> tsc -w        # Watch src folder for any changes and recompile automatically in case of any changes;

--------------
# To run the above js code generated 
> node out/index.js         # hi

# Running above commands manually could be tedious sometimes;
# We can use nodemon and concurrently packages to automate it;

> npm init -y 
> npm install nodemon concurrently          # nodemon -> is responsbile for running our code, after each build;
                                            # concurrently -> is responsbile for running multiple scripts at the same time;

# Once package.json is updated with above dependencies, update scripts section in package.json as follows:
"start-build": "tsc -w"                     # Watch srcDir for any changes to source and compile immediately in case if the source changes;
"start-run": "nodemon out/index.js"       # Run the specified file;
"start": "concurrently npm:start-*"         # Run all commands that start with 'start-' concurrently; start-build in one window and start-run in another window;

> npm start         # It does everything!
