
function ISmartFormsAddNew()
{
    ISmartFormsAddNew.prototype.Subscribers.push(this);
}
ISmartFormsAddNew.prototype.Subscribers=[];

/************************************************************************************* Events ***************************************************************************************************/
ISmartFormsAddNew.prototype.OnLoad=function()
{
    return null;
};



/************************************************************************************* Save Data ***************************************************************************************************/
ISmartFormsAddNew.prototype.GetSaveDataId=function()
{
    return null;
};

ISmartFormsAddNew.prototype.GetClientDataToSave=function()
{
    return null;
};

ISmartFormsAddNew.prototype.GetServerDataToSave=function()
{
    return null;
};

//noinspection JSUnusedLocalSymbols
ISmartFormsAddNew.prototype.LoadSavedData=function(savedData)
{
    return null;
};
