/**
 * Created by aaron on 12/31/2015.
 */

var consoleTable = require('console.table');
var async = require('async');
var colors = require('colors');
var readlineSync = require('readline-sync');

/**
 * @description - Gets all the jobs and prints them to the screen
 * @param db
 * @param findAllJobsCallback
 */
exports.findAllDevices = function(db, findAllDevicesCallback)
{
    db.collection('device').find({}).toArray(function (err, devices)
    {

        //console.log(jobs);
        if (devices.length < 1)
            console.log(colors.red("\nNo Devices Found \n"));
        else
        {
            console.log("\n");
            console.log(colors.green("Found the following records"));
            console.table(devices);
            console.log("\n");
        }

        findAllDevicesCallback();
    });

};

/**
 *
 * @param db - the db instance we need
 * @param findJobByNameCallback
 */
exports.findDeviceByName = function(db,findDevicesByNameCallback)
{
    // Get the documents collection
    var collection = db.collection('device');
    var deviceName = readlineSync.question('Device Name: ');

    // Find some documents
    collection.find({name: deviceName}).toArray(function (err, device)
    {
        if (device.length < 1)
            console.log(colors.red("\nNo device with name " + deviceName + " found\n"));
        else
        {
            console.log(colors.green("\nFound Device"));
            console.table(device);

        }

        findDevicesByNameCallback();
    });

};

exports.findAllShares = function(db, findAllSharesCallback)
{
    db.collection('share').find({}).toArray(function (err, shares)
    {

        //console.log(jobs);
        if (shares.length < 1)
            console.log(colors.red("\nNo Shares Found \n"));
        else
        {
            console.log("\n");
            console.log(colors.green("Found the following records"));
            console.table(shares);
            console.log("\n");
        }

        findAllSharesCallback();
    });

};

/**
 *
 * @param db - the db instance we need
 * @param findJobByNameCallback
 */
exports.findSharesByDeviceId = function(db,findDevicesByNameCallback)
{
    // Get the documents collection
    var collection = db.collection('share');
    var deviceId = readlineSync.question('Device Id: ');

    // Find some documents
    collection.find({parent_id: deviceId}).toArray(function (err, shares)
    {
        if (shares.length < 1)
            console.log(colors.red("\nNo shares with device id " + deviceId + " found\n"));
        else
        {
            console.log(colors.green("\nFound shares with device id"));
            console.table(shares);

        }

        findDevicesByNameCallback();
    });

};

exports.findAllExports = function(db, findAllExportsCallback)
{
    db.collection('export').find({}).toArray(function (err, exports)
    {

        //console.log(jobs);
        if (exports.length < 1)
            console.log(colors.red("\nNo Exports Found \n"));
        else
        {
            console.log("\n");
            console.log(colors.green("Found the following records"));
            console.table(exports);
            console.log("\n");
        }

        findAllExportsCallback();
    });

};

/**
 *
 * @param db - the db instance we need
 * @param findJobByNameCallback
 */
exports.findExportsByDeviceId = function(db,findExportsByIdCallback)
{
    // Get the documents collection
    var collection = db.collection('export');
    var deviceId = readlineSync.question('Device Id: ');

    // Find some documents
    collection.find({parent_id: deviceId}).toArray(function (err, exports)
    {
        if (exports.length < 1)
            console.log(colors.red("\nNo exports with device id " + deviceId + " found\n"));
        else
        {
            console.log(colors.green("\nFound Device"));
            console.table(exports);

        }

        findExportsByIdCallback();
    });

};