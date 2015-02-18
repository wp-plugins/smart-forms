/************************************************************************************* Base  ***************************************************************************************************/

function ElementPropertiesBase(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    if(additionalInformation.ManipulatorType=='basic')
        this.Manipulator=RedNaoBasicManipulatorInstance;
    this.FormElement=formelement;
    this.AdditionalInformation=additionalInformation;
    this.PropertiesObject=propertiesObject;
    this.PropertyName=propertyName;
    this.PropertyTitle=propertyTitle;
    this.PropertyId="redNaoFormProperty"+this.PropertyName;
    this.$PropertiesContainer=null;

}

ElementPropertiesBase.prototype.FormulaExists=function(formElement,propertyName)
{
    return RedNaoPathExists(formElement, 'Options.Formulas.' + propertyName + '.Value') && formElement.Options.Formulas[propertyName].Value != "";
};

ElementPropertiesBase.prototype.CreateProperty=function(jQueryObject)
{
    this.$PropertiesContainer=rnJQuery("<tr></tr>");
    this.$PropertiesContainer.append(this.GenerateHtml());
    jQueryObject.append(this.$PropertiesContainer);
};

ElementPropertiesBase.prototype.GenerateHtml=function()
{
    throw 'Abstract Method';
};

ElementPropertiesBase.prototype.RefreshProperty=function()
{
    this.$PropertiesContainer.empty();
    this.$PropertiesContainer.append(this.GenerateHtml());
};

ElementPropertiesBase.prototype.GetPropertyCurrentValue=function()
{
    return this.Manipulator.GetValue(this.PropertiesObject,this.PropertyName,this.AdditionalInformation);
};

ElementPropertiesBase.prototype.UpdateProperty=function()
{
    this.Manipulator.SetValue(this.PropertiesObject,this.PropertyName, rnJQuery("#"+this.PropertyId).val(),this.AdditionalInformation);

};

ElementPropertiesBase.prototype.RefreshElement=function()
{
    var refreshedElements=this.FormElement.RefreshElement();
    refreshedElements.find('input[type=submit]').click(function(e){e.preventDefault();e.stopPropagation();})

};

/************************************************************************************* Simple Text Property ***************************************************************************************************/


function SimpleTextProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    if(typeof additionalInformation.Placeholder=='undefined')
        additionalInformation.Placeholder='Default';
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

SimpleTextProperty.prototype=Object.create(ElementPropertiesBase.prototype);

SimpleTextProperty.prototype.GenerateHtml=function()
{
    var input="";
    var tdStyle="";
    if(this.AdditionalInformation.MultipleLine==true)
    {
        input='<textarea style="width:206px;" class="rednao-input-large" data-type="input" name="name" id="'+this.PropertyId+'" placeholder="'+this.AdditionalInformation.Placeholder+'">'+RedNaoEscapeHtml(this.GetPropertyCurrentValue())+'</textarea>';
        tdStyle='vertical-align:top;'
    }
    else
    {
        input='<input style="width: 206px;" class="rednao-input-large" data-type="input" type="text" name="name" id="'+this.PropertyId+'" value="'+RedNaoEscapeHtml(this.GetPropertyCurrentValue())+'" placeholder="'+this.AdditionalInformation.Placeholder+'"/>';
    }


    var newProperty=rnJQuery( '<td style="text-align: right;'+tdStyle+'"><label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label></td>'+
            '<td  style="text-align: left">'+input+
            '<img style="width:15px;height: 20px; vertical-align: middle;cursor:pointer;cursor:hand;" title="Formula" src="'+ smartFormsRootPath+(this.FormulaExists(this.FormElement,this.PropertyName)?'images/formula_used.png' :'images/formula.png')+'"/> </td>');

    var self=this;
    if(typeof this.AdditionalInformation.IconOptions!='undefined')
    {
        var addIconButton=rnJQuery('<a style="margin-left: 5px;" href="#"><span class="glyphicon glyphicon-tags" title="Add Icon"></span></a>');
        addIconButton.click(function()
        {
            RedNaoIconSelectorVar.Show( self.AdditionalInformation.IconOptions.Type,function(itemClass,orientation){self.IconSelected(itemClass,orientation)});
        });
        rnJQuery(newProperty[1]).append(addIconButton);
    }

    newProperty.keyup(function(){
        self.Manipulator.SetValue(self.PropertiesObject,self.PropertyName, (rnJQuery("#"+self.PropertyId).val()),self.AdditionalInformation);
        self.RefreshElement();

    });
    newProperty.find('img').click(function(){RedNaoEventManager.Publish('FormulaButtonClicked',{"FormElement":self.FormElement,"PropertyName":self.PropertyName,AdditionalInformation:self.AdditionalInformation,Image:newProperty.find('img')})});
    return newProperty;
};

