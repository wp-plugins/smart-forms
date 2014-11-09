<?php


class rednao_phone_renderer extends rednao_base_elements_renderer {


    public function GetString($formElement,$entry)
    {
        return htmlspecialchars($entry["area"].'-'.$entry["phone"]);
    }

	public function GetExValues($formElement, $entry)
	{
		return array(
			"exvalue1"=> htmlspecialchars($entry["area"]),
			"exvalue2"=> htmlspecialchars($entry["phone"])
		);
	}
}