# NodeScripts
Some useful nodejs scripts

# DataGenModder
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
[6] - Size of New Files    (0 to not add any, otherwise 1,4,16,256,512,1024)
[7] - Debug                				(optional, default 'false')
```

#### To run the scipt:
```
node bin\DataGenModder.js 10 10 16 'c:\source\test' 4 120 4
```
This will write 10 directories each with 10 files of size 16kb in the C:\source\test directory 
and append 4kb of data to random files every 2 minutes. Running from the root directory will ensure after you
npm install everything that the dependencies are there.



- [x] Add ability to create dataset
- [x] Add ability to append data to random files within the dataset
- [ ] Add ability to remove data from random files within the dataset
- [x] Add ability to add more files during the Modder portion of the script
