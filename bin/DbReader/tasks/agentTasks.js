/**
 * Created by aaron on 12/31/2015.
 */
var consoleTable = require('console.table');
var async = require('async');
var colors = require('colors');
var readlineSync = require('readline-sync');

/**
 * @description -
 * @param db
 * @param findAllAgentsCallback
 */
exports.findAllAgents = function(db, findAllAgentsCallback)
{
    db.collection('agent').find({}).toArray(function (err, agents)
    {
        if (agents.length < 1)
            console.log(colors.red("\nNo Agents Found \n"));
        else
        {
            console.log("\n");
            console.log(colors.green("Found the following records"));
            console.table(agents);
            console.log("\n");
        }

        findAllAgentsCallback();
    });

};

/**
 *
 * @param db - the db instance we need
 * @param findWindowsAgentsCallback
 */
exports.findWindowsAgents = function(db,findWindowsAgentsCallback)
{
    // Get the documents collection
    var collection = db.collection('agent');

    // Find some documents
    collection.find({system: "WINDOWS"}).toArray(function (err, agents)
    {
        if (agents.length < 1)
            console.log(colors.red("\nNo Windows Agents found\n"));
        else
        {
            console.log(colors.green("\nFound Agents"));
            console.table(agents);

        }

        findWindowsAgentsCallback();
    });

};

/**
 *
 * @param db - the db instance we need
 * @param findWindowsAgentsCallback
 */
exports.findLinuxAgents = function(db,findLinuxAgentsCallback)
{
    // Get the documents collection
    var collection = db.collection('agent');

    // Find some documents
    collection.find({system: "LINUX"}).toArray(function (err, agents)
    {
        if (agents.length < 1)
            console.log(colors.red("\nNo Windows Agents found\n"));
        else
        {
            console.log(colors.green("\nFound Agents"));
            console.table(agents);

        }

        findLinuxAgentsCallback();
    });

};