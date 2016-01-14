/**
 InternationalCharFileGen.js
 Created By: Aaron
 Created On: 12/27/15



 Options can be entered to skip creating the dataset and just go straight into making an old dataset into
 a changing dataset.  The caveat here is the dataset must have been created by DataGenModder in order for
 this to be possible.  Also, a user can just create the dataset and not enter the changing dataset mode.

 Input Parameters:

 [0] - Directory To Create in
 [1] - Language Number selected from the following
        0 - German
        1 - Spanish
        2 - Sweedish
        3 - All


 Example command to run full script:
 node InternationalCharFileGen.js c:\source\test 3

 This will create all languages data sets in the source\test folder

 *
 */

var German = require('./InternationCharFileGen/German.js');
var Spanish = require('./InternationCharFileGen/Spanish.js');
var Sweedish = require('./InternationCharFileGen/Sweedish.js');

var args = process.argv.slice(2);

if (args[0] == "--help")
{
    printHelp();
    process.exit();
}

if (args.length < 2)
{
    console.log("\n");
    console.log("Error: Not enough arguments\n" +
        "[0] - Directory To Create in\n" +
        "[1] - Language Number selected from the following\n" +
        "       0 - German\n" +
        "       1 - Spanish\n" +
        "       2 - Sweedish\n" +
        "       3 - All");

    process.exit();
}

var sourceDir = args[0];
var tDebug = false;

switch (args[1])
{
    case '0':
    {
        German.generatePaths(sourceDir,"German");
        break;
    }
    case '1':
    {
        Spanish.generatePaths(sourceDir,"Spanish");
        break;
    }
    case '2':
    {
        Sweedish.generatePaths(sourceDir,"Sweedish");
        break;
    }
    case '3':
    {
        German.generatePaths(sourceDir,"German");
        Spanish.generatePaths(sourceDir,"Spanish");
        Sweedish.generatePaths(sourceDir,"Sweedish");
        break;
    }
    default:
    {
        console.log("Invalid Language Selection\n");
    }
}

function printHelp()
{
    console.log("We still need to do this.\n" +
                "But further work is needed")
}