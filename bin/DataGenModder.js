/**
    DataGenModder
    Created By: Aaron
    Created On: 12/27/15

    DataGenModder is a script that can create a dataset given the script parameters and can also append
    data to the files to turn the dataset into a changing dataset. It is admittedly fairly limited for
    the time being. Parameters to the script have to be exact since I have not implemented any real error
    checking.

    Options can be entered to skip creating the dataset and just go straight into making an old dataset into
    a changing dataset.  The caveat here is the dataset must have been created by DataGenModder in order for
    this to be possible.  Also, a user can just create the dataset and not enter the changing dataset mode.

    Input Parameters:

    [0] - Number of Directories
    [1] - Filles Per Directory
    [2] - File Size (KB)        (0 to skip creation,1,4,16,256,512,1024)
    [3] - Source Folder
    [4] - Number of Seconds Between Changes (0 to skip)
    [5] - Size of Appends      (0 to skip, otherwise 1,4,16,256,512,1024)
    [6] - Size of New Files    (0 to not add any, otherwise 1,4,16,256,512,1024)
    [7] - Debug                (optional, default 'false')

    Example command to run full script:
        node DataGenModder.js 10 10 16 'c:\\source\\test' 4 120

    This will generate a dataset of 10 directories with 10 files in each directory of file size 16kb in the
    \\source\\test\\ directory and after file creation has been completed will append 4kb of data to a
    random amount of files in that dataset every 2 minutes

    Example command to ONLY generate dataset:
        node DataGenModder.js 10 10 4 'c:\\source\\test' 0 0

    This will generate a dataset of 10 directories with 10 files in each directory of file size 4kb in the
    C:\\source\\test\\ directory and will not append any data to them after creation has been done

    Example command to ONLY use changing dataset:
        node DataGenModder.js 10 10 0 'c:\\source\\test' 60 4

    This will append 4kb of data to random files in the dataset created above every minute
 *
 */

var fs = require('graceful-fs');
var shell = require('shelljs');

var args = process.argv.slice(2);

if (args[0] == "--help")
{

    printHelp();
    process.exit();
}

if (args.length < 7)
{
    console.log("\n");
    console.log("Error: Not enough arguments\n" +
        "[0] - Number of Directories \n" +
        "[1] - Filles Per Directory  \n" +
        "[2] - File Size (KB)        (0 to skip creation, Otherwise 1,4,16,256,512,1024)\n" +
        "[3] - Source Folder\n" +
        "[4] - Number of Seconds Between Changes (0 to skip)\n" +
        "[5] - Size of Appends      (0 to skip modification, otherwise 1,4,16,256,512,1024)\n" +
        "[6] - Size of New Files    (0 to not add any, otherwise 1,4,16,256,512,1024)\n" +
        "[7] - Debug                (optional, default 'false')");

    process.exit();
}

// Create 1 Kb worth of data
var oneKb = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";


var tDebug = false;
var numOfDirs = args[0];
var numFilesPerDir = args[1];
var fileSize = args[2];
var sourceDir = args[3];
var tSeconds = args[4];
var appendSize = args[5];
var newFileSize = args[6];

// If there is a 6th argument set the debug
if (args[7] != null)
{
    console.log(args[7])
    if (args[7] == "true")
        tDebug = true;
}

if (numOfDirs != 0 && numFilesPerDir != 0 && fileSize != 0 && sourceDir != "")
    generateData(numOfDirs,numFilesPerDir,fileSize,sourceDir,tDebug);

if (numOfDirs != 0 && numFilesPerDir != 0 && sourceDir != "" &&tSeconds != 0 && appendSize != 0)
    changeData(tSeconds,numOfDirs,numFilesPerDir,appendSize,sourceDir,tDebug,newFileSize);

//process.exit();


/*  Random Number Generator using a low and high integer
 */
