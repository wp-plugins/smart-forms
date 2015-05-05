<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 3/29/13
 * Time: 9:29 AM
 * To change this template use File | Settings | File Templates.
 */

if(!defined('ABSPATH'))
    die('Forbidden');

require_once(SMART_FORMS_DIR.'integration/smart-donations-integration-license-helper.php');
require_once(SMART_FORMS_DIR.'filter_listeners/fixed-field-listeners.php');
require_once(SMART_FORMS_DIR.'smart-forms-bootstrap.php');

smart_forms_load_license_manager("");

wp_enqueue_script('jquery');
wp_enqueue_script('isolated-slider',SMART_FORMS_DIR_URL.'js/rednao-isolated-jq.js',array('jquery'));
wp_enqueue_script('rednap-fuelux',SMART_FORMS_DIR_URL.'js/utilities/fuelux/wizard.js',array('isolated-slider'));


wp_enqueue_script('smart-forms-event-manager',SMART_FORMS_DIR_URL.'js/formBuilder/eventmanager.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-wizard-steps',SMART_FORMS_DIR_URL. 'js/utilities/popup-wizard/wizard-steps.js',array('smart-forms-form-elements','isolated-slider'));
wp_enqueue_script('smart-forms-popup-wizard',SMART_FORMS_DIR_URL. 'js/utilities/popup-wizard/popup-wizard.js',array('smart-forms-wizard-steps'));
wp_enqueue_script('smart-forms-redirect-to-wizard-steps',SMART_FORMS_DIR_URL. 'js/wizards/redirect-to-wizard-steps.js',array('smart-forms-popup-wizard'));
wp_enqueue_script('smart-forms-form-elements',SMART_FORMS_DIR_URL.'js/formBuilder/formelements.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-list-manager',SMART_FORMS_DIR_URL.'js/utilities/rnListManager.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-formula-window',SMART_FORMS_DIR_URL.'js/formBuilder/formula/formulawindow.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-elements-manipulators',SMART_FORMS_DIR_URL.'js/formBuilder/properties/manipulators.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-elements-properties',SMART_FORMS_DIR_URL.'js/formBuilder/properties/elementsproperties.js',array('isolated-slider','smart-forms-select2'));
wp_enqueue_script('smart-forms-formBuilder',SMART_FORMS_DIR_URL.'js/formBuilder/formbuilder.js',array('smart-forms-elements-properties'));
wp_enqueue_script('smart-forms-dragmanager',SMART_FORMS_DIR_URL.'js/formBuilder/dragManager/dragmanager.js');
wp_enqueue_script('smart-forms-dragitembehaviors',SMART_FORMS_DIR_URL.'js/formBuilder/dragManager/dragitembehaviors.js');
wp_enqueue_script('smart-forms-condition-designer',SMART_FORMS_DIR_URL.'js/conditional_manager/condition-designer.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-conditional-steps',SMART_FORMS_DIR_URL.'js/conditional_manager/conditional-handler-steps.js',array('isolated-slider','smart-forms-condition-designer'));
wp_enqueue_script('smart-forms-conditional-handlers',SMART_FORMS_DIR_URL.'js/conditional_manager/conditional-handlers.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-conditional-manager',SMART_FORMS_DIR_URL.'js/conditional_manager/conditional-logic-manager.js',array('isolated-slider','smart-forms-conditional-handlers'));
wp_enqueue_script('ismart-forms-add-new',SMART_FORMS_DIR_URL.'js/subscriber_interfaces/ismart-forms-add-new.js',array('smart-forms-event-manager','isolated-slider'));
wp_enqueue_script('smart-forms-multiple-step-base',SMART_FORMS_DIR_URL.'js/multiple_steps/multiple_steps_base.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-multiple-step-designer',SMART_FORMS_DIR_URL.'js/multiple_steps/multiple_steps_designer.js',array('smart-forms-multiple-step-base'));


