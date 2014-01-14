"use strict";
var smartDonationsIsDesignMode=true;
var SmartFormsFieldIsAvailable=function(fieldName){return true;};
function RedNaoFormBuilder(smartFormsOptions,formElementsOptions) {

    this.formSettings = rnJQuery('#formSettings');
    this.redNaoWindow = rnJQuery(document);
    this.formSettingsOriginalTop = this.formSettings.offset().top - 35;
    this.RedNaoFormElements = [];
    this.scrollTimeOut = null;
    this.propertiesPanel = rnJQuery("#rednaoPropertiesPanel");

    rnJQuery("#formBuilderButtonSet").buttonset();


    var self = this;
    $(window).scroll(function (data) {
        if (self.scrollTimeOut != null)
            clearTimeout(self.scrollTimeOut);

        self.scrollTimeOut = setTimeout(function () {
            self.ScrollSettings();
        }, 150);

    });
    rnJQuery('#rednaoPropertySave').click(function () {
        self.SavePropertyEdition
    });
    rnJQuery('#rednaoPropertyCancel').click(function () {
        self.CloseProperties
    });
    rnJQuery('input[name=smartFormsFormEditStyle]').change(function (e) {
        self.smartFormsFormEditTypeChanged()
    });


    this.RecreateExistingFormIfAny(formElementsOptions);

    this.InitializeTabs();
    this.InitializeComponents();

    if(smartFormsOptions!=null)
        FormElementBase.IdCounter=smartFormsOptions.LatestId;
    else
        FormElementBase.IdCounter=0;
    this.DragManager = new RedNaoDragManager(this);
};



RedNaoFormBuilder.prototype.SmartDonationsPrepareDraggableItems = function () {
    rnJQuery(".rednaoformbuilder .component,#redNaoElementlist .rednao-control-group").unbind('mousedown');
    rnJQuery(".rednaoformbuilder .component,#redNaoElementlist .rednao-control-group").mousedown(SmartDonationsFormMouseDownFired);

    rnJQuery(".redNaoDonationButton").unbind('click');
    rnJQuery(".redNaoDonationButton").click(function () {
        return false;
    })
}


RedNaoFormBuilder.prototype.RecreateExistingFormIfAny=function(elementOptions)
{
    for(var i=0;i<elementOptions.length;i++)
    {
        var element=RedNaoCreateFormElementByName(elementOptions[i].ClassName,elementOptions[i]);
        this.RedNaoFormElements.push(element);
    }


    var form=rnJQuery("#redNaoElementlist");
    form.empty();
    for(var i=0;i<this.RedNaoFormElements.length;i++)
    {
        this.RedNaoFormElements[i].AppendElementToContainer(form);
    }

    form.append('<div class="formelement last" style="height:77px;width:100%"><p>Drop new fields here</p></div>');

}


/************************************************************************************* Tabs ***************************************************************************************************/




RedNaoFormBuilder.prototype.smartFormsFormEditTypeChanged = function () {
    var typeOfEdition = rnJQuery('input[name=smartFormsFormEditStyle]:checked').val();

    if (typeOfEdition == 'Fields') {
        rnJQuery('#formBuilderComponents').show();
        rnJQuery('#formPropertiesContainer').hide();
    }

    if (typeOfEdition == 'Settings') {
        rnJQuery('#formBuilderComponents').hide();
        rnJQuery('#formPropertiesContainer').show();
    }

}


RedNaoFormBuilder.prototype.OpenProperties = function (element) {
    rnJQuery('#formRadio2').click();

    this.FillPropertiesPanel(this.RedNaoFormElements[element.index()]);
}

RedNaoFormBuilder.prototype.FillPropertiesPanel = function (element) {


    var tableProperties = rnJQuery('#smartFormPropertiesTable');
    tableProperties.empty();


    this.propertiesPanel.find('.popover-title').text(element.Title);
    element.GeneratePropertiesHtml(tableProperties);
}


/************************************************************************************* General Methods ***************************************************************************************************/




RedNaoFormBuilder.prototype.GetJavascriptObjectOfElement = function (element) {
    var id = element.attr("id");
    for (var i = 0; i < RedNaoFormElements.length; i++)
        if (RedNaoFormElements[i].Id == id) {
            return RedNaoFormElements[i];
        }
}

RedNaoFormBuilder.prototype.CreateNewInstanceOfElement = function (element) {
    var componentType = this.GetComponentType(element);
    return RedNaoCreateFormElementByName(componentType);
}

