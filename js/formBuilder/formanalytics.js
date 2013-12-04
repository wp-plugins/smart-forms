function RedNaoCreateColumn(options)
{
    var elementName=options.ClassName;

    if(elementName=='rednaotextinput')
        return RedNaoTextInputColumn(options);
    if(elementName=='rednaoprependedtext')
        return RedNaoTextInputColumn(options);
    if(elementName=='rednaoappendedtext')
        return RedNaoTextInputColumn(options);
    if(elementName=='rednaoprependedcheckbox')
        return RedNaoCheckboxInputColumn(options);
    if(elementName=='rednaoappendedcheckbox')
        return RedNaoCheckboxInputColumn(options);


    if(elementName=='rednaomultiplecheckboxes')
        return RedNaoMultipleCheckBoxesColumn(options);
    if(elementName=='rednaoselectbasic')
        return RedNaoTextInputColumn(options);

    if(elementName=='rednaotextarea')
        return RedNaoTextInputColumn(options);
    if(elementName=='rednaomultipleradios')
        return RedNaoTextInputColumn(options);


}

function GetObjectOrNull(rowObject,options)
{
    var object=rowObject[options.colModel.index];
    if(typeof object=='undefined')
        return null;

    return object;

}


function RedNaoTextInputColumn(options)
{
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, options, rowObject)
    {
        try{
        var data=GetObjectOrNull(rowObject,options);
        if(data==null)
            return '';
        return data.value;
        }catch(exception)
        {
            return '';
        }
    }};
}


function RedNaoCheckboxInputColumn(options)
{
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, options, rowObject)
    {
        try{
        var data=GetObjectOrNull(rowObject,options);
        if(data==null)
            return '';
        return data.checked+". "+data.value;
        }catch(exception)
        {
            return '';
        }
    }};
}

function RedNaoMultipleCheckBoxesColumn(options)
{
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, options, rowObject)
    {
        try{
        var data=GetObjectOrNull(rowObject,options);
        if(data==null)
            return '';
        var values="";

        for(var i=0;i<data.selectedValues.length;i++)
            values+=data.selectedValues[i].value.trim()+";";
        return values;
        }catch(exception)
        {
            return '';
        }
    }};
}