$additionalJS=apply_filters("sf_form_configuration_on_load_js",array());
$addNewDependencies= array('smart-forms-list-manager','ismart-forms-add-new','isolated-slider','smart-forms-formula-window','smart-forms-formBuilder','smart-forms-select2','smart-forms-event-manager','smart-forms-conditional-manager');
for($i=0;$i<count($additionalJS);$i++){

    if(!isset($additionalJS[$i]['dependencies']))
        $additionalJS[$i]['dependencies']=array('ismart-forms-add-new');
	wp_enqueue_script($additionalJS[$i]["handler"],$additionalJS[$i]["path"],$additionalJS[$i]['dependencies']);
	array_push($addNewDependencies,$additionalJS[$i]["handler"]);
}
wp_enqueue_script('smart-forms-add-new',SMART_FORMS_DIR_URL.'js/main_screens/smart-forms-add-new.js',$addNewDependencies);
wp_enqueue_script('smart-forms-icheck',SMART_FORMS_DIR_URL.'js/utilities/iCheck/icheck.min.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-select2',SMART_FORMS_DIR_URL.'js/utilities/select2/select2.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-jsColor',SMART_FORMS_DIR_URL.'js/utilities/jsColor/jscolor.js',array('isolated-slider'));



require_once(SMART_FORMS_DIR.'translations/smart-forms-add-new-translation.php');
require_once(SMART_FORMS_DIR.'translations/form-elements-translation.php');


echo "<div class='bootstrap-wrapper' style='position: absolute;width:100%;'><div id='smart-forms-notification'></div></div>";

echo "<h1>".__("Forms")."</h1>";


wp_enqueue_script('smart-forms-email-editor',SMART_FORMS_DIR_URL.'js/editors/email-editor.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-style-editor',SMART_FORMS_DIR_URL.'js/editors/style_editor/style-editor.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-style-elements',SMART_FORMS_DIR_URL.'js/editors/style_editor/element-styler.js',array('isolated-slider','smart-forms-styler-set','smart-forms-style-properties'));
wp_enqueue_script('smart-forms-style-properties',SMART_FORMS_DIR_URL.'js/editors/style_editor/style-properties.js',array('isolated-slider'));
wp_enqueue_script('smart-forms-styler-set',SMART_FORMS_DIR_URL.'js/editors/style_editor/styler-set.js',array('isolated-slider'));
wp_enqueue_script('json2');



wp_enqueue_style('smart-forms-main-style',SMART_FORMS_DIR_URL.'css/mainStyle.css');
wp_enqueue_style('smart-forms-Slider',SMART_FORMS_DIR_URL.'css/smartFormsSlider/jquery-ui-1.10.2.custom.min.css');
wp_enqueue_style('form-builder-boot-strap',SMART_FORMS_DIR_URL.'css/formBuilder/bootstrap.min.css');
wp_enqueue_style('form-builder-custom',SMART_FORMS_DIR_URL.'css/formBuilder/custom.css');
wp_enqueue_style('form-builder-icheck-normal',SMART_FORMS_DIR_URL.'js/utilities/iCheck/skins/minimal/minimal.css');
wp_enqueue_style('form-builder-select2',SMART_FORMS_DIR_URL.'js/utilities/select2/select2.css');
wp_enqueue_style('form-builder-fuelux',SMART_FORMS_DIR_URL.'js/utilities/fuelux/fuelux.css');

if(get_option("SMART_FORMS_REQUIRE_DB_DETAIL_GENERATION")=='y')
	wp_enqueue_script('smart-forms-detail-generator',SMART_FORMS_DIR_URL.'utilities/smart-forms-detail-generator.js',array('isolated-slider'));

do_action('smart_forms_load_designer_scripts');
?>


<script type="text/javascript">

	<?php
	$emailFixedFieldListeners=array();
	$emailFixedFieldListeners=apply_filters('smart-forms-get-email-fixed-field-listener',$emailFixedFieldListeners);
	echo "var smartFormsFixedFields=".json_encode($emailFixedFieldListeners);
	 ?>

    var smartForms_arrow_closed="<?php echo SMART_FORMS_DIR_URL?>images/arrow_right.png";
    var smartForms_arrow_open="<?php echo SMART_FORMS_DIR_URL?>images/arrow_down.png";
    var smartFormsPath="<?php echo SMART_FORMS_DIR_URL?>";
    var smartFormsRootPath="<?php echo SMART_FORMS_DIR_URL?>";

    <?php

        $customVars=array();
        $customVars=apply_filters('smart-forms-add-new-js-vars',$customVars);

        foreach($customVars as $var)
        {
            echo "var ".$var["name"]." = ".$var["value"].'; ';
        }



     ?>


