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
var deviceDbConnector = require('./DbReader/DeviceDbConnector.js');
var agentDbConnector = require('./DbReader/AgentDbConnector.js');

var readlineSync = require('readline-sync');
var async = require('async');

// Wait for user's response.


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
                jobDbConnector.connectToDb("job", function()
                {
                    callback();
                });

                break;
            }
            case "2":
            {
                deviceDbConnector.connectToDb("device", function()
                {
                    callback();
                });
                break;
            }
            case "3":
            {
                agentDbConnector.connectToDb("agent", function()
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

