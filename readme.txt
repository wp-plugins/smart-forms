=== Smart Forms ===
Contributors: EDGARROJAS
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=edseventeen%40gmail.com
Tags: form, forms, form builder, form maker, form creator, form generator, contact form, form widget, form plugin, bootstrap forms, jquery forms, form manager, ajax forms
Requires at least: 3.3
Tested up to: 3.9.2
Stable tag: 2.0.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

With Smart Forms build forms easily by dragging and dropping elements. Create multiple forms like contact forms or advanced forms that need fields calculations or send customizable emails!!.
== Description ==
For more information check: http://smartforms.rednao.com/getit
**If you have questions or suggestions please let me know in the smart forms official site here: https://www.facebook.com/pages/Smart-Forms/1453714741522601**
Also if you have issues or need support please submit a ticket in the smart forms support site: https://smartforms.uservoice.com


Smart Forms is a very powerful and easy to use Form Build plugin,the form builde lets you create forms by just dragging and dropping elements. The forms are responsive, they adjust to the available space. You can style each form element individually.

You can easily create contact forms, feedback forms, contact us forms or any kind of form, complex or not. 

If you require a form that display values depending of an operation with other forms (for example a form that display the total) you can do that with the Smart Forms calculated fields.
You can also customize the form to do an additional action abter the form is submitted, you could customize the form to send an email, show an alert or redirect to another page. This again is very easy to configure in the forms after submit tab.  The forms email can have any format and any information that you want, also, you can check the information of all the forms submitted so far in the forms entries screen.

**Features:**

