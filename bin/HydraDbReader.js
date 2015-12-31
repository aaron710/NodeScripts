/**
 HydraDbReader
 Created By: Aaron
 Created On: 12/30/15

 HydraDbReader will access Hydra's Mongo Database and print out usefull information to the screen for the person running
 the script.

 Input Parameters:

 [0] -
 [1] -
 [2] -
 [3] -
 [4] -
 [5] -
 [6] -

 *
 */
var jobDbConnector = require('./DbReader/JobDbConnector.js');

var MongoClient = require('mongodb').MongoClient;
var consoleTable = require('console.table');
var readlineSync = require('readline-sync');
var async = require('async');

// Wait for user's response.


var databaseChoice = 0;

async.whilst
(
    function()
    {
        if (databaseChoice == 5)
            process.exit();

        return databaseChoice != 5;
    },
    function (callback)
    {

        databaseChoice = readlineSync.question('Which database do you want to connect to: \n' +
            '1 - Jobs\n' +
            '2 - Agents\n' +
            '3 - Device\n' +
            '4 - User\n' +
            '5 - Exit\n' +
            '===================================\n' +
            'selection: ');

        switch (databaseChoice)
        {
            case "1":
            {
                // console.log("Connecting to Job Database");
                jobDbConnector.connectToDb("job", function()
                {
                    callback();
                });

                break;
            }
            case "2":
            {
                break;
            }
            case "3":
            {
                break;
            }
            case "4":
            {
                break;
            }
            case "5":
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