SimpleTextProperty.prototype.IconSelected=function(itemClass,orientation)
{
    this.PropertiesObject[this.PropertyName+'_Icon']={
        ClassName:itemClass,
        Orientation:orientation
    };
    this.RefreshElement();
};


/************************************************************************************* Simple Numeric Property ***************************************************************************************************/


function SimpleNumericProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    if(typeof additionalInformation.Placeholder=='undefined')
        additionalInformation.Placeholder='Default';
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

SimpleNumericProperty.prototype=Object.create(ElementPropertiesBase.prototype);

SimpleNumericProperty.prototype.GenerateHtml=function()
{
    var input="";
    var tdStyle="";
    if(this.AdditionalInformation.MultipleLine==true)
    {
        input='<textarea style="width:206px;" class="rednao-input-large" data-type="input" name="name" id="'+this.PropertyId+'" value="'+RedNaoEscapeHtml(this.GetPropertyCurrentValue())+'" placeholder="'+this.AdditionalInformation.Placeholder+'"/>';
        tdStyle='vertical-align:top;'
    }
    else
    {
        input='<input style="width: 206px;" class="rednao-input-large" data-type="input" type="text" name="name" id="'+this.PropertyId+'" value="'+RedNaoEscapeHtml(this.GetPropertyCurrentValue())+'" placeholder="'+this.AdditionalInformation.Placeholder+'"/>';
    }


    var newProperty=rnJQuery( '<td style="text-align: right;'+tdStyle+'"><label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label></td>\
            <td style="text-align: left">'+input+'\
            <img style="width:15px;height: 20px; vertical-align: middle;cursor:pointer;cursor:hand;" title="Formula" src="'+ smartFormsRootPath+(this.FormulaExists(this.FormElement,this.PropertyName)?'images/formula_used.png' :'images/formula.png')+'"/> </td>');
    newProperty.find('input').ForceNumericOnly();
    var self=this;
    newProperty.keyup(function(){
        var value=parseFloat(rnJQuery("#"+self.PropertyId).val());
        if(isNaN(value))
            value='';
        else
            value=value.toString();
        self.Manipulator.SetValue(self.PropertiesObject,self.PropertyName, value,self.AdditionalInformation);
        self.RefreshElement();

    });
    newProperty.find('img').click(function(){RedNaoEventManager.Publish('FormulaButtonClicked',{"FormElement":self.FormElement,"PropertyName":self.PropertyName,AdditionalInformation:self.AdditionalInformation,Image:newProperty.find('img')})});
    return newProperty;
};







/************************************************************************************* Check Box Property ***************************************************************************************************/



function CheckBoxProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

CheckBoxProperty.prototype=Object.create(ElementPropertiesBase.prototype);

CheckBoxProperty.prototype.GenerateHtml=function()
{
    var newProperty=rnJQuery('<td style="text-align: right"><label class="checkbox control-group rednao-properties-control-label" style="display: block;">'+this.PropertyTitle+'</label></td>\
                <td style="text-align: left"><input type="checkbox" class="input-inline field" name="checked" id="'+this.PropertyId+'" '+(this.GetPropertyCurrentValue()=='y'? 'checked="checked"':'')+'/></td>');

    var self=this;
    newProperty.find('#'+this.PropertyId).change(function(){
        self.Manipulator.SetValue(self.PropertiesObject,self.PropertyName, (rnJQuery("#"+self.PropertyId).is(':checked')?'y':'n'),self.AdditionalInformation);
        self.RefreshElement();
    });

    return newProperty;
};





/************************************************************************************* Array Property ***************************************************************************************************/



function ArrayProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

ArrayProperty.prototype=Object.create(ElementPropertiesBase.prototype);

ArrayProperty.prototype.GenerateHtml=function()
{
    var currentValues=this.GetPropertyCurrentValue();
    var self=this;
    var newProperty=rnJQuery('<td style="vertical-align: top;text-align: right;"><label class="checkbox control-group rednao-properties-control-label" style="display: block;vertical-align: top;">'+this.PropertyTitle+'</label></td><td style="text-align: left">'+this.GetItemList(currentValues)+'</td>');
    newProperty.find('table').append("<tr><td style='border-bottom-style: none;'><button class='redNaoPropertyClearButton' value='None'>Clear</button></td></tr></table>");
    newProperty.find('.redNaoPropertyClearButton').click(function(event)
    {
        event.preventDefault();
        newProperty.find('.itemSel').removeAttr('checked');
        self.UpdateProperty();
    });

    newProperty.find('.cloneArrayItem').click(function(){self.CloneItem(rnJQuery(this))});
    newProperty.find('.deleteArrayItem').click(function(){self.DeleteItem(rnJQuery(this))});
    newProperty.find('input[type=text],input[type=radio],input[type=checkbox]').change(function(){self.UpdateProperty();});
    newProperty.find('input[type=text]').keyup(function(){self.UpdateProperty();});


    this.ItemsList=newProperty.find('.listOfItems');
    return newProperty;
};

