"use strict";

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

        FormElementBase.IdCounter++;
        this.Id='redNaoFormElement'+FormElementBase.IdCounter;
        while(!SmartFormsFieldIsAvailable(this.Id))
        {
            FormElementBase.IdCounter++;
            this.Id='redNaoFormElement'+FormElementBase.IdCounter;
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

    }



    this.Properties=null;
    this.amount=0;





}

FormElementBase.IdCounter=0;


FormElementBase.prototype.GenerateDefaultStyle=function()
{
}

FormElementBase.prototype.RefreshElement=function()
{
    var element=rnJQuery("#"+this.Id);
    element.find(".rednao_label_container, .redNaoControls").remove();
    element.append(this.GenerateInlineElement());
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
    newObject.Id='redNaoFormElement'+FormElementBase.IdCounter;

    newObject.Properties=[];
    newObject.CreateProperties();

    return newObject;
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

    this.Properties.push(new SimpleTextProperty(this,this.Options,"Title","Title",'basic'));
}

TitleElement.prototype.GenerateInlineElement=function()
{
    return '<legend class="redNaoLegend">'+this.Options.Title+'</legend>';
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
    }





}

TextInputElement.prototype=Object.create(FormElementBase.prototype);

TextInputElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));

}

TextInputElement.prototype.GenerateInlineElement=function()
{

    return '<div class="rednao_label_container"><label class="rednao_control_label" >'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                    <input  name="'+this.GetPropertyName()+'" type="text" placeholder="'+this.Options.Placeholder+'" class="redNaoInputText">'
                '</div>';
}


TextInputElement.prototype.GetValueString=function()
{
    return {value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}


TextInputElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
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
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"DefaultValue","Default Value",'basic'));

    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"Disabled","Read Only",'basic'));



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
    }



}

PrependTexElement.prototype=Object.create(FormElementBase.prototype);

PrependTexElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Prepend","Prepend",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));

}

PrependTexElement.prototype.GenerateInlineElement=function()
{

    return '<div class="rednao_label_container"><label class="rednao_control_label" for="prependedtext">'+this.Options.Label+'</label></div>\
            <div class="redNaoControls">\
               <div class="rednao-input-prepend">\
                    <span class="redNaoPrepend">'+this.Options.Prepend+'</span>\
                    <input id="prependedtext" name="prependedtext" class="redNaoInputText" placeholder="'+this.Options.Placeholder+'" type="text">\
                </div>\
            </div>';
}




PrependTexElement.prototype.GetValueString=function()
{
    return {value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}


PrependTexElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
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
    }




}

AppendedTexElement.prototype=Object.create(FormElementBase.prototype);

AppendedTexElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Append","Append",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));

}

AppendedTexElement.prototype.GenerateInlineElement=function()
{
    return '<div class="rednao_label_container"><label class="rednao_control_label" for="appendedtext">'+this.Options.Label+'</label></div>\
            <div class="redNaoControls">\
                <div class="rednao-input-append">\
                    <input id="appendedtext" name="appendedtext"  placeholder="'+this.Options.Placeholder+'" type="text" class="redNaoInputText">\
                    <span class="redNaoAppend">'+this.Options.Append+'</span>\
                </div>\
            </div>';


}




AppendedTexElement.prototype.GetValueString=function()
{
    return  {value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}

AppendedTexElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
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
    }


}

PrependCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

PrependCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsChecked","Is Checked",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));

}

PrependCheckBoxElement.prototype.GenerateInlineElement=function()
{
    return '<div class="rednao_label_container"><label class="rednao_control_label" for="prependedcheckbox">'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                    <div class="input-prepend">\
                    <span class="redNaoPrepend">\
                        <label class="rednao_checkbox">\
                            <input type="checkbox" class="redNaoRealCheckBox"  '+(this.Options.IsChecked=='y'? 'checked="checked"':'')+'/>\
                        </label>\
                    </span>\
                    <input id="prependedcheckbox" name="prependedcheckbox"  class="redNaoInputText" type="text" placeholder="'+this.Options.Placeholder+'"/>\
                    </div>\
                </div>';


}



PrependCheckBoxElement.prototype.GetValueString=function()
{
    return  {checked:(rnJQuery('#'+this.Id).find('.redNaoRealCheckBox').is(':checked')?'Yes':'No'),value:rnJQuery('#'+this.Id+ ' .redNaoInputText').val()};
}


PrependCheckBoxElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
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
    }


}

AppendCheckBoxElement.prototype=Object.create(FormElementBase.prototype);

AppendCheckBoxElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Placeholder","Placeholder",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoInputText'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsChecked","Is Checked",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));

}

