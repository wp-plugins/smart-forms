<?php

function GetPostValue($parameterName)
{
    if(isset($_POST[$parameterName]))
        return stripslashes($_POST[$parameterName]);

    return "";
}

function rednao_smart_forms_save()
{
    $form_id=GetPostValue("id");
    $element_options=GetPostValue("element_options");
    $form_options=GetPostValue("form_options");
    $client_form_options=GetPostValue("client_form_options");

    //$form_options=str_replace("\\\"","\"",$form_options);
    $formParsedValues=json_decode($form_options);


    if($formParsedValues->Name=="")
    {
        $message=__("Name is mandatory");
    }else{

            global $wpdb;
            if($form_id=="0")
            {
                $count= $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM ".SMART_FORMS_TABLE_NAME." where form_name=%s",$formParsedValues->Name));

                if($count>0)
                {
                    $message=__("Form name already exists");

                }else
                {
                    $values=array('form_name'=>$formParsedValues->Name,
                        'element_options'=>$element_options,
                        'form_options'=>$form_options,
                        'client_form_options'=>$client_form_options
                    );

                    $wpdb->insert(SMART_FORMS_TABLE_NAME,$values);
                    $form_id=$wpdb->insert_id;
                    $message="saved";
                    delete_transient("rednao_smart_forms_$form_id");
                }
            }else
            {
                $wpdb->update(SMART_FORMS_TABLE_NAME,array(
                    'form_name'=>$formParsedValues->Name,
                    'element_options'=>$element_options,
                    'form_options'=>$form_options,
                    'client_form_options'=>$client_form_options
                ),array("form_id"=>$form_id));
                $message="saved";
                delete_transient("rednao_smart_forms_$form_id");

            }

        }


    echo "{\"FormId\":\"$form_id\",\"Message\":\"$message\"}";

    die();
}


function rednao_smart_form_list()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }

    global $wpdb;
    $result=$wpdb->get_results("SELECT form_id,form_name FROM ".SMART_FORMS_TABLE_NAME);

    echo "[{\"Id\":\"0\",\"Name\":\"Select a Form\"}";
    foreach($result as $key=>$row)
    {
        echo ",{\"Id\":\"$row->form_id\",\"Name\":\"$row->form_name\"}";
    }
    echo"]";
    die();
}


function rednao_smart_forms_save_form_values()
{
    $form_id=GetPostValue("form_id");
    $formString=GetPostValue("formString");

    $entryData=json_decode($formString,true);

    global $wpdb;
    $result=$wpdb->get_results($wpdb->prepare("select form_options,element_options from ".SMART_FORMS_TABLE_NAME." where form_id=%d",$form_id));

    $formOptions=null;
    $elementOptions=null;

    if(count($result)>0){
        $formOptions=json_decode($result[0]->form_options,true);
        $elementOptions=json_decode($result[0]->element_options,true);
    }

    if($formOptions["UsesCaptcha"]=="y")
    {
        if(!isset($_POST["captcha"]))
        {
            echo '{"message":"'.__("Invalid captcha.").'", "success":"n"}';
            die();
        }
        $captchaPost=$_POST["captcha"];
        $captcha=ARRAY();
        $captcha["challenge"]=stripslashes($captchaPost["challenge"]);
        $captcha["response"]=stripslashes($captchaPost["response"]);
        $captcha["remoteip"]=$_SERVER['REMOTE_ADDR'];
        $captcha["privatekey"]="6Lf2J-wSAAAAAOH6uSmSdx75ZLRpDIfvSeAdx9ST";

        $args=Array();

        $args['headers']=Array
        (
            'Content-Type'=>'application/x-www-form-urlencoded;',
            'Method'=>'Post'
        );
        $args['body']=$captcha;
        $res=wp_remote_post('http://www.google.com/recaptcha/api/verify',$args);
        if(strpos($res["body"],"true")!==0)
        {
            echo '{"message":"'.__("Invalid captcha.").'","refreshCaptcha":"y","success":"n"}';
            die();
        }


    }

    $result=$wpdb->insert(SMART_FORMS_ENTRY,array(
        'form_id'=>$form_id,
        'date'=>date('Y-m-d H:i:s'),
        'data'=>$formString,
        'ip'=>$_SERVER['REMOTE_ADDR'],
    ));

    if($formOptions["SendNotificationEmail"]=="y")
        send_form_email($formOptions["Emails"][0],$entryData,$elementOptions,false);

    if($result==true)
        echo '{"message":"'.__("Information submitted successfully.").'","success":"y"}';
    else
        echo '{"message":"'.__("An error occurred, please try again later.").'","success":"n"}';
    die();
}

