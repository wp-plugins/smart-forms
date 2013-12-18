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
    if(elementName=='rednaodatepicker')
        return RedNaoDatePicker(options);
    if(elementName=='rednaoname')
        return RedNaoName(options);


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
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, cellOptions, rowObject)
    {
        try{
        var data=GetObjectOrNull(rowObject,cellOptions);
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
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, cellOptions, rowObject)
    {
        try{
        var data=GetObjectOrNull(rowObject,cellOptions);
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
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, cellOptions, rowObject)
    {
        try{
        var data=GetObjectOrNull(rowObject,cellOptions);
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

function RedNaoDatePicker(options)
{
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, cellOptions, rowObject)
    {
        try{
            var data=GetObjectOrNull(rowObject,cellOptions);
            if(data==null||data.value=="")
                return '';
            var dateParts=data.value.split("-");
            if(dateParts.length!=3)
                return '';

            var date=new Date(dateParts[0],parseInt(dateParts[1])-1,dateParts[2]);

            return rnJQuery.datepicker.formatDate( options.DateFormat, date );
        }catch(exception)
        {
            return '';
        }
    }};
}

function RedNaoName(options)
{
    return {"name":options.Label,"index":options.Id,formatter: function (cellvalue, cellOptions, rowObject)
    {
        try{
            var data=GetObjectOrNull(rowObject,cellOptions);
            if(data==null)
                return '';
            return data.firstName+' '+data.lastName;
        }catch(exception)
        {
            return '';
        }
    }};
}