</script>

<?php

if(get_option('sf_dont_show_again')===false)
{
?>
<div style="margin-bottom: 5px; border-style: dashed;border-color: black;border-width: 2px;padding:5px; margin-left: 5px; background-color;background-color: #ffffff" class="bootstrap-wrapper sfSignUpForm" >

    <span style=" vertical-align: middle; font-size:30px;" class="glyphicon glyphicon-envelope"></span>  <p style="vertical-align: middle; display: inline; margin-top: 5px;margin-bottom:5px; font-size: 15px;">Get exclusive content, news and tips directly in your email <a data-toggle="modal" data-target="#signUpModal" style="cursor:hand;cursor:pointer;">Subscribe to the Smart Forms mailing list here</a></p>
    <div style="float: right">

        <a style="clear: both;cursor: pointer;cursor:hand;" onclick="DontShowSignUpAgain()">Don't show this again</a>
        <span>|</span>
        <a style="clear: both;cursor: pointer;cursor:hand;" onclick="rnJQuery('.sfSignUpForm').hide();">Close</a>
    </div>

</div>

<script>
    function DontShowSignUpAgain()
    {
        var data={};
        data.action="rednao_smart_forms_dont_show_again";
        rnJQuery.post(ajaxurl,data,function(result){
            rnJQuery('.sfSignUpForm').hide();
        });
    }
</script>

<div class="bootstrap-wrapper">
    <div class="modal fade" id="signUpModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <form class="modal-content" method="post" target="_blank" action="https://www.aweber.com/scripts/addlead.pl">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Almost done =). Submit your email to register to the newsletter.</h4>
                </div>
                <div class="modal-body">
                    <div style="display: inline-block;width:29%"><label>Email</label></div>
                    <input style="display:inline-block; width: 70%;" name="email" type="text" placeholder="your@email.com" class="form-control redNaoInputText " value="">
                    <input type="hidden" name="meta_web_form_id" value="1886998542"/>
                    <input type="hidden" name="listname" value="awlist3810311"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-success"><span class="glyphicon glyphicon-ok"></span>Subscribe</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
}
?>



<div style="text-align: left;" class="bootstrap-wrapper">
	<button style="min-width:100px;cursor: hand;cursor: pointer;" class="btn btn-success ladda-button" id="smartFormsSaveButton"  data-style="expand-left" onclick="return false;" >
		<span class="glyphicon glyphicon-floppy-disk"></span><span class="ladda-label">Save</span>
	</button>
</div>
<h2 class="nav-tab-wrapper" id="smartFormsTopTab">
    <a style="cursor: hand;cursor: pointer;" class='nav-tab nav-tab-active' id="smartFormsGeneralTab"  onclick="SmartFormsAddNewVar.GoToGeneral();">General Info</a>
    <a style="cursor: hand;cursor: pointer;" class='nav-tab' id="smartFormsJavascriptTab" onclick="SmartFormsAddNewVar.GoToJavascript();">Javascript</a>
	<a style="cursor: hand;cursor: pointer;" class='nav-tab' id="smartFormsCSStTab" onclick="SmartFormsAddNewVar.GoToCSS();">CSS</a>
    <a style="cursor: hand;cursor: pointer;" class='nav-tab' id="smartFormsAfterSubmitTab" onclick="SmartFormsAddNewVar.GoToAfterSubmit();">After Submit</a>


	<?php
		$tabs=array();
		$tabs=apply_filters("sf_form_configuration_on_load_tabs",$tabs);
		for($i=0;$i<count($tabs);$i++)
		{
			echo '<a id="smartFormsCustom'.$i.'Tab" data-tab-id="'.$tabs[$i]["id"].'" class="nav-tab sfcustomtab" onclick="SmartFormsAddNewVar.GoToCustomTab('.$i.');" >'.esc_html($tabs[$i]["name"]).'</a>';
		}
	?>

    <?php
        if(has_smart_donations_license_and_is_active())
        {
            wp_enqueue_script('smart-forms-donation-elements',SMART_FORMS_DIR_URL.'js/integration/smart-donations-integration.js',array('smart-forms-form-elements','smart-forms-add-new'));
            ?>
            <a class='nav-tab' id="smartDonationsTab" onclick="SmartFormsAddNewVar.GoToSmartDonations();">Smart Donations</a>
        <?php
        }
    ?>
