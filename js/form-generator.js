
function smartFormGenerator(options){
    this.form_id=options.form_id;
    this.options=options;
    this.RedNaoFormElements=[];
    this.FormElements=[];
    var elementOptions=options.elements;
    for(var i=0;i<elementOptions.length;i++)
    {
        var element=RedNaoCreateFormElementByName(elementOptions[i].ClassName,elementOptions[i]);
        this.RedNaoFormElements.push(element);
        this.FormElements.push(element);
    }


    this.JQueryForm=rnJQuery('<form></form>')
    for(var i=0;i<this.RedNaoFormElements.length;i++)
    {
        this.RedNaoFormElements[i].AppendElementToContainer(this.JQueryForm);
    }

    this.containerName=options.container;
    var container=this.GetRootContainer();
    container.empty();
    container.append(this.JQueryForm);

    var self=this;
    this.JQueryForm.submit(function(e){e.preventDefault();e.stopPropagation();self.SaveForm();})
    this.AdjustLayout();
}


smartFormGenerator.prototype.AdjustLayout=function()
{
    var labelArray=[];
    var controlsArray=[];
    var maxWidth=0;
    var maxControlWidth=0;
    for(var i=0;i<this.FormElements.length;i++)
    {
        var element=this.FormElements[i].JQueryElement;

        var label=element.find('.rednao_label_container');
        maxWidth=Math.max(maxWidth,label.width());
        labelArray.push(label);

        var control=element.find('.redNaoControls');
        maxControlWidth=Math.max(maxControlWidth,control.width());
        controlsArray.push(control);
    }

    for(var i=0;i<labelArray.length;i++)
        labelArray[i].width(maxWidth);

    for(var i=0;i<controlsArray.length;i++)
        controlsArray[i].width(maxControlWidth);

    this.maxWidth=maxWidth+maxControlWidth;
    /*
    this.maxWidth=0;
    for(var i=0;i<this.FormElements.length;i++)
    {
        var width=0;
        this.FormElements[i].JQueryElement.find('.rednao_label_container,.redNaoControls').each(function()
        {
            width+=rnJQuery(this).width();
        });
        this.maxWidth=Math.max(this.maxWidth,width);
    }*/

    if(this.JQueryForm.width()<this.maxWidth)
        this.JQueryForm.parent().addClass('redNaoCompactForm');
}


smartFormGenerator.prototype.GenerateFormElements=function(formElementsOptions)
{
    this.FormElements=new Array();

    for(var i=0;i<formElementsOptions.length;i++)
    {
        this.FormElements.push(RedNaoCreateFormElementByOptions(formElementsOptions[i]));
    }
}


smartFormGenerator.prototype.DonationGeneratedCode=function()
{
    return this.GetStartOfDonationForm()+this.GetEndOfDonationForm(); //'<form id="redNaoElementlist" class="formelements" style="width:600px;"></form>';
}


smartFormGenerator.prototype.GenerationCompleted=function()
{
    var form=this.GetRootContainer().find('form');
    form.addClass('formelements').attr('id','redNaoElementlist');

    for(var i=0;i<this.FormElements.length;i++)
    {
        this.FormElements[i].AppendElementToContainer(form);
    }

    var me=this;
    form.find('.redNaoDonationButton').click(function()
        {
            try{
                me.SaveForm();

            }catch(error)
            {


            }finally{
                return false;
            }
        }
    );

}

smartFormGenerator.prototype.GenerateDefaultStyle=function()
{
    this.styles.formelements="width:600px;padding:10px;margin:0px;";
}


