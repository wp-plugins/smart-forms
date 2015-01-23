var smartFormsIntegrationFormula={};
smartFormsIntegrationFormula.Formulas={};
var smartFormsDesignMode=true;
function SmartFormsAddNew()
{
    if(typeof smartFormId!='undefined')
        this.id=smartFormId;
    else
        this.id=0;

    var options=null;
    this.RestoreDefault();
    this.Emails=[{ToEmail:"",FromEmail:"",Name:"Default",FromName:"",EmailSubject:"",EmailText:""}];
    this.ExtensionData={};
    var splitFormOptions=null;
    if(typeof smartFormsOptions!='undefined')
    {
        options=smartFormsOptions;
        rnJQuery('#smartFormName').val(smartFormsOptions.Name);
        rnJQuery('#smartFormDescription').val(smartFormsOptions.Description);

        if(RedNaoGetValueOrNull(smartFormsOptions.SendNotificationEmail)=='y')
            rnJQuery('#smartFormsSendNotificationEmail').attr('checked','checked');

        if(RedNaoGetValueOrNull(smartFormsOptions.Emails))
        {
            if(smartFormsOptions.Emails.length>0)
            {
                this.Emails=smartFormsOptions.Emails;
                if(this.Emails[0].FromEmail==null)
                    this.Emails[0].FromEmail='';
                this.EmailText=smartFormsOptions.Emails[0].EmailText;
            }
        }

        var property;
        if(typeof smartFormsOptions.Extensions!='undefined')
            for(property in smartFormsOptions.Extensions)
            {
                if(typeof this.ExtensionData[property]=='undefined')
                    this.ExtensionData[property]={};
                this.ExtensionData[property].Server=smartFormsOptions.Extensions[property];
            }
    }

    if(typeof smartFormClientOptions!='undefined')
    {
        rnJQuery('#smartFormsJavascriptText').val(smartFormClientOptions.JavascriptCode);
        if(typeof smartFormClientOptions.CSS!='undefined')
            rnJQuery('#smartFormsCSSText').val(smartFormClientOptions.CSS);
        rnJQuery('#redirectToInput').val(RedNaoGetValueOrEmpty(smartFormClientOptions.redirect_to));
        rnJQuery('#alertMessageInput').val(RedNaoGetValueOrEmpty(smartFormClientOptions.alert_message));
        if(RedNaoGetValueOrEmpty(smartFormClientOptions.redirect_to_cb)=='y')
            rnJQuery('#redNaoRedirectToCB').attr('checked','checked');
        if(RedNaoGetValueOrEmpty(smartFormClientOptions.alert_message_cb)=='y')
            rnJQuery('#redNaoAlertMessageCB').attr('checked','checked');
        if(RedNaoGetValueOrNull(smartFormClientOptions.Formulas)!=null)
            smartFormsIntegrationFormula.Formulas=smartFormClientOptions.Formulas;
        if(RedNaoGetValueOrNull(smartFormClientOptions.InvalidInputMessage)!=null)
            rnJQuery("#smartFormsInvalidFieldMessage").val(smartFormClientOptions.InvalidInputMessage);

        if(typeof smartFormClientOptions.Extensions !="undefined")
            for(property in smartFormClientOptions.Extensions)
            {
                if(typeof this.ExtensionData[property]=='undefined')
                    this.ExtensionData[property]={};
                this.ExtensionData[property].Client=smartFormClientOptions.Extensions[property];
            }
    }


    var formElements=[];
    if(typeof smartFormsElementOptions!='undefined')
        formElements=smartFormsElementOptions;


    this.FormBuilder= new RedNaoFormBuilder(options,formElements,(typeof smartFormClientOptions=='undefined'?{}:smartFormClientOptions) );

    var self=this;
    rnJQuery('#smartFormsBasic').click(self.SmartFormsTagClicked);
    rnJQuery('#smartFormsSaveButton').click(function(e){self.SaveForm(e);});

    rnJQuery('#smartFormsSendNotificationEmail').change(function(){self.NotifyToChanged()});
    rnJQuery('#smartFormsSendNotificationEmail').change();
    rnJQuery('#redNaoEditEmailButton').click(function(e){e.preventDefault();self.EditEmailClicked();});
    rnJQuery('#redNaoRedirectToCB').change(function(){
        self.DisableOnEmpty(rnJQuery(this),rnJQuery('#redirectToInput'));
        self.DisableOnEmpty(rnJQuery(this),rnJQuery('#smartFormsAddParameter'));
    });
    rnJQuery('#redNaoAlertMessageCB').change(function(){self.DisableOnEmpty(rnJQuery(this),rnJQuery('#alertMessageInput'))});
    rnJQuery('#smartFormsAddParameter').click(function(e){e.preventDefault();self.OpenParameterPicker();});
    rnJQuery('#redNaoRedirectToCB').change();
    rnJQuery('#redNaoAlertMessageCB').change();
    this.Subscribers=ISmartFormsAddNew.prototype.Subscribers;
    RedNaoEventManager.Subscribe('FormulaButtonClicked',function(data){self.OpenFormulaBuilder(data.FormElement,data.PropertyName,data.AdditionalInformation,data.Image)});

    var i;
    for(i=0;i<self.Subscribers.length;i++)
    {
        var saveDataId= self.Subscribers[i].GetSaveDataId();
        if(saveDataId!=null)
        {
            if(typeof self.ExtensionData[saveDataId]!='undefined')
                self.Subscribers[i].LoadSavedData(self.ExtensionData[saveDataId]);
        }
    }

    for(i=0;i<self.Subscribers.length;i++)
    {
        self.Subscribers[i].OnLoad();
    }

}