</h2>
<div id="redNaoGeneralInfo">
<div id="redNaoEmailEditor" title="Email" style="display: none;">
    <table>
        <tr>
            <td style="text-align: right">From email address</td><td> <select  multiple="multiple"  id="redNaoFromEmail" style="width:300px"></td>
			<td rowspan="5">
				<a target="_blank" style="margin-right: 10px;margin-top: 10px;" href="http://smartforms.rednao.com/not-receiving-form-submission-in-your-email/">Not receiving the email?</a>
				<div class="bootstrap-wrapper" style="height: 150px;overflow-y: scroll;width: 340px;">
					<div id="emailList"></div>
				</div>
			</td>
        </tr>

        <tr>
            <td style="text-align: right">From name</td><td> <input placeholder="Default (Wordpress)" type="text" id="redNaoFromName" style="width:300px"></td>
        </tr>

        <tr>
            <td style="text-align: right">To email address(es)</td><td> <select multiple="multiple" id="redNaoToEmail" style="width:300px"></select></td>
        </tr>

        <tr>
            <td style="text-align: right">Email subject</td><td> <input placeholder="Default (Form Submitted)" type="text" id="redNaoEmailSubject" style="width:300px"></td>
        </tr>
    </table>

    <div id="redNaoFormulaComponent" style="padding:0" title="Formula Editor">
		<table>
			<tr>
				<td>
					<textarea style="width:510px;height:300px;padding: 5px;" id="redNaoFormulaTextArea" PLACEHOLDER="Here you can add arithmetical operations between fields.                    Example: [field rnfield1]+[field rnfield2]"></textarea>
				</td>
				<td style="vertical-align: top">
					<div id="redNaoFormulaAccordion" class="smartFormsSlider" >
						<h3>Form Fields</h3>
						<div>
							<ul id="redNaoFormulaFormFields">

							</ul>
						</div>

					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div ><button  onclick="RedNaoFormulaWindowVar.Validate();">Validate</button> <input type="checkbox" id="smartFormsHumanReadableCheck" style="vertical-align: middle;display: none;"/> <span style="display: none">Show field id</span></div>
				</td>
			</tr>
		</table>

    </div>



    <div id="redNaoEmailEditorComponent">
    <?php
	add_filter( 'wp_default_editor', 'smart_forms_force_default_editor' );
	function smart_forms_force_default_editor() {
		//allowed: tinymce, html, test
		return 'tinymce';
	}
	wp_editor( "", "redNaoTinyMCEEditor"); ?>


    <div id="redNaoAccordion" class="smartFormsSlider" style="float:right;">
        <h3>Form Fields</h3>
        <div>
            <ul id="redNaoEmailFormFields">

            </ul>
        </div>
		<h3>Fixed Values</h3>
		<div>
			<ul id="redNaoEmailFormFixedFields">

			</ul>
		</div>
    </div>
    </div>
    <div style="text-align: right;clear: both;">
        <button onclick="RedNaoEmailEditorVar.CloseEmailEditor();">Close</button>
        <button onclick="SmartFormsAddNewVar.SendTestEmail();">Send Test Email</button>
    </div>
