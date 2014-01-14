function RedNaoFormulaWindow()
{
    rnJQuery( "#redNaoFormulaAccordion" ).accordion();
    var self=this;
    this.Dialog=rnJQuery("#redNaoFormulaComponent").dialog(
        {   width:"714",
            height:"368",
            modal:true,
            autoOpen:false,
            create: function(event, ui){
                rnJQuery('.ui-dialog').wrap('<div class="smartFormsSlider" />');
            },
            open: function(event, ui){
                rnJQuery('.ui-widget-overlay').wrap('<div class="smartFormsSlider" />');

            },
            beforeClose:function(){
                var formula=rnJQuery('#redNaoFormulaTextArea').val();
                if(formula=="")
                    delete self.SelectedFormElement.Options.Formulas[self.PropertyName];
                else{
                    var data={};
                    data.Value=formula;
                    self.GetCompiledData(data,formula);
                    self.SelectedFormElement.Options.Formulas[self.PropertyName]=data;

                    if(data.FieldsUsed.length>3&&!RedNaoLicensingManagerVar.LicenseIsValid('Sorry, in this version you can add up to three fields in a formula'))
                        return false;
                }



                return true;

            }


        });


}

RedNaoFormulaWindow.prototype.GetCompiledData=function(data,formula)
{
    var myArray = formula.match(/field ([^\]]+)/g);
    var compiledFormula='';
    var fieldsUsed=[];
    for(var i=0;i<myArray.length;i++)
    {
        var field=myArray[i].replace(' ','').replace('field','');
        fieldsUsed.push(field);
        field=this.GetValuePropertiesFromField(field);
        formula=formula.replace('['+myArray[i]+']',field);
    }

    compiledFormula+=formula;
    data.RefreshFormData=(typeof this.AdditionalInformation.RefreshFormData=='undefined'?'n':'y');
    data.CompiledFormula=compiledFormula;
    data.FieldsUsed=fieldsUsed;
    data.PropertyName=this.PropertyName;
    data.AdditionalInformation=this.AdditionalInformation;

}

RedNaoFormulaWindow.prototype.GetValuePropertiesFromField=function(field)
{
    for(var i=0;i<this.FormElements.length;i++)
    {
        if(this.FormElements[i].Id==field)
        {
            return this.FormElements[i].GetValuePath();
        }
    }

    return '';
}

RedNaoFormulaWindow.prototype.OpenFormulaEditor=function(redNaoFormElements,selectedFormElement,propertyName,additionalInformation)
{
    var text=selectedFormElement.Options.Formulas[propertyName];
    if(typeof text=='undefined')
        text="";
    else
        text=text.Value;
    rnJQuery('#redNaoFormulaTextArea').val(text);

    this.FormElements=redNaoFormElements;
    this.SelectedFormElement=selectedFormElement;
    this.AdditionalInformation=additionalInformation;
    this.PropertyName=propertyName;
    this.Dialog.dialog('open');

    var formList=rnJQuery('#redNaoFormulaFormFields');
    formList.empty();
    for(var i=0;i<redNaoFormElements.length;i++)
    {
        if(redNaoFormElements[i].StoresInformation())
        {
            var jQueryElement='<li><button onclick="RedNaoFormulaWindowVar.AddFieldToFormula(\''+redNaoFormElements[i].Options.Id+'\');">'+redNaoFormElements[i].Options.Label+'</button></li>';
            formList.append(jQueryElement);

        }
    }
}

RedNaoFormulaWindow.prototype.Validate=function()
{
    var formula= rnJQuery('#redNaoFormulaTextArea').val();
    var myArray = formula.match(/field ([^\]]+)/g);

    for(var i=0;i<myArray.length;i++)
        formula=formula.replace('['+myArray[i]+']','1');
    try{
        var a=eval(formula);
        alert('Formula validated successfully');
    }catch(exception)
    {
        alert('An error ocurred \n'+exception);
    }

}

RedNaoFormulaWindow.prototype.AddFieldToFormula=function(id)
{
    rnJQuery('#redNaoFormulaTextArea').insertAtCaret("[field "+id.trim()+"]");

}



RedNaoFormulaWindow.prototype.CloseFormulaEditor=function(redNaoFormElements)
{
    this.Dialog.dialog('close');
}



rnJQuery.fn.extend({
    insertAtCaret: function(myValue){
        return this.each(function(i) {
            if (document.selection) {
                //For browsers like Internet Explorer
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            }
            else if (this.selectionStart || this.selectionStart == '0') {
                //For browsers like Firefox and Webkit based
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    }
});


var RedNaoFormulaWindowVar=new RedNaoFormulaWindow();