SmartFormsAddNew.prototype.CreateMultiStepForm=function()
{
    if(this.MultiStepsDesigner==null)
        this.MultiStepsDesigner=new SfMultipleStepsBase();
};

SmartFormsAddNew.prototype.OpenParameterPicker=function()
{
    var self=this;
    this.ShowFieldPicker('Select the fields you want to send as parameters to the redirect page',this.FormBuilder.RedNaoFormElements.slice(0),function(success,selectedFields){
                                                                                                                                                    if(success)
                                                                                                                                                         self.AddFieldsToRedirectUrl(selectedFields);});
};


SmartFormsAddNew.prototype.AddFieldsToRedirectUrl=function(selectedFields)
{
    var parameterString="";
    for(var i=0;i<selectedFields.length;i++)
    {
        parameterString+=selectedFields[i].Id+'={'+selectedFields[i].Id+'}'+'&';
    }
    parameterString=parameterString.substring(0,parameterString.length-1);

    var currentRedirectUrl=rnJQuery.trim(rnJQuery('#redirectToInput').val());
    if(currentRedirectUrl.indexOf('?')>=0)
        currentRedirectUrl+='&';
    else
    {
        if(currentRedirectUrl.length==0||currentRedirectUrl[currentRedirectUrl.length-1]!='/')
            currentRedirectUrl+='/';
        currentRedirectUrl+='?';
    }
    currentRedirectUrl+=parameterString;

    rnJQuery('#redirectToInput').val(currentRedirectUrl);



};