function randomIntInc(low, high)
{
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function countNumOfFilesInFolder(DirectoryName)
{
    var count = 0;
    shell.cd(DirectoryName);
    var files = shell.ls() || [];

    for (var i=0; i<files.length; i++)
    {
        var file = files[i];

        if (file.match(/.*\..*/))
        {
            count++;
        }
    }

    return count;
}

function printHelp()
{
    console.log("\n");
    console.log("DataGenModder");
    console.log("Created By: Aaron");
    console.log("Created On: 12/27/15");
    console.log("\n");
    console.log("DataGenModder is a script that can create a dataset given the script parameters and can also append\n" +
                "data to the files to turn the dataset into a changing dataset. It is admittedly fairly limited for \n" +
                "the time being. Parameters to the script have to be exact since I have not implemented any real error \n" +
                "checking.");
    console.log("\n");
    console.log("Options can be entered to skip creating the dataset and just go straight into making an old dataset into\n" +
                "a changing dataset.  The caveat here is the dataset must have been created by DataGenModder in order for\n" +
                "this to be possible.  Also, a user can just create the dataset and not enter the changing dataset mode. \n");
    console.log("\n");
    console.log("Input Parameters:");
    console.log(""+
                "[0] - Number of Directories \n" +
                "[1] - Filles Per Directory  \n" +
                "[2] - File Size (KB)        (0 to skip creation,1,4,16,256,512,1024)\n" +
                "[3] - Source Folder\n" +
                "[4] - Number of Seconds Between Changes (0 to skip)\n" +
                "[5] - Size of Appends      (0 to skip, otherwise 1,4,16,256,512,1024)\n" +
                "[6] - Size of New Files    (0 to not add any, otherwise 1,4,16,256,512,1024)\n" +
                "[7] - Debug                (optional, default 'false')");
    console.log("\n");
    console.log("Example command to run full script:");
    console.log("node DataGenModder.js 10 10 16 'c:\\source\\test' 4 120");
    console.log("This will generate a dataset of 10 directories with 10 files in each directory of file size 16kb in the\n" +
                "C:\\source\\test\\ directory and after file creation has been completed will append 4kb of data to a \n" +
                "random amount of files in that dataset every 2 minutes");
    console.log("\n");
    console.log("Example command to ONLY generate dataset:");
    console.log("node DataGenModder.js 10 10 4 'c:\\source\\test' 0 0");
    console.log("This will generate a dataset of 10 directories with 10 files in each directory of file size 4kb in the\n" +
                "C:\\source\\test\\ directory and will not append any data to them after creation has been done");
    console.log("\n");
    console.log("Example command to ONLY use changing dataset:");
    console.log("node DataGenModder.js 10 10 0 'c:\\source\\test' 60 4");
    console.log("This will append 4kb of data to random files in the dataset created above every minute\n");

}

function generateData(numOfDirs, numFilesPerDir, fileSize, sourceDir, tDebug)
{
    var fileData = oneKb;
    for (var i = 0; i < fileSize; i++)
    {
        if (i == 0)
            continue;
        else
        {
            fileData = fileData.concat(oneKb);
        }
    }

    console.log("Dataset Creation Started");

    for (var i = 0; i < numOfDirs; i++)
    {
        if (!fs.existsSync(sourceDir+"/folder"+i))
        {
            fs.mkdirSync(sourceDir + "/folder"+i);
            if(tDebug)console.log("Created Folder");

        }

        for(var j =0; j< numFilesPerDir; j++)
        {
            fs.writeFileSync(sourceDir+'/folder'+i+'/file'+j+'.txt', fileData);
        }

    }
    console.log("Dataset Creation Finished");
    console.log("**************************************************************");
    console.log("Total Number of Files    : " + (numOfDirs*numFilesPerDir));
    console.log("Total Data Generated (KB): " + (numOfDirs*numFilesPerDir*fileSize));
}

function changeData(tSeconds,numOfDirs,numFilesPerDir,appendSize,sourceDir,tDebug,newFileSize)
{
    var totalFilesEdited = 0;
    var totalFilesAdded = 0;

    setInterval(function()
    {
        var fileData = oneKb;
        for (var i = 0; i < appendSize; i++)
        {
            if (fileSize == 1)
                continue;
            else
            {
                fileData = fileData.concat(oneKb);
            }

        }

        var newFileData = oneKb;
        for (var i = 0; i < newFileSize; i++)
        {
            if (i == 0)
                continue;
            else
            {
                newFileData = newFileData.concat(oneKb);
            }
        }


        var numFilesToEdit = randomIntInc(0,numFilesPerDir-1);
        var numDirsToEnter = 0;
        var numFilesChangePerDir = 0;
        var numFilesToCreate = randomIntInc(0,numFilesPerDir-1);
        var numFilesCreatePerDir = 0;

        // Figure out some basic statistics
        if (numFilesToEdit < 5)
        {
            numDirsToEnter = 1;
            numFilesChangePerDir = numFilesToEdit;
            numFilesCreatePerDir = numFilesToCreate;
        }
        else
        {
            numDirsToEnter = randomIntInc(1,numOfDirs-1);
            numFilesChangePerDir = Math.floor(numFilesToEdit/numDirsToEnter);
            numFilesCreatePerDir = Math.floor(numFilesToCreate/numDirsToEnter);
        }

        // For each dir to enter
        for (var i = 0; i < numDirsToEnter; i++)
        {
            // Generate a random number to choose which folder we enter
            var folderToEdit = randomIntInc(0,numOfDirs-1);

            // Get the current count of files in the folder
            var count = countNumOfFilesInFolder(sourceDir+'/folder'+folderToEdit);

            // For the number of files to change in each directory
            for(var j =0; j < numFilesChangePerDir; j++)
            {
                // Generate a random number to choose which file we enter
                var fileToEdit = randomIntInc(0,count-1);
                //console.log("file to edit: " + fileToEdit);

                fs.appendFile(sourceDir+'/folder'+folderToEdit+'/file'+ fileToEdit +'.txt', fileData, function (err) {if(err)console.log(err)});
                totalFilesEdited++;

                var filename = sourceDir+'\\folder'+folderToEdit+'\\file'+fileToEdit+'.txt';

                if(tDebug)console.log("File: " + filename + " has been appended to")
            }

            if (newFileSize != 0)
            {
                // For the number of files to change in each directory
                for(var k = count; k < (count + numFilesCreatePerDir); k++)
                {
                    // Generate a random number to choose which file we enter
                    //var fileToEdit = randomIntInc(count,((count + numFilesPerDir) -1));
                    //console.log("file to edit: " + fileToEdit);

                    // Create the file
                    fs.writeFileSync(sourceDir+'/folder'+folderToEdit+'/file'+k+'.txt', newFileData);
                    totalFilesAdded++;
                    if(tDebug)console.log("File Created: " + sourceDir+'/folder'+folderToEdit+'/file'+k+'.txt');

                    //totalFilesEdited++;
                    //var filename = sourceDir+'\\folder'+folderToEdit+'\\file'+fileToEdit+'.txt';

                }
            }

        };

        console.log("**************************************************************");
        //console.log("Number of files to edit: " + numFilesToEdit);
        //console.log("Number of dirs to enter: " + numDirsToEnter);
        //console.log("Number of files to edit per dir: " + numFilesChangePerDir);
        console.log("Total Files Edited: " + totalFilesEdited);
        console.log("Total Data Updated (Kb): " + totalFilesEdited*appendSize);
        console.log("Total New Files: " + totalFilesAdded);
        console.log("Total New Files Data (KB): " + (totalFilesAdded * newFileSize));
        console.log("Total Number of Files    : " + (numOfDirs*numFilesPerDir + totalFilesAdded));
        console.log("Total Data (KB): " + ((numOfDirs*numFilesPerDir*fileSize)+ (totalFilesEdited*appendSize) + (totalFilesAdded * newFileSize)));

    }, (tSeconds * 1000));
}