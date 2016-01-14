/**
 * Created by aaron on 1/14/2016.
 */
var fs = require('graceful-fs');


var GermanCharacters =['ä','ö','ü','ß','Ä','Ö','Ü','ẞ'];

exports.generatePaths = function (sourceDir, FolderName)
{

    if (!fs.existsSync(sourceDir + "/" + FolderName))
    {
        fs.mkdirSync(sourceDir + "/" + FolderName);
    }

    for (var i = 0;  i < GermanCharacters.length; i++)
    {
        var string = "";

        for (var j = i;  j < GermanCharacters.length; j++)
        {
            // This string is what we will want our file path to be
            string += recurse(j);
            createFile(sourceDir + "/" + FolderName + "/" + string);
        }
    }
};

function recurse(currentSpot)
{
    if(currentSpot == 0)
        return GermanCharacters[currentSpot];

    if(currentSpot < GermanCharacters.length-1)
    {
        recurse(currentSpot+1);
    }

    if(currentSpot > GermanCharacters.length-1)
    {
        return;
    }
    else
        return GermanCharacters[currentSpot];

}

function createFile(filePath)
{
    console.log(filePath);
    fs.writeFileSync(filePath+'.txt', "This is a foreign file with english text");
}