ArrayProperty.prototype.GetItemList=function(items)
{
    var list= '<table class="listOfItems"><tr><th style="text-align: right">Sel</th><th>Label</th><th>Amount</th></tr>';

    var isFirst=true;
    for(var i=0;i<items.length;i++)
    {
        list+=this.CreateListRow(isFirst,items[i]);
        isFirst=false;
    }
    return list;

};

ArrayProperty.prototype.DeleteItem=function(jQueryElement)
{
    var array=this.GetPropertyCurrentValue();
    var index=jQueryElement.parent().parent().index();

    array.splice(index,1);
    jQueryElement.parent().parent().remove();
    this.UpdateProperty();
};

ArrayProperty.prototype.CloneItem=function(jQueryElement)
{
    var jQueryToClone=jQueryElement.parent().parent();
    var data=this.GetRowData(jQueryToClone);

    if(this.AdditionalInformation.SelectorType=='radio')
        data.sel='n';

    var jQueryNewRow=rnJQuery(this.CreateListRow(false,data));
    jQueryToClone.after(jQueryNewRow);

    var self=this;
    jQueryNewRow.find('.cloneArrayItem').click(function(){self.CloneItem(rnJQuery(this))});
    jQueryNewRow.find('.deleteArrayItem').click(function(){self.DeleteItem(rnJQuery(this))});
    jQueryNewRow.find('input[type=text],input[type=radio],input[type=checkbox]').change(function(){self.UpdateProperty();});

    this.UpdateProperty();

};


ArrayProperty.prototype.CreateListRow=function(isFirst,item)
{
    var row= '<tr class="redNaoRowOption">' +
            '       <td style="text-align: right;">'+this.GetSelector(item)+'</td>' +
            '       <td><input type="text" class="itemText" value="'+RedNaoEscapeHtml(item.label)+'"/></td>' +
            '       <td><input type="text" class="itemValue" style="text-align: right; width: 50px;" value="'+RedNaoEscapeHtml(item.value)+'"/></td>' +
            '       <td style="text-align: center;vertical-align: middle;"><img style="cursor: hand;cursor: pointer; width:15px;height:15px;" class="cloneArrayItem" src="'+smartFormsRootPath+'images/clone.png" title="Clone"></td>';
            if(!isFirst)
                row+=' <td style="text-align: center;vertical-align: middle;"><img style="cursor: hand; cursor: pointer;width:15px;height:15px;" class="deleteArrayItem" src="'+smartFormsRootPath+'images/delete.png" title="Delete"></td>';
            row+='</tr>';
    return row;
};

ArrayProperty.prototype.GetSelector=function(item)
{
    var selected='';
    if(RedNaoGetValueOrEmpty(item.sel)=='y')
        selected='checked="checked"';
    if(this.AdditionalInformation.SelectorType=='radio')
        return '<input class="itemSel" type="radio" '+selected+' name="propertySelector"/>';
    else
        return '<input class="itemSel" type="checkbox" '+selected+'/>';
};

ArrayProperty.prototype.UpdateProperty=function()
{
		var processedValueArray=new Array();
    var self=this;
    var rows=this.ItemsList.find('tr.redNaoRowOption').each(
        function()
        {
            var jQueryRow=rnJQuery(this);
            var row=self.GetRowData(jQueryRow);
            processedValueArray.push(row);
        }
    );
    this.Manipulator.SetValue(this.PropertiesObject,this.PropertyName, processedValueArray,this.AdditionalInformation);
    this.RefreshElement();
};


ArrayProperty.prototype.GetRowData=function(jQueryRow)
{
    return {label:jQueryRow.find('.itemText').val(),value:jQueryRow.find('.itemValue').val(),sel:(jQueryRow.find('.itemSel').is(':checked')?'y':'n')};
};

/************************************************************************************* Id Property ***************************************************************************************************/


function IdProperty(formelement,propertiesObject)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,"Id","Id",{ManipulatorType:'basic'});
}

IdProperty.prototype=Object.create(ElementPropertiesBase.prototype);

IdProperty.prototype.GenerateHtml=function()
{
    this.PreviousId=this.FormElement.Id;

    var value=this.PreviousId;
    var newProperty=rnJQuery( '<td style="text-align: right"><label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label></td>\
            <td style="text-align: left"><input style="width: 206px;" class="rednao-input-large" data-type="input" maxlength="50" type="text" name="name" id="'+this.PropertyId+'" value="'+value+'" placeholder="Default"/></td>');


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

        var formElements=SmartFormsAddNewVar.FormBuilder.RedNaoFormElements;
        for(var i=0;i<formElements.length;i++)
        {
            if(fieldName.toLowerCase()==formElements[i].Id.toLowerCase())
            {
                alert("The field "+fieldName+" already exists");
                jqueryElement.val(self.PreviousId);
                return;
            }
        }

        self.FormElement.Id=fieldName;
        self.PropertiesObject.Id=fieldName;

        var jQueryElement=rnJQuery('#'+self.PreviousId);
        jQueryElement.attr('id',fieldName);


        var refreshedElements=self.FormElement.RefreshElement();
        refreshedElements.find('input[type=submit]').click(function(e){e.preventDefault();e.stopPropagation();});
        self.RefreshElement();

    });
    return newProperty;
};




