"use strict";


/************************************************************************************* Formula Methods ***************************************************************************************************/

function RedNaoGetValueFromArray(array)
{
    var value=0;

    for(var i=0;i<array.length;i++)
    {
        var aux=parseFloat(array[i].amount);
        if(isNaN(aux))
           aux=0;
        value+=aux;
    }

    return value;
}





/************************************************************************************* End or formula methods ***************************************************************************************************/




function RedNaoFormElementEscape(property)
{
    return property.replace(' ','_');
}

function RedNaoCreateFormElementByName(elementName,options)
{
    if(elementName=='rednaotextinput')
        return new TextInputElement(options);
    if(elementName=='rednaodonationamount')
        return new DonationAmountElement(options);
    if(elementName=='rednaoprependedtext')
        return new PrependTexElement(options);
    if(elementName=='rednaoappendedtext')
        return new AppendedTexElement(options);
    if(elementName=='rednaoprependedcheckbox')
        return new PrependCheckBoxElement(options);
    if(elementName=='rednaoappendedcheckbox')
        return new AppendCheckBoxElement(options);
    if(elementName=='rednaobuttondropdown')
        return 'rednaobuttondropdown';
    if(elementName=='tabradioscheckboxes')
        return 'tabradioscheckboxes';
    if(elementName=='rednaomultiplecheckboxes')
        return new MultipleCheckBoxElement(options);
    if(elementName=='rednaoselectbasic')
        return new SelectBasicElement(options);

    if(elementName=='rednaofilebutton')
        return 'rednaofilebutton';
    if(elementName=='rednaosinglebutton')
        return 'rednaosinglebutton';
    if(elementName=='rednaodoublebutton')
        return 'rednaodoublebutton';
    if(elementName=='rednaotitle')
        return new TitleElement(options);
    if(elementName=='rednaotextarea')
        return  new TextAreaElement(options);
    if(elementName=='rednaomultipleradios')
        return new MultipleRadioElement(options);
    if(elementName=='rednaodonationbutton')
        return new DonationButtonElement(options);
    if(elementName=='rednaodonationrecurrence')
        return new RecurrenceElement(options);
    if(elementName=='rednaosubmissionbutton')
        return new RedNaoSubmissionButton(options);

    if(elementName=='rednaodatepicker')
        return new RedNaoDatePicker(options);
    if(elementName=='rednaoname')
        return new RedNaoName(options);


}



function RedNaoCreateFormElementByOptions(options)
{
    var element=RedNaoCreateFormElementByName(options.ClassName,options);
    return element;

}



/************************************************************************************* Base Class  ***************************************************************************************************/
function FormElementBase(options)
{
    if(options==null)
    {
        this.Options=new Object();
        this.Options.Styles=new Object();
        this.Options.ClassName="";
        this.Options.IsRequired='n';
        this.Options.Formulas={};

        FormElementBase.IdCounter++;
        this.Id='rnField'+FormElementBase.IdCounter;
        while(!SmartFormsFieldIsAvailable(this.Id))
        {
            FormElementBase.IdCounter++;
            this.Id='rnField'+FormElementBase.IdCounter;
        }

        this.Options.Id=this.Id;
        this.IsNew=true;
        this.GenerateDefaultStyle();
    }
    else
    {
        this.Id=options.Id;
        this.IsNew=false;
        if(typeof options.IsRequired=='undefined')
            options.IsRequired='n';
        this.Options=options;
        if(typeof this.Options.Formulas=='undefined')
            this.Options.Formulas={};
        else{
            if(typeof RedNaoFormulaManagerVar!='undefined')
                for(var property in this.Options.Formulas)
                {
                    RedNaoFormulaManagerVar.AddFormula(this,this.Options.Formulas[property]);
                }
        }


    }
    this.Properties=null;
    this.amount=0;
}

FormElementBase.IdCounter=0;

FormElementBase.prototype.FirePropertyChanged=function(val){

    RedNaoEventManager.Publish('formPropertyChanged',{FieldName:this.Id, Value:val});

}

FormElementBase.prototype.SetDefaultIfUndefined=function(propertyName,defaultValue)
{
    if(typeof this.Options[propertyName]=='undefined')
        this.Options[propertyName]=defaultValue;
}


FormElementBase.prototype.GenerateDefaultStyle=function()
{
}

FormElementBase.prototype.RefreshElement=function()
{
    var element=rnJQuery("#"+this.Id);
    var labelWidth=element.find('.rednao_label_container').width();
    var controlWidth=element.find('.redNaoControls').width();
    element.find(".rednao_label_container, .redNaoControls").remove();
    element.find(".redNaoOneColumn").remove();
    element.append(this.GenerateInlineElement());
    this.GenerationCompleted();
    element.find('.rednao_label_container').width(labelWidth);
    element.find('.redNaoControls').width(controlWidth);
    return element;
}
FormElementBase.prototype.GenerateHtml=function(jqueryElement)
{
    var newElement=rnJQuery('<div class="rednao-control-group '+this.Options.ClassName+'" id="'+this.Id+'" style="margin-bottom:15px;clear:both;">'+this.GenerateInlineElement()+'</div>')
    jqueryElement.replaceWith(newElement );
    this.ApplyStyle();
    this.GenerationCompleted();
    return newElement;

}

