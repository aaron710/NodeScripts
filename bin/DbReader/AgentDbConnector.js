/**
 * Created by aaron on 12/31/2015.
 */
// Node Required Libraries
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var readlineSync = require('readline-sync');

// Project Required Tasks
var agentTasks = require('./tasks/agentTasks.js');

exports.connectToDb = function(mongoUri,dbName,connectToDbCallBack)
{
    //console.log("connectToDb");
    var url1 = mongoUri + '/'+dbName;

    // Use connect method to connect to the Server
    MongoClient.connect(url1, function(err, db)
    {

        console.log("Connected correctly to " + dbName);
        var collectionChoice = 0;

        async.whilst
        (
            function()
            {
                // If the choice is to go to the previous screen we are going to use our callback as well
                // as disconnect from the job database as a whole
                if (collectionChoice == 4)
                {
                    db.close();
                    connectToDbCallBack();
                }

                return collectionChoice !=4;
            },
            function (callback)
            {
                collectionChoice = readlineSync.question('Which collection: \n' +
                    '1 - Get All Agents\n' +
                    '2 - Get All Windows Agents\n' +
                    '3 - Get All Linux Agents\n' +
                    '4 - return to previous\n' +
                    '===================================\n' +
                    'selection: ');

                switch (collectionChoice)
                {
                    case "1":
                    {
                        agentTasks.findAllAgents(db,function()
                        {
                            callback();
                        });

                        break;
                    }
                    case "2":
                    {
                        agentTasks.findWindowsAgents(db,function()
                        {
                            callback();
                        });

                        break;
                    }
                    case "3":
                    {
                        agentTasks.findLinuxAgents(db,function()
                        {
                            callback();
                        });

                        break;
                    }
                    default:
                    {
                        callback();
                        break;
                    }
                }
            }
        );

    });
};