/************************************************************************************* Combo Property ***************************************************************************************************/


function ComboBoxProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

ComboBoxProperty.prototype=Object.create(ElementPropertiesBase.prototype);

ComboBoxProperty.prototype.GenerateHtml=function()
{
    var value=this.GetPropertyCurrentValue().trim();
    var selectText='<select id="'+this.PropertyId+'">';
    for(var i=0;i<this.AdditionalInformation.Values.length;i++)
    {
        var selected="";
        if(this.AdditionalInformation.Values[i].value==value)
            selected='selected="selected"';

        selectText+='<option value="'+RedNaoEscapeHtml(this.AdditionalInformation.Values[i].value)+'" '+selected+'>'+RedNaoEscapeHtml(this.AdditionalInformation.Values[i].label)+'</option>';
    }
    selectText+='</select>';

    var newProperty=rnJQuery( '<td style="text-align: right"><label class="rednao-properties-control-label"> '+RedNaoEscapeHtml(this.PropertyTitle)+' </label></td>'+
            '<td style="text-align: left">'+selectText+' </td>');

    var self=this;
    newProperty.find('select').change(function(){
        self.Manipulator.SetValue(self.PropertiesObject,self.PropertyName, (rnJQuery("#"+self.PropertyId).val()),self.AdditionalInformation);
        self.RefreshElement();

    });

    newProperty.find('img').click(function(){RedNaoEventManager.Publish('FormulaButtonClicked',{"FormElement":self.FormElement,"PropertyName":self.PropertyName,AdditionalInformation:self.AdditionalInformation,Image:null})});
    return newProperty;
};



function RedNaoIconSelector()
{
    this.$Dialog=null;
    this.$Select=null;
}

RedNaoIconSelector.prototype.Show=function(type,callBack)
{
    this.CallBack=callBack;
    if(this.$Dialog==null)
        this.InitializeDialog();

    if(type=='leftAndRight')
    {
        this.$Dialog.find('.rnBtnAddLeft,.rnBtnAddRight').show();
        this.$Dialog.find('.rnBtnAdd').hide();
    }else{
        this.$Dialog.find('.rnBtnAddLeft,.rnBtnAddRight').hide();
        this.$Dialog.find('.rnBtnAdd').show();
    }
    this.$Dialog.modal('show');

};

