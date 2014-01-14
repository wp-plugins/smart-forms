<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 6/13/13
 * Time: 8:04 PM
 * To change this template use File | Settings | File Templates.
 */
wp_enqueue_script('isolated-slider',SMART_FORMS_DIR_URL.'js/rednao-isolated-jq.js');
wp_enqueue_script('exCanvas',SMART_FORMS_DIR_URL.'js/grid_chart/excanvas.min.js',array('isolated-slider'));
wp_enqueue_script('jqPlot',SMART_FORMS_DIR_URL.'js/grid_chart/jquery.jqplot.min.js',array('exCanvas'));
wp_enqueue_script('jqHighlighter',SMART_FORMS_DIR_URL.'js/grid_chart/jqplot.highlighter.js',array('jqPlot'));
wp_enqueue_script('jqCursor',SMART_FORMS_DIR_URL.'js/grid_chart/jqplot.cursor.min.js',array('jqHighlighter'));
wp_enqueue_script('jqDateAxis',SMART_FORMS_DIR_URL.'js/grid_chart/jqplot.dateAxisRenderer.min.js',array('jqHighlighter'));
wp_enqueue_script('jqCanvasAxis',SMART_FORMS_DIR_URL.'js/grid_chart/jqplot.canvasAxisTickRenderer.min.js',array('jqCursor'));
wp_enqueue_script('jqPointLabels',SMART_FORMS_DIR_URL.'js/grid_chart/jqplot.pointLabels.min.js',array('jqCanvasAxis'));
wp_enqueue_script('smart-forms-entries',SMART_FORMS_DIR_URL.'js/main_screens/smart-forms-entries.js',array('jqPointLabels'));
wp_enqueue_script('smart-forms-entries-analytics',SMART_FORMS_DIR_URL.'js/formBuilder/formanalytics.js',array('smart-forms-entries'));


wp_enqueue_script('jqGridlocale',SMART_FORMS_DIR_URL.'js/grid_chart/grid.locale-en.js',array('isolated-slider'));
wp_enqueue_script('jqGrid',SMART_FORMS_DIR_URL.'js/grid_chart/jquery.jqGrid.min.js',array('jqGridlocale'));


wp_enqueue_style('jqgrid',SMART_FORMS_DIR_URL.'css/grid_chart/ui.jqgrid.css');
wp_enqueue_style('jqplot',SMART_FORMS_DIR_URL.'css/grid_chart/jquery.jqplot.css');
wp_enqueue_style('smart-donations-Slider',SMART_FORMS_DIR_URL.'css/smartFormsSlider/jquery-ui-1.10.2.custom.min.css');





if(!defined('ABSPATH'))
    die('Forbidden');

?>



<h1 >Analytics</h1>

<hr/>


<div id="smartDonationRadio" class="smartFormsSlider" style="margin-bottom: 20px;">
    <strong >Start Date</strong>
    <input type="text" class="datePicker smartFormsSlider" id="dpStartDate"/>
    <strong style="margin-left: 15px">End Date</strong>
    <input type="text" class="datePicker smartFormsSlider" id="dpEndDate"/>
    <strong style="margin-left: 15px" >Form</strong>
    <select id="cbForm">
        <?php
        global $wpdb;
        $results=$wpdb->get_results("select form_id,form_name from ".SMART_FORMS_TABLE_NAME);

        foreach($results as $result)
        {
            echo "<option value='$result->form_id' >$result->form_name</option>";
        }

        ?>
    </select>

    <script type="text/javascript" language="javascript">
        var RedNaoCampaignList="";
        <?php
            echo "RedNaoCampaignList='";
            foreach($results as $result)
            {

                echo ";$result->form_id:$result->form_name";
            }
            echo "'";
        ?>
    </script>




    <Button style="margin-left:35px" id="btnExecute">
        Execute
    </Button>

</div>
<div style="width:80%;overflow-x: scroll;padding:25px;display: none">
    <div id="Chart"></div>
</div>


<div>
    <div class="smartFormsSlider" style="margin-right:10px;">
        <table id='grid' class="ui-jqdialogasdf" style="width:100%;height:100%;"></table><div id='pager'></div>
    </div>