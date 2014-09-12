<?php


class rednao_date_picker_renderer extends rednao_base_elements_renderer {


	public function GetString($formElement,$entry)
	{
		return htmlspecialchars($entry["formattedValue"]);
	}
}