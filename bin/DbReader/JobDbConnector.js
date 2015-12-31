/**
 * Created by aaron on 12/30/2015.
 */

var MongoClient = require('mongodb').MongoClient;
var consoleTable = require('console.table');
var readlineSync = require('readline-sync');
var async = require('async');
var colors = require('colors');

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
                findAllJobs(db, function ()
                {
                    callback(null, taskChoice);
                });
            }
            else if (taskChoice == 2)
            {
                findJobByName(db, function ()
                {
                    callback(null, taskChoice);
                });

            }
            else if (taskChoice == 3)
            {
                findJobsStatus(db, function ()
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
                findAllJobReports(db, function ()
                {
                    callback(null, taskChoice);
                });
            }
            else if (taskChoice == 2)
            {
                findJobReportsByJobId(db, function ()
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
 * @description - Gets all the jobs and prints them to the screen
 * @param db
 * @param findAllJobsCallback
 */
function findAllJobs(db, findAllJobsCallback)
{
    db.collection('job').find({}).toArray(function (err, jobs)
    {

        //console.log(jobs);
        if (jobs.length < 1)
            console.log(colors.red("\nNo Jobs Found \n"));
        else
        {
            console.log("\n");
            console.log(colors.green("Found the following records"));
            console.table(jobs);
            console.log("\n");
        }

        findAllJobsCallback();
    });

}

/**
 *
 * @param db - the db instance we need
 * @param findJobByNameCallback
 */
function findJobByName(db,findJobByNameCallback)
{
    // Get the documents collection
    var collection = db.collection('job');

    var jobName = readlineSync.question('Job Name: ');


    // Find some documents
    collection.find({name: jobName}).toArray(function (err, job)
    {
        if (job.length < 1)
            console.log(colors.red("\nNo job with name " + jobName + " found\n"));
        else
        {
            console.log(colors.green("\nFound Job"));
            console.table(job);
            console.log(colors.green("\nJob Params"));
            console.table(job[0].params);
            console.log(colors.green("\nJob Iterator"));
            console.table(job[0].params.iterator);
            console.log(colors.green("\nJob Mover"));
            console.table(job[0].params.mover);
            console.log(colors.green("\nJob Mappings"));
            console.table(job[0].params.mapping);
        }

        findJobByNameCallback();
    });

}

/** findJobStatus()
 *
 *  @description - prompts the user to select a job status by choosing a number that is mapped to a coinciding status.
 *
 * @param db -  the db instance needed to call the collection
 * @param findJobByNameCallback
 */
function findJobsStatus(db,findJobByNameCallback)
{
    // Get the documents collection
    var collection = db.collection('job');
    var jobStatus = "";

    var jobStatus = readlineSync.question('Status Choices: \n' +
        '1 - RUNNING\n' +
        '2 - STOPPED\n' +
        '3 - STOPPED_WITH_ERROR\n' +
        '4 - PAUSED\n' +
        '5 - COMPLETED\n' +
        '6 - COMPLETED_WITH_ERROR\n' +
        '7 - NOT_STARTED\n' +
        '===================================\n' +
        'selection: ');

    switch(jobStatus)
    {
        case "1":{jobStatus="RUNNING";break;}
        case "2":{jobStatus="STOPPED";break;}
        case "3":{jobStatus="STOPPED_WITH_ERROR";break;}
        case "4":{jobStatus="PAUSED";break;}
        case "5":{jobStatus="COMPLETED";break;}
        case "6":{jobStatus="COMPLETED_WITH_ERROR";break;}
        case "7":{jobStatus="NOT_STARTED";break;}
        default:{console.log(colors.red("Invalid Choice\n")); findJobByNameCallback()}
    }

    // Find the jobs by status
    collection.find({status: jobStatus}).toArray(function (err, job)
    {
        // If no jobs were found
        if (job.length < 1)
            console.log(colors.red("\nNo job with status " + jobStatus + " found\n"));
        else
        {
            // Otherwise output the jobs with the status
            console.log(colors.green("\nFound Job"));
            console.table(job);

        }

        // Use the callback function to return
        findJobByNameCallback();
    });

}

/**
 * @description - Gets all the jobs and prints them to the screen
 * @param db
 * @param findAllJobsCallback
 */
function findAllJobReports(db, findAllJobReportsCallback)
{
    db.collection('job_report').find({}).toArray(function (err, jobs)
    {

        //console.log(jobs);
        if (jobs.length < 1)
            console.log(colors.red("\nNo Job Reports Found \n"));
        else
        {
            console.log("\n");
            console.log(colors.green("Found the following records"));
            console.table(jobs);
            console.log("\n");
        }

        findAllJobReportsCallback();
    });

}

/**
 *
 * @param db - the db instance we need
 * @param findJobByNameCallback
 */
function findJobReportsByJobId(db,findJobReportByJobIdCallback)
{
    // Get the documents collection
    var collection = db.collection('job_report');

    var jobId = readlineSync.question('Job Id: ');


    // Find some documents
    collection.find({job_id: jobId}).toArray(function (err, jobReports)
    {
        if (jobReports.length < 1)
            console.log(colors.red("\nNo reports found for Job Id: " + jobId + " found\n"));
        else
        {
            console.log(colors.green("\nFound Job"));
            console.table(jobReports);

        }

        findJobReportByJobIdCallback();
    });

}