RedNaoFormBuilder.prototype.GetComponentType = function (element) {
    if (rnJQuery(element).children().first().hasClass('rednaotextinput'))
        return 'rednaotextinput';
    if (rnJQuery(element).children().first().hasClass('rednaodonationamount'))
        return 'rednaodonationamount';
    if (rnJQuery(element).children().first().hasClass('rednaopasswordinput'))
        return 'rednaopasswordinput';
    if (rnJQuery(element).children().first().hasClass('rednaosearchinput'))
        return 'rednaosearchinput';
    if (rnJQuery(element).children().first().hasClass('rednaoprependedtext'))
        return 'rednaoprependedtext';
    if (rnJQuery(element).children().first().hasClass('rednaoappendedtext'))
        return 'rednaoappendedtext';
    if (rnJQuery(element).children().first().hasClass('rednaoprependedcheckbox'))
        return 'rednaoprependedcheckbox';
    if (rnJQuery(element).children().first().hasClass('rednaoappendedcheckbox'))
        return 'rednaoappendedcheckbox';
    if (rnJQuery(element).children().first().hasClass('rednaobuttondropdown'))
        return 'rednaobuttondropdown';
    if (rnJQuery(element).children().first().hasClass('tabradioscheckboxes'))
        return 'tabradioscheckboxes';
    if (rnJQuery(element).children().first().hasClass('rednaomultiplecheckboxes'))
        return 'rednaomultiplecheckboxes';
    if (rnJQuery(element).children().first().hasClass('rednaoselectbasic'))
        return 'rednaoselectbasic';
    if (rnJQuery(element).children().first().hasClass('rednaofilebutton'))
        return 'rednaofilebutton';
    if (rnJQuery(element).children().first().hasClass('rednaosinglebutton'))
        return 'rednaosinglebutton';
    if (rnJQuery(element).children().first().hasClass('rednaodoublebutton'))
        return 'rednaodoublebutton';
    if (rnJQuery(element).children().first().hasClass('rednaotitle'))
        return 'rednaotitle';
    if (rnJQuery(element).children().first().hasClass('rednaotextarea'))
        return 'rednaotextarea';
    if (rnJQuery(element).children().first().hasClass('rednaomultipleradios'))
        return 'rednaomultipleradios';
    if (rnJQuery(element).children().first().hasClass('rednaodonationbutton'))
        return 'rednaodonationbutton';
    if (rnJQuery(element).children().first().hasClass('rednaodonationrecurrence'))
        return 'rednaodonationrecurrence';
    if (rnJQuery(element).children().first().hasClass('rednaosubmissionbutton'))
        return 'rednaosubmissionbutton';
    if (rnJQuery(element).children().first().hasClass('rednaodatepicker'))
        return 'rednaodatepicker';
    if (rnJQuery(element).children().first().hasClass('rednaoname'))
        return 'rednaoname';
    if (rnJQuery(element).children().first().hasClass('rednaoaddress'))
        return 'rednaoaddress';
    if (rnJQuery(element).children().first().hasClass('rednaophone'))
        return 'rednaophone';
    if (rnJQuery(element).children().first().hasClass('rednaoemail'))
        return 'rednaoemail';
    if (rnJQuery(element).children().first().hasClass('rednaonumber'))
        return 'rednaonumber';
    if (rnJQuery(element).children().first().hasClass('rednaocaptcha'))
        return 'rednaocaptcha';


}


/************************************************************************************* Initialization ***************************************************************************************************/




RedNaoFormBuilder.prototype.InitializeTabs = function () {
    rnJQuery(".rednaoformbuilder .formtab").click(function (e) {

        var thisJQuery = rnJQuery(this);
        var tabName = thisJQuery.attr("id");
        tabName = tabName.substr(1);

        rnJQuery('#navtab').find(".selectedTab").removeClass("selectedTab");
        thisJQuery.addClass("selectedTab");

        rnJQuery(".rednaoformbuilder .rednaotablist").css("display", "none");
        rnJQuery(".rednaoformbuilder #" + tabName).css("display", "block");

    });
}

