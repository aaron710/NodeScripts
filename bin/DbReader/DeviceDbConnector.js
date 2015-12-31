/**
 * Created by aaron on 12/31/2015.
 */

// Node Required Libraries
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var readlineSync = require('readline-sync');

// Project Required Tasks
var deviceTasks = require('./tasks/deviceTasks.js');

exports.connectToDb = function(dbName,connectToDbCallBack)
{
    //console.log("connectToDb");
    var url1 = 'mongodb://192.168.21.132:27017/'+dbName;

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
                    '1 - Device\n' +
                    '2 - Shares\n' +
                    '3 - Exports\n' +
                    '4 - return to previous\n' +
                    '===================================\n' +
                    'selection: ');

                switch (collectionChoice)
                {
                    case "1":
                    {
                        runDeviceTasks(db,function()
                        {
                            callback();
                        });

                        break;
                    }
                    case "2":
                    {
                        runSharesTasks(db,function()
                        {
                            callback();
                        });

                        break;
                    }
                    case "3":
                    {
                        runExportsTasks(db,function()
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

/**
 * @description - for the job table allows user to pick their tasks
 * @param db
 * @param runJobTasksCallback
 */
function runDeviceTasks(db,runDeviceTasksCallback)
{
    var taskChoice = 0;

    async.whilst(
        function ()
        {
            if (taskChoice == 3)
            {
                runDeviceTasksCallback();
            }

            return taskChoice != 3;
        },
        function (callback)
        {
            taskChoice = readlineSync.question('What would you like to do: \n' +
                '1 - Get All Devices\n' +
                '2 - Get Device By Name\n' +
                '3 - return to previous\n' +
                '===================================\n' +
                'selection: ');

            if (taskChoice == 1)
            {
                deviceTasks.findAllDevices(db, function ()
                {
                    callback();
                });
            }
            else if (taskChoice == 2)
            {
                deviceTasks.findDeviceByName(db, function ()
                {
                    callback();
                });

            }
            else
            {
                callback();
            }

        }
    );
}

function runSharesTasks(db,runSharesTasksCallback)
{
    var taskChoice = 0;

    async.whilst(
        function ()
        {
            if (taskChoice == 3)
            {
                runSharesTasksCallback();
            }

            return taskChoice != 3;
        },
        function (callback)
        {
            taskChoice = readlineSync.question('What would you like to do: \n' +
                '1 - Get All Shares\n' +
                '2 - Get Shares By Device Id\n' +
                '3 - return to previous\n' +
                '===================================\n' +
                'selection: ');

            if (taskChoice == 1)
            {
                deviceTasks.findAllShares(db, function ()
                {
                    callback();
                });
            }
            else if (taskChoice == 2)
            {
                deviceTasks.findSharesByDeviceId(db, function ()
                {
                    callback();
                });

            }
            else
            {
                callback();
            }

        }
    );
}

function runExportsTasks(db,runExportTasksCallback)
{
    var taskChoice = 0;

    async.whilst(
        function ()
        {
            if (taskChoice == 3)
            {
                runExportTasksCallback();
            }

            return taskChoice != 3;
        },
        function (callback)
        {
            taskChoice = readlineSync.question('What would you like to do: \n' +
                '1 - Get All Exports\n' +
                '2 - Get Exports By Device Id\n' +
                '3 - return to previous\n' +
                '===================================\n' +
                'selection: ');

            if (taskChoice == 1)
            {
                deviceTasks.findAllExports(db, function ()
                {
                    callback();
                });
            }
            else if (taskChoice == 2)
            {
                deviceTasks.findExportsByDeviceId(db, function ()
                {
                    callback();
                });

            }
            else
            {
                callback();
            }

        }
    );
}

