function RedNaoFormulaManager()
{
    this.Formulas=[];
    this.Data={};

    var self=this;
    RedNaoEventManager.Subscribe('formPropertyChanged',function(data){self.PropertyChanged(data)});
}

RedNaoFormulaManager.prototype.PropertyChanged=function(data)
{
    this.Data[data.FieldName]=data.Value;
    this.UpdateFormulaFieldsIfNeeded(data.FieldName,data.Value);
}

RedNaoFormulaManager.prototype.UpdateFormulaFieldsIfNeeded=function(fieldName)
{
    for(var i=0;i<this.Formulas.length;i++)
    {
        if(this.Formulas[i].FieldUsedInFormula(fieldName))
           this.Formulas[i].UpdateFieldWithValue(this.Data);
    }
}

RedNaoFormulaManager.prototype.RefreshAllFormulas=function()
{
    for(var i=0;i<this.Formulas.length;i++)
        this.Formulas[i].UpdateFieldWithValue(this.Data);
}

RedNaoFormulaManager.prototype.AddFormula=function(formElement,formula)
{
    this.Formulas.push(new RedNaoFormula(formElement,formula))
}

var RedNaoFormulaManagerVar=new RedNaoFormulaManager();