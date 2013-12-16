"use strict;"


/************************************************************************************* Manipulstors ***************************************************************************************************/
function RedNaoBasicManipulator()
{

}

RedNaoBasicManipulator.prototype.GetValue=function(propertiesObject,propertyName,additionalInformation)
{
    return propertiesObject[propertyName];
}

RedNaoBasicManipulator.prototype.SetValue=function(propertiesObject,propertyName,value,additionalInformation)
{
    propertiesObject[propertyName]=value;
}





function RedNaoStyleManipulator()
{

}

RedNaoStyleManipulator.prototype.GetValue=function(propertiesObject,propertyName,additionalInformation)
{
    var re = new RegExp(propertyName+":[^;]*;", "");
    var styleObject=propertiesObject[additionalInformation.class];
    if(typeof styleObject=='undefined')
    {
        return '';
    }
    var result=propertiesObject[additionalInformation.class].match(re);

    if(result.length>0)
    {
        var splittedResult=result[0].split(':');
        if(splittedResult.length==2)
            return splittedResult[1].replace(';','');
    }
    return '';
}

RedNaoStyleManipulator.prototype.SetValue=function(propertiesObject,propertyName,value,additionalInformation)
{
    var classObject=propertiesObject[additionalInformation.class];
    if(typeof classObject=='undefined')
        if(value)
        {
            propertiesObject[additionalInformation.class]="";
        }
        else
            return;

    var re = new RegExp(propertyName+":[^;]*;", "g");
    classObject=classObject.replace(re,'');
    if(value)
        classObject+=propertyName+":"+value+";";

    propertiesObject[additionalInformation.class]=classObject;
}

var RedNaoStyleManipulatorInstance=new RedNaoStyleManipulator();
var RedNaoBasicManipulatorInstance=new RedNaoBasicManipulator();
