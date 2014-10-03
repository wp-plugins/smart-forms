function RedNaoEmailEditor()
{
    rnJQuery( "#redNaoAccordion" ).accordion({ clearStyle: true, autoHeight: false });
    this.SetUpFixedFields();
    var self=this;
    //noinspection JSUnusedLocalSymbols
    this.Dialog=rnJQuery("#redNaoEmailEditor").dialog(
        {   width:"800",
            height:"750",
            modal:true,
            autoOpen:false,
            create: function(event, ui){
                rnJQuery('.ui-dialog').wrap('<div class="smartFormsSlider" />');
            },
            open: function(event, ui){
                rnJQuery('.ui-widget-overlay').wrap('<div class="smartFormsSlider" />');

            },
            beforeClose:function(event,ui)
            {
               return self.UpdateToEmails()&&self.UpdateFromEmail();
            }


        });


}

RedNaoEmailEditor.prototype.SetUpFixedFields=function()
{
    var fixedFieldList=rnJQuery('#redNaoEmailFormFixedFields');
    for(var i=0;i<smartFormsFixedFields.length;i++)
    {
        var button=this.CreateFixedFieldButton(smartFormsFixedFields[i]);
        fixedFieldList.append(button);
    }
   // rnJQuery('#rnEmailCurrentDate').click(function(){RedNaoEmailEditorVar.AddFieldToEmail('{"Op":"CurrentDate", "Format":"m/d/y"}')});

};

RedNaoEmailEditor.prototype.CreateFixedFieldButton=function(buttonProperties)
{
    var self=this;
    var button=rnJQuery('<button>'+buttonProperties.Label+'</button>');
    button.click(function(){self.ExecuteFixedFieldButton(buttonProperties)});
    return button;
};

RedNaoEmailEditor.prototype.ExecuteFixedFieldButton=function(buttonProperties)
{
    var op={};
    op.Op=buttonProperties.Op;
    for(var param in buttonProperties.Parameters)
    {
        op[param]=buttonProperties.Parameters[param];
    }
    RedNaoEmailEditorVar.AddFieldToEmail(JSON.stringify(op));
}

RedNaoEmailEditor.prototype.UpdateFromEmail=function()
{
    var selectedToEmails=rnJQuery('#redNaoFromEmail').select2('val');

    var selectedEmailsString="";
    for(var i=0;i<selectedToEmails.length;i++)
    {
        if(selectedToEmails[i].indexOf("[field")==0)
        {
            if(!RedNaoLicensingManagerVar.LicenseIsValid('Sorry, you can\'t add fields to the "To Email" box in this version, please use only emails '))
            {
                return false;
            }
        }
        selectedEmailsString=selectedToEmails[i];
    }
    this.Emails[0].FromEmail=selectedEmailsString;
    return true;
};



RedNaoEmailEditor.prototype.UpdateToEmails=function()
{
    var selectedToEmails=rnJQuery('#redNaoToEmail').select2('val');

    var selectedEmailsString="";
    for(var i=0;i<selectedToEmails.length;i++)
    {
        if(selectedToEmails[i].indexOf("[field")==0)
        {
            if(!RedNaoLicensingManagerVar.LicenseIsValid('Sorry, you can\'t add fields to the "To Email" box in this version, please use only emails '))
            {
                return false;
            }
        }
        selectedEmailsString+=selectedToEmails[i]+",";
    }
    this.Emails[0].ToEmail=selectedEmailsString;
    return true;
};
RedNaoEmailEditor.prototype.SetupEmailTo=function(emailToOptions,alreadySelectedEmails,jQuerySelect,callBack,multiple)
{
    var selectOptions='<optgroup label="'+smartFormsTranslation.SelectAField+'">';
    selectOptions+=emailToOptions;

    for(var i=0;i<alreadySelectedEmails.length;i++)
    {
        if(alreadySelectedEmails[i]=="")
        {
            alreadySelectedEmails.splice(i,1);
            i--;
            continue;
        }
        if(alreadySelectedEmails.indexOf("[field")!=0)
        {
            selectOptions+='<option value="'+alreadySelectedEmails[i]+'">'+alreadySelectedEmails[i]+'</option>'
        }
    }

    selectOptions+='</optgroup>';

    var self=this;
    var select2Options={
        placeholder: "Type email or field (e.g. example@gmail.com)",
        allowClear: true
    };

    if(!multiple)
        select2Options.maximumSelectionSize;

    jQuerySelect.empty();
    jQuerySelect.append(selectOptions);
    jQuerySelect.select2(
        select2Options
        ).unbind("dropdown-closed")
        .on("dropdown-closed", function(event) {
            callBack(event.val);

        });

    jQuerySelect.select2('val',alreadySelectedEmails);
    rnJQuery('#redNaoEmailEditor .select2-input').on('keyup', function(e) {
        if(e.which==13||e.which == 32)
        {

            var text=rnJQuery(this).val().trim();
            callBack(text);

        }
    });
};

RedNaoEmailEditor.prototype.AddEmailIfValid=function(text,select,multiple)
{
    if(text.trim()=="")
        return;
    if(!multiple&&select.select2('val').length>0)
    {
        alert('You can only have one email in this field');
        return;
    }

    if(sfRedNaoEmail.prototype.EmailIsValid(text))
        this.AddEmail(text,select);
    else
        alert('Please type a valid email');
};

RedNaoEmailEditor.prototype.AddEmail=function(email,select)
{
    select.append(rnJQuery('<option>', {value:email, text: email}));
    var selectedValues=select.select2('val');
    selectedValues.push(email);
    select.select2('val',selectedValues);

};

RedNaoEmailEditor.prototype.OpenEmailEditor=function(redNaoFormElements,emails)
{
    this.Emails=emails;
    this.Dialog.dialog('open');
    var formList=rnJQuery('#redNaoEmailFormFields');
    formList.empty();
    var emailToOptions="";
    for(var i=0;i<redNaoFormElements.length;i++)
    {
        if(redNaoFormElements[i].StoresInformation())
        {
            formList.append('<li><button onclick="RedNaoEmailEditorVar.AddFieldToEmail(\''+redNaoFormElements[i].Options.Id+'\');">'+redNaoFormElements[i].Options.Label+'</button></li>');
            if(redNaoFormElements[i].Options.ClassName=="rednaoemail")
                emailToOptions+='<option value="[field '+redNaoFormElements[i].Options.Id+']">'+redNaoFormElements[i].Options.Label+'</option>';
        }
    }

    var self=this;
    var selectedToEmails=emails[0].ToEmail;
    this.SetupEmailTo(emailToOptions,RedNaoGetValueOrEmpty(selectedToEmails).split(','),rnJQuery('#redNaoToEmail'),function(text){self.AddEmailIfValid(text,rnJQuery('#redNaoToEmail'),true);},true);
    this.SetupEmailTo(emailToOptions,RedNaoGetValueOrEmpty(emails[0].FromEmail).split(','),rnJQuery('#redNaoFromEmail'),function(text){self.AddEmailIfValid(text,rnJQuery('#redNaoFromEmail'),false);},false);
};


RedNaoEmailEditor.prototype.CloseEmailEditor=function()
{
    this.Dialog.dialog('close');
};

RedNaoEmailEditor.prototype.AddFieldToEmail=function(id)
{
    tinymce.activeEditor.execCommand('mceInsertContent', false, "[field "+id.trim()+"]");
};



var RedNaoEmailEditorVar=null;
rnJQuery(function(){
    RedNaoEmailEditorVar=new RedNaoEmailEditor();
});