AppendCheckBoxElement.prototype.GenerateInlineElement=function()
{
    return '<div class="rednao_label_container"><label class="rednao_control_label" for="appendedcheckbox">'+this.Options.Label+'</label></div>\
            <div class="redNaoControls">\
                <div class="rednao-input-append">\
                    <input id="appendedcheckbox" class="redNaoInputText" name="appendedcheckbox" class="span2" type="text" placeholder="'+this.Options.Placeholder+'"/>\
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


AppendCheckBoxElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoInputText').val()!="";
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
    }


}

TextAreaElement.prototype=Object.create(FormElementBase.prototype);

TextAreaElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"DefaultText","Default Text",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoTextArea'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"height","Height",{type:'style',class:'redNaoTextArea'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));


}

TextAreaElement.prototype.GenerateInlineElement=function()
{

    return  '<div class="rednao_label_container"><label class="rednao_control_label" for="textarea">'+this.Options.Label+'</label></div>\
                <div class="redNaoControls">\
                <textarea  name="textarea" class="redNaoTextArea">'+this.Options.DefaultText+'</textarea>\
            </div>';
}



TextAreaElement.prototype.GetValueString=function()
{
    return  {value:rnJQuery('#'+this.Id+ ' .redNaoTextArea').val()};
}


TextAreaElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoTextArea').val()!=this.Options.DefaultText;
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
        this.Options.Options=new Array({label:'Option 1'},{label:'Option 2'},{label:'Option 3'});
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
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this,this.Options,"Options","Options",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));



}

MultipleRadioElement.prototype.GenerateInlineElement=function()
{

    var html=  '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div>\
        <div class="redNaoControls">';

    var checked='checked="checked"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoRadio" for="radios-0">\
                    <input class="redNaoInputRadio" type="radio" name="'+this.GetPropertyName()+'"  value="'+this.Options.Options[i].label+'" '+checked+'>'+rnJQuery.trim(this.Options.Options[i].label)+'</input>\
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
    return  {value:rnJQuery.trim(jQueryElement.parent().text())};
}


MultipleRadioElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id).find(':checked').length>0;
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
        this.Options.Options=new Array({label:'Check 1'},{label:'Check 2'},{label:'Check 3'});
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
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this,this.Options,"Options","Options",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));


}

MultipleCheckBoxElement.prototype.GenerateInlineElement=function()
{

    var html=  '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div>\
        <div class="redNaoControls">';

    var checked='checked=checked';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<label class="redNaoCheckBox" for="radios-0">\
                    <input type="checkbox" class="redNaoInputCheckBox" name="'+this.GetPropertyName()+'"  value="'+this.Options.Options[i].label+'" '+checked+'/>'+this.Options.Options[i].label+'\
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
            data.selectedValues.push({value:rnJQuery(jQueryElement[i]).parent().text()})
        }
    }

    return data;

}


MultipleCheckBoxElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id).find(':checked').length>0;
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
        this.Options.Options=new Array({label:'Option 1'},{label:'Option 2'},{label:'Option 3(30$)'});
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

SelectBasicElement.prototype=Object.create(FormElementBase.prototype);

SelectBasicElement.prototype.CreateProperties=function()
{
    this.Properties.push(new IdProperty(this,this.Options));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new ArrayProperty(this,this.Options,"Options","Options",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoSelect'}));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"IsRequired","Required",'basic'));



}

SelectBasicElement.prototype.GenerateInlineElement=function()
{

    var html=  '<div class="rednao_label_container"><label class="rednao_control_label">'+this.Options.Label+'</label></div>\
        <div class="redNaoControls">\
        <select name="'+this.GetPropertyName()+'" class="redNaoSelect">';

    var selected='selected="selected"';
    for(var i=0;i<this.Options.Options.length;i++)
    {
        html+='<option   value="'+this.Options.Options[i].label+'" '+selected+'>'+this.Options.Options[i].label+'</opton>'

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
    return  {value:jQueryElement.text()};
}


SelectBasicElement.prototype.IsValid=function()
{
    return rnJQuery('#'+this.Id+ ' .redNaoSelect option:selected').length>0;
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
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"margin-left","Spacing",{type:'style',class:'redNaoDonationButton'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"width","Width",{type:'style',class:'redNaoDonationButton',default:'auto'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options.Styles,"height","Height",{type:'style',class:'redNaoDonationButton',default:'auto'}));
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Image","Image Url",'basic'));
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
    this.Properties.push(new SimpleTextProperty(this,this.Options,"Label","Label",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowOneTime","Show one time option",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowDaily","Show daily option",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowWeekly","Show weekly option",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowMonthly","Show monthly option",'basic'));
    this.Properties.push(new CheckBoxProperty(this,this.Options,"ShowYearly","Show yearly option",'basic'));
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
    this.Properties.push(new SimpleTextProperty(this,this.Options,"ButtonText","Button Text",'basic'));
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