*   **Responsive Forms**.- The forms adjust automatically to the available space making them usable in a pc or phone.
*   **Shortcode Forms**.- The forms can also be easily added to any post or page using a shortcode.
*   **Forms Entry Screen**.- Easily check the information that have been submitted so far in the entries screen.
*   **Customizable forms emails**.- After a form is submitted send an email with any information and format that you need.
*   **Calculated forms fields**.- You can use fields in a formulas to fill fields automatically (up to three fields per formula in the free version)
*   **Custom forms fields**.- Currently the plugin supports these custom forms elements: name, phone, email, address, number,captcha.
*   **File Uploader (pro)**.- Allow you to upload files in a form, you can configure the form to accept only one file or multiple.
*   **Conditional Logic**.- Show and hide fields depending on other fields values.
*   **Forms Compatible with Smart donations**.- You can create paypal forms with this plugin and also enjoy all the power of smart donations (https://wordpress.org/plugins/smart-donations/, an smart donation license is required)
== Installation ==
1. Upload smart forms to the `/wp-content/plugins/` directory
2. Activate the item named  'smart forms' in the 'Plugins' menu in WordPress
3. Go to Smart Forms /Add new and create a new form
4. To add the form to a widget go to widgets and drag the smart form widget
5. To add the form to a post type [sform]formid[/sform] (example:[sform]1[/sform]), you can find the formid of your form on the form list

== Frequently Asked Questions ==
**How can i receive an email with the information of the form?**
You can configure this in the form builder. Go to the email configuration screen (in the forms after submit tab->edit email) and add the email that you want to receive the form information in the field "Send email to". For a video demostration pelase check the smart forms tutorials, specially this video: http://www.youtube.com/watch?v=kpRWqrYYPVY

**I get an error message when i try to "Send a test email"**
Your server should be able to send emails in order for this to work. Please check the configuration

**How can i send an email to the person that submitted the form?**
Please check the smart forms tutorial: https://www.youtube.com/watch?v=EH_eT9_67nQ 

**How can i make my form to support japanese characters**
This generally happens when your database doesn't support UTF-8 characters, so the form elements can not be stores properly. Please change your database to support UTF-8 characters and then try to submit a form to see if that worked.

**How can i style the elements of the form**
1. Select the form element that you want to style
2. Click in the paint icon (to the right of the form element)
3. Style it and save the form

== Screenshots ==
1. Dragging a form element
2. Form Entries example
3. Example of a form
4. Example of the same form seen in an iphone
5. Adding form as a widget
6. Adding form as a shortcode
7. Advance email formatting
8. Example of a form with a calculated field
9. Calculated field interface
10. Example of date field
11. Conditional logic example
== Changelog ==
= Smart Forms 2.5 =
* Update smart forms logic, making required but hidden fields in the forms not required.
= Smart Forms 2.3 =
* Updated smart forms's site.
= Smart Forms 2.0 =
* Added conditional formatting
= Smart Forms 1.5.23 =
Form builder improvement, added word count to text area
= Smart Forms 1.5.22 =
* Forms builder improvement, added css to fix issue with email editor.
= Smart Forms 1.5.21 =
* Forms Entries improvement, Increased the entries page size.
* Forms Entries improvement, added date in grid.
= Smart Forms 1.5.20 =
* Form builder improvements, Added instructions to formula screen to make it more understandable
= Smart Forms 1.5.16 =
* Fixed form builder bug in the email editor.
= Smart Forms 1.5.15 =
* Added fix in the form builder for tinymce.
= Smart Forms 1.5.13 =
* Improving form builder, adding before form submit ability to stop form submission.
= Smart Forms 1.5.12 =
* Fixing form element captcha to not focus when form loads.
* Form improvement, fixing "Send email to" in the form's email configuration.
= Smart Forms 1.5.11 =
* Fixed an issue when the forms when activating the plugin.
= Smart Forms 1.5 =
* Improved form builder, added file uploader.
* Fixing issue in form builder, color designer was not styiling the labels correctly when the form was loaded.
= Smart Forms 1.2.21 =
* Fixed form builder issue with clone button.
= Smart Forms 1.2.20 =
* Fixed scroll of the email editor scroll in the form builder.
* Added ability to delete rows in the entries screen (pro)
* Fixed issue of exporter not exporting everything when the data was paginated

* Added ability to delete entries(pro)
= Smart Forms 1.2.19 =
* Form builder modification. Making style editor a free feature, sorry this was supposed to be free from the beginning.
* Forms fix, fixed issue with the email to field, in the form builder under the email editor
= Smart Forms 1.2.18 =
* Forms improvement, created style designer
= Smart Forms 1.2.17 =
*Forms fix, fixed issue with calculated fields and check/radio boxes.
= Smart Forms 1.2.16 =
* Forms improvements in form builder, added the option to configure dynamic to emails.

= Smart Forms 1.2.15 =
* Forms improvements in form builder, adding a Default Contry property to the countries field.

= Smart Forms 1.2.13 =
* Forms improvements in form builder, added more validation to make it easier to configure an email
* Form field fix, email validation corrected.
* Added tutorial screen in smart forms to make it easier to find it.
= Smart Forms 1.2.11 =
* Emailer fix, fixing an issue with email not overwriting the from name
= Smart Forms 1.2.11 =
* Forms fix in form builder, fixed issue with form field
* Forms fix, fixed issue with title field

= Smart Forms 1.2.10 =
* Forms improvements in form builder, added minimun and maximun in the numeric field
* Forms improvements in form builder, added a configuration to define the invalid value text
= Smart Forms 1.2.9 =
* Forms Improvements in form builder, added a new property to the text area so you can disable it
= Smart Forms 1.2.8 =
* Forms Improvements disabled the checkbox edition in the form builder.
= Smart Forms 1.2.7 =
*Improved forms/Form builder, added validations to checkbox and dropdown
*Fixed forms/form builder, fixed issue of checkbox triming width
= Smart Forms 1.2.6 =
* Fixed forms form builder issue where imaes in the form radio button was not displayed
* Fixed forms editor, the formula screen was not displayed correctly
* Fixed forms form builder, the image of the formula was not getting displayed
= Smart Forms 1.2.5 =
* Fixed forms editor, Fixed issue with forms captcha
* Fixed forms editor, Fixed minor issue with forms submission
= Smart Forms 1.2.4 =
* Fixed forms generator, Fixed issue with redirecting not working with donations.
= Smart Forms 1.2.3 =
* Improving forms editor, Improved formula window

= Smart Forms 1.2.2 =
* Fixed forms editor, Fixed an issue with the form formulas
= Smart Forms 1.2.1 =
* Fixed forms editor, Added main class to widget
= Smart Forms 1.2 =
* Fixed forms editor, Fixed issue with form formulas
= Smart Forms 0.9 =
* Fixed forms editor, Added the ability to clone an existing form, so you don't have to do everything again if you want to create similar forms.
* Adding new feature, Added a wishlist/support page

= Smart Forms 1.1 =
* Fixed forms editor, Fixed issue with the text area form element
* Fixed forms editor, Fixed problem with the form form builder
* Improving forms editor, Added the option to select if you want to use horizontal radio or checkboxes

= Smart Forms 0.8.5 =
* Improving forms editor, Improving selection of options in the checkbox, radio buttons and select boxes

= Smart Forms 0.8 =
* Improving forms entry, Adding css export of submitted forms to entries screen
= Smart Forms 0.7 =
* Fixed forms editor, Fixing issue with the form submission
* Improving forms editor, Adding  the posibility to redirect to another page after the form was submitted
* Improving forms editor, Adding the posibility to customize the submission successfull message
* Fixed forms editor, Fixing a css issue with the form text boxes.
* Fixed forms editor, Fixed issues with forms
* Fixed forms editor, Fixed issue en the forms entries screen

= Smart forms 0.6 =
* Improving forms editor, Added new forms elements (email,phone, address, captcha,number)
* Fixed forms editor, Fixing issues with form email
* Fixed forms editor, Fixing issue with forms formulas
* Improving form, Added a wait cursor when the form is being submitted
= Smart forms 0.5.5 =
* Fixed forms editor, Fixed issue with form title element
* Improving form editor, Added Name form element
= Smart forms 0.5 =
* Fixed forms editor, Fixed issues with form width
* Added calculated fields to certain forms
* Fixed forms editor, Fixed issues in form builder
* Improving form editor, Added a new form element, date picker
= Smart forms 0.3 =
* Improving forms editor, Added advanced customization for forms email.
* Fixed forms editor, Fixed bugs in the form builder
* Fixed forms editor, Fixed bug in the form checkbox
* Fixed forms editor, Added the option to purchase the Smart Forms full version
= Smart forms 0.1 =
* First release of smart forms.
= Smart Forms 0.1.1 =
* Fixed forms editor, Fixing issues with the form entries screen
* Allow the grid of the form entries to expand based on entries
* Fixed forms editor, Fixing responsive forms

= Smart Forms 0.1.2 =
* Fixed form issue with required fields and form submission.
== Upgrade Notice ==

= Smart Forms 0.6 =
I fixed an issue with formulas in ie8, please after updating recreate your formulas (entering and exiting the formula screen) if you have any.

==Smart forms quick tutorials==
**Special thanks to**
Designmodo - https://www.iconfinder.com/icons/115789/trash_icon#size=16
**Installing Smart Forms**
1. Upload smart forms to the `/wp-content/plugins/` directory
2. Activate the item named  'smart forms' in the 'Plugins' menu in WordPress
3. Go to Smart Forms /Add new and create a new form
4. To add the form to a widget go to widgets and drag the smart form widget
5. To add the form to a post type [sform]formid[/sform] (example:[sform]1[/sform]), you can find the formid of your form on the form list

**Creating a new Forms**
1. Follow "Installing Smart Forms"
2. Click in smart forms
3. Click in add new
4. Drag the forms elements that you want to display 
3. (Optional) If you want to do an additional action after a form is submitted. Go to the forms after submit tab, you can:
		a)Send a notification email with the form information
		b)Show an alert with the text that you want. This alert is shown after the form was successfully saved.
		c)Redireect the user that submitted the form to another page.
4. Save the form.
5. After the form is saved you might want to add the form to a post (Follow "Add form to a post")  or add the form to a widget (Follow "Add form to a widget")
6. For a video tutorial please visit the smart forms tutorial screen