RedNaoIconSelector.prototype.GetIconOptions=function()
{
    return '<option value="glyphicon glyphicon-adjust">Adjust</option>'+
    '<option value="glyphicon glyphicon-align-center">Align Center</option>'+
    '<option value="glyphicon glyphicon-align-justify">Align Justify</option>'+
    '<option value="glyphicon glyphicon-align-left">Align Left</option>'+
    '<option value="glyphicon glyphicon-align-right">Align Right</option>'+
    '<option value="glyphicon glyphicon-arrow-down">Arrow Down</option>'+
    '<option value="glyphicon glyphicon-arrow-left">Arrow Left</option>'+
    '<option value="glyphicon glyphicon-arrow-right">Arrow Right</option>'+
    '<option value="glyphicon glyphicon-arrow-up">Arrow Up</option>'+
    '<option value="glyphicon glyphicon-asterisk">Asterisk</option>'+
    '<option value="glyphicon glyphicon-backward">Backward</option>'+
    '<option value="glyphicon glyphicon-ban-circle">Ban Circle</option>'+
    '<option value="glyphicon glyphicon-barcode">Barcode</option>'+
    '<option value="glyphicon glyphicon-bell">Bell</option>'+
    '<option value="glyphicon glyphicon-bold">Bold</option>'+
    '<option value="glyphicon glyphicon-book">Book</option>'+
    '<option value="glyphicon glyphicon-bookmark">Bookmark</option>'+
    '<option value="glyphicon glyphicon-briefcase">Briefcase</option>'+
    '<option value="glyphicon glyphicon-bullhorn">Bullhorn</option>'+
    '<option value="glyphicon glyphicon-calendar">Calendar</option>'+
    '<option value="glyphicon glyphicon-camera">Camera</option>'+
    '<option value="glyphicon glyphicon-certificate">Certificate</option>'+
    '<option value="glyphicon glyphicon-check">Check</option>'+
    '<option value="glyphicon glyphicon-chevron-down">Chevron Down</option>'+
    '<option value="glyphicon glyphicon-chevron-left">Chevron Left</option>'+
    '<option value="glyphicon glyphicon-chevron-right">Chevron Right</option>'+
    '<option value="glyphicon glyphicon-chevron-up">Chevron Up</option>'+
    '<option value="glyphicon glyphicon-circle-arrow-down">Circle Arrow Down</option>'+
    '<option value="glyphicon glyphicon-circle-arrow-left">Circle Arrow Left</option>'+
    '<option value="glyphicon glyphicon-circle-arrow-right">Circle Arrow Right</option>'+
    '<option value="glyphicon glyphicon-circle-arrow-up">Circle Arrow Up</option>'+
    '<option value="glyphicon glyphicon-cloud">Cloud</option>'+
    '<option value="glyphicon glyphicon-cloud-download">Cloud Download</option>'+
    '<option value="glyphicon glyphicon-cloud-upload">Cloud Upload</option>'+
    '<option value="glyphicon glyphicon-cog">Cog</option>'+
    '<option value="glyphicon glyphicon-collapse-down">Collapse Down</option>'+
    '<option value="glyphicon glyphicon-collapse-up">Collapse Up</option>'+
    '<option value="glyphicon glyphicon-comment">Comment</option>'+
    '<option value="glyphicon glyphicon-compressed">Compressed</option>'+
    '<option value="glyphicon glyphicon-copyright-mark">Copyright Mark</option>'+
    '<option value="glyphicon glyphicon-credit-card">Credit Card</option>'+
    '<option value="glyphicon glyphicon-cutlery">Cutlery</option>'+
    '<option value="glyphicon glyphicon-dashboard">Dashboard</option>'+
    '<option value="glyphicon glyphicon-download">Download</option>'+
    '<option value="glyphicon glyphicon-download-alt">Download Alt</option>'+
    '<option value="glyphicon glyphicon-earphone">Earphone</option>'+
    '<option value="glyphicon glyphicon-edit">Edit</option>'+
    '<option value="glyphicon glyphicon-eject">Eject</option>'+
    '<option value="glyphicon glyphicon-envelope">Email</option>'+
    '<option value="glyphicon glyphicon-euro">Euro</option>'+
    '<option value="glyphicon glyphicon-exclamation-sign">Exclamation Sign</option>'+
    '<option value="glyphicon glyphicon-expand">Expand</option>'+
    '<option value="glyphicon glyphicon-export">Export</option>'+
    '<option value="glyphicon glyphicon-eye-close">Eye Close</option>'+
    '<option value="glyphicon glyphicon-eye-open">Eye Open</option>'+
    '<option value="glyphicon glyphicon-facetime-video">Facetime Video</option>'+
    '<option value="glyphicon glyphicon-fast-backward">Fast Backward</option>'+
    '<option value="glyphicon glyphicon-fast-forward">Fast Forward</option>'+
    '<option value="glyphicon glyphicon-file">File</option>'+
    '<option value="glyphicon glyphicon-film">Film</option>'+
    '<option value="glyphicon glyphicon-filter">Filter</option>'+
    '<option value="glyphicon glyphicon-fire">Fire</option>'+
    '<option value="glyphicon glyphicon-flag">Flag</option>'+
    '<option value="glyphicon glyphicon-flash">Flash</option>'+
    '<option value="glyphicon glyphicon-floppy-disk">Floppy Disk</option>'+
    '<option value="glyphicon glyphicon-floppy-open">Floppy Open</option>'+
    '<option value="glyphicon glyphicon-floppy-remove">Floppy Remove</option>'+
    '<option value="glyphicon glyphicon-floppy-save">Floppy Save</option>'+
    '<option value="glyphicon glyphicon-floppy-saved">Floppy Saved</option>'+
    '<option value="glyphicon glyphicon-folder-close">Folder Close</option>'+
    '<option value="glyphicon glyphicon-folder-open">Folder Open</option>'+
    '<option value="glyphicon glyphicon-font">Font</option>'+
    '<option value="glyphicon glyphicon-forward">Forward</option>'+
    '<option value="glyphicon glyphicon-fullscreen">Fullscreen</option>'+
    '<option value="glyphicon glyphicon-gbp">Gbp</option>'+
    '<option value="glyphicon glyphicon-gift">Gift</option>'+
    '<option value="glyphicon glyphicon-glass">Glass</option>'+
    '<option value="glyphicon glyphicon-globe">Globe</option>'+
    '<option value="glyphicon glyphicon-hand-down">Hand Down</option>'+
    '<option value="glyphicon glyphicon-hand-left">Hand Left</option>'+
    '<option value="glyphicon glyphicon-hand-right">Hand Right</option>'+
    '<option value="glyphicon glyphicon-hand-up">Hand Up</option>'+
    '<option value="glyphicon glyphicon-hdd">Hdd</option>'+
    '<option value="glyphicon glyphicon-hd-video">Hd Video</option>'+
    '<option value="glyphicon glyphicon-header">Header</option>'+
    '<option value="glyphicon glyphicon-headphones">Headphones</option>'+
    '<option value="glyphicon glyphicon-heart">Heart</option>'+
    '<option value="glyphicon glyphicon-heart-empty">Heart Empty</option>'+
    '<option value="glyphicon glyphicon-home">Home</option>'+
    '<option value="glyphicon glyphicon-import">Import</option>'+
    '<option value="glyphicon glyphicon-inbox">Inbox</option>'+
    '<option value="glyphicon glyphicon-indent-left">Indent Left</option>'+
    '<option value="glyphicon glyphicon-indent-right">Indent Right</option>'+
    '<option value="glyphicon glyphicon-info-sign">Info Sign</option>'+
    '<option value="glyphicon glyphicon-italic">Italic</option>'+
    '<option value="glyphicon glyphicon-leaf">Leaf</option>'+
    '<option value="glyphicon glyphicon-link">Link</option>'+
    '<option value="glyphicon glyphicon-list">List</option>'+
    '<option value="glyphicon glyphicon-list-alt">List Alt</option>'+
    '<option value="glyphicon glyphicon-lock">Lock</option>'+
    '<option value="glyphicon glyphicon-log-in">Log In</option>'+
    '<option value="glyphicon glyphicon-log-out">Log Out</option>'+
    '<option value="glyphicon glyphicon-magnet">Magnet</option>'+
    '<option value="glyphicon glyphicon-map-marker">Map Marker</option>'+
    '<option value="glyphicon glyphicon-minus">Minus</option>'+
    '<option value="glyphicon glyphicon-minus-sign">Minus Sign</option>'+
    '<option value="glyphicon glyphicon-move">Move</option>'+
    '<option value="glyphicon glyphicon-music">Music</option>'+
    '<option value="glyphicon glyphicon-new-window">New Window</option>'+
    '<option value="glyphicon glyphicon-off">Off</option>'+
    '<option value="glyphicon glyphicon-ok">Ok</option>'+
    '<option value="glyphicon glyphicon-ok-circle">Ok Circle</option>'+
    '<option value="glyphicon glyphicon-ok-sign">Ok Sign</option>'+
    '<option value="glyphicon glyphicon-open">Open</option>'+
    '<option value="glyphicon glyphicon-paperclip">Paperclip</option>'+
    '<option value="glyphicon glyphicon-pause">Pause</option>'+
    '<option value="glyphicon glyphicon-pencil">Pencil</option>'+
    '<option value="glyphicon glyphicon-phone">Phone</option>'+
    '<option value="glyphicon glyphicon-phone-alt">Phone Alt</option>'+
    '<option value="glyphicon glyphicon-picture">Picture</option>'+
    '<option value="glyphicon glyphicon-plane">Plane</option>'+
    '<option value="glyphicon glyphicon-play">Play</option>'+
    '<option value="glyphicon glyphicon-play-circle">Play Circle</option>'+
    '<option value="glyphicon glyphicon-plus">Plus</option>'+
    '<option value="glyphicon glyphicon-plus-sign">Plus Sign</option>'+
    '<option value="glyphicon glyphicon-print">Print</option>'+
    '<option value="glyphicon glyphicon-pushpin">Pushpin</option>'+
    '<option value="glyphicon glyphicon-qrcode">Qrcode</option>'+
    '<option value="glyphicon glyphicon-question-sign">Question Sign</option>'+
    '<option value="glyphicon glyphicon-random">Random</option>'+
    '<option value="glyphicon glyphicon-record">Record</option>'+
    '<option value="glyphicon glyphicon-refresh">Refresh</option>'+
    '<option value="glyphicon glyphicon-registration-mark">Registration Mark</option>'+
    '<option value="glyphicon glyphicon-remove">Remove</option>'+
    '<option value="glyphicon glyphicon-remove-circle">Remove Circle</option>'+
    '<option value="glyphicon glyphicon-remove-sign">Remove Sign</option>'+
    '<option value="glyphicon glyphicon-repeat">Repeat</option>'+
    '<option value="glyphicon glyphicon-resize-full">Resize Full</option>'+
    '<option value="glyphicon glyphicon-resize-horizontal">Resize Horizontal</option>'+
    '<option value="glyphicon glyphicon-resize-small">Resize Small</option>'+
    '<option value="glyphicon glyphicon-resize-vertical">Resize Vertical</option>'+
    '<option value="glyphicon glyphicon-retweet">Retweet</option>'+
    '<option value="glyphicon glyphicon-road">Road</option>'+
    '<option value="glyphicon glyphicon-save">Save</option>'+
    '<option value="glyphicon glyphicon-saved">Saved</option>'+
    '<option value="glyphicon glyphicon-screenshot">Screenshot</option>'+
    '<option value="glyphicon glyphicon-sd-video">Sd Video</option>'+
    '<option value="glyphicon glyphicon-search">Search</option>'+
    '<option value="glyphicon glyphicon-send">Send</option>'+
    '<option value="glyphicon glyphicon-share">Share</option>'+
    '<option value="glyphicon glyphicon-share-alt">Share Alt</option>'+
    '<option value="glyphicon glyphicon-shopping-cart">Shopping Cart</option>'+
    '<option value="glyphicon glyphicon-signal">Signal</option>'+
    '<option value="glyphicon glyphicon-sort">Sort</option>'+
    '<option value="glyphicon glyphicon-sort-by-alphabet">Sort By Alphabet</option>'+
    '<option value="glyphicon glyphicon-sort-by-alphabet-alt">Sort By Alphabet Alt</option>'+
    '<option value="glyphicon glyphicon-sort-by-attributes">Sort By Attributes</option>'+
    '<option value="glyphicon glyphicon-sort-by-attributes-alt">Sort By Attributes Alt</option>'+
    '<option value="glyphicon glyphicon-sort-by-order">Sort By Order</option>'+
    '<option value="glyphicon glyphicon-sort-by-order-alt">Sort By Order Alt</option>'+
    '<option value="glyphicon glyphicon-sound-5-1">Sound 5 1</option>'+
    '<option value="glyphicon glyphicon-sound-6-1">Sound 6 1</option>'+
    '<option value="glyphicon glyphicon-sound-7-1">Sound 7 1</option>'+
    '<option value="glyphicon glyphicon-sound-dolby">Sound Dolby</option>'+
    '<option value="glyphicon glyphicon-sound-stereo">Sound Stereo</option>'+
    '<option value="glyphicon glyphicon-star">Star</option>'+
    '<option value="glyphicon glyphicon-star-empty">Star Empty</option>'+
    '<option value="glyphicon glyphicon-stats">Stats</option>'+
    '<option value="glyphicon glyphicon-step-backward">Step Backward</option>'+
    '<option value="glyphicon glyphicon-step-forward">Step Forward</option>'+
    '<option value="glyphicon glyphicon-stop">Stop</option>'+
    '<option value="glyphicon glyphicon-subtitles">Subtitles</option>'+
    '<option value="glyphicon glyphicon-tag">Tag</option>'+
    '<option value="glyphicon glyphicon-tags">Tags</option>'+
    '<option value="glyphicon glyphicon-tasks">Tasks</option>'+
    '<option value="glyphicon glyphicon-text-height">Text Height</option>'+
    '<option value="glyphicon glyphicon-text-width">Text Width</option>'+
    '<option value="glyphicon glyphicon-th">Th</option>'+
    '<option value="glyphicon glyphicon-th-large">Th Large</option>'+
    '<option value="glyphicon glyphicon-th-list">Th List</option>'+
    '<option value="glyphicon glyphicon-thumbs-down">Thumbs Down</option>'+
    '<option value="glyphicon glyphicon-thumbs-up">Thumbs Up</option>'+
    '<option value="glyphicon glyphicon-time">Time</option>'+
    '<option value="glyphicon glyphicon-tint">Tint</option>'+
    '<option value="glyphicon glyphicon-tower">Tower</option>'+
    '<option value="glyphicon glyphicon-transfer">Transfer</option>'+
    '<option value="glyphicon glyphicon-trash">Trash</option>'+
    '<option value="glyphicon glyphicon-tree-conifer">Tree Conifer</option>'+
    '<option value="glyphicon glyphicon-tree-deciduous">Tree Deciduous</option>'+
    '<option value="glyphicon glyphicon-unchecked">Unchecked</option>'+
    '<option value="glyphicon glyphicon-upload">Upload</option>'+
    '<option value="glyphicon glyphicon-usd">Usd</option>'+
    '<option value="glyphicon glyphicon-user">User</option>'+
    '<option value="glyphicon glyphicon-volume-down">Volume Down</option>'+
    '<option value="glyphicon glyphicon-volume-off">Volume Off</option>'+
    '<option value="glyphicon glyphicon-volume-up">Volume Up</option>'+
    '<option value="glyphicon glyphicon-warning-sign">Warning Sign</option>'+
    '<option value="glyphicon glyphicon-wrench">Wrench</option>'+
    '<option value="glyphicon glyphicon-zoom-in">Zoom In</option>'+
    '<option value="glyphicon glyphicon-zoom-out">Zoom Out</option>';
};

