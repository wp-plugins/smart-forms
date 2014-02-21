<?php

class php_entry_saver_base {
    private $FormId;
    private $FormEntryData;
    private $FormOptions;
    private $ElementOptions;
    private $Captcha;
    private $ReferenceId;


    function __construct($formId,$formString,$captcha,$referenceId="")
    {
        $this->FormId = $formId;
        $this->FormString=$formString;
        $this->FormEntryData = json_decode($this->FormString,true);
        $this->Captcha=$captcha;
        $this->ReferenceId=$referenceId;
        $this->GetFormOptions();
    }


    public function ProcessEntry()
    {
        if($this->FormOptions["UsesCaptcha"]=="y")
        {
            if($this->CaptchaIsValid())
            {
                echo '{"message":"'.__("Invalid captcha.").'","refreshCaptcha":"y","success":"n"}';
                return;
            }
        }

       $result=$this->ExecuteInsertions();

        if($this->FormOptions["SendNotificationEmail"]=="y")
            $this->SendFormEmail($this->FormOptions["Emails"][0],$this->FormEntryData,$this->ElementOptions,false);

        if($result==true)
            echo '{"message":"'.__("Information submitted successfully.").'","success":"y"}';
        else
            echo '{"message":"'.__("An error occurred, please try again later.").'","success":"n"}';
        return;
    }

    private function ExecuteInsertions()
    {
        return $this->InsertEntryData();
    }

    private function InsertEntryData(){
        global $wpdb;
        return $wpdb->insert(SMART_FORMS_ENTRY,array(
            'form_id'=>$this->FormId,
            'date'=>date('Y-m-d H:i:s'),
            'data'=>$this->FormString,
            'ip'=>$_SERVER['REMOTE_ADDR'],
            'reference_id'=>$this->ReferenceId
        ));
    }

    public static function SendFormEmail($formOptions,$entryData,$elementOptions,$useTestData)
    {
        include_once(SMART_FORMS_DIR.'string_renderer/rednao_string_builder.php');
		include_once(SMART_FORMS_DIR.'smart-forms-ajax.php');


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

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $headers.= "$FromName <$FromEmail>";
        if(trim($ToEmail)!="")
        {
            return wp_mail($ToEmail, $EmailSubject, $EmailText, $headers);
        }

        return false;
    }

    private function CaptchaIsValid()
    {
        $Message="";
        if($this->Captcha=="")
            return false;

        $captchaPost=$this->Captcha;
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
            return false;

        return true;
    }


    private function GetFormOptions()
    {
        global $wpdb;
        $result=$wpdb->get_results($wpdb->prepare("select form_options,element_options from ".SMART_FORMS_TABLE_NAME." where form_id=%d",$this->FormId));

        if(count($result)>0){
            $this->FormOptions=json_decode($result[0]->form_options,true);
            $this->ElementOptions=json_decode($result[0]->element_options,true);
        }
    }


} 