RedNaoFormBuilder.prototype.InitializeComponents = function () {
    RedNaoCreateFormElementByName('rednaotitle', null).GenerateHtml(rnJQuery("#components .rednaotitle"));
    RedNaoCreateFormElementByName('rednaotextinput', null).GenerateHtml(rnJQuery("#components .rednaotextinput"));
    RedNaoCreateFormElementByName('rednaoprependedtext', null).GenerateHtml(rnJQuery("#components .rednaoprependedtext"));
    RedNaoCreateFormElementByName('rednaoappendedtext', null).GenerateHtml(rnJQuery("#components .rednaoappendedtext"));
    RedNaoCreateFormElementByName('rednaoprependedcheckbox', null).GenerateHtml(rnJQuery("#components .rednaoprependedcheckbox"));
    RedNaoCreateFormElementByName('rednaoappendedcheckbox', null).GenerateHtml(rnJQuery("#components .rednaoappendedcheckbox"));
    RedNaoCreateFormElementByName('rednaotextarea', null).GenerateHtml(rnJQuery("#components .rednaotextarea"));
    RedNaoCreateFormElementByName('rednaomultipleradios', null).GenerateHtml(rnJQuery("#components .rednaomultipleradios"));
    RedNaoCreateFormElementByName('rednaomultiplecheckboxes', null).GenerateHtml(rnJQuery("#components .rednaomultiplecheckboxes"));
    RedNaoCreateFormElementByName('rednaoselectbasic', null).GenerateHtml(rnJQuery("#components .rednaoselectbasic"));
    RedNaoCreateFormElementByName('rednaodonationamount', null).GenerateHtml(rnJQuery("#components .rednaodonationamount"));
    RedNaoCreateFormElementByName('rednaodonationbutton', null).GenerateHtml(rnJQuery("#components .rednaodonationbutton"));
    RedNaoCreateFormElementByName('rednaodonationrecurrence', null).GenerateHtml(rnJQuery("#components .rednaodonationrecurrence"));
    RedNaoCreateFormElementByName('rednaosubmissionbutton', null).GenerateHtml(rnJQuery("#components .rednaosubmissionbutton"));
    RedNaoCreateFormElementByName('rednaodatepicker', null).GenerateHtml(rnJQuery("#components .rednaodatepicker"));
    RedNaoCreateFormElementByName('rednaoname', null).GenerateHtml(rnJQuery("#components .rednaoname"));
    RedNaoCreateFormElementByName('rednaoaddress', null).GenerateHtml(rnJQuery("#components .rednaoaddress"));
    RedNaoCreateFormElementByName('rednaophone', null).GenerateHtml(rnJQuery("#components .rednaophone"));
    RedNaoCreateFormElementByName('rednaoemail', null).GenerateHtml(rnJQuery("#components .rednaoemail"));
    RedNaoCreateFormElementByName('rednaonumber', null).GenerateHtml(rnJQuery("#components .rednaonumber"));
   // RedNaoCreateFormElementByName('rednaocaptcha', null).GenerateHtml(rnJQuery("#components .rednaocaptcha"));


    var self=this;
    SmartFormsFieldIsAvailable=function(fieldName)
    {
        for(var i=0;i<self.RedNaoFormElements.length;i++)
            if(self.RedNaoFormElements[i].Id==fieldName)
                return false;

        return true;
    }


}


/************************************************************************************* Move Windows On Scroll ***************************************************************************************************/

RedNaoFormBuilder.prototype.GetFormInformation=function()
{
    var arrayOfOptions=[];

    for(var i=0;i<this.RedNaoFormElements.length;i++)
    {
        arrayOfOptions.push(this.RedNaoFormElements[i].Options);
    }
   return arrayOfOptions;
}


RedNaoFormBuilder.prototype.ScrollSettings = function () {
    var documentScroll = this.redNaoWindow.scrollTop();
    var newPosition = Math.max(0, documentScroll - this.formSettingsOriginalTop);

    this.formSettings.animate({
        top:newPosition
    }, 500);
};


RedNaoFormBuilder.prototype.CloneFormElement=function(jQueryElement){
    if(this.RedNaoFormElements.length>=7&&!RedNaoLicensingManagerVar.LicenseIsValid('Sorry, this version only support up to 8 fields'))
    {
        return;
    }
    var formObject=this.RedNaoFormElements[jQueryElement.index()];
    var newElement= formObject.Clone();

    this.RedNaoFormElements.splice(jQueryElement.index()+1,0,newElement);

    var container=rnJQuery("<div></div>");
    container.insertAfter(jQueryElement);
    container=newElement.GenerateHtml(container);


    this.DragManager.MakeItemDraggable(container);
    this.ElementClicked(container);
    this.OpenProperties(container);

}

RedNaoFormBuilder.prototype.ElementClicked=function(jQueryElement)
{
    rnJQuery('#redNaoElementlist').find('.SmartFormsElementSelected').removeClass('SmartFormsElementSelected');
    rnJQuery('.smartFormsActionMenu').remove();

    jQueryElement.addClass('SmartFormsElementSelected');
    this.OpenProperties(jQueryElement);

    var actionElement=rnJQuery('<div class="smartFormsActionMenu" ><img id="cloneFormElement" src="'+smartFormsRootPath+'images/clone.png" title="Clone" /><img id="deleteFormElement" src="'+smartFormsRootPath+'images/delete.png" title="Delete"/></div>');
    var self=this;


    jQueryElement.prepend(actionElement);

    actionElement.find('#cloneFormElement').mousedown(function(e){e.preventDefault();e.stopPropagation(); self.CloneFormElement(jQueryElement);});
    actionElement.find('#deleteFormElement').mousedown(function(e){e.preventDefault();e.stopPropagation(); self.DeleteFormElement(jQueryElement);});
}

RedNaoFormBuilder.prototype.DeleteFormElement=function(jQueryElement){
    var index=jQueryElement.index();
    this.RedNaoFormElements.splice(index,1);
    jQueryElement.remove();
}


/*
RedNaoFormBuilder.prototype.RefreshForm = function () {
    var form = rnJQuery("#redNaoElementlist");
    form.empty();
    for (var i = 0; i < this.RedNaoFormElements.length; i++) {
        this.RedNaoFormElements[i].AppendElementToContainer(form);
    }

    form.append('<div class="rednaoformbuilder formelement last" style="height:77px;width:100%;"></div>');
    SmartDonationsPrepareDraggableItems();
}*/

