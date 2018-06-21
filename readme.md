This git repo is a sample seed project that helps demonstrate webpack, karma and jasmine.
It takes a sample project from a legacy approach (html with javascript embedded) and demonstrates how 
we should separate the markup and the javascript and be able to create unit test cases against the javascript.
Something that is quite hard to do when it's embedded and not structure properly such as in a legacy approach.

The build folder contains all resources that are made available to the browser for either testing or publishing (hosting).
The data folder contains some sample json data that is used by the code.  Normally this would come from a REST endpoint from the server.  
Which is why it's not part of the public folder.

The public folder contains all the javascript and test bundles and html markup to run either the applications or test casses.

One rule I try and advocate is that no javascript should be in the html other then <script> includes.

Each application should have and maintain its' own folder and test (jasmine spec) files.
Also, in order to bootstrap the application, we should also have a index.js file.  
This file is used to simply start executing javascript on startup.

The /src folder contains all javascript and test source files.

The /test_index.js is a *magic* file which will fetch and import all spec files and help generate a simple one file output of all tests.
This is done for performance reasons vs having 1 to 1 test-output files.

building as 1 output test file for 16 tests takes on average 1649ms
running as 1 output test file for 16 tests takes on average  (0.085 secs / 0.071 secs)

building as 4 output test files (one per class) for 16 tests takes on average 2670ms
running as 4 output test files (one per class) for 16 tests takes on average (0.084 secs / 0.068 secs)

As you can see, we don't really gain much on running the test cases one way or the other; but building has a significant performance improvement building to one file vs 1 per class.



Available commands:
npm run build:prod
    - The above command will build the source code for production use.  Creating all bundles required.
npm run build:test
    - The above command will build and package up all the test cases and their source dependencies.
npm run test
    - The above command will run all test cases found in the test folder.
    - Will generate a report indicating success/failure of code based on jasmine test specificiations.
npm run start
    - The above command will run a dev server instance and serve
    - Will start the dev server instance and make your pages available for browser.