function send_form_email($formOptions,$entryData,$elementOptions,$useTestData)
{
    include(SMART_FORMS_DIR.'string_renderer/rednao_string_builder.php');



    $stringBuilder=new rednao_string_builder();
    $EmailText=$formOptions["EmailText"];
    $FromName=$formOptions["FromName"];
    $FromEmail=$formOptions["FromEmail"];
    $ToEmail=$formOptions["ToEmail"];
    $EmailSubject=$formOptions["EmailSubject"];


    if($FromName=="")
        $FromName="Wordpress";

    if($EmailSubject=="")
        $EmailSubject="Form Submitted";

    if($ToEmail=="")
        $ToEmail=get_option("admin_email");

    preg_match_all('/\\[field ([^\\]]+)/',$EmailText, $matches, PREG_PATTERN_ORDER);

    foreach($matches[1] as $match)
    {
        $value=GetValueByField($stringBuilder,$match,$entryData,$elementOptions,$useTestData);
        $EmailText=str_replace("[field $match]",$value,$EmailText);
    }


/*


    foreach($entryData as $key=>$value)
    {

        $element=null;
        foreach($elementOptions as $item)
        {
            if($item->Id==$key)
            {
                $element=$item;
                break;
            }
        }

        $emailText.="<tr>". $stringBuilder->GetStringFromColumn($element,$value)."</tr>";
    }
    $emailText.="</table>";*/

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers.= "$FromName <$FromEmail>";
    if(trim($ToEmail)!="")
    {
        return wp_mail($ToEmail, $EmailSubject, $EmailText, $headers);
    }

    return false;
}

function GetValueByField($stringBuilder,$match,$entryData,$elementOptions,$useTestData)
{
    foreach($entryData as $key=>$value)
    {
        $element=null;
        if($key!=$match)
            continue;

        $element=null;
        foreach($elementOptions as $item)
        {
            if($item["Id"]==$key)
            {
                $element=$item;
                break;
            }
        }
        if($element==null)
            continue;

        $value= $stringBuilder->GetStringFromColumn($element,$value);
        if($value==""&&$useTestData)
            $value="sample text";
        return $value;
    }

    if($useTestData)
        return "sample text";
}

function rednao_smart_forms_entries_list()
{
    $startDate=GetPostValue("startDate");
    $endDate=GetPostValue("endDate");
    $formId=GetPostValue("form_id");

    $startDate=date('Y-m-d H:i:s', strtotime($startDate));
    $endDate=date('Y-m-d H:i:s', strtotime($endDate .' +1 day'));

    $query="select data from ".SMART_FORMS_ENTRY."
        where date between '$startDate' and '$endDate' and form_id=$formId";


    global $wpdb;
    $result=$wpdb->get_results($query);
    $isFirstRecord=true;

    echo '{"entries":[';
    foreach($result as $row)
    {
        if($isFirstRecord)
           $isFirstRecord=false;
        else
            echo ",";

        echo $row->data;

    }
    echo '],"formOptions":';

    $query="select element_options from ".SMART_FORMS_TABLE_NAME." where form_id=".$formId;
    $elementOptions=$wpdb->get_var($query);
    echo $elementOptions.'}';


    die();
}

function rednao_smart_form_send_test_email()
{
    $FromEmail=GetPostValue("FromEmail");
    $FromName=GetPostValue("FromName");
    $ToEmail=GetPostValue("ToEmail");
    $EmailSubject=GetPostValue("EmailSubject");
    $EmailText=GetPostValue("EmailText");
    $elementOptions=GetPostValue("element_options");

    $elementOptions=json_decode($elementOptions);


    $valueArray=Array(
        "FromEmail"=>$FromEmail,
        "FromName"=>$FromName,
        "ToEmail"=>$ToEmail,
        "EmailSubject"=>$EmailSubject,
        "EmailText"=>$EmailText
    );
    $entryData=Array();


    if($EmailText=="")
    {
        echo '{"Message":"'.__("Email text can't be empty").'"}';
        die();
    }

    if(send_form_email($valueArray,$entryData,$elementOptions,true))
        echo '{"Message":"'.__("Email sent successfully").'"}';
    else
        echo '{"Message":"'.__("There was an error sending the email, please check the configuration").'"}';
    die();
}

function rednao_smart_forms_submit_license()
{
    include_once(SMART_FORMS_DIR.'smart-forms-license.php');

    $email=GetPostValue("email");
    $key=GetPostValue("key");

    if(smart_forms_check_license($email,$key,$error))
    {
        echo '{"IsValid":"y","Message":"'.__("License submitted successfully, thank you!!").'"}';
    }else
    {
        if($error==null)
        {
            echo '{"IsValid":"n",  "Message":"'.__("Invalid user or license").'"}';
        }else
            echo '{"IsValid":"n","Message":"'.__("An error occurred $error").'"}';
    }

    die();
}