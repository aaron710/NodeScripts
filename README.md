# NodeScripts
Some useful nodejs scripts

You can install all of the dependencies at once by doing
```
npm install
```
or 
```
npm run prestart
```

## DataGenModder
DataGenModder is a script that creates a dataset of text files based on input, and then appends data
to a random amount of them based off of a timed interval.  This gives the look of a changing dataset to
anyone that may be scanning those files. 

#### Dependency
```
npm install graceful-fs
npm install shelljs
```
We have a dependency on graceful-fs and shelljs. So you will need to npm install it before you use the script.

#### Script Help
```
node bin\DataGenModder.js --help
```
Running --help as a parameter will print the script help screen.

#### Parameters
```
[0] - Number of Directories 
[1] - Filles Per Directory
[2] - File Size (KB)        			(0 to skip creation, Otherwise 1,4,16,256,512,1024)
[3] - Source Folder
[4] - Number of Seconds Between Changes (0 to skip modification)
[5] - Size of Appends      				(0 to skip modification, otherwise 1,4,16,256,512,1024)
[6] - Size of New Files        (0 to not add any, otherwise 1,4,16,256,512,1024)
[7] - Debug                				(optional, default 'false')
```

#### To run the scipt:
```
node bin\DataGenModder.js 10 10 16 c:\source\test 120 4 4
```
This will write 10 directories each with 10 files of size 16kb in the C:\source\test directory 
and append 4kb of data to random files every 2 minutes. Running from the root directory will ensure after you
npm install everything that the dependencies are there.

Note: This script does not create 0 byte files at all. Entering a 0 will typically skip the step or as the descriptions describe not add any.

- [x] Add ability to create dataset
- [x] Add ability to append data to random files within the dataset
- [ ] Add ability to remove data from random files within the dataset
- [x] Add ability to add more files during the Modder portion of the script

## HydraDbReader
HydraDbReader will access Hydra's Mongo Database and print out usefull information to the screen for the 
person running the script.

#### Dependency
```
npm install mongodb
npm install async
npm install colors
npm install console.table
npm install readline-sync
```


#### Script Help
```
node bin\HydraDbReader.js --help
```
Running --help as a parameter will print the script help screen.

#### Parameters
```
 [0] -  MongoDb Host IP Address
 [1] -  MongoDb Host Port
 [2] -  MongoDb Username ('' for empty)
 [3] -  MongoDb Password ('' for empty)
```

#### To run the scipt:
```
node bin\HydraDbReader.js localhost 27017 "" ""
```

