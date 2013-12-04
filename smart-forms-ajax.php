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
                        'form_options'=>$form_options
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
                    'form_options'=>$form_options
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

    $entryData=json_decode($formString);

    global $wpdb;
    $result=$wpdb->get_results($wpdb->prepare("select form_options,element_options from ".SMART_FORMS_TABLE_NAME." where form_id=%d",$form_id));

    $formOptions=null;
    $elementOptions=null;

    if(count($result)>0){
        $formOptions=json_decode($result[0]->form_options);
        $elementOptions=json_decode($result[0]->element_options);
    }

    $result=$wpdb->insert(SMART_FORMS_ENTRY,array(
        'form_id'=>$form_id,
        'date'=>date('Y-m-d H:i:s'),
        'data'=>$formString,
        'ip'=>$_SERVER['REMOTE_ADDR'],
    ));

    send_form_email($formOptions,$entryData,$elementOptions);

    if($result==true)
        echo '{"message":"'.__("Information submitted successfully.").'"}';
    else
        echo '{"message":"'.__("An error occurred, please try again later.").'"}';
    die();
}

function send_form_email($formOptions,$entryData,$elementOptions)
{
    include(SMART_FORMS_DIR.'string_renderer/rednao_string_builder.php');

    $stringBuilder=new rednao_string_builder();
    $emailText='<table border="1" cellspacing="1">';
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
    $emailText.="</table>";

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    $notifyEmail = str_replace(';', ',', $formOptions->NotifyTo);
    if(trim($notifyEmail)!="")
    {
        wp_mail($notifyEmail, __("New form submitted"), $emailText, $headers);
    }

    return;
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