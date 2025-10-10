> pwd
  /Users/mcheedhe/Data-new/Technical/UI Tech/TypeScript/ts-repo
> mkdir 01-01-why-ts
> cd 01-why-ts
> npm init -y
> npm install axios     # Used to make a AJAX request;
-----------------------------------------------------------------------
> touch src/app1.ts

// Method-1
> tsc src/app1.ts --outDir out            # compiles .ts to .js
> node out/app1.js                        # Used to run app1.js
id: 2, title: quis ut nam facilis et officia qui, completed: false

// Method-2
> ts-node src/app1.ts --outDir=out  # combines above 2 commands into one;
id: 2, title: quis ut nam facilis et officia qui, completed: false
-----------------------------------------------------------------------
> touch src/app2.ts

> ts-node src/app2.ts --outDir=out        # It throws 3 errors, during compile time itself;    

-----------------------------------------------------------------------
> touch src/app3.ts
> ts-node src/app3.ts --outDir ../out
id: 2, title: false, completed: quis ut nam facilis et officia qui
id: 2, title: quis ut nam facilis et officia qui, completed: false
-----------------------------------------------------------------------