SmartFormsAddNew.prototype.ShowFieldPicker=function(popUpTitle,formElements,callBack)
{
    var $dialog=rnJQuery(
        '<div class="modal fade"  tabindex="-1">'+
            '<div class="modal-dialog">'+
            '<div class="modal-content">'+
            '<div class="modal-header">'+
            '<h4 style="display: inline" class="modal-title">'+popUpTitle+'</h4>'+
            '</div>'+
            '<div class="modal-body">'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Cancel</button>'+
            '<button type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok"></span>Apply</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>');

    var container=rnJQuery('<div class="bootstrap-wrapper"></div>');
    container.append($dialog);
    rnJQuery('body').append(container);
    $dialog.modal('show');


    var $body=rnJQuery('<div class="bootstrap-wrapper"><form role="form"></form></div>');
    var $form=$body.find("form");

    formElements.splice(0,0,{Id:'_formid',Options:{Label:'Form Id'},StoresInformation:function(){return true;}});
    for(var i=0;i<formElements.length;i++)
    {
        if(formElements[i].StoresInformation())
        {
            $form.append('<div class="checkbox" style="font-size: 15px;margin-bottom: 10px;">'+
                '<label>'+
                '<input type="checkbox" value="'+RedNaoEscapeHtml(formElements[i].Id)+'"> '+RedNaoEscapeHtml(formElements[i].Options.Label)+
                '</label>'+
                '</div>');
        }
    }
    $dialog.find('.modal-body').append($form);
    $dialog.find(".btn-success").click(function()
    {
        $dialog.modal('hide');
        var $checkedBoxes=$form.find('input[type=checkbox]:checked');
        var selectedFields=[];
        for(var i=0;i<$checkedBoxes.length;i++)
        {
            for(var t=0;t<formElements.length;t++)
                if(formElements[t].Id==$checkedBoxes[i].value)
                {
                    selectedFields.push(formElements[t]);
                    break;
                }
        }
        callBack(true,selectedFields);
    });

};

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
};


SmartFormsAddNew.prototype.OpenFormulaBuilder=function(formElement,propertyName,additionalInformation,image)
{
    RedNaoFormulaWindowVar.OpenFormulaEditor(this.FormBuilder.RedNaoFormElements,formElement.Options,propertyName,additionalInformation,image);
};

SmartFormsAddNew.prototype.EditEmailClicked=function()
{
    RedNaoEmailEditorVar.OpenEmailEditor(this.FormBuilder.RedNaoFormElements,this.Emails);
};

SmartFormsAddNew.prototype.NotifyToChanged=function()
{
    if(rnJQuery('#smartFormsSendNotificationEmail').is(':checked'))
        rnJQuery('#redNaoEditEmailButton').removeAttr('disabled');
    else
        rnJQuery('#redNaoEditEmailButton').attr('disabled','disabled');
};



SmartFormsAddNew.prototype.DonationConfigurationIsValid=function()
{
    var formElements=this.FormBuilder.RedNaoFormElements;
    for(var i=0;i<formElements.length;i++)
    {
        if(formElements[i].Options.ClassName=="rednaodonationbutton")
        {
            if(rnJQuery('#redNaoCampaign').val()=='')
            {
                alert('If you are going to use a donation button, please select a campaign before saving');
                this.GoToSmartDonations();
                return false;
            }

            if(rnJQuery('#smartDonationsEmail').val()=='')
            {
                alert('Please select a paypal donation email before saving');
                this.GoToSmartDonations();
                return false;
            }

            if(typeof smartFormsIntegrationFormula.Formulas.DonationFormula=='undefined'||smartFormsIntegrationFormula.Formulas.DonationFormula=='')
            {
                alert('Please setup a donation formula before saving');
                this.GoToSmartDonations();
                return false;
            }
        }

    }

    return true;
};

SmartFormsAddNew.prototype.FormOptionsAreValid = function (formOptions) {
    rnJQuery("#redNaoEditEmailButton").removeClass('redNaoInvalidInput');
    if(formOptions.SendNotificationEmail=='y')
    {
        if(formOptions.Emails[0].EmailText.trim()=="")
        {
            rnJQuery("#redNaoEditEmailButton").addClass('redNaoInvalidInput');
            alert('Please configure the email that is going to sent before saving.');
            this.GoToAfterSubmit();
            return false;
        }
    }

    return true;
};
SmartFormsAddNew.prototype.SaveForm=function(e)
{
    e.preventDefault();
    e.stopPropagation();

    var formOptions=this.GetFormOptions();
    if(formOptions==null)
        return;
    var clientFormOptions=this.GetClientFormOptions(formOptions.UsesCaptcha);
    if(clientFormOptions==null)
        return;
    var elementsOptions=this.FormBuilder.GetFormInformation();
    if(!this.DonationConfigurationIsValid())
        return;

    if(!this.FormOptionsAreValid(formOptions))
        return;

    this.ExecuteSaveRequest(formOptions,clientFormOptions,elementsOptions);

};