RedNaoIconSelector.prototype.InitializeDialog=function()
{
    this.$Dialog=rnJQuery(
        '<div class="modal fade"  tabindex="-1">'+
            '<div class="modal-dialog">'+
            '<div class="modal-content">'+
            '<div class="modal-header">'+
            '<h4 style="display: inline" class="modal-title">Select one icon from the list</h4>'+
            '</div>'+
            '<div class="modal-body">'+
            '<select id="rnIconSelect" style="display: block;margin: 0 auto;">'+
            '<option value="">None</option>'+
            this.GetIconOptions()+
            '</select>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Cancel</button>'+
            '<button type="button" class="btn btn-success rnBtnAddLeft"><span class="glyphicon glyphicon-hand-left"></span>Add to left</button>'+
            '<button type="button" class="btn btn-success rnBtnAddRight">Add to right <span class="glyphicon glyphicon-hand-right"></span></button>'+
            '<button type="button" class="btn btn-success rnBtnAdd"><span class="glyphicon glyphicon-plus"></span>Add</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>');



    var $container=rnJQuery('<div class="bootstrap-wrapper"></div>');
    $container.append(this.$Dialog);
    rnJQuery('body').append($container);
    var formattingFunction=function(state)
    {
        return '<span style="display: inline;margin-right: 5px;" class="'+state.id+'"></span><span>'+state.text+'</span>'
    };
    this.$Select=rnJQuery('#rnIconSelect').select2({
        width:'300px',
        formatResult:formattingFunction,
        formatSelection:formattingFunction
    });
    var self=this;
    rnJQuery('.select2-results').addClass('bootstrap-wrapper');
    rnJQuery('.rnBtnAddLeft').click(function(){self.FireAddIconCallBack('Left')});
    rnJQuery('.rnBtnAddRight').click(function(){self.FireAddIconCallBack('Right')});
    rnJQuery('.rnBtnAdd').click(function(){self.FireAddIconCallBack('Add')});
};

