rnJQuery.fn.RNWait=function(param)
{

    if(param=='start')
    {
        rnJQuery(this).addClass('ladda-button');
        rnJQuery(this).attr('data-style','expand-left');
        var buttonAnimation=Ladda.create(this[0]);
        buttonAnimation.start();
        rnJQuery.data(this[0],'sdLadda',buttonAnimation);
    }

    if(param=='stop')
    {
        var buttonAnimation=rnJQuery.data(this[0],'sdLadda');
        if(buttonAnimation!=null)
            buttonAnimation.stop();

        rnJQuery.removeData(this[0],'sdLadda');
    }

};

rnJQuery.fn.RDNotifications=function(dynamicHeight)
{
    if(typeof dynamicHeight =='undefined')
        dynamicHeight=false;

    if(dynamicHeight==false)
        this.wrap('<div style="height: 50px;"></div>')

    return {
        Element:rnJQuery(this),
        ShowError:function(message)
        {
            this.SetAlert('error',message);
        },
        ShowWarning:function(message)
        {
            this.SetAlert('warning',message);
        },

        ShowSuccess:function(message)
        {
            this.SetAlert('success',message);

        },
        Clear:function()
        {
            this.Element.slideUp('1000','easeInQuint');
        },
        SetAlert:function(type,message)
        {
            this.ClearAlertTypes();
            var classType='';
            var glyph='';
            switch (type)
            {
                case 'error':
                    classType='alert-danger';
                    glyph='glyphicon glyphicon-remove';
                    break;
                case 'success':
                    classType='alert-success';
                    glyph='glyphicon glyphicon-ok';
                    break;
                case 'warning':
                    classType='alert-warning';
                    glyph='glyphicon glyphicon-warning-sign';
                    break;
            }

            this.Element.addClass('alert '+classType );
            this.Element.hide();
            this.Element.empty()
            this.Element.append('<span class="'+glyph+'" style="margin-right: 5px;"></span><span>'+message+'</span>');
            this.Element.slideDown('1000','easeInQuint');
        },
        ClearAlertTypes:function()
        {
            this.Element.removeClass('alert alert-success alert-info alert-warning alert-danger')
        }
    };
}

rnJQuery.RNGetWaitDialog=function()
{
    if(typeof this.RNWaitDialog =='undefined')
        this.RNWaitDialog=new RNWaitDialog();

    return this.RNWaitDialog;
};


/************************************************************************************* Wait Dialog ***************************************************************************************************/
function RNWaitDialog()
{
    if(typeof RNWaitDialog.prototype.$Dialog=='undefined')
    {
        RNWaitDialog.prototype.$Dialog=rnJQuery(
            '<div class="modal fade" data-backdrop="static"  data-keyboard="false">'+
                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<h4 class="modal-title">Processing</h4>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<div class="progress">'+
                                '<div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>' +
            '</div>');

        var container=rnJQuery('<div class="bootstrap-wrapper"></div>');
        container.append(RNWaitDialog.prototype.$Dialog);
        rnJQuery('body').append(container);
    }
}

RNWaitDialog.prototype.Show=function(message)
{
    var $dialog = this.$Dialog.find(".modal-dialog");
    var offset = (rnJQuery(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
    this.$Dialog.find('.modal-title').text(message);
    this.$Dialog.modal('show');
}


RNWaitDialog.prototype.Hide=function()
{
    this.$Dialog.modal('hide');
}