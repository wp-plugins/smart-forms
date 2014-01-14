function RedNaoEmailEditor()
{
    rnJQuery( "#redNaoAccordion" ).accordion();
    this.Dialog=rnJQuery("#redNaoEmailEditor").dialog(
        {   width:"800",
            height:"680",
            modal:true,
            autoOpen:false,
            create: function(event, ui){
                rnJQuery('.ui-dialog').wrap('<div class="smartFormsSlider" />');
            },
            open: function(event, ui){
                rnJQuery('.ui-widget-overlay').wrap('<div class="smartFormsSlider" />');

            }


        });


}

RedNaoEmailEditor.prototype.OpenEmailEditor=function(redNaoFormElements)
{
    this.Dialog.dialog('open');
    var formList=rnJQuery('#redNaoEmailFormFields');
    formList.empty();
    for(var i=0;i<redNaoFormElements.length;i++)
    {
        if(redNaoFormElements[i].StoresInformation())
        {
            formList.append('<li><button onclick="RedNaoEmailEditorVar.AddFieldToEmail(\''+redNaoFormElements[i].Options.Id+'\');">'+redNaoFormElements[i].Options.Label+'</button></li>');

        }
    }
}


RedNaoEmailEditor.prototype.CloseEmailEditor=function(redNaoFormElements)
{
    this.Dialog.dialog('close');
}

RedNaoEmailEditor.prototype.AddFieldToEmail=function(id)
{
    tinymce.activeEditor.execCommand('mceInsertContent', false, "[field "+id.trim()+"]");
}



var RedNaoEmailEditorVar=null;
rnJQuery(function(){
    RedNaoEmailEditorVar=new RedNaoEmailEditor();
});