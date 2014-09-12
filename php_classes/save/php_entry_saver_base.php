<?php

class php_entry_saver_base {
    private $FormId=null;
    private $FormEntryData=null;
    private $FormOptions=null;
    private $ElementOptions=null;
    private $Captcha=null;
    private $ReferenceId=null;
	private $EntryId="";
	private $FormString="";


    function __construct($formId,$formString,$captcha,$referenceId="",$formOptions=null,$elementOptions=null)
    {
        $this->FormId = $formId;
        $this->FormString=$formString;
        $this->FormEntryData = json_decode($this->FormString,true);
        $this->Captcha=$captcha;
        $this->ReferenceId=$referenceId;
		$this->FormOptions=$formOptions;
		$this->ElementOptions=$elementOptions;
    }

    public function ProcessEntry($validateCaptcha=true,$additionalData=array())
    {
		if($this->FormOptions==null||$this->ElementOptions==null)
			$this->GetFormOptions();


        if($this->FormOptions["UsesCaptcha"]=="y"&&$validateCaptcha==true)
        {
            if(!$this->CaptchaIsValid())
            {
                echo '{"message":"'.__("Invalid captcha.").'","refreshCaptcha":"y","success":"n"}';
                return;
            }
        }

		if(isset($_FILES)&&count($_FILES)>0)
		{
			if(!$this->SaveFiles())
			{
				echo '{"message":"'.__("An error occurred, please try again later.").'","success":"n"}';
				return;
			}
		}

		$additionalActions=apply_filters('sf_before_saving_form',array(
			"ContinueInsertion"=>true,
			"FormInformation"=>array(
				"FormId"=>$this->FormId,
				"FormString"=>$this->FormString,
				"FormEntryData"=>$this->FormEntryData,
				"FormOptions"=>$this->FormOptions,
				"ElementOptions"=>$this->ElementOptions
			),
			"AdditionalData"=>$additionalData,
			"Actions"=>array()
		));


		if($additionalActions["ContinueInsertion"]==false)
		{
			echo json_encode(
				array(
					"message"=>__("Information submitted successfully."),
					"success"=>"y",
					"AdditionalActions"=>$additionalActions["Actions"]
				)
			);

			return false;
		}

       	$result=$this->ExecuteInsertions();
        if($this->FormOptions["SendNotificationEmail"]=="y")
            $this->SendFormEmail($this->FormOptions["Emails"][0],$this->FormEntryData,$this->ElementOptions,false);


        if($result==true)
		{
			$additionalActions=apply_filters('sf_submitted_successfully',array(
				"FormId"=>$this->FormId,
				"FormEntryData"=>$this->FormEntryData,
				"FormOptions"=>$this->FormOptions,
				"ElementOptions"=>$this->ElementOptions,
				"Actions"=>array()
			));

			echo json_encode(
				array(
					"message"=>__("Information submitted successfully."),
					"success"=>"y",
					"AdditionalActions"=>$additionalActions["Actions"]
				)
			);
			return true;
		}
        else
		{
            echo '{"message":"'.__("An error occurred, please try again later.").'","success":"n"}';
			return false;
		}


    }

    private function ExecuteInsertions()
    {
        return $this->InsertEntryData();
    }

    private function InsertEntryData(){
        global $wpdb;
        $result= $wpdb->insert(SMART_FORMS_ENTRY,array(
            'form_id'=>$this->FormId,
            'date'=>date('Y-m-d H:i:s'),
            'data'=>$this->FormString,
            'ip'=>$_SERVER['REMOTE_ADDR'],
            'reference_id'=>$this->ReferenceId
        ));

		$this->EntryId=$wpdb->insert_id;
		return $result;


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


		$fieldPattern='/\\[field ([^\\]]+)/';
        preg_match_all($fieldPattern,$EmailText, $matches, PREG_PATTERN_ORDER);

        foreach($matches[1] as $match)
        {
            $value=GetValueByField($stringBuilder,$match,$entryData,$elementOptions,$useTestData);
            $EmailText=str_replace("[field $match]",$value,$EmailText);
        }

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $headers.= "From: $FromName <$FromEmail>";
        if(trim($ToEmail)!="")
        {

			$toEmailArray=explode(",",$ToEmail);
			for($i=0;$i<count($toEmailArray);$i++)
			{
				if(strpos($toEmailArray[$i],"[field")===0)
				{
					preg_match_all($fieldPattern,$toEmailArray[$i], $matches, PREG_PATTERN_ORDER);
					if(count($matches[1])>0)
					{
						$field=$matches[1][0];
						$value=GetValueByField($stringBuilder,$field,$entryData,$elementOptions,$useTestData);
						$toEmailArray[$i]=$value;
					}else
						$toEmailArray[$i]="";
				}
			}
			$toEmailArray=array_filter($toEmailArray);
            return wp_mail($toEmailArray, $EmailSubject, $EmailText, $headers);
        }

        return false;
    }

    private function CaptchaIsValid()
    {
        $Message="";
        if($this->Captcha==""||$this->Captcha==null||$this->Captcha["response"]=="")
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

	private function SaveFiles()
	{
		require_once(SMART_FORMS_DIR . "php_classes/file_upload/physical_file_uploader.php");
		$fileUploader=new physical_file_uploader();
		$result= $fileUploader->UploadFiles($this->FormEntryData);
		if($result["success"]==true)
		{
			$this->FormEntryData=$result["entryData"];
			$this->FormString=json_encode($result["entryData"]);
			return true;
		}
		return false;
	}

	private function DeleteInsertedEntry()
	{
		global $wpdb;
		$wpdb->query($wpdb->prepare("delete from ".SMART_FORMS_ENTRY." WHERE entry_id=%d",$this->EntryId));
	}


}

function SmartFormsOverwriteHandleUpload($upload)
{

}

function GetPHPFormula($formula)
{
	$fieldPattern='/\\[field ([^\\]]+)/';
	preg_match_all($fieldPattern,$formula, $matches, PREG_PATTERN_ORDER);

	foreach($matches[1] as $match)
	{
		$formula=str_replace("[field $match]","formData[$match]['amount']",$formula);
	}

	return $formula;
}

function SmartFormsGetFormattedFormValues($formValues,$elementOptions)
{
	include_once(SMART_FORMS_DIR.'string_renderer/rednao_string_builder.php');
	include_once(SMART_FORMS_DIR.'smart-forms-ajax.php');
	$stringBuilder=new rednao_string_builder();
	$processedData=array();
	foreach($formValues as $key=>$value)
	{
		$element=null;
		foreach($elementOptions as $item)
		{
			if($item["Id"]==$key)
			{
				$element=$item;
				break;
			}
		}

		if($element!=null)
		{
			 $processedData[]=array("name"=>$element["Label"],
			 						"value"=>$stringBuilder->GetStringFromColumn($element,$value));
		}
	}

	return $processedData;

}