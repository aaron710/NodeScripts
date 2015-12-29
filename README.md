# NodeScripts
Some useful nodejs scripts

# DataGenModder
DataGenModder is a script that creates a dataset of text files based on input, and then appends data
to a random amount of them based off of a timed interval.  This gives the look of a changing dataset to
anyone that may be scanning those files. 

#### Parameters
```
[0] - Number of Directories 
[1] - Filles Per Directory
[2] - File Size (KB)        			(0 to skip creation, Otherwise 1,4,16,256,512,1024)
[3] - Source Folder
[4] - Number of Seconds Between Changes (0 to skip modification)
[5] - Size of Appends      				(0 to skip modification, otherwise 1,4,16,256,512,1024)
[6] - Debug                				(optional, default 'false')
```

#### To run the scipt:
```
node DataGenModder.js 10 10 16 'c:\source\test' 4 120

This will write 10 directories each with 10 files of size 16kb in the C:\source\test directory 
and append 4kb of data to random files every 2 minutes.
```

- [x] Add ability to create dataset
- [x] Add ability to append data to random files within the dataset
- [ ] Add ability to remove data from random files within the dataset
- [ ] Add ability to add more files during the Modder portion of the script