</div>
<div id="redNaoStyleEditor" title="<?php echo __("Style Editor")?>" style="display: none;margin:0;padding:0;">
	<table style="width: 100%;height: 100%;">

		<tr>
			<td style="width: 550px;">
				<div id="styleEditorPreview" class="rednaoFormContainer bootstrap-wrapper" style="width: 100%;height: 100%;">
					<table style="width: 100%;height: 100%;">
						<tr>
							<td style="vertical-align: middle;" id="smartFormStyleEditorContainer">

							</td>
						</tr>
					</table>
				</div>
			</td>
			<td>
				<div style="width: 100%;height: 100%;" class="bootstrap-wrapper">
					<div style="text-align: right" class="rnEditorContainer">
						<label>Apply to:</label>
						<select  id="rnStyleApplyTo">
							<option value="1">This field</option>
							<option id="allOfTypeOption" value="2">All fields of the same type</option>
							<option value="3">All fields</option>
						</select>
					</div>


					<ul class="nav nav-tabs rnEditorContainer" >
						<li role="presentation" class="active"><a id="rnStyleEditorAttribute" href="#styleEditorAttributes" data-toggle="tab">Styles</a></li>
						<li role="presentation"><a href="#styleCustomRules" data-toggle="tab">Custom CSS (Advanced)</a></li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="styleEditorAttributes" >
						</div>
						<div class="tab-pane" id="styleCustomRules" >
							<textarea style="width: 100%;height: 555px;" id="rnCustomStyleContent" placeholder="Here you can put only style rules (e.g. background-color:red;), not selectors (e.g. .mybutton{background-color:red;}.
If you want to add your own selectors and rules please add them in the CSS tab of your form.
Tip:If your rule is not working try adding !important (e.g. background-color:red !important;)"></textarea>
							<button id="rnApplyCustomRule" style="margin-left: auto;display: block;">Apply Custom Rules</button>
						</div>
					</div>
				</div>
			</td>
		</tr>
	</table>

</div>


<div id="smartFormsJavascriptDiv" style="display: none;margin: 0 20px 0 0;">
    <textarea id="smartFormsJavascriptText"></textarea>
    <div style="text-align: right;">
        <button onclick="SmartFormsAddNewVar.RestoreDefault()">Restore default</button>
        <button onclick="SmartFormsAddNewVar.Validate()">Validate</button>
    </div>
</div>

<?php
	for($i=0; $i<count($tabs);$i++)
	{
		echo "<div style='display:none;' class='smartFormsCustomTab'  id='smartFormsCustom".$i."Div'>";
			echo $tabs[$i]["content"];
		echo "</div>";
	}
?>



<div id="smartDonationsDiv" style="display: none">
    <table style="width: 100%">
        <tr>
            <td style="text-align: right;width: 200px;">Campaign</td><td> <select id="redNaoCampaign"></select></td>
        </tr>
        <tr >
            <td style="text-align: right" ><span class="smartDonationsConfigurationInfo">PayPal email</span></td><td class="smartDonationsConfigurationInfo"> <input type="text" id="smartDonationsEmail" />  <span  class="description smartDonationsConfigurationInfoDesc" style="margin-bottom:5px;display: inline;"> <?php echo __("*The email of your paypal account"); ?></span></td>
        </tr>
        <tr >
            <td style="text-align: right"><span class="smartDonationsConfigurationInfo">Donation description</span></td><td class="smartDonationsConfigurationInfo"> <input type="text" id="smartDonationsDescription"/><span class="description smartDonationsConfigurationInfoDesc" style="margin-bottom:5px;display: inline;"> <?php echo __("*This description is going to be shown in the Paypal transaction page "); ?><a href="<?php echo SMART_FORMS_DIR_URL?>images/paypal_transaction_page.png" target="_blank"><?php echo __("(Screenshot)")?></a></span></td>
        </tr>



        <tr >
            <td style="text-align: right"><span class="smartDonationsConfigurationInfo">Currency</span></td><td> <select class="smartDonationsConfigurationInfo" id="smartDonationsCurrencyDropDown" name="donation_currency"></select></td>
        </tr>


        <tr >
       <?php /*     <td style="text-align: right"><span class="smartDonationsConfigurationInfo">Send thank you email</span></td><td class="smartDonationsConfigurationInfo"> <input  type="checkbox" id="redNaoSendThankYouEmail" ><span  class="description smartDonationsConfigurationInfoDesc" style="margin-bottom:5px;display: inline;"> <?php echo __("*If you check this box the thank you email is going to be send to the donators "); ?> <a href="<?php echo SMART_FORMS_DIR_URL?>images/campaign.png" target="_blank"><?php echo __("(Screenshot)")?></a></span></td> */?>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                <button class="smartDonationsConfigurationInfo" id="setUpDonationFormulaButton">Setup donation formula</button>
            </td>
        </tr>


    </table>
