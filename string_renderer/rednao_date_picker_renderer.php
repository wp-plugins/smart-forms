<?php


class rednao_date_picker_renderer extends rednao_base_elements_renderer {

	public function GetString($formElement,$entry)
	{
		return htmlspecialchars($entry["formattedValue"]);
	}

	public function GetExValues($formElement, $entry)
	{
		return array(
			"exvalue1"=>$entry["formattedValue"]
		);
	}
}