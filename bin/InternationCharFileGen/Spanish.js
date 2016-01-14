/**
 * Created by aaron on 1/14/2016.
 */
var fs = require('graceful-fs');


var SpanishCharacters = ['á','é','í','ñ','ó','ú','ü','Á','É','Í','Ñ','Ó','Ú','Ü','¿','¡'];

exports.generatePaths = function (sourceDir, FolderName)
{

    if (!fs.existsSync(sourceDir + "/" + FolderName))
    {
        fs.mkdirSync(sourceDir + "/" + FolderName);
    }

    for (var i = 0;  i < SpanishCharacters.length; i++)
    {
        var string = "";

        for (var j = i;  j < SpanishCharacters.length; j++)
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
        return SpanishCharacters[currentSpot];

    if(currentSpot < SpanishCharacters.length-1)
    {
        recurse(currentSpot+1);
    }

    if(currentSpot > SpanishCharacters.length-1)
    {
        return;
    }
    else
        return SpanishCharacters[currentSpot];

}

function createFile(filePath)
{
    console.log(filePath);
    fs.writeFileSync(filePath+'.txt', "This is a foreign file with english text");
}
