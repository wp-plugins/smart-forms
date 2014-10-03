<?php
add_filter('smart-forms-get-email-fixed-field-listener','smart_forms_email_current_date');
function smart_forms_email_current_date($array)
{
	array_push($array,
		array(
				"Label"=>__("Current Date"),
				"Op"=>"CurrentDate",
				"Parameters"=>array(
					"Format"=>"m/d/y"
				)
			)
	);

	return $array;
}
add_filter('smart-forms-fixed-field-value-CurrentDate','smart_forms_get_fixed_fields_CurrentDate',10,2);
function smart_forms_get_fixed_fields_CurrentDate($fieldParameters,$formData)
{
	return date($fieldParameters["Format"]);
}




add_filter('smart-forms-get-email-fixed-field-listener','smart_forms_email_original_url');
function smart_forms_email_original_url($array)
{
	array_push($array,
		array(
			"Label"=>__("Original URL"),
			"Op"=>"OriginalUrl",
			"Parameters"=>array(
			)
		)
	);

	return $array;
}
add_filter('smart-forms-fixed-field-value-OriginalUrl','smart_forms_get_fixed_fields_OriginalUrl',10,2);
function smart_forms_get_fixed_fields_OriginalUrl($fieldParameters,$formData)
{
	return "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}
