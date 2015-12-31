/**
 * Created by aaron on 12/31/2015.
 */


var consoleTable = require('console.table');
var readlineSync = require('readline-sync');
var async = require('async');
var colors = require('colors');


/**
 * @description - Gets all the jobs and prints them to the screen
 * @param db
 * @param findAllJobsCallback
 */
exports.findAllJobs = function(db, findAllJobsCallback)
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
exports.findJobByName = function(db,findJobByNameCallback)
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
exports.findJobsStatus = function(db,findJobByNameCallback)
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
exports.findAllJobReports = function(db, findAllJobReportsCallback)
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
exports.findJobReportsByJobId = function (db,findJobReportByJobIdCallback)
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