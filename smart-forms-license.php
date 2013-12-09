<?php

function smart_forms_check_license($email,$key,&$error)
{
    if($email!=null||$key!=null)
    {
        if(get_transient("smart_forms_check_again"))
            return true;
        if(smart_forms_license_is_valid($email,$key,$error))
        {
            update_option('smart_forms_email',$email);
            update_option('smart_forms_key',$key);

            set_transient("smart_forms_check_again",1,60*60*24*7);
            return true;
        }
    }

    return false;
}

function smart_forms_check_license_with_options(&$error)
{
    if(get_transient("smart_forms_check_again"))
        return true;
    $email=get_option('smart_forms_email');
    $key=get_option('smart_forms_key');

    if($email==false||$key==false)
        return false;
    return smart_forms_check_license(($email?$email:""), ($key?$key:""),$error,false);
}

function smart_forms_license_is_valid($email,$key,&$error)
{
    $email=trim($email);
    $key=trim($key);
    delete_transient("smart_forms_check_again");
    $response=wp_remote_post(SMART_FORMS_REDNAO_URL.'smart_donations_license_validation.php',array('body'=> array( 'email'=>$email,'key'=>$key,'product'=>'sf'),'timeout'=>10));
    if($response instanceof WP_Error)
    {
        $error= $response->get_error_message();
        return false;
    }

    if(strcmp ($response['body'], "valid") == 0)
        return true;
    else{
        return false;
    }

}

function smart_forms_load_license_manager($errorMessage)
{
    if(smart_forms_check_license_with_options($error))
    {
        ?><script language="javascript">
            var RedNaoSmartFormLicenseIsValid=true;
            var RedNaoSmartFormLicenseErrorMessage="";
        </script><?php
    }else
    {
        wp_enqueue_script('jquery');
        wp_enqueue_script('isolated-slider',SMART_FORMS_DIR_URL.'js/rednao-isolated-jq.js',array('jquery'));
        wp_enqueue_style('smart-forms-Slider',SMART_FORMS_DIR_URL.'css/smartFormsSlider/jquery-ui-1.10.2.custom.min.css');

        ?>
                <script language="javascript">
                    var RedNaoSmartFormLicenseIsValid=false;
                    var RedNaoSmartFormLicenseErrorMessage="<?php echo $errorMessage?>";
                </script>


        <?php
    }
    wp_enqueue_script('rednao-smart-forms-licensing-manager',SMART_FORMS_DIR_URL.'js/licensing/rednao-licensing-manager.js',array('isolated-slider'));

}