FormElementBase.prototype.AppendElementToContainer=function(jqueryElement)
{
    this.JQueryElement=rnJQuery( '<div class="rednao-control-group '+this.Options.ClassName+'" id="'+this.Id+'" style="margin-bottom:15px;">'+this.GenerateInlineElement()+'</div>');
    jqueryElement.append(this.JQueryElement);
    this.ApplyStyle();
    this.GenerationCompleted();

}

FormElementBase.prototype.StoresInformation=function()
{
    return true;
}


FormElementBase.prototype.CreateProperties=function()
{
    throw 'Abstract method';
}

FormElementBase.prototype.GenerateInlineElement=function()
{
    throw 'Abstract method';
}

FormElementBase.prototype.GetProperties=function()
{
    if(this.Properties==null)
    {
        this.Properties=new Array();
        this.CreateProperties();
    }

    return this.Properties;
}


FormElementBase.prototype.UpdateProperties=function()
{
    if(this.Properties!=null)
    {
        for(var i=0;i<this.Properties.length;i++)
        {
            this.Properties[i].UpdateProperty();
        }
    }
}

FormElementBase.prototype.GetPropertyName=function()
{
    return RedNaoFormElementEscape(this.Options.Label);
}



FormElementBase.prototype.ApplyStyle=function()
{
    if(this.Options.Styles==null)
        return;

    for(var property in this.Options.Styles)
    {

        rnJQuery('#'+this.Id + ' .'+property).attr("style",this.Options.Styles[property]);
    }
}

FormElementBase.prototype.MarkAsInvalid=function()
{
    rnJQuery('#'+this.Id).find('.redNaoInputText,.redNaoRealCheckBox,.redNaoInputRadio,.redNaoInputCheckBox,.redNaoSelect,.redNaoTextArea').addClass('redNaoInvalid');
}


FormElementBase.prototype.GeneratePropertiesHtml=function(jQueryObject)
{
    var properties=this.GetProperties();

    for(var i=0;i<properties.length;i++)
    {
        properties[i].CreateProperty(jQueryObject);
    }
}


FormElementBase.prototype.GetValueString=function()
{

}

FormElementBase.prototype.GenerationCompleted=function()
{

}

FormElementBase.prototype.IsValid=function()
{
    return true;
}

FormElementBase.prototype.Clone=function()
{
   var newObject=  jQuery.extend(true, {}, this);
    FormElementBase.IdCounter++;
    newObject.Id='rnField'+FormElementBase.IdCounter;

    newObject.Properties=[];
    newObject.CreateProperties();

    return newObject;
}

FormElementBase.prototype.GetValuePath=function()
{
    return '';
}

/************************************************************************************* Title Element ***************************************************************************************************/

function TitleElement(options)
{
    FormElementBase.call(this,options);



    this.Title="Title";

    if(this.IsNew)
    {
        this.Options.ClassName="rednaotitle";
        this.Options.Title="Title";
    }
}

TitleElement.prototype=Object.create(FormElementBase.prototype);

TitleElement.prototype.CreateProperties=function()
{

    this.Properties.push(new SimpleTextProperty(this,this.Options,"Title","Title",{ManipulatorType:'basic'}));
}

TitleElement.prototype.GenerateInlineElement=function()
{
    return '<legend class="redNaoLegend redNaoOneColumn">'+this.Options.Title+'</legend>';
}




TitleElement.prototype.GetValueString=function()
{
    return '';

}

TitleElement.prototype.StoresInformation=function()
{
    return false;
}

/************************************************************************************* Text Element ***************************************************************************************************/

function TextInputElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Text Input";
    if(this.IsNew)
    {
        this.Options.ClassName="rednaotextinput";
        this.Options.Label="Text Input";
        this.Options.Placeholder="Placeholder";
        this.Options.Value="";
        this.Options.ReadOnly='n'
        this.Options.Width="";
    }else{
        this.SetDefaultIfUndefined('Value','');
        this.SetDefaultIfUndefined('ReadOnly','n');
        this.SetDefaultIfUndefined('Width','');
    }





}

TextInputElement.prototype=Object.create(FormElementBase.prototype);

TextInputElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Width","Width",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Value","Value",{ManipulatorType:'basic',RefreshFormData:true}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ReadOnly","Read Only",{ManipulatorType:'basic'}));

}

