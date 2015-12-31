/**
 HydraDbReader
 Created By: Aaron
 Created On: 12/30/15

 HydraDbReader will access Hydra's Mongo Database and print out usefull information to the screen for the person running
 the script.

 Input Parameters:

 [0] -  MongoDb Host IP Address
 [1] -  MongoDb Host Port
 [2] -  MongoDb Username
 [3] -  MongoDb Password
 *
 */
var jobDbConnector = require('./DbReader/JobDbConnector.js');
var deviceDbConnector = require('./DbReader/DeviceDbConnector.js');
var agentDbConnector = require('./DbReader/AgentDbConnector.js');

var readlineSync = require('readline-sync');
var async = require('async');

// Get the arguments from the program
var args = process.argv.slice(2);

if (args[0] == "--help")
{

    printHelp();
    process.exit();
}

if (args.length < 4)
{
    console.log("\n");
    console.log("Error: Not enough arguments\n" +
        "[0] - MongoDb Host IP Address\n" +
        "[1] - MongoDb Host Port  \n" +
        "[2] - MongoDb Username ('' for empty)\n" +
        "[3] - MongoDb Password ('' for empty)\n");
    process.exit();
}


var mongoUri = "";

if (args[2] == "" || args[3] == "")
    mongoUri = "mongodb://"+ args[0] + ":" + args[1];
else
    mongoUri = "mongodb://" + args[2] + ":" + args[3] + "@" + args[0] + ":" + args[1];

var databaseChoice = 0;

async.whilst
(
    function()
    {
        if (databaseChoice == 4)
            process.exit();

        return databaseChoice != 4;
    },
    function (callback)
    {

        databaseChoice = readlineSync.question('Which database do you want to connect to: \n' +
            '1 - Jobs\n' +
            '2 - Device\n' +
            '3 - Agents\n' +
            //'4 - User\n' +
            '4 - Exit\n' +
            '===================================\n' +
            'selection: ');

        switch (databaseChoice)
        {
            case "1":
            {
                // console.log("Connecting to Job Database");
                jobDbConnector.connectToDb(mongoUri,"job", function()
                {
                    callback();
                });

                break;
            }
            case "2":
            {
                deviceDbConnector.connectToDb(mongoUri,"device", function()
                {
                    callback();
                });
                break;
            }
            case "3":
            {
                agentDbConnector.connectToDb(mongoUri,"agent", function()
                {
                    callback();
                });
                break;
            }
            //case "4":
            //{
            //    break;
            //}
            case "4":
            {
                console.log("Exiting program");
                callback();
                break;
            }
            default:
            {
                console.log("Invalid Choice");
                callback();
                break;
            }
        }
    }
);


function printHelp()
{
    console.log("\n");
    console.log("HydraDbReader");
    console.log("Created By: Aaron");
    console.log("Created On: 12/30/15");
    console.log("\n");
    console.log("Used to read the Hydra Database for information on Jobs, Devices, and Agents");
    console.log("Usage:\n" +
                    "[0] - MongoDb Host IP Address\n" +
                    "[1] - MongoDb Host Port  \n" +
                    "[2] - MongoDb Username\n" +
                    "[3] - MongoDb Password\n");
}
