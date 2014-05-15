
function smartFormGenerator(options){
    this.client_form_options=options.client_form_options;
    this.SetDefaultIfUndefined('InvalidInputMessage','*Please fill all the required fields')
    try{
        this.JavaScriptCode=eval(this.client_form_options.JavascriptCode)();

    }catch(exception)
    {

    }
    this.form_id=options.form_id;
    this.options=options;
    this.RedNaoFormElements=[];
    this.FormElements=[];
    var elementOptions=options.elements;
    for(var i=0;i<elementOptions.length;i++)
    {
        var element=sfRedNaoCreateFormElementByName(elementOptions[i].ClassName,elementOptions[i]);
        this.RedNaoFormElements.push(element);
        this.FormElements.push(element);
    }

    this.containerName=options.container;
    this.CreateForm();

}

smartFormGenerator.prototype.SetDefaultIfUndefined=function(propertyName,defaultValue)
{
    if(typeof this.client_form_options[propertyName]=='undefined')
        this.client_form_options[propertyName]=defaultValue;
}

smartFormGenerator.prototype.CreateForm=function(){
    var container=this.GetRootContainer();
    container.empty();
    this.JQueryForm=rnJQuery('<form ></form>');
    container.append(this.JQueryForm);
    for(var i=0;i<this.RedNaoFormElements.length;i++)
    {
        var formElement=this.RedNaoFormElements[i];
        formElement.AppendElementToContainer(this.JQueryForm);

        if(formElement.StoresInformation())
            RedNaoFormulaManagerVar.SetFormulaValue(formElement.Id,formElement.GetValueString())

    }

    var self=this;
    if(RedNaoGetValueOrNull(this.client_form_options.Campaign))
        this.CreatePayPalHiddenFields();

    this.SubmittingRedNaoDonationForm='n';
    this.JQueryForm.submit(function(e){if(self.SubmittingRedNaoDonationForm=='y')return;  e.preventDefault();e.stopPropagation();self.SaveForm();})
    this.AdjustLayout();
    RedNaoFormulaManagerVar.RefreshAllFormulas();

    try{
        this.JavaScriptCode.AfterFormLoaded();
    }catch(exception)
    {

    }
}

smartFormGenerator.prototype.CreatePayPalHiddenFields=function()
{
    if(smartDonationsSandbox=='y')
        this.JQueryForm.attr('action','https://www.sandbox.paypal.com/cgi-bin/webscr');
    else
        this.JQueryForm.attr('action','https://www.paypal.com/cgi-bin/webscr');
    this.JQueryForm.attr('method','POST');
    this.JQueryForm.attr('target','_self');

    var options=this.client_form_options;
    this.JQueryForm.append(' <input type="hidden" name="cmd" class="smartDonationsPaypalCommand" value="_donations">\
                <input type="hidden" name="item_name" value="'+options.PayPalDescription+'">\
                <input type="hidden" name="business" value="'+options.PayPalEmail+'">\
                <input type="hidden" name="lc" value="US">                       \
                <input type="hidden" name="no_note" value="0">                    \
                <input type="hidden" name="currency_code" value="'+options.PayPalCurrency+'">             \
                <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">\
                <input type="hidden" name="custom" value=type=form&campaign_id='+options.Campaign+'&formId='+this.options.form_id+'>\
                <input type="hidden" name="amount" class="amountToDonate" value="0">\
                <input type="hidden" name="notify_url" value="'+smartDonationsRootPath+'ipn/rednao_paypal_ipn.php">'
        );

    if(RedNaoGetValueOrEmpty(this.client_form_options.redirect_to_cb)=="y")
        this.JQueryForm.append('<input type="hidden" name="return" value="'+this.client_form_options.redirect_to+'">');

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
        if(label.length>0)
            maxWidth=Math.max(maxWidth,label[0].getBoundingClientRect().width);
        labelArray.push(label);

        var control=element.find('.redNaoControls');
        if(control.length>0)
            maxControlWidth=Math.max(maxControlWidth,control[0].getBoundingClientRect().width);
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

    if(this.JQueryForm.width()<(this.maxWidth+5))//5px is the margin size between the label and the control
        this.JQueryForm.parent().addClass('redNaoCompactForm');
}