</div>

<div class="bootstrap-wrapper">
    <table id="smartFormsAfterSubmitDiv" style="display: none;" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>Activate</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr class="sfAfterSubmitAction">
                <td style="text-align: center"> <input type="checkbox"  id="smartFormsSendNotificationEmail"/></td>
                <td>
                    <span><?php echo __("Send notification email"); ?></span>
                    <button id="redNaoEditEmailButton" class="btn btn-default" disabled="disabled"><?php echo __("Edit Email"); ?></button>
                </td>
            </tr>

            <tr class="sfAfterSubmitAction">
                <td style="text-align: center"><input  type="checkbox"   id="redNaoRedirectToCB"/></td>
                <td>
                    <span ><?php echo __("Redirect to"); ?></span>
                    <table id="redirectToOptionsItems">

                    </table>


                </td>
            </tr>

            <tr class="sfAfterSubmitAction">
                <td style="text-align: center"><input style="vertical-align: top"  type="checkbox"  id="redNaoAlertMessageCB"/></td>
                <td>
                    <span style="vertical-align: top"><?php echo __("Show alert message"); ?></span>
                    <textarea style="width:250px;height: 70px;" id="alertMessageInput" disabled="disabled" ></textarea>
                </td>
            </tr>


        </tbody>
    </table>
</div>



<div id="smartFormsCSSDiv" style="display: none;padding: 10px" class="form-horizontal bootstrap-wrapper">

	<textarea id="smartFormsCSSText" placeholder="You can put your custom css rules here, example:
button{
	background-color:red;
}
TIP: if the rule is not working try adding !important, e.g. background-color:red !important;
"></textarea>
    <button id="sfApplyCss">Apply</button>

</div>


<div id="smartFormsGeneralDiv">
<form >
    <div id="rednaoSmartForms">

        <input type="hidden" id="smartFormsId" value=""/>

        <div  >
            <div class="treeDiv" id="smartFormsBasic" style="display: inline-block">
                <img class="treeButton" src="<?php echo SMART_FORMS_DIR_URL?>images/arrow_down.png" alt=""/>
                <h2 class="treeTitle">Basic</h2>
            </div>

        </div>
        <div  id="smartFormsBasicDetail">
            <hr/>
            <div class="category">
                <span><?php echo __("Name"); ?></span>
                <input type="text"  id="smartFormName"/>
                <span class="description" style="margin-bottom:5px;"> <?php echo __("*The name of the form, this name is displayed in the form list"); ?></span>
                <br/>

                <span><?php echo __("Description"); ?></span>
                <input type="text"  id="smartFormDescription"/>
                <span class="description" style="margin-bottom:5px;"> <?php echo __("*The form description, this is displayed in the form list"); ?></span>
                <br/>

				<span><?php echo __("Invalid field message"); ?></span>
				<input style="width: 300px;" type="text"  id="smartFormsInvalidFieldMessage" value="*Please fill all the required fields"/>
				<span class="description" style="margin-bottom:5px;" ><?php echo __("*The message that is displayed when a required field is empty"); ?></span>
				<br/>
                <span><?php echo __("Form Type"); ?></span>
                <select id="rnFormType">
                    <option value="nor">Normal</option>
                    <option value="sec">Multiple Steps Form (pro)</option>
                </select>
                <br/>



            </div>
        </div>


        <br/>
    </div>
