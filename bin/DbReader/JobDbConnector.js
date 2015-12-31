/**
 * Created by aaron on 12/30/2015.
 */

// Node Required Libraries
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var readlineSync = require('readline-sync');


// Project Required Files
var jobTasks = require('./tasks/jobTasks.js');

exports.connectToDb = function(mongoUri,dbName,connectToDbCallBack)
{
    //console.log("connectToDb");
    var url1 = mongoUri + '/'+ dbName;

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
                if (collectionChoice == 3)
                {
                    db.close();
                    connectToDbCallBack();
                }

                return collectionChoice !=3;
            },
            function (callback2)
            {
                collectionChoice = readlineSync.question('Which collection: \n' +
                    '1 - job\n' +
                    '2 - job report\n' +
                    '3 - return to previous\n' +
                    '===================================\n' +
                    'selection: ');

                switch (collectionChoice)
                {
                    case "1":
                    {
                        runJobTasks(db,function()
                        {
                            callback2(null, collectionChoice);
                        });

                        break;
                    }
                    case "2":
                    {
                        runJobReportTasks(db,function()
                        {
                            callback2(null, collectionChoice);
                        });

                        break;
                    }
                    default:
                    {
                        callback2(null, collectionChoice);
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
function runJobTasks(db,runJobTasksCallback)
{
    var taskChoice = 0;

    async.whilst(
        function ()
        {
            if (taskChoice == 4)
            {
                runJobTasksCallback();
            }

            return taskChoice != 4;
        },
        function (callback)
        {
            taskChoice = readlineSync.question('What would you like to do: \n' +
                '1 - Get All Jobs\n' +
                '2 - Get Job By Name\n' +
                '3 - Get Job By Status\n' +
                '4 - return to previous\n' +
                '===================================\n' +
                'selection: ');

            if (taskChoice == 1)
            {
                jobTasks.findAllJobs(db, function ()
                {
                    callback(null, taskChoice);
                });
            }
            else if (taskChoice == 2)
            {
                jobTasks.findJobByName(db, function ()
                {
                    callback(null, taskChoice);
                });

            }
            else if (taskChoice == 3)
            {
                jobTasks.findJobsStatus(db, function ()
                {
                    callback(null, taskChoice);
                });

            }
            else
            {
                callback(null, taskChoice);
            }

        }
    );
}

/**
 * @description - for the job table allows user to pick their tasks
 * @param db
 * @param runJobTasksCallback
 */
function runJobReportTasks(db,runJobReportTasksCallback)
{
    var taskChoice = 0;

    async.whilst(
        function ()
        {
            if (taskChoice == 3)
            {
                runJobReportTasksCallback("done");
            }

            return taskChoice != 3;
        },
        function (callback)
        {
            taskChoice = readlineSync.question('What would you like to do: \n' +
                '1 - Get All Job Reports\n' +
                '2 - Get Reports By Job Id\n' +
                '3 - return to previous\n' +
                '===================================\n' +
                'selection: ');

            if (taskChoice == 1)
            {
                jobTasks.findAllJobReports(db, function ()
                {
                    callback(null, taskChoice);
                });
            }
            else if (taskChoice == 2)
            {
                jobTasks.findJobReportsByJobId(db, function ()
                {
                    callback(null, taskChoice);
                });

            }
            else
            {
                callback(null, taskChoice);
            }

        }
    );
}
