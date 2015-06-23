<option value="00">请选择</option>
<#list obj as obj>
<option value="${obj.code!}">${obj.name!}</option>
</#list>