SmartFormsAddNew.prototype.ExecuteSaveRequest=function(formOptions,clientFormOptions,elementOptions,splitFormOptions)
{
    var data={};
    data.form_options=JSON.stringify(formOptions);
    data.element_options=JSON.stringify(elementOptions);
    data.donation_email=rnJQuery('#smartDonationsEmail').val();
    data.client_form_options=JSON.stringify(clientFormOptions);
    data.extensions={};

    var self=this;
    rnJQuery('#smartFormsSaveButton').RNWait('start');
    data.id=this.id;
    data.action="rednao_smart_forms_save";
    rnJQuery.post(ajaxurl,data,function(result){
        rnJQuery('#smartFormsSaveButton').RNWait('stop');
        result=rnJQuery.parseJSON(result);
        alert(result.Message);
        if(result.Message=="saved")
            self.id=result.FormId;
    });
};

SmartFormsAddNew.prototype.GetFormOptions=function()
{
    var formOptions={};
    formOptions.Name=rnJQuery('#smartFormName').val();
    formOptions.Description=rnJQuery('#smartFormDescription').val();
    formOptions.NotifyTo=rnJQuery('#smartFormsSubmissionNotifyTo').val();
    formOptions.LatestId=sfFormElementBase.IdCounter;
    formOptions.SendNotificationEmail=(rnJQuery('#smartFormsSendNotificationEmail').is(':checked')?'y':'n');
    formOptions.Emails=this.Emails;


    var usesCaptcha='n';
    var formElements=this.FormBuilder.RedNaoFormElements;
    var i;
    for(i=0;i<formElements.length;i++)
    {
        if(formElements[i].Id=="captcha")
        {
            usesCaptcha='y';
            break;
        }
    }
    formOptions.UsesCaptcha=usesCaptcha;
    formOptions.RedNaoSendThankYouEmail=(rnJQuery('#redNaoSendThankYouEmail').is(':checked')?'y':'n');

    formOptions.Extensions={};
    for(i=0;i<this.Subscribers.length;i++)
    {
        if(this.Subscribers[i].GetSaveDataId()!=null)
        {
            try {
                var dataToSave=this.Subscribers[i].GetServerDataToSave();
                if(dataToSave!=null)
                    formOptions.Extensions[this.Subscribers[i].GetSaveDataId()]=dataToSave;
            }catch(Exception)
            {
                return null;
            }

        }
    }
    return formOptions;
};

SmartFormsAddNew.prototype.GetClientFormOptions=function(usesCaptcha)
{
    var clientOptions= {
        JavascriptCode:this.GetJavascriptCode(),
        CSS:rnJQuery('#smartFormsCSSText').val(),
        Conditions:this.FormBuilder.Conditions,
        UsesCaptcha:usesCaptcha,
        alert_message:rnJQuery('#alertMessageInput').val(),
        alert_message_cb:(rnJQuery('#redNaoAlertMessageCB').is(':checked')?'y':'n'),
        redirect_to:rnJQuery('#redirectToInput').val(),
        redirect_to_cb:(rnJQuery('#redNaoRedirectToCB').is(':checked')?'y':'n'),
        Campaign:rnJQuery('#redNaoCampaign').val(),
        PayPalEmail:rnJQuery('#smartDonationsEmail').val(),
        PayPalDescription:rnJQuery('#smartDonationsDescription').val(),
        PayPalCurrency:rnJQuery('#smartDonationsCurrencyDropDown').val(),
        Formulas:smartFormsIntegrationFormula.Formulas,
        InvalidInputMessage:rnJQuery("#smartFormsInvalidFieldMessage").val(),
        FormType:this.FormBuilder.FormType,
        SplitSteps:this.FormBuilder.GetMultipleStepsOptions()
    };

    clientOptions.Extensions={};
    for(var i=0;i<this.Subscribers.length;i++)
    {
        if(this.Subscribers[i].GetSaveDataId()!=null)
        {
            try{
                var dataToSave=this.Subscribers[i].GetClientDataToSave();
                if(dataToSave!=null)
                    clientOptions.Extensions[this.Subscribers[i].GetSaveDataId()]=dataToSave;
            }catch(Exception)
            {
                return null;
            }

        }
    }

    return clientOptions;


};

