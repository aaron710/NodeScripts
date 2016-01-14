/**
 * Created by aaron on 1/14/2016.
 */
var fs = require('graceful-fs');


var SwedishCharacters = ['ä','å','é','ö','Ä','Å','É','Ö'];

exports.generatePaths = function (sourceDir, FolderName)
{

    if (!fs.existsSync(sourceDir + "/" + FolderName))
    {
        fs.mkdirSync(sourceDir + "/" + FolderName);
    }

    for (var i = 0;  i < SwedishCharacters.length; i++)
    {
        var string = "";

        for (var j = i;  j < SwedishCharacters.length; j++)
        {
            // This string is what we will want our file path to be
            string += recurse(j);
            createFile(sourceDir + "/" + FolderName + "/" + string);
        }
    }
}

function recurse(currentSpot)
{
    if(currentSpot == 0)
        return SwedishCharacters[currentSpot];

    if(currentSpot < SwedishCharacters.length-1)
    {
        recurse(currentSpot+1);
    }

    if(currentSpot > SwedishCharacters.length-1)
    {
        return;
    }
    else
        return SwedishCharacters[currentSpot];

}

function createFile(filePath)
{
    console.log(filePath);
    fs.writeFileSync(filePath+'.txt', "This is a foreign file with english text");
}
