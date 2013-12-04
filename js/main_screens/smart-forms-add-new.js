function SmartFormsAddNew()
{
    if(typeof smartFormId!='undefined')
        this.id=smartFormId;
    else
        this.id=0;

    var options=null;
    if(typeof smartFormsOptions!='undefined')
    {
        options=smartFormsOptions;
        rnJQuery('#smartFormName').val(smartFormsOptions.Name);
        rnJQuery('#smartFormDescription').val(smartFormsOptions.Description);
        rnJQuery('#smartFormsSubmissionNotifyTo').val(smartFormsOptions.NotifyTo);
    }

    var formElements=[];
    if(typeof smartFormsElementOptions!='undefined')
        formElements=smartFormsElementOptions;


    this.FormBuilder= new RedNaoFormBuilder(options,formElements);

    var self=this;
    rnJQuery('#smartFormsBasic').click(self.SmartFormsTagClicked);
    rnJQuery('#smartFormsSaveButton').click(function(e){self.SaveForm(e);});
}

SmartFormsAddNew.prototype.SmartFormsTagClicked=function(e)
{
    var src=rnJQuery(this).find('img').attr("src");
    if(src==smartForms_arrow_closed)
        this.OpenTag(this);
    else
        this.CloseTag(this);
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
    var data={};
    data.id=this.id;
    data.action="rednao_smart_forms_save";
    data.form_options=JSON.stringify(formOptions);
    data.element_options=JSON.stringify(this.FormBuilder.GetFormInformation());
    var self=this;
    rnJQuery.post(ajaxurl,data,function(result){
        var result=rnJQuery.parseJSON(result);
        alert(result.Message);
    });
}

SmartFormsAddNew.prototype.CloseTag=function()
{
    rnJQuery(tag).find('img').attr("src",smartForms_arrow_closed)


    var detailName=rnJQuery(tag).attr('id')+'Detail';
    rnJQuery('#'+detailName).slideUp(200);
}

SmartFormsAddNew.prototype.OpenTag=function()
{
    rnJQuery(tag).find('img').attr("src",smartForms_arrow_open)

    var detailName=rnJQuery(tag).attr('id')+'Detail';
    rnJQuery('#'+detailName).slideDown(200);
}

var SmartFormsAddNewVar=null;
rnJQuery(function(){SmartFormsAddNewVar=new SmartFormsAddNew();})