RedNaoIconSelector.prototype.FireAddIconCallBack=function(orientation)
{
    this.CallBack(this.$Select.val(),orientation);
    this.$Dialog.modal('hide');
};


var RedNaoIconSelectorVar=new RedNaoIconSelector();



/************************************************************************************* Icon Property ***************************************************************************************************/


function IconProperty(formelement,propertiesObject,propertyName,propertyTitle,additionalInformation)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,propertyName,propertyTitle,additionalInformation);
}

IconProperty.prototype=Object.create(ElementPropertiesBase.prototype);


IconProperty.prototype.GenerateHtml=function()
{

    var value=this.GetPropertyCurrentValue().ClassName;
    var newProperty=rnJQuery( '<td style="text-align: right"><label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label></td>\
            <td style="text-align: left"><span class="'+RedNaoEscapeHtml(value)+'"></span><button style="margin-left: 2px">Edit</button></td>');

    var self=this;
    newProperty.find('button').click(function(e)
    {
        e.preventDefault();
        RedNaoIconSelectorVar.Show( 'add',function(itemClass,orientation){
            self.PropertiesObject[self.PropertyName]={
                ClassName:itemClass,
                Orientation:orientation
            };
            self.RefreshElement();
            newProperty.find('span').attr('class',itemClass);
        });
    });

    return newProperty;
};