<!--

        <div class="treeDiv" id="smartDonationsAdvanced">
            <img class="treeButton" src="<?php echo plugin_dir_url(__FILE__)?>images/arrow_right.png" alt=""/>
            <h2 class="treeTitle">Advanced Options</h2>
        </div>
        <div  id="smartDonationsAdvancedDetail">
            <hr/>
            <div class="category" >
                <span>Currency</span>
                <select id="smartDonationsCurrencyDropDown" name="donation_currency"></select>
                <span class="description">*the selected currency for the donation</span>
                <br/>
                <span>Returning Url</span>
                <input type="text" id="smartDonationsReturningUrl"/>
                <span class="description">*Page displayed after he does a donation</span>
                <br/>
                <span>Donation Description</span>
                <input type="text" id="smartDonationsDonationDescription"/>
                <span class="description">*This text is going to be shown in the paypal invoice</span>
            </div>


        </div>-->

<hr style="margin:20px 0 0 -17px;"/>

       <div id="redNaoFormBackground" class="bootstrap-wrapper" style="background-color: #efefef;">
            <div class="rednaoformbuilder container rednaoFormContainer" style="margin:0;">

                <table style="border-collapse: collapse;background-color: #efefef;">
                    <tr>

                    <td style="vertical-align: top;background-color: white" class="smartFormsSelectedElementContainer">

                   <div class="span6 " id="newFormContainer">
                            <div class="clearfix" style="text-align:left;">


                                <div id="build">
                                    <div id="target" class="form-horizontal" style="background-color:white;">
                                        <div id="redNaoElementlist" class="formelements" >
                                            <div class="formelement last" style="clear:both;height:77px;width:100%; ">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                </td>


                <td style="background-color: #efefef; vertical-align: top;border-left:1px solid #cfcfcf">
                   <div id="formSettingsScrollArea">
                       <div id="formSettings" >
						   <ul class="nav nav-tabs" role="tablist" style="margin: 0">
							   <li   class="active"><a  id="formRadio1" href="#formBuilderComponents" data-toggle="tab"><span class="glyphicon glyphicon-list-alt"></span><?php echo __("Fields")?></a></li>
							   <li   ><a id="formRadio2" href="#formPropertiesContainer" data-toggle="tab"><span class="glyphicon glyphicon glyphicon-cog"></span><?php echo __("Field Settings")?></a></li>
							   <li " ><a id="formRadio3" href="#formConditionalLogicContainer" data-toggle="tab"><span class="glyphicon glyphicon glyphicon-link"></span><?php echo __("Conditional Logic")?></a></li>
						   </ul>
						   <!--
                            <div id="formBuilderButtonSet" class="smartFormsSlider">
                                <input type="radio" id="formRadio1" value="Fields"  name="smartFormsFormEditStyle"  checked="checked" style="display:inline-block;"/><label style="margin:0;width:150px;display:inline-block;" for="formRadio1"><?php echo __("Fields")?></label>
                                <input type="radio" id="formRadio2"  value="Settings" name="smartFormsFormEditStyle" style="display:inline-block;"/><label style="width:150px;margin: 0 0 0 -5px;display:inline-block;" for="formRadio2"><?php echo __("Field Settings")?></label>
								<input type="radio" id="formRadio3"  value="ConditionalLogic" name="smartFormsFormEditStyle" style="display:inline-block;"/><label style="width:170px;margin: 0 0 0 -5px;display:inline-block;" for="formRadio3"><?php echo __("Conditional Logic")?></label>
                            </div>-->

                            <div id="formBuilderContainer" class="tab-content">
                                <div class="span6 tab-pane active" id="formBuilderComponents">
                                    <h2 class="redNaoFormContainerHeading"><?php echo __("Drag &amp; Drop components")?></h2>
                                    <hr>
                                    <div class="tabbable" >
                                        <ul class="nav nav-tabs" id="navtab">
                                            <li><a id="alayout" class="formtab" ><?php echo __("Layout")?></a></li>
                                            <li><a id="atabinput" class="formtab selectedTab" ><?php echo __("Basic Input")?></a></li>
                                            <li><a id="atabselect" class="formtab"><?php echo __("Advanced")?></a></li>
                                            <li><a id="atabradioscheckboxes" class="formtab"><?php echo __("Multiple Choices")?></a></li>

                                            <li><a id="atabbuttons" class="formtab" <?php echo (has_smart_donations_license_and_is_active()?"":'style="display: none"');?> >Paypal</a></li>
											<li><a id="atabpro" class="formtab" ><?php echo __("Pro")?></a></li>
                                        </ul>
                                        <div class="form-horizontal" id="components">
                                            <fieldset  >
                                                <div class="tab-content">
                                                    <div class="tab-pane active rednaotablist" id="layout" style="display: none">
                                                        <div class="component">
                                                            <div class="control-group rednaotitle">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane active rednaotablist" id="tabinput">
                                                        <div class="component">
                                                            <div class="control-group rednaotextinput">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaoprependedtext">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaoappendedtext">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaoprependedcheckbox">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaoappendedcheckbox">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaotextarea">
                                                            </div>
                                                        </div>

                                                        <div class="component">
                                                            <div class="control-group rednaodatepicker">
                                                            </div>
                                                        </div>

														<div class="component">
															<div class="control-group rednaohtml">
															</div>
														</div>

                                                        <div class="component">
                                                            <div class="control-group rednaosubmissionbutton">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="tab-pane rednaotablist" id="tabselect"  style="display: none;">
                                                        <div class="component">
                                                            <div class="control-group rednaoname">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaophone">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaoemail">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaonumber">
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group row rednaocaptcha">
                                                                <div class="rednao_label_container col-sm-3"><label class="rednao_control_label">Captcha</label></div>
                                                                <div class="control-group redNaoControls rednaocaptcha col-sm-9">
                                                                    <img style="width:300px;height:116px;" src="<?php echo SMART_FORMS_DIR_URL?>images/captcha.png"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="component">
                                                            <div class="control-group rednaoaddress">
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div class="tab-pane rednaotablist" id="tabradioscheckboxes" style="display: none;">
                                                        <div class="component">
                                                            <div class="control-group rednaomultipleradios"></div>
                                                        </div>

                                                        <div class="component">
                                                            <div class="control-group rednaomultiplecheckboxes">
                                                            </div>
                                                        </div>

                                                        <div class="component">
                                                            <div class="control-group rednaoselectbasic">
                                                            </div>
                                                        </div>

                                                        <div class="component">
                                                            <div class="control-group rednaosearchablelist">
                                                            </div>
                                                        </div>

                                                    </div>

                                                   <div class="tab-pane rednaotablist" id="tabbuttons"  style="display: none;">
                                                        <div class="component">
                                                            <div class="control-group rednaodonationrecurrence">
                                                            </div>
                                                        </div>
                                                       
                                                        <div class="component">
                                                            <div class="control-group rednaodonationbutton">
                                                            </div>
                                                        </div>
                                                    </div>

													<div class="tab-pane rednaotablist" id="tabpro"  style="display: none;">
														<h4 id="smartFormsProWarning" style="margin-top: 0;"><span style="color: red;"><?php echo __("Warning")?></span> <?php echo __("This field require a license of smart forms, you can get one ")?><a target="_blank" href="http://smartforms.rednao.com/getit"><?php echo __("here")?>.</a> <?php echo __("If you already have a license please")?> <a href="javascript:RedNaoLicensingManagerVar.ActivateLicense();"><?php echo __("activate it here")?></a> </h4>

														<div >
															<img src="<?php echo SMART_FORMS_DIR_URL?>images/file_upload.png"/>
														</div>
													</div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="formPropertiesContainer" >
                                    <table id="smartFormPropertiesTable" style="width:100%">

                                    </table>
                                </div>

								<div class="tab-pane" id="formConditionalLogicContainer" style="padding: 0px; overflow-x: hidden;" >
									<table id="sfPanelContainer" cellpadding="0" style="position: relative; width: 100%;">
										<tr>
											<td style="vertical-align: top;">
												<table id="sfSavedConditionList" style="width:550px;padding: 5px;">

												</table>
											</td>
										</tr>
									</table>
								</div>
                            </div>
                       </div>
                   </div>
                 </td>
                </tr>
                    </table>

            </div>
       </div>
</form>
<hr style="margin:0 0 0 -17px;"/>
</div>
</div>
<?php
do_action('smart_forms_pr_add_new_extension');

