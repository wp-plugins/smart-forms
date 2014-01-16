function SmartFormsAddNew()
{
    if(typeof smartFormId!='undefined')
        this.id=smartFormId;
    else
        this.id=0;

    var options=null;
    this.EmailTextLoaded=false;
    this.EmailText="";
    this.RestoreDefault();
    if(typeof smartFormsOptions!='undefined')
    {
        options=smartFormsOptions;
        rnJQuery('#smartFormName').val(smartFormsOptions.Name);
        rnJQuery('#smartFormDescription').val(smartFormsOptions.Description);

        if(RedNaoGetValueOrNull(smartFormsOptions.SendNotificationEmail)=='y')
            rnJQuery('#smartFormsSendNotificationEmail').attr('checked','checked')

        if(RedNaoGetValueOrNull(smartFormsOptions.Emails))
        {
            if(smartFormsOptions.Emails.length>0)
            {
                rnJQuery('#redNaoFromEmail').val(smartFormsOptions.Emails[0].FromEmail);
                rnJQuery('#redNaoFromName').val(smartFormsOptions.Emails[0].FromName);
                rnJQuery('#redNaoToEmail').val(smartFormsOptions.Emails[0].ToEmail);
                rnJQuery('#redNaoEmailSubject').val(smartFormsOptions.Emails[0].EmailSubject);
                this.EmailText=smartFormsOptions.Emails[0].EmailText;
            }
        }
    }

    if(typeof smartFormClientOptions!='undefined')
    {
        rnJQuery('#smartFormsJavascriptText').val(smartFormClientOptions.JavascriptCode);
        rnJQuery('#redirectToInput').val(RedNaoGetValueOrEmpty(smartFormClientOptions.redirect_to));
        rnJQuery('#alertMessageInput').val(RedNaoGetValueOrEmpty(smartFormClientOptions.alert_message));
        if(RedNaoGetValueOrEmpty(smartFormClientOptions.redirect_to_cb)=='y')
            rnJQuery('#redNaoRedirectToCB').attr('checked','checked');
        if(RedNaoGetValueOrEmpty(smartFormClientOptions.alert_message_cb)=='y')
            rnJQuery('#redNaoAlertMessageCB').attr('checked','checked');

    }


    var formElements=[];
    if(typeof smartFormsElementOptions!='undefined')
        formElements=smartFormsElementOptions;


    this.FormBuilder= new RedNaoFormBuilder(options,formElements);

    var self=this;
    rnJQuery('#smartFormsBasic').click(self.SmartFormsTagClicked);
    rnJQuery('#smartFormsSaveButton').click(function(e){self.SaveForm(e);});

    rnJQuery('#smartFormsSendNotificationEmail').change(function(){self.NotifyToChanged()});
    rnJQuery('#smartFormsSendNotificationEmail').change();
    rnJQuery('#redNaoEditEmailButton').click(function(e){e.preventDefault();self.EditEmailClicked();});
    rnJQuery('#redNaoRedirectToCB').change(function(){self.DisableOnEmpty(rnJQuery(this),rnJQuery('#redirectToInput'))});
    rnJQuery('#redNaoAlertMessageCB').change(function(){self.DisableOnEmpty(rnJQuery(this),rnJQuery('#alertMessageInput'))});

    rnJQuery('#redNaoRedirectToCB').change();
    rnJQuery('#redNaoAlertMessageCB').change();


    var self=this;
    RedNaoEventManager.Subscribe('FormulaButtonClicked',function(data){self.OpenFormulaBuilder(data.FormElement,data.PropertyName,data.AdditionalInformation)});


}
SmartFormsAddNew.prototype.DisableOnEmpty=function(checkbox,elementToDisable)
{
    if(checkbox.is(':checked'))
    {
        elementToDisable.removeAttr('disabled');
        elementToDisable.removeClass('redNaoDisabled');
    }else
    {
        elementToDisable.attr('disabled','disabled');
        elementToDisable.addClass('redNaoDisabled');
    }
}


