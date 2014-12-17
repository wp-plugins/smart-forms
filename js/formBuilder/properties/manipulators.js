/************************************************************************************* Manipulstors ***************************************************************************************************/
function RedNaoBasicManipulator()
{

}

//noinspection JSUnusedLocalSymbols
RedNaoBasicManipulator.prototype.GetValue=function(propertiesObject,propertyName,additionalInformation)
{
    return propertiesObject[propertyName];
};

RedNaoBasicManipulator.prototype.SetValue=function(propertiesObject,propertyName,value,additionalInformation)
{
    propertiesObject[propertyName]=value;
    if (typeof additionalInformation != 'undefined' && typeof additionalInformation.ChangeCallBack != 'undefined')
        additionalInformation.ChangeCallBack(value);
};





var RedNaoBasicManipulatorInstance=new RedNaoBasicManipulator();
