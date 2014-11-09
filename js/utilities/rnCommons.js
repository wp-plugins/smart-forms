rnJQuery.RNWPAjax=function(action,data,success,fail)
{
    data.action=action;
    rnJQuery.ajax({
        data:data,
        url:ajaxurl,
        dataType:'json',
        method:'post',
        success:success,
        error:function(result){
            if(typeof fail =='undefined')
                alert('An error occurred, please try again');
            else
                fail(result);
        }
    })
};