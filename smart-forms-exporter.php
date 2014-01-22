<?php
require_once('../../../wp-config.php');

if(!defined('ABSPATH'))
    die('Forbidden');

if(!current_user_can('manage_options'))
    die('Forbidden');


$data=GetPostValue("exportdata");
$json=json_decode($data,true);

header('Content-Encoding: UTF-8');
header('Content-type: text/csv; charset=UTF-8');
header('Content-Disposition: attachment; filename=Export.csv');

if(count($json)<=0)
    die();
$keys=array_keys($json[0]);
$firstColumn=true;
foreach($keys as $header)
{
    if(!$firstColumn)
        echo ",";
    $firstColumn=false;
    echo '"'.$header.'"';
}
foreach($json as $row)
{
    $firstColumn=true;
    echo "\r\n";
    foreach($row as $column)
    {
        if(!$firstColumn)
            echo ",";
        $firstColumn=false;
        echo '"'.$column.'"';
    }

}

echo "\xEF\xBB\xBF";





