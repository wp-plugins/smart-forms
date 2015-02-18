<?php
class PreInsertEntry {

    Public $ContinueInsertion=true;
    public $FormId;
    public $FormEntryData;
    public $FormOptions;
    public $ElementOptions;
    public $AdditionalData;
    private $_actions=array();

    public function __construct(&$formId,&$formEntryData,&$formOptions,&$elementOptions,&$additionalData)
    {
        $this->FormId = $formId;
        $this->FormEntryData=$formEntryData;
        $this->FormOptions=$formOptions;
        $this->ElementOptions=$elementOptions;
        $this->AdditionalData=$additionalData;
    }

    public function GetActions()
    {
        return $this->$_actions;
    }

    public function GetExtensionInfo($extensionId)
    {
        if(isset($this->FormOptions["Extensions"][$extensionId]))
            return $this->FormOptions["Extensions"][$extensionId];
        else
            return null;
    }


}