TextInputElement.prototype.GenerateInlineElement=function()
{
    var additionalStyle='';
    if(!isNaN(parseFloat(this.Options.Width)))
        additionalStyle='width:'+this.Options.Width+'px'+' !important;'

    return '<div class="rednao_label_container"><label class="rednao_control_label" >'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                    <input style="'+additionalStyle+'" '+(this.Options.ReadOnly=='y'?'disabled="disabled"':"")+' name="'+this.GetPropertyName()+'" type="text" placeholder="'+this.Options.Placeholder+'" class="redNaoInputText '+(this.Options.ReadOnly=='y'?'redNaoDisabledElement':"")+'" value="'+this.Options.Value+'">'
                '</div>';
}


TextInputElement.prototype.GetValueString=function()
{
    return {value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}

TextInputElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.value';
}


TextInputElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
}

TextInputElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputText').change(function(){self.FirePropertyChanged(self.GetValueString());});
}

/************************************************************************************* Donation Amount ***************************************************************************************************/

function DonationAmountElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Donation Amount";

    if(this.IsNew)
    {
        this.Options.ClassName="rednaodonationamount";
        this.Options.Label="Donation Amount";
        this.Options.Placeholder="Amount";
        this.Options.DefaultValue=0;
        this.Options.Disabled='n';
    }

    if(typeof  this.Options.DefaultValue=='undefined')
        this.Options.DefaultValue=0;





}

DonationAmountElement.prototype=Object.create(FormElementBase.prototype);

DonationAmountElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"DefaultValue","Default Value",{ManipulatorType:'basic'}));

    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{ManipulatorType:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"Disabled","Read Only",{ManipulatorType:'basic'}));



}

DonationAmountElement.prototype.GenerateInlineElement=function()
{

    return '<div class="rednao_label_container"><label class="rednao_control_label" >'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                    <input   type="text" placeholder="'+this.Options.Placeholder+'" class="redNaoInputText" value="'+this.Options.DefaultValue+'"  >'+
        '</div>';
}



DonationAmountElement.prototype.GetValueString=function()
{
    try
    {
        this.amount=parseFloat(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
    }catch(exception)
    {

    }

    return  encodeURI(this.Options.Label)+"="+encodeURI(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
}

DonationAmountElement.prototype.GenerationCompleted=function()
{
    if(this.Options.Disabled=='y')
    {
        rnJQuery('#'+this.Id).find('.redNaoInputText').attr('readonly','readonly').css('background-color','#eeeeee');
    }
}

DonationAmountElement.prototype.IsValid=function()
{
    try{
        var number=parseFloat(rnJQuery('#'+this.Id+ ' .redNaoInputText').val());
        return number>0;
    }catch(exception)
    {
        return false;
    }
}

/************************************************************************************* Prepend Text Element ***************************************************************************************************/

function PrependTexElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Prepend Text";

    if(this.IsNew)
    {
        this.Options.Label="Prepend Text";
        this.Options.ClassName="rednaoprependedtext";
        this.Options.Placeholder="Placeholder";
        this.Options.Prepend="Prepend";
        this.Options.Value='';
        this.Options.Checked='y';
        this.Options.Width='';
    }else{
        this.SetDefaultIfUndefined('Value','');
        this.SetDefaultIfUndefined('Width','');

    }



}

PrependTexElement.prototype=Object.create(FormElementBase.prototype);

PrependTexElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Prepend","Prepend",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Width","Width",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Value","Value",{ManipulatorType:'basic',RefreshFormData:true}));

}

PrependTexElement.prototype.GenerateInlineElement=function()
{
    var additionalStyle='';
    if(!isNaN(parseFloat(this.Options.Width)))
        additionalStyle='width:'+this.Options.Width+'px'+' !important;'


    return '<div class="rednao_label_container"><label class="rednao_control_label" for="prependedtext">'+this.Options.Label+'</label></div>\
            <div class="redNaoControls">\
               <div class="rednao-input-prepend">\
                    <span class="redNaoPrepend">'+this.Options.Prepend+'</span>\
                    <input style="'+additionalStyle+'" id="prependedtext" name="prependedtext" class="redNaoInputText" placeholder="'+this.Options.Placeholder+'" type="text" value="'+this.Options.Value+'">\
                </div>\
            </div>';
}




PrependTexElement.prototype.GetValueString=function()
{
    return {value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}

PrependTexElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.value';
}


PrependTexElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
}

PrependTexElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputText').change(function(){self.FirePropertyChanged(self.GetValueString());});
}

/************************************************************************************* Appended Text Element ***************************************************************************************************/

function AppendedTexElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Appended Text";

    if(this.IsNew)
    {
        this.Options.Label="Appended Text";
        this.Options.ClassName="rednaoappendedtext";
        this.Options.Placeholder="Placeholder";
        this.Options.Append="Append";
        this.Options.Value="";
        this.Options.Width='';
    }else{
        this.SetDefaultIfUndefined('Value','');
        this.SetDefaultIfUndefined('Width','');

    }




}

AppendedTexElement.prototype=Object.create(FormElementBase.prototype);

AppendedTexElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Append","Append",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Width","Width",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Value","Value",{ManipulatorType:'basic',RefreshFormData:true}));

}

AppendedTexElement.prototype.GenerateInlineElement=function()
{
    var additionalStyle='';
    if(!isNaN(parseFloat(this.Options.Width)))
        additionalStyle='width:'+this.Options.Width+'px'+' !important;'


    return '<div class="rednao_label_container"><label class="rednao_control_label" for="appendedtext">'+this.Options.Label+'</label></div>\
            <div class="redNaoControls">\
                <div class="rednao-input-append">\
                    <input style="'+additionalStyle+'" id="appendedtext" name="appendedtext"  placeholder="'+this.Options.Placeholder+'" type="text" class="redNaoInputText" value="'+this.Options.Value+'">\
                    <span class="redNaoAppend">'+this.Options.Append+'</span>\
                </div>\
            </div>';


}




AppendedTexElement.prototype.GetValueString=function()
{
    return  {value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}

AppendedTexElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.value';
}

AppendedTexElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
}

PrependTexElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputText').change(function(){self.FirePropertyChanged(self.GetValueString());});
}


/************************************************************************************* Prepend Checkbox Element ***************************************************************************************************/

function PrependCheckBoxElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Prepend Checkbox";

    if(this.IsNew)
    {
        this.Options.Label="Prepend Checkbox";
        this.Options.ClassName="rednaoprependedcheckbox";
        this.Options.Placeholder="Placeholder";
        this.Options.IsChecked='n';
        this.Options.Value="";
        this.Options.Width='';
    }else{
        this.SetDefaultIfUndefined('Value','');
        this.SetDefaultIfUndefined('Width','');

    }



}

PrependCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

PrependCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Width","Width",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsChecked","Is Checked",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Value","Value",{ManipulatorType:'basic',RefreshFormData:true}));

}

PrependCheckBoxElement.prototype.GenerateInlineElement=function()
{
    var additionalStyle='';
    if(!isNaN(parseFloat(this.Options.Width)))
        additionalStyle='width:'+this.Options.Width+'px'+' !important;'


    return '<div class="rednao_label_container"><label class="rednao_control_label" for="prependedcheckbox">'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                    <div class="input-prepend">\
                    <span class="redNaoPrepend">\
                        <label class="rednao_checkbox">\
                            <input  type="checkbox" class="redNaoRealCheckBox"  '+(this.Options.IsChecked=='y'? 'checked="checked"':'')+'/>\
                        </label>\
                    </span>\
                    <input style="'+additionalStyle+'" id="prependedcheckbox" name="prependedcheckbox"  class="redNaoInputText" type="text" placeholder="'+this.Options.Placeholder+'" value="'+this.Options.Value+'"/>\
                    </div>\
                </div>';


}



PrependCheckBoxElement.prototype.GetValueString=function()
{
    return  {checked:(rnJQuery('#'+this.Id).find('.redNaoRealCheckBox').is(':checked')?'Yes':'No'),value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}

PrependCheckBoxElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.value';
}


PrependCheckBoxElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
}

PrependCheckBoxElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputText','#'+this.Id+' .redNaoRealCheckBox').change(function(){self.FirePropertyChanged(self.GetValueString());});
}
/************************************************************************************* Append Checkbox Element ***************************************************************************************************/

function AppendCheckBoxElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Append Checkbox";

    if(this.IsNew)
    {
        this.Options.Label="Append Checkbox";
        this.Options.ClassName="rednaoappendedcheckbox";
        this.Options.Placeholder="Placeholder";
        this.Options.IsChecked='n';
        this.Options.Value="";
        this.Options.Width='';
    }else{
        this.SetDefaultIfUndefined('Value','');
        this.SetDefaultIfUndefined('Width','');

    }



}

AppendCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

AppendCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Width","Width",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsChecked","Is Checked",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Value","Value",{ManipulatorType:'basic',RefreshFormData:true}));

}

AppendCheckBoxElement.prototype.GenerateInlineElement=function()
{
    var additionalStyle='';
    if(!isNaN(parseFloat(this.Options.Width)))
        additionalStyle='width:'+this.Options.Width+'px'+' !important;'


    return '<div class="rednao_label_container"><label class="rednao_control_label" for="appendedcheckbox">'+this.Options.Label+'</label></div>\
            <div class="redNaoControls">\
                <div class="rednao-input-append">\
                    <input style="'+additionalStyle+'" id="appendedcheckbox" class="redNaoInputText" name="appendedcheckbox" class="span2" type="text" placeholder="'+this.Options.Placeholder+'" value="'+this.Options.Value+'"/>\
                        <span class="redNaoAppend">\
                            <input type="checkbox" class="redNaoRealCheckBox"   '+(this.Options.IsChecked=='y'? 'checked="checked"':'')+'/>\
                        </span>\
                </div>\
            </div>';


}