smartFormGenerator.prototype.GenerateFormElements=function(formElementsOptions)
{
    this.FormElements=new Array();

    for(var i=0;i<formElementsOptions.length;i++)
    {
        this.FormElements.push(sfRedNaoCreateFormElementByOptions(formElementsOptions[i]));
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

    var self=this;
    form.find('.redNaoDonationButton').click(function()
        {

            try{

                self.SaveForm();

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
    this.GetRootContainer().find('.redNaoInputText,.redNaoRealCheckBox,.redNaoInputRadio,.redNaoInputCheckBox,.redNaoSelect,.redNaoTextArea').removeClass('redNaoInvalid');
    for(var i=0;i<this.FormElements.length;i++)
    {
        this.FormElements[i].ClearInvalidStyle();
        if(!this.FormElements[i].IsValid())
        {
            formIsValid=false;
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
        this.GetRootContainer().prepend('<p class="redNaoValidationMessage" style="margin:0;padding: 0; font-style: italic; color:red;font-family:Arial;font-size:12px;">'+this.client_form_options.InvalidInputMessage+'</p>')
        return;
    }


    if(formValues.length>0)
        formValues=formValues.substr(1);






    if(RedNaoGetValueOrNull(this.client_form_options.Campaign))
        this.SendToSmartDonations(formValues);
    else
        this.SendToSmartForms(formValues);

    try{
        rnJQuery('body, input[type="submit"]').addClass('redNaoWait');
        this.JQueryForm.find('input[type="submit"]').attr('disabled','disabled');
        this.JavaScriptCode.BeforeFormSubmit();
    }catch(exception)
    {

    }


}

smartFormGenerator.prototype.SendToSmartForms=function(formValues)
{
    var data={
        form_id:this.form_id,
        action:"rednao_smart_forms_save_form_values",
        formString:JSON.stringify(formValues)
    };


    if(this.client_form_options.UsesCaptcha=='y')
    {
        data.captcha={
            challenge:this.JQueryForm.find('[name="recaptcha_challenge_field"]').val(),
            response:this.JQueryForm.find('[name="recaptcha_response_field"]').val()
        }

    }

    var self=this;
    rnJQuery.ajax({
        type:'POST',
        url:ajaxurl,
        dataType:"json",
        data:data,
        success:function(result){self.SaveCompleted(result)},
        error:function(result){
            rnJQuery('body, input[type="submit"]').removeClass('redNaoWait');
            self.JQueryForm.find('input[type="submit"]').removeAttr('disabled');
            alert('An error occurred, please try again later');}
    });
}

smartFormGenerator.prototype.SendToSmartDonations=function(formValues)
{
    if(RedNaoPathExists(this.client_form_options,'Formulas.DonationFormula'))
    {
        var formula=new RedNaoFormula(null,this.client_form_options.Formulas.DonationFormula);
        var donationAmount=formula.GetValueFromFormula(formValues);


        if(donationAmount<=0)
        {
            this.GetRootContainer().prepend('<p class="redNaoValidationMessage" style="margin:0;padding: 0; font-style: italic; color:red;font-family:Arial;font-size:12px;">*The donation amount should be greater than zero</p>')
            return;
        }

    }



    var self=this;


    var data={
        action:"rednao_smart_donations_save_form_values",
        emailToNotify:this.emailToNotify,
        formString:JSON.stringify(formValues)
    };

    rnJQuery.post(ajaxurl,data,function(data){
        if(data.status=="success")
        {
            self.JQueryForm.find('.amountToDonate').val(donationAmount);
            self.JQueryForm.find('input[name=custom]').val(encodeURI('type=form&campaign_id='+self.client_form_options.Campaign+"&formId="+data.randomString+'&sformid='+self.form_id));
            if(self.JQueryForm.find('.redNaoRecurrence').length>0&&self.JQueryForm.find('.redNaoRecurrence').find(':selected').val()!='OT')
            {
                self.JQueryForm.find('.amountToDonate').attr('name','a3');
                self.JQueryForm.find('.smartDonationsPaypalCommand').val('_xclick-subscriptions');
                self.JQueryForm.append('<input type="hidden" class="redNaoRecurrenceField" name="src" value="1"><input type="hidden" class="redNaoRecurrenceField"name="p3" value="1"><input type="hidden" name="t3" value="'+self.JQueryForm.find('.redNaoRecurrence').find(':selected').val()+'">');
            }
            self.SubmittingRedNaoDonationForm='y';
            self.JQueryForm.submit();


        }else
        {
            alert("An error occured, please try again");
        }

        },"json");

}

smartFormGenerator.prototype.SaveCompleted=function(result){
    rnJQuery('body, input[type="submit"]').removeClass('redNaoWait');
    this.JQueryForm.find('input[type="submit"]').removeAttr('disabled');

    if(typeof result.refreshCaptcha!='undefined'&&result.refreshCaptcha=='y')
    {
        alert(result.message);
        Recaptcha.reload();
        return;
    }

    if((RedNaoGetValueOrEmpty(this.client_form_options.alert_message_cb)!='y'&&RedNaoGetValueOrEmpty(this.client_form_options.redirect_to_cb)!='y')||result.success=='n')
    {
        alert(result.message);
        this.CreateForm();
        return;
    }

    if(RedNaoGetValueOrEmpty(this.client_form_options.alert_message_cb)=='y')
        alert(this.client_form_options.alert_message);

    if(RedNaoGetValueOrEmpty(this.client_form_options.redirect_to_cb)=="y")
        window.location=this.client_form_options.redirect_to;

    this.CreateForm();

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