smartFormGenerator.prototype.SaveForm=function()
{

    var formValues={};
    var formIsValid=true;
    var amount=0;

    this.GetRootContainer().find('.redNaoValidationMessage').remove();
    this.GetRootContainer().find('.redNaoInputText,.redNaoRealCheckBox,.redNaoInputRadio,.redNaoInputCheckBox,.redNaoSelect,.redNaoTextArea').css('border-color','#ccc');
    for(var i=0;i<this.FormElements.length;i++)
    {

        if((this.FormElements[i].Options.IsRequired==1||this.FormElements[i].Options.IsRequired=='y')&&!this.FormElements[i].IsValid())
        {
            formIsValid=false;
            rnJQuery('#'+this.FormElements[i].Id).find('.redNaoInputText,.redNaoRealCheckBox,.redNaoInputRadio,.redNaoInputCheckBox,.redNaoSelect,.redNaoTextArea').css('border-color','red');
            continue;
        }
        if(this.FormElements[i].StoresInformation())
        {
            var value=this.FormElements[i].GetValueString();
            amount+=this.FormElements[i].amount;
            formValues[this.FormElements[i].Id]=value;
        }
    }
    if(!formIsValid)
    {
        this.GetRootContainer().prepend('<p class="redNaoValidationMessage" style="margin:0;padding: 0; font-style: italic; color:red;font-family:Arial;font-size:12px;">*Please fill all the required fields</p>')
        return;
    }

    if(this.IsRecurrentPayment(this.GetRootContainer().find('form')))
    {
        if(amount<=0)
        {
            alert('Please set a donation amount before proceeding');
            return;
        }
    }


    if(formValues.length>0)
        formValues=formValues.substr(1);

    var data={
        form_id:this.form_id,
        action:"rednao_smart_forms_save_form_values",
        formString:JSON.stringify(formValues)
    };

    var me=this;


    rnJQuery.ajax({
        type:'POST',
        url:ajaxurl,
        dataType:"json",
        data:data,
        success:function(result){me.SaveCompleted(result)},
        error:function(result){
            alert('An error occurred, please try again later');}
    });
}

smartFormGenerator.prototype.SaveCompleted=function(result){
    alert(result.message);
}

smartFormGenerator.prototype.SubmitForm=function(data,amount)
{
    if(data.status=="success")
    {
        var form=this.GetRootContainer().find('form');
        form.attr('target','_self');
        form.find('input[name=custom]').val(encodeURI('campaign_id='+this.campaign_id+"&formId="+data.randomString))
        if(amount>0)
            form.append('<input type="hidden" name="amount" class="amountToDonate" value="'+amount+'">')

        if(this.IsRecurrentPayment(form))
        {
            if(amount<=0)
            {
                alert('Please set a donation amount before proceeding');
                return;
            }
            this.TurnFormIntoRecurrentPayment(form);
        }

        form.submit();


    }else
    {
        alert("An error occured, please try again");
    }

}

smartFormGenerator.prototype.TurnFormIntoRecurrentPayment=function(form)
{
    form.find('.amountToDonate').attr('name','a3');
    form.find('.smartDonationsPaypalCommand').val('_xclick-subscriptions');
    form.append('<input type="hidden" name="src" value="1"><input type="hidden" name="p3" value="1"><input type="hidden" name="t3" value="'+form.find('.redNaoRecurrence').find(':selected').val()+'">');
}

smartFormGenerator.prototype.IsRecurrentPayment=function(form)
{
    return form.find('.redNaoRecurrence').length>0&&form.find('.redNaoRecurrence').find(':selected').val()!='OT';
}

smartFormGenerator.prototype.GetOptions=function()
{
    var options=new Object();
    options.FormElementsOptions=new Array();

    for(var i=0;i<this.FormElements.length;i++)
    {
        options.FormElementsOptions.push(this.FormElements[i].Options);
    }

    return options;

}

smartFormGenerator.prototype.GetRootContainer=function()
{
    return rnJQuery('#'+this.containerName);
}

rnJQuery(function(){
    if( window.smartFormsItemsToLoad)
        for(var i=0;i< window.smartFormsItemsToLoad.length;i++)
            smartFormsLoadForm(window.smartFormsItemsToLoad[i]);
});


var smartFormsLoadedItems=[];

function smartFormsLoadForm(options)
{
    var form=new smartFormGenerator(options)
    smartFormsLoadedItems.push(form);


}