SmartFormsAddNew.prototype.SendTestEmail=function()
{
    RedNaoEmailEditorVar.UpdateToEmails();
    var emailData={};
    emailData.action="rednao_smart_form_send_test_email";
    emailData.element_options=JSON.stringify(this.FormBuilder.GetFormInformation());
    this.FillEmailData(emailData);

    //noinspection JSUnresolvedVariable
    rnJQuery.post(ajaxurl,emailData,function(result){
        result=rnJQuery.parseJSON(result);
        alert(result.Message);

    });

};

SmartFormsAddNew.prototype.ActivateTab=function(activationName)
{
    rnJQuery('#smartFormsTopTab a').removeClass("nav-tab-active");
    rnJQuery('#smartFormsGeneralDiv,#smartFormsJavascriptDiv,#smartFormsCSSDiv,#smartFormsAfterSubmitDiv,#smartDonationsDiv,.smartFormsCustomTab').css('display','none');

    rnJQuery('#'+activationName+'Tab').addClass('nav-tab-active');
    rnJQuery('#'+activationName+'Div').css('display','block');
};

SmartFormsAddNew.prototype.GoToGeneral=function()
{
    this.ActivateTab('smartFormsGeneral');
};

SmartFormsAddNew.prototype.GoToJavascript=function()
{
    this.ActivateTab('smartFormsJavascript');
};

SmartFormsAddNew.prototype.GoToAfterSubmit=function()
{
    this.ActivateTab('smartFormsAfterSubmit');
};

SmartFormsAddNew.prototype.GoToCSS=function()
{
    this.ActivateTab('smartFormsCSS');
};

SmartFormsAddNew.prototype.RestoreDefault=function()
{
    rnJQuery('#smartFormsJavascriptText').val('\
  //AUTO GENERATED CODE, DO NOT DELETE\n\
(function(){var javaObject={\n\n\n\
//YOU CAN PUT YOUR CODE BELLOW\n\n\n\
//jQueryFormReference:A jquery reference of the loaded form\n\
AfterFormLoaded:function(jQueryFormReference){\n\
     //Here you can put code that you want to be executed after the form is loaded\n\
},\n\n\n\
//jQueryFormReference:A jquery reference of the loaded form\n\
//formData:An object with the information that is going to be submitted\n\
BeforeFormSubmit:function(formData,jQueryFormReference){\n\
    //Here you can put code that you want to be executed before the form is submitted\n\
}\n\n\n\n\
//MORE AUTO GENERATED CODE, DO NOT DELETE\n\
}; return javaObject;})\
    ');
};

SmartFormsAddNew.prototype.GetJavascriptCode=function()
{
    return rnJQuery('#smartFormsJavascriptText').val();
};


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
        alert('An error occurred\n'+exception);
        return;
    }

    alert('Code tested successfully!!')
};

//used in an string
//noinspection JSUnusedGlobalSymbols
SmartFormsAddNew.prototype.GoToCustomTab=function(tabIndex)
{
    this.ActivateTab("smartFormsCustom"+tabIndex.toString());
};

var SmartFormsAddNewVar=null;
rnJQuery(function(){SmartFormsAddNewVar=new SmartFormsAddNew();});

