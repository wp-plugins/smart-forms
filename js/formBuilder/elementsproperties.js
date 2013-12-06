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

/************************************************************************************* Base  ***************************************************************************************************/

function ElementPropertiesBase(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    if(additionalInformation=='basic')
        this.Manipulator=RedNaoBasicManipulatorInstance;

    else
        this.Manipulator=RedNaoStyleManipulatorInstance;
    this.FormElement=formelement;
    this.AdditionalInformation=additionalInformation;
    this.PropertiesObject=propertiesObject;
    this.PropertyName=propertyName;
    this.PropertyTitle=propertyTitle;
    this.PropertyId="redNaoFormProperty"+this.PropertyName;

}

ElementPropertiesBase.prototype.CreateProperty=function(jQueryObject)
{
    var newRow=rnJQuery("<tr></tr>");
    newRow.append(this.GenerateHtml());
    jQueryObject.append(newRow);
}

ElementPropertiesBase.prototype.GenerateHtml=function()
{
    throw 'Abstract Method';
}

ElementPropertiesBase.prototype.GetPropertyCurrentValue=function()
{
    return this.Manipulator.GetValue(this.PropertiesObject,this.PropertyName,this.AdditionalInformation);
}

ElementPropertiesBase.prototype.UpdateProperty=function()
{
    this.Manipulator.SetValue(this.PropertiesObject,this.PropertyName, rnJQuery("#"+this.PropertyId).val(),this.AdditionalInformation);

}

ElementPropertiesBase.prototype.RefreshElement=function()
{
    var refreshedElements=this.FormElement.RefreshElement();
    refreshedElements.find('input[type=submit]').click(function(e){e.preventDefault();e.stopPropagation();})

}

/************************************************************************************* Simple Text Property ***************************************************************************************************/


function SimpleTextProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

SimpleTextProperty.prototype=Object.create(ElementPropertiesBase.prototype);

SimpleTextProperty.prototype.GenerateHtml=function()
{
    var value=this.GetPropertyCurrentValue().trim();
    var newProperty=rnJQuery( '<td style="text-align: right"><label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label></td>\
            <td style="text-align: left"><input style="width: 206px;" class="rednao-input-large" data-type="input" type="text" name="name" id="'+this.PropertyId+'" value="'+this.GetPropertyCurrentValue()+'" placeholder="Default"/></td>');

    var self=this;
    newProperty.keyup(function(){
        self.Manipulator.SetValue(self.PropertiesObject,self.PropertyName, (rnJQuery("#"+self.PropertyId).val()),self.AdditionalInformation);
        self.RefreshElement();

    });
    return newProperty;
}





/************************************************************************************* Check Box Property ***************************************************************************************************/



function CheckBoxProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

CheckBoxProperty.prototype=Object.create(ElementPropertiesBase.prototype);

CheckBoxProperty.prototype.GenerateHtml=function()
{
    var newProperty=rnJQuery('<td style="text-align: right"><label class="checkbox control-group" style="display: block;">'+this.PropertyTitle+'</label></td>\
                <td style="text-align: left"><input type="checkbox" class="input-inline field" name="checked" id="'+this.PropertyId+'" '+(this.GetPropertyCurrentValue()=='y'? 'checked="checked"':'')+'/></td>');

    var self=this;
    newProperty.find('#'+this.PropertyId).change(function(){
        self.Manipulator.SetValue(self.PropertiesObject,self.PropertyName, (rnJQuery("#"+self.PropertyId).is(':checked')?'y':'n'),self.AdditionalInformation);
        self.RefreshElement();
    });

    return newProperty;
}





/************************************************************************************* Array Property ***************************************************************************************************/



function ArrayProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

ArrayProperty.prototype=Object.create(ElementPropertiesBase.prototype);

ArrayProperty.prototype.GenerateHtml=function()
{
    var currentValues=this.GetPropertyCurrentValue();
    var valuesText="";
    for(var i=0;i<currentValues.length;i++)
    {
        if(typeof currentValues[i]=='string')
            valuesText+='\n'+currentValues[i];
        else{
            valuesText+='\n'+currentValues[i].label;

        }
    }

    if(valuesText.length>0)
        valuesText=valuesText.substr(1);

    var newProperty=rnJQuery('<td style="vertical-align: top;text-align: right;"><label class="checkbox control-group" style="display: block;vertical-align: top;">'+this.PropertyTitle+'</label></td><td style="text-align: left"><textarea class="field" data-type="textarea-split" style="min-height: 200px;width: 206px;" id="'+this.PropertyId+'">'+valuesText+'</textarea></td>');

    var self=this;
    newProperty.find('#'+this.PropertyId).change(function(){self.UpdateProperty();});

    return newProperty;
}

ArrayProperty.prototype.UpdateProperty=function()
{
    var newValue=rnJQuery("#"+this.PropertyId).val();;

    var valueArray=newValue.split(/\r\n|\r|\n/g);

    var processedValueArray=new Array();

    for(var i=0;i<valueArray.length;i++)
    {
        if(!valueArray[i])
            break;


        processedValueArray.push({label:valueArray[i]});
    }


    this.Manipulator.SetValue(this.PropertiesObject,this.PropertyName, processedValueArray,this.AdditionalInformation);
    this.RefreshElement();
}




/************************************************************************************* Id Property ***************************************************************************************************/


function IdProperty(formelement,propertiesObject)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,"Id","Id");
}

IdProperty.prototype=Object.create(ElementPropertiesBase.prototype);

IdProperty.prototype.GenerateHtml=function()
{
    this.PreviousId=this.FormElement.Id;

    var value=this.PreviousId;
    var newProperty=rnJQuery( '<td style="text-align: right"><label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label></td>\
            <td style="text-align: left"><input style="width: 206px;" class="rednao-input-large" data-type="input" type="text" name="name" id="'+this.PropertyId+'" value="'+value+'" placeholder="Default"/></td>');


    var self=this;
    newProperty.change(function(){

        var jqueryElement=rnJQuery(this).find('#'+self.PropertyId);
        var fieldName=jqueryElement.val().trim();

        if(!fieldName.match(/^[a-zA-Z][\w:.-]+$/))
        {
            alert("Invalid field name, it should start with a letter and not contain spaces or symbols");
            jqueryElement.val(self.PreviousId);
            return;
        }

        self.FormElement.Id=fieldName;
        self.PropertiesObject.Id=fieldName;

        var jQueryElement=rnJQuery('#'+self.PreviousId);
        jQueryElement.attr('id',fieldName);


        var refreshedElements=self.FormElement.RefreshElement();
        refreshedElements.find('input[type=submit]').click(function(e){e.preventDefault();e.stopPropagation();})
        self.RefreshElement();

    });
    return newProperty;
}


