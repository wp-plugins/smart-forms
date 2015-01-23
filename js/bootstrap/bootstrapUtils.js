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
};


/************************************************************************************* Wait Dialog ***************************************************************************************************/
rnJQuery.RNGetWaitDialog=function()
{
    if(typeof this.RNWaitDialog =='undefined')
        this.RNWaitDialog=new RNWaitDialog();

    return this.RNWaitDialog;
};

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
};


RNWaitDialog.prototype.Hide=function()
{
    this.$Dialog.modal('hide');
};


/************************************************************************************* Alert Dialog ***************************************************************************************************/
rnJQuery.RNGetAlertDialog=function()
{
    if(typeof this.RNAlertDialog =='undefined')
        this.RNAlertDialog=new RNAlertDialog();

    return this.RNAlertDialog;
};

function RNAlertDialog()
{
    if(typeof RNAlertDialog.prototype.$Dialog=='undefined')
    {
        //todo:create error and warning dialog
        RNAlertDialog.prototype.$Dialog=rnJQuery(
            '<div class="modal fade"  tabindex="-1">'+
                '<div class="modal-dialog warning">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<span class="glyphicon glyphicon-warning-sign" style="display: inline"></span>'+
                            '<h4 style="display: inline" class="modal-title"></h4>'+
                        '</div>'+
                        '<div class="modal-body">'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>');

        var container=rnJQuery('<div class="bootstrap-wrapper"></div>');
        container.append(RNAlertDialog.prototype.$Dialog);
        rnJQuery('body').append(container);
    }
}

RNAlertDialog.prototype.ShowWarning=function(title,message)
{
    var $dialog = this.$Dialog.find(".modal-dialog");
    $dialog.find('.modal-body').html(RedNaoEscapeHtml(message));
    $dialog.find('.modal-title').text(title);
    var offset = (rnJQuery(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
    this.$Dialog.modal('show');
};


RNAlertDialog.prototype.Hide=function()
{
    this.$Dialog.modal('hide');
};

RNAlertDialog.prototype.Hide=function()
{
    this.$Dialog.modal('hide');
};


/************************************************************************************* Confirmation Dialog ***************************************************************************************************/
rnJQuery.RNGetConfirmationDialog=function()
{
    if(typeof this.RNConfirmationDialog =='undefined')
        this.RNConfirmationDialog=new RNConfirmationDialog();

    return this.RNConfirmationDialog;
};

function RNConfirmationDialog()
{
    if(typeof RNConfirmationDialog.prototype.$Dialog=='undefined')
    {
        //todo:create error and warning dialog
        RNConfirmationDialog.prototype.$Dialog=rnJQuery(
            '<div class="modal fade"  tabindex="-1">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                '<div class="modal-header" style="background-color: #3399FF;color:white;">'+
                '<h4 style="display: inline" class="modal-title"></h4>'+
                '</div>'+
                '<div class="modal-body">'+
                '</div>'+
                '<div class="modal-footer">'+
                '<button type="button" class="btn btn-success rnBtnYes" data-dismiss="modal"><span class="glyphicon glyphicon-ok"></span>Yes</button>'+
                '<button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>No</button>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>');

        var container=rnJQuery('<div class="bootstrap-wrapper"></div>');
        container.append(RNConfirmationDialog.prototype.$Dialog);
        rnJQuery('body').append(container);
    }
}

RNConfirmationDialog.prototype.ShowConfirmation=function(title,message,callback)
{
    var $dialog = this.$Dialog.find(".modal-dialog");
    $dialog.find('.modal-body').html(RedNaoEscapeHtml(message));
    $dialog.find('.modal-title').html(title);
    var offset = (rnJQuery(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
    this.$Dialog.find('.rnBtnYes').unbind('click').bind('click',function(){callback();});

    this.$Dialog.modal('show');

};


rnJQuery.fn.modal.Constructor.prototype.ShowInCenter=function()
{
    var $dialog=this.$element.find('.modal-dialog');
    var offset = (rnJQuery(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
    this.$element.modal('show');
};