SmartFormsAddNew.prototype.OpenFormulaBuilder=function(formElement,propertyName,additionalInformation)
{
    RedNaoFormulaWindowVar.OpenFormulaEditor(this.FormBuilder.RedNaoFormElements,formElement,propertyName,additionalInformation);
}

SmartFormsAddNew.prototype.EditEmailClicked=function()
{
    if(!this.EmailTextLoaded)
    {
        this.EmailTextLoaded=true;
        tinymce.get('redNaoTinyMCEEditor').setContent(this.EmailText);
    }
    RedNaoEmailEditorVar.OpenEmailEditor(this.FormBuilder.RedNaoFormElements);
}

SmartFormsAddNew.prototype.NotifyToChanged=function()
{
    if(rnJQuery('#smartFormsSendNotificationEmail').is(':checked'))
        rnJQuery('#redNaoEditEmailButton').removeAttr('disabled');
    else
        rnJQuery('#redNaoEditEmailButton').attr('disabled','disabled');
}

SmartFormsAddNew.prototype.SmartFormsTagClicked=function(e)
{
   /* var src=rnJQuery(this).find('img').attr("src");
    if(src==smartForms_arrow_closed)
        this.OpenTag(this);
    else
        this.CloseTag(this);*/
}

SmartFormsAddNew.prototype.FillEmailData=function(formOptions)
{
    formOptions.FromEmail=rnJQuery('#redNaoFromEmail').val();
    formOptions.FromName=rnJQuery('#redNaoFromName').val();
    formOptions.ToEmail= rnJQuery('#redNaoToEmail').val();
    formOptions.EmailSubject=rnJQuery('#redNaoEmailSubject').val();
    if(this.EmailTextLoaded)
        formOptions.EmailText=tinymce.get('redNaoTinyMCEEditor').getContent();
    else
        formOptions.EmailText=this.EmailText;
}

SmartFormsAddNew.prototype.SaveForm=function(e)
{
    e.preventDefault();
    e.stopPropagation();


    var formOptions={};
    formOptions.Name=rnJQuery('#smartFormName').val();
    formOptions.Description=rnJQuery('#smartFormDescription').val();
    formOptions.NotifyTo=rnJQuery('#smartFormsSubmissionNotifyTo').val();
    formOptions.LatestId=FormElementBase.IdCounter;
    formOptions.SendNotificationEmail=(rnJQuery('#smartFormsSendNotificationEmail').is(':checked')?'y':'n');
    formOptions.Emails=[{}];
    this.FillEmailData(formOptions.Emails[0]);

    var usesCaptcha='n';
    var formElements=this.FormBuilder.RedNaoFormElements;
    for(var i=0;i<formElements.length;i++)
    {
        if(formElements[i].Id=="captcha")
        {
            usesCaptcha='y';
            break;
        }
    }
    formOptions.UsesCaptcha=usesCaptcha;

    var data={};
    data.id=this.id;
    data.action="rednao_smart_forms_save";
    data.form_options=JSON.stringify(formOptions);
    data.element_options=JSON.stringify(this.FormBuilder.GetFormInformation());



    data.client_form_options=JSON.stringify(this.GetClientFormOptions(usesCaptcha));
    var self=this;
    rnJQuery('#smartFormsSaveButton').text('Saving...');
    rnJQuery('#smartFormsSaveButton').attr('disabled','disabled');
    rnJQuery.post(ajaxurl,data,function(result){
        rnJQuery('#smartFormsSaveButton').text('Save');
        rnJQuery('#smartFormsSaveButton').removeAttr('disabled');
        var result=rnJQuery.parseJSON(result);
        alert(result.Message);
        if(result.Message=="saved")
            self.id=result.FormId;
    });
}

SmartFormsAddNew.prototype.GetClientFormOptions=function(usesCaptcha)
{
    return {
        JavascriptCode:this.GetJavascriptCode(),
        UsesCaptcha:usesCaptcha,
        alert_message:rnJQuery('#alertMessageInput').val(),
        alert_message_cb:(rnJQuery('#redNaoAlertMessageCB').is(':checked')?'y':'n'),
        redirect_to:rnJQuery('#redirectToInput').val(),
        redirect_to_cb:(rnJQuery('#redNaoRedirectToCB').is(':checked')?'y':'n')
    };
}

