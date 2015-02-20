<?php


class InsertEntryBase {
    public $FormId;
    public $FormEntryData;
    public $FormOptions;
    public $ElementOptions;
    public $AdditionalData;
    /**
     * @var InsertEntryActionBase[] array
     */
    private $_actions=array();

    public function __construct(&$formId,&$formEntryData,&$formOptions,&$elementOptions,&$additionalData)
    {
        $this->FormId = $formId;
        $this->FormEntryData=$formEntryData;
        $this->FormOptions=$formOptions;
        $this->ElementOptions=$elementOptions;
        $this->AdditionalData=$additionalData;
    }

    public function GetSerializedActions()
    {
        $actionData=array();
        foreach($this->_actions as $action)
        {
            array_push($actionData,$action->GetSerializedData());
        }
        return $actionData;
    }

    public function GetExtensionInfo($extensionId)
    {
        if(isset($this->FormOptions["Extensions"][$extensionId]))
            return $this->FormOptions["Extensions"][$extensionId];
        else
            return null;
    }

    public function GetField($fieldId)
    {
        foreach($this->ElementOptions as $field)
            if($field["Id"]==$fieldId)
                return $field;

        throw new Exception("Invalid field ".$fieldId);
    }

    public function GetFieldEntryData($fieldId)
    {
        foreach($this->FormEntryData as $key=>$value)
            if($key==$fieldId)
                return $value
                    ;

        throw new Exception("Invalid field ".$fieldId);
    }

    public function AddAction($action)
    {
        array_push($this->_actions,$action);
    }




}


class InsertEntryActionBase
{
    public $Action="";
    public $Value=Array();

    public function GetSerializedData()
    {
        return Array(
            "Action"=>$this->Action,
            "Value"=>$this->Value
        );
    }

}

class ShowMessageInsertEntryAction extends InsertEntryActionBase{
    /**
     * @var
     */

    public function __construct($message)
    {
        $this->_message = $message;
        $this->Action="ShowMessage";
        $this->Value["Message"]=$message;
    }


}