**Add the form to a post**
1. Follow "Installing Smart Forms"
2. Follow "Creating a new Form" to have your new form.
3. Go to a page or post
4. Click in the smart forms button
5. A pop up will show with the list of forms that you have created in Smart Forms. Select the form that you want.
6. Save the post.
7. When you visit the post the form will show up
8. For a video tutorial please visit the smart forms tutorial screen

**Add the form as a widget**
1. Follow "Installing Smart Forms"
2. Follow "Creating a new Form" to have your new form.
3. Go to the widget configuration
4. You will see an Smart Forms widget, drag it to wherever you want to display the form
5. The widget will contain the list of all the forms that you have created with Smart Forms.
6. Select the form that you want
7. The widget will display the form
8. For a video tutorial please visit the smart forms tutorial screen

**Configuring forms notification email**
1. Follow "Installing Smart Forms"
2. Click in smart forms
3. Click in add new
4. Drag the forms elements that you want
5. Go to edit email (in the forms after submit tab)
6. Configure the email as you want it. You can click in the field buttons to add form values
7. Put the emails that you want to be notified of a form submission in the  "Send email to" box, you can also define a form field.
8. Save the form
9. For a video tutorial please visit the smart forms tutorial screen


**Style Used**
Foundation and other contributors Licensed MIT */.smartFormsSlider .ui-helper-hidden{display:none}.smartFormsSlider .ui-helper-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.smartFormsSlider .ui-helper-reset{margin:0;padding:0;border:0;outline:0;line-height:1.3;text-decoration:none;font-size:100%;list-style:none}.smartFormsSlider .ui-helper-clearfix:before,.smartFormsSlider .ui-helper-clearfix:after{content:"";display:table;border-collapse:collapse}.smartFormsSlider .ui-helper-clearfix:after{clear:both}.smartFormsSlider .ui-helper-clearfix{min-height:0}.smartFormsSlider .ui-helper-zfix{width:100%;height:100%;top:0;left:0;position:absolute;opacity:0;filter:Alpha(Opacity=0)}.smartFormsSlider .ui-front{z-index:100}.smartFormsSlider .ui-state-disabled{cursor:default!important}.smartFormsSlider .ui-icon{display:block;text-indent:-99999px;overflow:hidden;background-repeat:no-repeat}.smartFormsSlider .ui-widget-overlay{position:fixed;top:0;left:0;width:100%;height:100%}.smartFormsSlider .ui-resizable{position:relative}.smartFormsSlider .ui-resizable-handle{position:absolute;font-size:.1px;display:block}.smartFormsSlider .ui-resizable-disabled .ui-resizable-handle,.smartFormsSlider .ui-resizable-autohide .ui-resizable-handle{display:none}.smartFormsSlider .ui-resizable-n{cursor:n-resize;height:7px;width:100%;top:-5px;left:0}.smartFormsSlider .ui-resizable-s{cursor:s-resize;height:7px;width:100%;bottom:-5px;left:0}.smartFormsSlider .ui-resizable-e{cursor:e-resize;width:7px;right:-5px;top:0;height:100%}.smartFormsSlider .ui-resizable-w{cursor:w-resize;width:7px;left:-5px;top:0;height:100%}.smartFormsSlider .ui-resizable-se{cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.smartFormsSlider .ui-resizable-sw{cursor:sw-resize;width:9px;height:9px;left:-5px;bottom:-5px}.smartFormsSlider .ui-resizable-nw{cursor:nw-resize;width:9px;height:9px;left:-5px;top:-5px}.smartFormsSlider .ui-resizable-ne{cursor:ne-resize;width:9px;height:9px;right:-5px;top:-5px}.smartFormsSlider .ui-button{display:inline-block;position:relative;padding:0;line-height:normal;margin-right:.1em;cursor:pointer;vertical-align:middle;text-align:center;overflow:visible}.smartFormsSlider .ui-button,.smartFormsSlider .ui-button:link,.smartFormsSlider .ui-button:visited,.smartFormsSlider .ui-button:hover,.smartFormsSlider .ui-button:active{text-decoration:none}.smartFormsSlider .ui-button-icon-only{width:2.2em}button.smartFormsSlider .ui-button-icon-only{width:2.4em}.smartFormsSlider .ui-button-icons-only{width:3.4em}button.smartFormsSlider .ui-button-icons-only{width:3.7em}.smartFormsSlider .ui-button .ui-button-text{display:block;line-height:normal}.smartFormsSlider .ui-button-text-only .ui-button-text{padding:.4em 1em}.smartFormsSlider .ui-button-icon-only .ui-button-text,.smartFormsSlider .ui-button-icons-only .ui-button-text{padding:.4em;text-indent:-9999999px}.smartFormsSlider .ui-button-text-icon-primary .ui-button-text,.smartFormsSlider .ui-button-text-icons .ui-button-text{padding:.4em 1em .4em 2.1em}.smartFormsSlider .ui-button-text-icon-secondary .ui-button-text,.smartFormsSlider .ui-button-text-icons .ui-button-text{padding:.4em 2.1em .4em 1em}.smartFormsSlider .ui-button-text-icons .ui-button-text{padding-left:2.1em;padding-right:2.1em}input.smartFormsSlider .ui-button{padding:.4em 1em}.smartFormsSlider .ui-button-icon-only .ui-icon,.smartFormsSlider .ui-button-text-icon-primary .ui-icon,.smartFormsSlider .ui-button-text-icon-secondary .ui-icon,.smartFormsSlider .ui-button-text-icons .ui-icon,.smartFormsSlider .ui-button-icons-only .ui-icon{position:absolute;top:50%;margin-top:-8px}.smartFormsSlider .ui-button-icon-only .ui-icon{left:50%;margin-left:-8px}.smartFormsSlider .ui-button-text-icon-primary .ui-button-icon-primary,.smartFormsSlider .ui-button-text-icons .ui-button-icon-primary,.smartFormsSlider .ui-button-icons-only .ui-button-icon-primary{left:.5em}.smartFormsSlider .ui-button-text-icon-secondary .ui-button-icon-secondary,.smartFormsSlider .ui-button-text-icons .ui-button-icon-secondary,.smartFormsSlider .ui-button-icons-only .ui-button-icon-secondary{right:.5em}.smartFormsSlider .ui-buttonset{margin-right:7px}.smartFormsSlider .ui-buttonset .ui-button{margin-left:0;margin-right:-.3em}input.smartFormsSlider .ui-button::-moz-focus-inner,button.smartFormsSlider .ui-button::-moz-focus-inner{border:0;padding:0}.smartFormsSlider .ui-dialog{position:absolute;top:0;left:0;padding:.2em;outline:0}.smartFormsSlider .ui-dialog .ui-dialog-titlebar{padding:.4em 1em;position:relative}.smartFormsSlider .ui-dialog .ui-dialog-title{float:left;margin:.1em 0;white-space:nowrap;width:90%;overflow:hidden;text-overflow:ellipsis}.smartFormsSlider .ui-dialog .ui-dialog-titlebar-close{position:absolute;right:.3em;top:50%;width:21px;margin:-10px 0 0 0;padding:1px;height:20px}.smartFormsSlider .ui-dialog .ui-dialog-content{position:relative;border:0;padding:.5em 1em;background:0;overflow:auto}.smartFormsSlider .ui-dialog .ui-dialog-buttonpane{text-align:left;border-width:1px 0 0;background-image:none;margin-top:.5em;padding:.3em 1em .5em .4em}.smartFormsSlider .ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset{float:right}.smartFormsSlider .ui-dialog .ui-dialog-buttonpane button{margin:.5em .4em .5em 0;cursor:pointer}.smartFormsSlider .ui-dialog .ui-resizable-se{width:12px;height:12px;right:-5px;bottom:-5px;background-position:16px 16px}.smartFormsSlider .ui-draggable .ui-dialog-titlebar{cursor:move}.smartFormsSlider .ui-slider{position:relative;text-align:left}.smartFormsSlider .ui-slider .ui-slider-handle{position:absolute;z-index:2;width:1.2em;height:1.2em;cursor:default}.smartFormsSlider .ui-slider .ui-slider-range{position:absolute;z-index:1;font-size:.7em;display:block;border:0;background-position:0 0}.smartFormsSlider .ui-slider.ui-state-disabled .ui-slider-handle,.smartFormsSlider .ui-slider.ui-state-disabled .ui-slider-range{filter:inherit}.smartFormsSlider .ui-slider-horizontal{height:.8em}.smartFormsSlider .ui-slider-horizontal .ui-slider-handle{top:-.3em;margin-left:-.6em}.smartFormsSlider .ui-slider-horizontal .ui-slider-range{top:0;height:100%}.smartFormsSlider .ui-slider-horizontal .ui-slider-range-min{left:0}.smartFormsSlider .ui-slider-horizontal .ui-slider-range-max{right:0}.smartFormsSlider .ui-slider-vertical{width:.8em;height:100px}.smartFormsSlider .ui-slider-vertical .ui-slider-handle{left:-.3em;margin-left:0;margin-bottom:-.6em}.smartFormsSlider .ui-slider-vertical .ui-slider-range{left:0;width:100%}.smartFormsSlider .ui-slider-vertical .ui-slider-range-min{bottom:0}.smartFormsSlider .ui-slider-vertical .ui-slider-range-max{top:0}.smartFormsSlider .ui-widget{font-family:Trebuchet MS,Tahoma,Verdana,Arial,sans-serif;font-size:1.1em}.smartFormsSlider .ui-widget .ui-widget{font-size:1em}.smartFormsSlider .ui-widget input,.smartFormsSlider .ui-widget select,.smartFormsSlider .ui-widget textarea,.smartFormsSlider .ui-widget button{font-family:Trebuchet MS,Tahoma,Verdana,Arial,sans-serif;font-size:1em}.smartFormsSlider .ui-widget-content{border:1px solid #ddd;background:#eee url(./images/ui-bg_highlight-soft_100_eeeeee_1x100.png) 50% top repeat-x;color:#333}.smartFormsSlider .ui-widget-header{border:1px solid #e78f08;background:#f6a828 url(./images/ui-bg_gloss-wave_35_f6a828_500x100.png) 50% 50% repeat-x;color:#fff;font-weight:bold}.smartFormsSlider .ui-widget-header a{color:#fff}.smartFormsSlider .ui-state-default,.smartFormsSlider .ui-widget-content .ui-state-default,.smartFormsSlider .ui-widget-header .ui-state-default{border:1px solid #ccc;background:#f6f6f6 url(./images/ui-bg_glass_100_f6f6f6_1x400.png) 50% 50% repeat-x;font-weight:bold;color:#1c94c4}.smartFormsSlider .ui-state-default a,.smartFormsSlider .ui-state-default a:link,.smartFormsSlider .ui-state-default a:visited{color:#1c94c4;text-decoration:none}.smartFormsSlider .ui-state-hover,.smartFormsSlider .ui-widget-content .ui-state-hover,.smartFormsSlider .ui-widget-header .ui-state-hover,.smartFormsSlider .ui-state-focus,.smartFormsSlider .ui-widget-content .ui-state-focus,.smartFormsSlider .ui-widget-header .ui-state-focus{border:1px solid #fbcb09;background:#fdf5ce url(./images/ui-bg_glass_100_fdf5ce_1x400.png) 50% 50% repeat-x;font-weight:bold;color:#c77405}.smartFormsSlider .ui-state-hover a,.smartFormsSlider .ui-state-hover a:hover,.smartFormsSlider .ui-state-hover a:link,.smartFormsSlider .ui-state-hover a:visited{color:#c77405;text-decoration:none}.smartFormsSlider .ui-state-active,.smartFormsSlider .ui-widget-content .ui-state-active,.smartFormsSlider .ui-widget-header .ui-state-active{border:1px solid #fbd850;background:#fff url(./images/ui-bg_glass_65_ffffff_1x400.png) 50% 50% repeat-x;font-weight:bold;color:#eb8f00}.smartFormsSlider .ui-state-active a,.smartFormsSlider .ui-state-active a:link,.smartFormsSlider .ui-state-active a:visited{color:#eb8f00;text-decoration:none}.smartFormsSlider .ui-state-highlight,.smartFormsSlider .ui-widget-content .ui-state-highlight,.smartFormsSlider .ui-widget-header .ui-state-highlight{border:1px solid #fed22f;background:#ffe45c url(./images/ui-bg_highlight-soft_75_ffe45c_1x100.png) 50% top repeat-x;color:#363636}.smartFormsSlider .ui-state-highlight a,.smartFormsSlider .ui-widget-content .ui-state-highlight a,.smartFormsSlider .ui-widget-header .ui-state-highlight a{color:#363636}.smartFormsSlider .ui-state-error,.smartFormsSlider .ui-widget-content .ui-state-error,.smartFormsSlider .ui-widget-header .ui-state-error{border:1px solid #cd0a0a;background:#b81900 url(./images/ui-bg_diagonals-thick_18_b81900_40x40.png) 50% 50% repeat;color:#fff}.smartFormsSlider .ui-state-error a,.smartFormsSlider .ui-widget-content .ui-state-error a,.smartFormsSlider .ui-widget-header .ui-state-error a{color:#fff}.smartFormsSlider .ui-state-error-text,.smartFormsSlider .ui-widget-content .ui-state-error-text,.smartFormsSlider .ui-widget-header .ui-state-error-text{color:#fff}.smartFormsSlider .ui-priority-primary,.smartFormsSlider .ui-widget-content .ui-priority-primary,.smartFormsSlider .ui-widget-header .ui-priority-primary{font-weight:bold}.smartFormsSlider .ui-priority-secondary,.smartFormsSlider .ui-widget-content .ui-priority-secondary,.smartFormsSlider .ui-widget-header .ui-priority-secondary{opacity:.7;filter:Alpha(Opacity=70);font-weight:normal}.smartFormsSlider .ui-state-disabled,.smartFormsSlider .ui-widget-content .ui-state-disabled,.smartFormsSlider .ui-widget-header .ui-state-disabled{opacity:.35;filter:Alpha(Opacity=35);background-image:none}.smartFormsSlider .ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}.smartFormsSlider .ui-icon{width:16px;height:16px}.smartFormsSlider .ui-icon,.smartFormsSlider .ui-widget-content .ui-icon{background-image:url(./images/ui-icons_222222_256x240.png)}.smartFormsSlider .ui-widget-header .ui-icon{background-image:url(./images/ui-icons_ffffff_256x240.png)}.smartFormsSlider .ui-state-default .ui-icon{background-image:url(./images/ui-icons_ef8c08_256x240.png)}.smartFormsSlider .ui-state-hover .ui-icon,.smartFormsSlider .ui-state-focus .ui-icon{background-image:url(./images/ui-icons_ef8c08_256x240.png)}.smartFormsSlider .ui-state-active .ui-icon{background-image:url(./images/ui-icons_ef8c08_256x240.png)}.smartFormsSlider .ui-state-highlight .ui-icon{background-image:url(./images/ui-icons_228ef1_256x240.png)}.smartFormsSlider .ui-state-error .ui-icon,.smartFormsSlider .ui-state-error-text .ui-icon{background-image:url(./images/ui-icons_ffd27a_256x240.png)}.smartFormsSlider .ui-icon-blank{background-position:16px 16px}.smartFormsSlider .ui-icon-carat-1-n{background-position:0 0}.smartFormsSlider .ui-icon-carat-1-ne{background-position:-16px 0}.smartFormsSlider .ui-icon-carat-1-e{background-position:-32px 0}.smartFormsSlider .ui-icon-carat-1-se{background-position:-48px 0}.smartFormsSlider .ui-icon-carat-1-s{background-position:-64px 0}.smartFormsSlider .ui-icon-carat-1-sw{background-position:-80px 0}.smartFormsSlider .ui-icon-carat-1-w{background-position:-96px 0}.smartFormsSlider .ui-icon-carat-1-nw{background-position:-112px 0}.smartFormsSlider .ui-icon-carat-2-n-s{background-position:-128px 0}.smartFormsSlider .ui-icon-carat-2-e-w{background-position:-144px 0}.smartFormsSlider .ui-icon-triangle-1-n{background-position:0 -16px}.smartFormsSlider .ui-icon-triangle-1-ne{background-position:-16px -16px}.smartFormsSlider .ui-icon-triangle-1-e{background-position:-32px -16px}.smartFormsSlider .ui-icon-triangle-1-se{background-position:-48px -16px}.smartFormsSlider .ui-icon-triangle-1-s{background-position:-64px -16px}.smartFormsSlider .ui-icon-triangle-1-sw{background-position:-80px -16px}.smartFormsSlider .ui-icon-triangle-1-w{background-position:-96px -16px}.smartFormsSlider .ui-icon-triangle-1-nw{background-position:-112px -16px}.smartFormsSlider .ui-icon-triangle-2-n-s{background-position:-128px -16px}.smartFormsSlider .ui-icon-triangle-2-e-w{background-position:-144px -16px}.smartFormsSlider .ui-icon-arrow-1-n{background-position:0 -32px}.smartFormsSlider .ui-icon-arrow-1-ne{background-position:-16px -32px}.smartFormsSlider .ui-icon-arrow-1-e{background-position:-32px -32px}.smartFormsSlider .ui-icon-arrow-1-se{background-position:-48px -32px}.smartFormsSlider .ui-icon-arrow-1-s{background-position:-64px -32px}.smartFormsSlider .ui-icon-arrow-1-sw{background-position:-80px -32px}.smartFormsSlider .ui-icon-arrow-1-w{background-position:-96px -32px}.smartFormsSlider .ui-icon-arrow-1-nw{background-position:-112px -32px}.smartFormsSlider .ui-icon-arrow-2-n-s{background-position:-128px -32px}.smartFormsSlider .ui-icon-arrow-2-ne-sw{background-position:-144px -32px}.smartFormsSlider .ui-icon-arrow-2-e-w{background-position:-160px -32px}.smartFormsSlider .ui-icon-arrow-2-se-nw{background-position:-176px -32px}.smartFormsSlider .ui-icon-arrowstop-1-n{background-position:-192px -32px}.smartFormsSlider .ui-icon-arrowstop-1-e{background-position:-208px -32px}.smartFormsSlider .ui-icon-arrowstop-1-s{background-position:-224px -32px}.smartFormsSlider .ui-icon-arrowstop-1-w{background-position:-240px -32px}.smartFormsSlider .ui-icon-arrowthick-1-n{background-position:0 -48px}.smartFormsSlider .ui-icon-arrowthick-1-ne{background-position:-16px -48px}.smartFormsSlider .ui-icon-arrowthick-1-e{background-position:-32px -48px}.smartFormsSlider .ui-icon-arrowthick-1-se{background-position:-48px -48px}.smartFormsSlider .ui-icon-arrowthick-1-s{background-position:-64px -48px}.smartFormsSlider .ui-icon-arrowthick-1-sw{background-position:-80px -48px}.smartFormsSlider .ui-icon-arrowthick-1-w{background-position:-96px -48px}.smartFormsSlider .ui-icon-arrowthick-1-nw{background-position:-112px -48px}.smartFormsSlider .ui-icon-arrowthick-2-n-s{background-position:-128px -48px}.smartFormsSlider .ui-icon-arrowthick-2-ne-sw{background-position:-144px -48px}.smartFormsSlider .ui-icon-arrowthick-2-e-w{background-position:-160px -48px}.smartFormsSlider .ui-icon-arrowthick-2-se-nw{background-position:-176px -48px}.smartFormsSlider .ui-icon-arrowthickstop-1-n{background-position:-192px -48px}.smartFormsSlider .ui-icon-arrowthickstop-1-e{background-position:-208px -48px}.smartFormsSlider .ui-icon-arrowthickstop-1-s{background-position:-224px -48px}.smartFormsSlider .ui-icon-arrowthickstop-1-w{background-position:-240px -48px}.smartFormsSlider .ui-icon-arrowreturnthick-1-w{background-position:0 -64px}.smartFormsSlider .ui-icon-arrowreturnthick-1-n{background-position:-16px -64px}.smartFormsSlider .ui-icon-arrowreturnthick-1-e{background-position:-32px -64px}.smartFormsSlider .ui-icon-arrowreturnthick-1-s{background-position:-48px -64px}.smartFormsSlider .ui-icon-arrowreturn-1-w{background-position:-64px -64px}.smartFormsSlider .ui-icon-arrowreturn-1-n{background-position:-80px -64px}.smartFormsSlider .ui-icon-arrowreturn-1-e{background-position:-96px -64px}.smartFormsSlider .ui-icon-arrowreturn-1-s{background-position:-112px -64px}.smartFormsSlider .ui-icon-arrowrefresh-1-w{background-position:-128px -64px}.smartFormsSlider .ui-icon-arrowrefresh-1-n{background-position:-144px -64px}.smartFormsSlider .ui-icon-arrowrefresh-1-e{background-position:-160px -64px}.smartFormsSlider .ui-icon-arrowrefresh-1-s{background-position:-176px -64px}.smartFormsSlider .ui-icon-arrow-4{background-position:0 -80px}.smartFormsSlider .ui-icon-arrow-4-diag{background-position:-16px -80px}.smartFormsSlider .ui-icon-extlink{background-position:-32px -80px}.smartFormsSlider .ui-icon-newwin{background-position:-48px -80px}.smartFormsSlider .ui-icon-refresh{background-position:-64px -80px}.smartFormsSlider .ui-icon-shuffle{background-position:-80px -80px}.smartFormsSlider .ui-icon-transfer-e-w{background-position:-96px -80px}.smartFormsSlider .ui-icon-transferthick-e-w{background-position:-112px -80px}.smartFormsSlider .ui-icon-folder-collapsed{background-position:0 -96px}.smartFormsSlider .ui-icon-folder-open{background-position:-16px -96px}.smartFormsSlider .ui-icon-document{background-position:-32px -96px}.smartFormsSlider .ui-icon-document-b{background-position:-48px -96px}.smartFormsSlider .ui-icon-note{background-position:-64px -96px}.smartFormsSlider .ui-icon-mail-closed{background-position:-80px -96px}.smartFormsSlider .ui-icon-mail-open{background-position:-96px -96px}.smartFormsSlider .ui-icon-suitcase{background-position:-112px -96px}.smartFormsSlider .ui-icon-comment{background-position:-128px -96px}.smartFormsSlider .ui-icon-person{background-position:-144px -96px}.smartFormsSlider .ui-icon-print{background-position:-160px -96px}.smartFormsSlider .ui-icon-trash{background-position:-176px -96px}.smartFormsSlider .ui-icon-locked{background-position:-192px -96px}.smartFormsSlider .ui-icon-unlocked{background-position:-208px -96px}.smartFormsSlider .ui-icon-bookmark{background-position:-224px -96px}.smartFormsSlider .ui-icon-tag{background-position:-240px -96px}.smartFormsSlider .ui-icon-home{background-position:0 -112px}.smartFormsSlider .ui-icon-flag{background-position:-16px -112px}.smartFormsSlider .ui-icon-calendar{background-position:-32px -112px}.smartFormsSlider .ui-icon-cart{background-position:-48px -112px}.smartFormsSlider .ui-icon-pencil{background-position:-64px -112px}.smartFormsSlider .ui-icon-clock{background-position:-80px -112px}.smartFormsSlider .ui-icon-disk{background-position:-96px -112px}.smartFormsSlider .ui-icon-calculator{background-position:-112px -112px}.smartFormsSlider .ui-icon-zoomin{background-position:-128px -112px}.smartFormsSlider .ui-icon-zoomout{background-position:-144px -112px}.smartFormsSlider .ui-icon-search{background-position:-160px -112px}.smartFormsSlider .ui-icon-wrench{background-position:-176px -112px}.smartFormsSlider .ui-icon-gear{background-position:-192px -112px}.smartFormsSlider .ui-icon-heart{background-position:-208px -112px}.smartFormsSlider .ui-icon-star{background-position:-224px -112px}.smartFormsSlider .ui-icon-link{background-position:-240px -112px}.smartFormsSlider .ui-icon-cancel{background-position:0 -128px}.smartFormsSlider .ui-icon-plus{background-position:-16px -128px}.smartFormsSlider .ui-icon-plusthick{background-position:-32px -128px}.smartFormsSlider .ui-icon-minus{background-position:-48px -128px}.smartFormsSlider .ui-icon-minusthick{background-position:-64px -128px}.smartFormsSlider .ui-icon-close{background-position:-80px -128px}.smartFormsSlider .ui-icon-closethick{background-position:-96px -128px}.smartFormsSlider .ui-icon-key{background-position:-112px -128px}.smartFormsSlider .ui-icon-lightbulb{background-position:-128px -128px}.smartFormsSlider .ui-icon-scissors{background-position:-144px -128px}.smartFormsSlider .ui-icon-clipboard{background-position:-160px -128px}.smartFormsSlider .ui-icon-copy{background-position:-176px -128px}.smartFormsSlider .ui-icon-contact{background-position:-192px -128px}.smartFormsSlider .ui-icon-image{background-position:-208px -128px}.smartFormsSlider .ui-icon-video{background-position:-224px -128px}.smartFormsSlider .ui-icon-script{background-position:-240px -128px}.smartFormsSlider .ui-icon-alert{background-position:0 -144px}.smartFormsSlider .ui-icon-info{background-position:-16px -144px}.smartFormsSlider .ui-icon-notice{background-position:-32px -144px}.smartFormsSlider .ui-icon-help{background-position:-48px -144px}.smartFormsSlider .ui-icon-check{background-position:-64px -144px}.smartFormsSlider .ui-icon-bullet{background-position:-80px -144px}.smartFormsSlider .ui-icon-radio-on{background-position:-96px -144px}.smartFormsSlider .ui-icon-radio-off{background-position:-112px -144px}.smartFormsSlider .ui-icon-pin-w{background-position:-128px -144px}.smartFormsSlider .ui-icon-pin-s{background-position:-144px -144px}.smartFormsSlider .ui-icon-play{background-position:0 -160px}.smartFormsSlider .ui-icon-pause{background-position:-16px -160px}.smartFormsSlider .ui-icon-seek-next{background-position:-32px -160px}.smartFormsSlider .ui-icon-seek-prev{background-position:-48px -160px}.smartFormsSlider .ui-icon-seek-end{background-position:-64px -160px}.smartFormsSlider .ui-icon-seek-start{background-position:-80px -160px}.smartFormsSlider .ui-icon-seek-first{background-position:-80px -160px}.smartFormsSlider .ui-icon-stop{background-position:-96px -160px}.smartFormsSlider .ui-icon-eject{background-position:-112px -160px}.smartFormsSlider .ui-icon-volume-off{background-position:-128px -160px}.smartFormsSlider .ui-icon-volume-on{background-position:-144px -160px}.smartFormsSlider .ui-icon-power{background-position:0 -176px}.smartFormsSlider .ui-icon-signal-diag{background-position:-16px -176px}.smartFormsSlider .ui-icon-signal{background-position:-32px -176px}.smartFormsSlider .ui-icon-battery-0{background-position:-48px -176px}.smartFormsSlider .ui-icon-battery-1{background-position:-64px -176px}.smartFormsSlider .ui-icon-battery-2{background-position:-80px -176px}.smartFormsSlider .ui-icon-battery-3{background-position:-96px -176px}.smartFormsSlider .ui-icon-circle-plus{background-position:0 -192px}.smartFormsSlider .ui-icon-circle-minus{background-position:-16px -192px}.smartFormsSlider .ui-icon-circle-close{background-position:-32px -192px}.smartFormsSlider .ui-icon-circle-triangle-e{background-position:-48px -192px}.smartFormsSlider .ui-icon-circle-triangle-s{background-position:-64px -192px}.smartFormsSlider .ui-icon-circle-triangle-w{background-position:-80px -192px}.smartFormsSlider .ui-icon-circle-triangle-n{background-position:-96px -192px}.smartFormsSlider .ui-icon-circle-arrow-e{background-position:-112px -192px}.smartFormsSlider .ui-icon-circle-arrow-s{background-position:-128px -192px}.smartFormsSlider .ui-icon-circle-arrow-w{background-position:-144px -192px}.smartFormsSlider .ui-icon-circle-arrow-n{background-position:-160px -192px}.smartFormsSlider .ui-icon-circle-zoomin{background-position:-176px -192px}.smartFormsSlider .ui-icon-circle-zoomout{background-position:-192px -192px}.smartFormsSlider .ui-icon-circle-check{background-position:-208px -192px}.smartFormsSlider .ui-icon-circlesmall-plus{background-position:0 -208px}.smartFormsSlider .ui-icon-circlesmall-minus{background-position:-16px -208px}.smartFormsSlider .ui-icon-circlesmall-close{background-position:-32px -208px}.smartFormsSlider .ui-icon-squaresmall-plus{background-position:-48px -208px}.smartFormsSlider .ui-icon-squaresmall-minus{background-position:-64px -208px}.smartFormsSlider .ui-icon-squaresmall-close{background-position:-80px -208px}.smartFormsSlider .ui-icon-grip-dotted-vertical{background-position:0 -224px}.smartFormsSlider .ui-icon-grip-dotted-horizontal{background-position:-16px -224px}.smartFormsSlider .ui-icon-grip-solid-vertical{background-position:-32px -224px}.smartFormsSlider .ui-icon-grip-solid-horizontal{background-position:-48px -224px}.smartFormsSlider .ui-icon-gripsmall-diagonal-se{background-position:-64px -224px}.smartFormsSlider .ui-icon-grip-diagonal-se{background-position:-80px -224px}.smartFormsSlider .ui-corner-all,.smartFormsSlider .ui-corner-top,.smartFormsSlider .ui-corner-left,.smartFormsSlider .ui-corner-tl{border-top-left-radius:4px}.smartFormsSlider .ui-corner-all,.smartFormsSlider .ui-corner-top,.smartFormsSlider .ui-corner-right,.smartFormsSlider .ui-corner-tr{border-top-right-radius:4px}.smartFormsSlider .ui-corner-all,.smartFormsSlider .ui-corner-bottom,.smartFormsSlider .ui-corner-left,.smartFormsSlider .ui-corner-bl{border-bottom-left-radius:4px}.smartFormsSlider .ui-corner-all,.smartFormsSlider .ui-corner-bottom,.smartFormsSlider .ui-corner-right,.smartFormsSlider .ui-corner-br{border-bottom-right-radius:4px}.smartFormsSlider .ui-widget-overlay{background:#666 url(./images/ui-bg_diagonals-thick_20_666666_40x40.png) 50% 50% repeat;opacity:.5;filter:Alpha(Opacity=50)}.smartFormsSlider .ui-widget-shadow{margin:-5px 0 0 -5px;padding:5px;background:#000 url(./images/ui-bg_flat_10_000000_40x100.png) 50% 50% repeat-x;opacity:.2;filter:Alpha(Opacity=20);border-radius:5px}








.smartFormsSlider .ui-datepicker { width: 17em; padding: .2em .2em 0; display: none; }
.smartFormsSlider .ui-datepicker .ui-datepicker-header { position:relative; padding:.2em 0; }
.smartFormsSlider .ui-datepicker .ui-datepicker-prev, .smartFormsSlider .ui-datepicker .ui-datepicker-next { position:absolute; top: 2px; width: 1.8em; height: 1.8em; }
.smartFormsSlider .ui-datepicker .ui-datepicker-prev-hover, .smartFormsSlider .ui-datepicker .ui-datepicker-next-hover { top: 1px; }
.smartFormsSlider .ui-datepicker .ui-datepicker-prev { left:2px; }
.smartFormsSlider .ui-datepicker .ui-datepicker-next { right:2px; }
.smartFormsSlider .ui-datepicker .ui-datepicker-prev-hover { left:1px; }
.smartFormsSlider .ui-datepicker .ui-datepicker-next-hover { right:1px; }
.smartFormsSlider .ui-datepicker .ui-datepicker-prev span, .smartFormsSlider .ui-datepicker .ui-datepicker-next span { display: block; position: absolute; left: 50%; margin-left: -8px; top: 50%; margin-top: -8px;  }
.smartFormsSlider .ui-datepicker .ui-datepicker-title { margin: 0 2.3em; line-height: 1.8em; text-align: center; }
.smartFormsSlider .ui-datepicker .ui-datepicker-title select { font-size:1em; margin:1px 0; }
.smartFormsSlider .ui-datepicker select.ui-datepicker-month-year {width: 100%;}
.smartFormsSlider .ui-datepicker select.ui-datepicker-month,
.smartFormsSlider .ui-datepicker select.ui-datepicker-year { width: 49%;}
.smartFormsSlider .ui-datepicker table {width: 100%; font-size: .9em; border-collapse: collapse; margin:0 0 .4em; }
.smartFormsSlider .ui-datepicker th { padding: .7em .3em; text-align: center; font-weight: bold; border: 0;  }
.smartFormsSlider .ui-datepicker td { border: 0; padding: 1px; }
.smartFormsSlider .ui-datepicker td span, .smartFormsSlider .ui-datepicker td a { display: block; padding: .2em; text-align: right; text-decoration: none; }
.smartFormsSlider .ui-datepicker .ui-datepicker-buttonpane { background-image: none; margin: .7em 0 0 0; padding:0 .2em; border-left: 0; border-right: 0; border-bottom: 0; }
.smartFormsSlider .ui-datepicker .ui-datepicker-buttonpane button { float: right; margin: .5em .2em .4em; cursor: pointer; padding: .2em .6em .3em .6em; width:auto; overflow:visible; }
.smartFormsSlider .ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current { float:left; }

/* with multiple calendars */
.smartFormsSlider .ui-datepicker.ui-datepicker-multi { width:auto; }
.smartFormsSlider .ui-datepicker-multi .ui-datepicker-group { float:left; }
.smartFormsSlider .ui-datepicker-multi .ui-datepicker-group table { width:95%; margin:0 auto .4em; }
.smartFormsSlider .ui-datepicker-multi-2 .ui-datepicker-group { width:50%; }
.smartFormsSlider .ui-datepicker-multi-3 .ui-datepicker-group { width:33.3%; }
.smartFormsSlider .ui-datepicker-multi-4 .ui-datepicker-group { width:25%; }
.smartFormsSlider .ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header { border-left-width:0; }
.smartFormsSlider .ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header { border-left-width:0; }
.smartFormsSlider .ui-datepicker-multi .ui-datepicker-buttonpane { clear:left; }
.smartFormsSlider .ui-datepicker-row-break { clear:both; width:100%; font-size:0em; }

/* RTL support */
.smartFormsSlider .ui-datepicker-rtl { direction: rtl; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-prev { right: 2px; left: auto; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-next { left: 2px; right: auto; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-prev:hover { right: 1px; left: auto; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-next:hover { left: 1px; right: auto; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-buttonpane { clear:right; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-buttonpane button { float: left; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current { float:right; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-group { float:right; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header { border-right-width:0; border-left-width:1px; }
.smartFormsSlider .ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header { border-right-width:0; border-left-width:1px; }

/* IE6 IFRAME FIX (taken from datepicker 1.5.3 */
.smartFormsSlider .ui-datepicker-cover {
    position: absolute; /*must have*/
    z-index: -1; /*must have*/
    filter: mask(); /*must have*/
    top: -4px; /*must have*/
    left: -4px; /*must have*/
    width: 200px; /*must have*/
    height: 200px; /*must have*/
}