SmartFormsAddNew.prototype.CloseTag=function()
{
    rnJQuery(tag).find('img').attr("src",smartForms_arrow_closed)


    var detailName=rnJQuery(tag).attr('id')+'Detail';
    rnJQuery('#'+detailName).slideUp(200);
}

SmartFormsAddNew.prototype.SendTestEmail=function()
{
    var emailData={};
    emailData.action="rednao_smart_form_send_test_email";
    emailData.element_options=JSON.stringify(this.FormBuilder.GetFormInformation());
    this.FillEmailData(emailData);

    rnJQuery.post(ajaxurl,emailData,function(result){
        var result=rnJQuery.parseJSON(result);
        alert(result.Message);

    });

}


SmartFormsAddNew.prototype.OpenTag=function()
{
    rnJQuery(tag).find('img').attr("src",smartForms_arrow_open)

    var detailName=rnJQuery(tag).attr('id')+'Detail';
    rnJQuery('#'+detailName).slideDown(200);
}

SmartFormsAddNew.prototype.ActivateTab=function(activationName)
{
    rnJQuery('#smartFormsTopTab a').removeClass("nav-tab-active");
    rnJQuery('#smartFormsGeneralDiv,#smartFormsJavascriptDiv,#smartFormsCSSDiv,#smartFormsAfterSubmitDiv').css('display','none');

    rnJQuery('#'+activationName+'Tab').addClass('nav-tab-active');
    rnJQuery('#'+activationName+'Div').css('display','block');
}

SmartFormsAddNew.prototype.GoToGeneral=function()
{
    this.ActivateTab('smartFormsGeneral');
}

SmartFormsAddNew.prototype.GoToJavascript=function()
{
    this.ActivateTab('smartFormsJavascript');
}

SmartFormsAddNew.prototype.GoToAfterSubmit=function()
{
    this.ActivateTab('smartFormsAfterSubmit');
}


SmartFormsAddNew.prototype.GoToCSS=function()
{
    this.ActivateTab('smartFormsCSS');
}

SmartFormsAddNew.prototype.RestoreDefault=function()
{
    rnJQuery('#smartFormsJavascriptText').val('\
  //AUTO GENERATED CODE, DO NOT DELETE\n\
(function(){var javaObject={\n\n\n\
//YOU CAN PUT YOUR CODE BELLOW\n\n\n\
//jQueryFormReference:A jquery reference of the loaded form\n\
AfterFormLoaded:function(jQueryFormReference){\n\
     //Here you can put code that you want to be executed after the form is loades\n\
},\n\n\n\
//jQueryFormReference:A jquery reference of the loaded form\n\
//formData:An object with the information that is going to be submitted\n\
BeforeFormSubmit:function(formData,jQueryFormReference){\n\
    //Here you can put code that you want to be executed before the form is submitted\n\
}\n\n\n\n\
//MORE AUTO GENERATED CODE, DO NOT DELETE\n\
}; return javaObject;})\
    ');
}

SmartFormsAddNew.prototype.GetJavascriptCode=function()
{
    var javascriptCode= rnJQuery('#smartFormsJavascriptText').val();
    return javascriptCode;
}

SmartFormsAddNew.prototype.Validate=function()
{
    var javascriptCode=this.GetJavascriptCode();
    try{
        var obj=eval(javascriptCode);
        var code=obj();
        if(typeof code.AfterFormLoaded=='undefined')
        {
            throw 'Method AfterFormLoaded was not found';
        }
        code.AfterFormLoaded(rnJQuery('<form></form>'));
        if(typeof code.BeforeFormSubmit=='undefined')
        {
            throw 'Method BeforeFormSubmit was not found';
        }
        code.BeforeFormSubmit({},rnJQuery('<form></form>'));
    }catch(exception)
    {
        alert('An error ocurred\n'+exception);
        return;
    }

    alert('Code tested successfully!!')
}

var SmartFormsAddNewVar=null;
rnJQuery(function(){SmartFormsAddNewVar=new SmartFormsAddNew();})