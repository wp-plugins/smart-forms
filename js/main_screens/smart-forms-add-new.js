function SmartFormsAddNew()
{
    if(typeof smartFormId!='undefined')
        this.id=smartFormId;
    else
        this.id=0;

    var options=null;
    this.EmailTextLoaded=false;
    this.EmailText="";
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
    var src=rnJQuery(this).find('img').attr("src");
    if(src==smartForms_arrow_closed)
        this.OpenTag(this);
    else
        this.CloseTag(this);
}

SmartFormsAddNew.prototype.FillEmailData=function(formOptions)
{
    formOptions.FromEmail=rnJQuery('#redNaoFromEmail').val();
    formOptions.FromName=rnJQuery('#redNaoFromName').val();
    formOptions.ToEmail= rnJQuery('#redNaoToEmail').val();
    formOptions.EmailSubject=rnJQuery('#redNaoEmailSubject').val();
    formOptions.EmailText=tinymce.get('redNaoTinyMCEEditor').getContent();

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


    var data={};
    data.id=this.id;
    data.action="rednao_smart_forms_save";
    data.form_options=JSON.stringify(formOptions);
    data.element_options=JSON.stringify(this.FormBuilder.GetFormInformation());
    var self=this;
    rnJQuery.post(ajaxurl,data,function(result){
        var result=rnJQuery.parseJSON(result);
        alert(result.Message);
        if(result.Message=="saved")
            self.id=result.FormId;
    });
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

var SmartFormsAddNewVar=null;
rnJQuery(function(){SmartFormsAddNewVar=new SmartFormsAddNew();})