AppendCheckBoxElement.prototype.GetValueString=function()
{
    return  {checked:(rnJQuery('#'+this.Id).find('.redNaoRealCheckBox').is(':checked')?'Yes':'No'),value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}

AppendCheckBoxElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.value';
}

AppendCheckBoxElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
}

AppendCheckBoxElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputText','#'+this.Id+' .redNaoRealCheckBox').change(function(){self.FirePropertyChanged(self.GetValueString());});
}
/************************************************************************************* Text Area Element ***************************************************************************************************/

function TextAreaElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Text Area";

    if(this.IsNew)
    {
        this.Options.Label="Text Area";
        this.Options.DefaultText="Default Text";
        this.Options.ClassName="rednaotextarea";
        this.Options.Value="";
        this.Options.Width='';
        this.Options.Height=''
    }else{
        this.SetDefaultIfUndefined('Value','');
        this.SetDefaultIfUndefined('Width','');
        this.SetDefaultIfUndefined('Height','');

    }


}

TextAreaElement.prototype=Object.create(FormElementBase.prototype);

TextAreaElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"DefaultText","Value",{ManipulatorType:'basic',RefreshFormData:true}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Width","Width",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Height","Height",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));



}

TextAreaElement.prototype.GenerateInlineElement=function()
{
    var additionalStyle='';
    if(!isNaN(parseFloat(this.Options.Width)))
        additionalStyle='width:'+this.Options.Width+'px'+' !important;'

    if(!isNaN(parseFloat(this.Options.Height)))
        additionalStyle+='height:'+this.Options.Height+'px'+' !important;'


    return  '<div class="rednao_label_container"><label class="rednao_control_label" for="textarea">'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                <textarea style="'+additionalStyle+'" name="textarea" class="redNaoTextArea">'+this.Options.DefaultText+'</textarea>\
            </div>';
}



TextAreaElement.prototype.GetValueString=function()
{
    return  {value:rnJQuery('#'+this.Id+ ' .redNaoTextArea').val()};
}

TextAreaElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.value';
}


TextAreaElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoTextArea').val()!=this.Options.DefaultText;
}

TextAreaElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoTextArea').change(function(){self.FirePropertyChanged(self.GetValueString());});
}

/*************************************************************************************Multiple Radio Element ***************************************************************************************************/

function MultipleRadioElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Multiple Radio";

    if(this.IsNew)
    {
        this.Options.Label="Multiple Radio";
        this.Options.ClassName="rednaomultipleradios";
        this.Options.Options=new Array({label:'Option 1',value:0},{label:'Option 2',value:0},{label:'Option 3',value:0});
    }else
    {
        if(this.Options.Options.length>0&&typeof this.Options.Options[i]=='string')
        {
            var aux=new Array();
            for(var i=0;i<this.Options.Options.length;i++)
            {
                aux.push({label:this.Options.Options[i]});
            }

            this.Options.Options=aux;
        }
    }


}

MultipleRadioElement.prototype=Object.create(FormElementBase.prototype);

MultipleRadioElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new ArrayProperty(this,this.Options,"Options","Options",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));



}

MultipleRadioElement.prototype.GenerateInlineElement=function()
{

    var html=  '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div>\
        <div class="redNaoControls">';

    var checked='checked="checked"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoRadio" for="radios-0">\
                    <input class="redNaoInputRadio" type="radio" name="'+this.GetPropertyName()+'"  value="'+this.Options.Options[i].value+'" '+checked+'>'+rnJQuery.trim(this.Options.Options[i].label)+'</input>\
                </label>';

        checked="";

    }

    html+='</div>';
    return html;
}





MultipleRadioElement.prototype.GetValueString=function()
{
    var jQueryElement=rnJQuery('#'+this.Id).find(':checked');
    if(jQueryElement.length>0)
        this.amount=parseFloat(jQueryElement.val());
    if(isNaN(this.amount))
        this.amount=0;
    return  {value:rnJQuery.trim(jQueryElement.parent().text()),amount:this.amount};
}


MultipleRadioElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.amount';
}


MultipleRadioElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id).find(':checked').length>0;
}

MultipleRadioElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputRadio').change(function(){self.FirePropertyChanged(self.GetValueString());});
}

/*************************************************************************************Multiple Checkbox Element ***************************************************************************************************/

function MultipleCheckBoxElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Multiple Checkboxes";

    if(this.IsNew)
    {
        this.Options.Label="Multiple Checkbox";
        this.Options.ClassName="rednaomultiplecheckboxes";
        this.Options.Options=new Array({label:'Check 1',value:0},{label:'Check 2',value:0},{label:'Check 3',value:0});
    }else
    {
        if(this.Options.Options.length>0&&typeof this.Options.Options[i]=='string')
        {
            var aux=new Array();
            for(var i=0;i<this.Options.Options.length;i++)
            {
                aux.push({label:this.Options.Options[i]});
            }

            this.Options.Options=aux;
        }
    }


}

MultipleCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

MultipleCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new ArrayProperty(this,this.Options,"Options","Options",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));


}

MultipleCheckBoxElement.prototype.GenerateInlineElement=function()
{

    var html=  '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div>\
        <div class="redNaoControls">';

    var checked='checked=checked';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoCheckBox" for="radios-0">\
                    <input type="checkbox" class="redNaoInputCheckBox" name="'+this.GetPropertyName()+'"  value="'+this.Options.Options[i].value+'" '+checked+'/>'+this.Options.Options[i].label+'\
                </label>';

        checked="";

    }

    html+='</div>';
    return html;
}






MultipleCheckBoxElement.prototype.GetValueString=function()
{
    var valueString="";
    var me=this;
    this.amount=0;
    var jQueryElement=rnJQuery('#'+this.Id).find(':checked');
    var data={};
    data.selectedValues=[];
    if(jQueryElement.length>0)
    {
        for(var i=0;i<jQueryElement.length;i++)
        {
            if(jQueryElement.length>0)
                this.amount=parseFloat(rnJQuery(jQueryElement[i]).val());
            if(isNaN(this.amount))
                this.amount=0;
            data.selectedValues.push({value:rnJQuery(jQueryElement[i]).parent().text(),amount:this.amount})
        }
    }

    return data;

}


MultipleCheckBoxElement.prototype.GetValuePath=function()
{
    return 'RedNaoGetValueFromArray(formData.'+this.Id+'.selectedValues)';
}


MultipleCheckBoxElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id).find(':checked').length>0;
}

MultipleCheckBoxElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputCheckBox').change(function(){self.FirePropertyChanged(self.GetValueString());});
}


/*************************************************************************************Select Basic Element ***************************************************************************************************/

function SelectBasicElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Select Basic";

    if(this.IsNew)
    {
        this.Options.Label="Select Basic";
        this.Options.ClassName="rednaoselectbasic";
        this.Options.Options=new Array({label:'Option 1',value:0},{label:'Option 2',value:0},{label:'Option',value:0});
        this.SetDefaultIfUndefined('Width','');

    }else
    {
        this.SetDefaultIfUndefined('Width','');

        if(this.Options.Options.length>0&&typeof this.Options.Options[i]=='string')
        {
            var aux=new Array();
            for(var i=0;i<this.Options.Options.length;i++)
            {
                aux.push({label:this.Options.Options[i]});
            }

            this.Options.Options=aux;
        }
    }


}

SelectBasicElement.prototype=Object.create(FormElementBase.prototype);

SelectBasicElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new ArrayProperty(this,this.Options,"Options","Options",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Width","Width",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));



}

SelectBasicElement.prototype.GenerateInlineElement=function()
{
    var additionalStyle='';
    if(!isNaN(parseFloat(this.Options.Width)))
        additionalStyle='width:'+this.Options.Width+'px'+' !important;'


    var html=  '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div>\
        <div class="redNaoControls">\
        <select style="'+additionalStyle+'" name="'+this.GetPropertyName()+'" class="redNaoSelect">';

    var selected='selected="selected"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<option   value="'+this.Options.Options[i].value+'" '+selected+'>'+this.Options.Options[i].label+'</opton>'

        selected="";

    }
    html+='</select></div>';
    return html;
}



SelectBasicElement.prototype.GetValueString=function()
{
    var jQueryElement=rnJQuery('#'+this.Id+ ' .redNaoSelect option:selected');
    if(jQueryElement.length>0)
        this.amount=parseFloat(jQueryElement.val());
    if(isNaN(this.amount))
        this.amount=0;
    return  {value:jQueryElement.text(),amount:this.amount};
}

SelectBasicElement.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.amount';
}


SelectBasicElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoSelect option:selected').length>0;
}


SelectBasicElement.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoSelect').change(function(){self.FirePropertyChanged(self.GetValueString());});
}

/*************************************************************************************Donation Button***************************************************************************************************/



function DonationButtonElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Donation Button";

    if(this.IsNew)
    {
        this.Options.Label="Donation Button";
        this.Options.ClassName="rednaodonationbutton";
        this.Options.Image='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif';
    }else
    {
        if(typeof this.Options.Image=='undefined')
            this.Options.Image='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif';
    }


}