/************************************************************************************* Custom CSS Property ***************************************************************************************************/


function CustomCSSProperty(formelement,propertiesObject)
{
    ElementPropertiesBase.call(this,formelement,propertiesObject,"CustomCSS","Custom CSS",{ManipulatorType:'basic'});
}

CustomCSSProperty.prototype=Object.create(ElementPropertiesBase.prototype);

CustomCSSProperty.prototype.GenerateHtml=function()
{
    var tdStyle="";
    var input='<input style="width: 206px;" class="rednao-input-large" data-type="input" type="text" name="name" id="'+this.PropertyId+'" value="'+RedNaoEscapeHtml(this.GetPropertyCurrentValue())+'" placeholder="None"/><span style="margin-left: 2px;cursor:hand;cursor:pointer;" data-toggle="tooltip" data-placement="right" title="Add all the custom styles separated by space, e.g. button blue" class="glyphicon glyphicon-question-sign"></span>';

    var newProperty=rnJQuery( '<td style="text-align: right;'+tdStyle+'"><label class="rednao-properties-control-label"> '+this.PropertyTitle+' </label></td>'+
    '<td  style="text-align: left">'+input+'</td>');
    newProperty.find('span').tooltip();
    var self=this;
    newProperty.keyup(function(){
        self.Manipulator.SetValue(self.PropertiesObject,self.PropertyName, (rnJQuery("#"+self.PropertyId).val()),self.AdditionalInformation);
        self.RefreshElement();

    });
    return newProperty;
};

CustomCSSProperty.prototype.RefreshElement=function()
{
    var previousClasses=this.FormElement.JQueryElement.attr('class');
    var newClasses=this.FormElement.GetElementClasses();
    if(previousClasses.indexOf('SmartFormsElementSelected')>=0)
        newClasses+=' SmartFormsElementSelected';
    this.FormElement.JQueryElement.attr('class',newClasses);

};