DonationButtonElement.prototype=Object.create(FormElementBase.prototype);

DonationButtonElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"margin-left","Spacing",{ManipulatorType:'style',class:'redNaoDonationButton'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{ManipulatorType:'style',class:'redNaoDonationButton',default:'auto'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"height","Height",{ManipulatorType:'style',class:'redNaoDonationButton',default:'auto'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Image","Image Url",{ManipulatorType:'basic'}));
}

DonationButtonElement.prototype.GenerateInlineElement=function()
{
    return '<div class="redNaoControls"><input type="image" class="redNaoDonationButton" src="'+this.Options.Image+'" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></div>';
}


DonationButtonElement.prototype.GetValueString=function()
{
    return '';

}

DonationButtonElement.prototype.StoresInformation=function()
{
    return false;
}


/************************************************************************************* Recurrence Element  ***************************************************************************************************/



function RecurrenceElement(options)
{
    FormElementBase.call(this,options);
    this.Title="Donation Button";

    if(this.IsNew)
    {
        this.Options.Label="Recurrence";
        this.Options.ClassName="rednaodonationrecurrence";
        this.Options.ShowOneTime='y';
        this.Options.ShowDaily='y';
        this.Options.ShowWeekly='y';
        this.Options.ShowMonthly='y';
        this.Options.ShowYearly='y';

    }


}

RecurrenceElement.prototype=Object.create(FormElementBase.prototype);

RecurrenceElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowOneTime","Show one time option",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowDaily","Show daily option",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowWeekly","Show weekly option",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowMonthly","Show monthly option",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowYearly","Show yearly option",{ManipulatorType:'basic'}));
}

RecurrenceElement.prototype.GenerateInlineElement=function()
{
    var html= '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div>\<div class="redNaoControls"><select class="redNaoSelect redNaoRecurrence">';
    var selected='selected="selected"';

    if(this.Options.ShowOneTime=='y')
    {
         html+='<option value="OT" '+selected+'>One Time</option>';
        selected='';
    }

    if(this.Options.ShowDaily=='y')
    {
        html+='<option value="D" '+selected+'>Daily</option>';
        selected='';
    }

    if(this.Options.ShowWeekly=='y')
    {
        html+='<option value="W" '+selected+'>Weekly</option>';
        selected='';
    }

    if(this.Options.ShowMonthly=='y')
    {
        html+='<option value="M" '+selected+'>Monthly</option>';
        selected='';
    }

    if(this.Options.ShowYearly=='y')
    {
        html+='<option value="Y" '+selected+'>Yearly</option>';
        selected='';
    }

    html+='</select></div>';

    return html;
}



RecurrenceElement.prototype.GetValueString=function()
{
    var jQueryElement=rnJQuery('#'+this.Id+ ' .redNaoSelect option:selected');
    return  encodeURI(this.Options.Label)+"="+encodeURI(jQueryElement.text());

}




/************************************************************************************* Submission Button ***************************************************************************************************/



function RedNaoSubmissionButton(options)
{
    FormElementBase.call(this,options);
    this.Title="Submit Button";

    if(this.IsNew)
    {
        this.Options.ClassName="rednaosubmissionbutton";
        this.Options.ButtonText="Submit";


    }
}

RedNaoSubmissionButton.prototype=Object.create(FormElementBase.prototype);

RedNaoSubmissionButton.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this,this.Options,"ButtonText","Button Text",{ManipulatorType:'basic'}));
}

RedNaoSubmissionButton.prototype.GenerateInlineElement=function()
{
    return '<div class="rednao_label_container"></div><div class="redNaoControls"><input type="submit" class="redNaoSubmitButton" value="'+this.Options.ButtonText+'" /></div>';
}


RedNaoSubmissionButton.prototype.GetValueString=function()
{
    return '';

}

RedNaoSubmissionButton.prototype.StoresInformation=function()
{
    return false;
}



/************************************************************************************* Date Picker ***************************************************************************************************/



function RedNaoDatePicker(options)
{
    FormElementBase.call(this,options);
    this.Title="Date Picker";

    if(this.IsNew)
    {
        this.Options.ClassName="rednaodatepicker";
        this.Options.Label="Date";
        this.Options.DateFormat="MM-dd-yy";
        this.Options.Value='';
    }

}

RedNaoDatePicker.prototype=Object.create(FormElementBase.prototype);

RedNaoDatePicker.prototype.CreateProperties=function()
{
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"DateFormat","Date Format",{ManipulatorType:'basic'}));

}

RedNaoDatePicker.prototype.GenerateInlineElement=function()
{
    return '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div><div class="redNaoControls"><input type="text" class="redNaoDatePicker"  /></div>';

}


RedNaoDatePicker.prototype.GetValueString=function()
{
    var selectedDate= rnJQuery('#'+this.Id).find('.redNaoDatePicker').datepicker('getDate');
    if(selectedDate==null)
        selectedDate ="";
    else
        selectedDate=selectedDate.getFullYear()+'-'+(selectedDate.getMonth()+1)+'-'+selectedDate.getDate();
    return {value:selectedDate};

}

RedNaoDatePicker.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.value';
}



RedNaoDatePicker.prototype.StoresInformation=function()
{
    return true;
}

RedNaoDatePicker.prototype.GenerationCompleted=function()
{
    rnJQuery('#'+this.Id).find('.redNaoDatePicker').datepicker({
        dateFormat:this.Options.DateFormat,
        beforeShow: function() {
            rnJQuery('#ui-datepicker-div').wrap('<div class="smartFormsSlider"></div>')
        },
        onClose: function() {
            rnJQuery('#ui-datepicker-div').unwrap();
        }
    });

    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoDatePicker').change(function(){self.FirePropertyChanged(self.GetValueString());});


}

/************************************************************************************* Name ***************************************************************************************************/

function RedNaoName(options)
{
    FormElementBase.call(this,options);
    this.Title="Text Input";
    if(this.IsNew)
    {
        this.Options.ClassName="rednaoname";
        this.Options.Label="Name";
        this.Options.FirstNamePlaceholder="First Name";
        this.Options.LastNamePlaceholder="Last Name";
        this.Options.FirstNameValue="";
        this.Options.LastNameValue="";
        this.Options.ReadOnly='n'
    }





}

RedNaoName.prototype=Object.create(FormElementBase.prototype);

RedNaoName.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"FirstNamePlaceholder","First name place holder",{ManipulatorType:'basic'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"LastNamePlaceholder","Last name place holder",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",{ManipulatorType:'basic'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ReadOnly","Read Only",{ManipulatorType:'basic'}));

}

RedNaoName.prototype.GenerateInlineElement=function()
{
    var firstNameLabel='';
    var lastNameLabel='';

    if(this.Options.FirstNamePlaceholder!='')
        firstNameLabel='<label class="redNaoHelper">'+this.Options.FirstNamePlaceholder+'</label>';
    if(this.Options.LastNamePlaceholder!='')
        lastNameLabel='<label class="redNaoHelper">'+this.Options.LastNamePlaceholder+'</label>';

    return '<div class="rednao_label_container"><label class="rednao_control_label" >'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                    <div class="redNaoFirstNameDiv">\
                        <input '+(this.Options.ReadOnly=='y'?'disabled="disabled"':"")+' name="'+this.GetPropertyName()+'_firstname" type="text" placeholder="'+this.Options.FirstNamePlaceholder+'" class="redNaoInputText redNaoInputFirstName '+(this.Options.ReadOnly=='y'?'redNaoDisabledElement':"")+'"/>\
                        '+firstNameLabel+'\
                    </div>    \
                    <div class="redNaoLastNameDiv">\
                        <input '+(this.Options.ReadOnly=='y'?'disabled="disabled"':"")+' name="'+this.GetPropertyName()+'_lastname" type="text" placeholder="'+this.Options.LastNamePlaceholder+'" class="redNaoInputText redNaoInputLastName '+(this.Options.ReadOnly=='y'?'redNaoDisabledElement':"")+'">\
                        '+lastNameLabel+'\
                    </div>\
    </div>';
}


RedNaoName.prototype.GetValueString=function()
{
    return {
        firstName:rnJQuery('#'+this.Id+ ' .redNaoInputFirstName').val(),
        lastName:rnJQuery('#'+this.Id+ ' .redNaoInputLastName').val()

    };


}

RedNaoName.prototype.MarkAsInvalid=function()
{
    var firstNameJQuery=rnJQuery('#'+this.Id+ ' .redNaoInputFirstName');
    var lastNameJQuery=rnJQuery('#'+this.Id+ ' .redNaoInputLastName');

    if(firstNameJQuery.val()=="")
        firstNameJQuery.addClass('redNaoInvalid');

    if(lastNameJQuery.val()=="")
        lastNameJQuery.addClass('redNaoInvalid');
}

RedNaoName.prototype.GetValuePath=function()
{
    return 'formData.'+this.Id+'.firstName+" "'+'formData.'+this.Id+'.lastName';
}


RedNaoName.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputFirstName').val()!=""&&rnJQuery('#'+this.Id+ ' .redNaoInputLastName').val()!="";
}

RedNaoName.prototype.GenerationCompleted=function()
{
    var self=this;
    rnJQuery('#'+this.Id+ ' .redNaoInputFirstName,#'+this.Id+ ' .redNaoInputLastName').change(function(){self.FirePropertyChanged(self.GetValueString());});
}
