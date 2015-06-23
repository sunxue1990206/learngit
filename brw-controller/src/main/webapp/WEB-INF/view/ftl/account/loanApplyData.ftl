<table id="table" cellpadding="0" cellspacing="0" width="100%">
	<tr class="f14">
    	<th class="wb18 wl ml20"><span>申请时间</span></th>
        <th class="wb18 wc"><span>借款类型</span></th>
        <th class="wb18 wr"><span>借款金额</span></th>
        <th class="wb30"><span>借款期限</span></th>
        <th><span>审核状态 </span></th>
    </tr>
    <#if obj?? &&  obj?size gt 0>
    <#list obj as obj>
	   	<#if obj_index % 2 ==0>
	  		<tr>
		<#else>
	  		<tr class="tbg">
		</#if> 
        <td class="wl ml10"><span>${(obj.applicationTime?string("yyyy-MM-dd"))?default("")!}</span></td>
        <td class="wc"><span>${(obj.applicationType.name)?default("")}</span></td>
        <td class="wr"><span>${obj.loanAmount?string(",##0.00#")!}</span></td>
        <td><span>${obj.loanPeriod!}个月</span></td>
        <td><span>${obj.status.name!}</span></td>
    </tr>
	</#list>
	<#else>
	<tr>
	<td style="line-height:150px;" colspan="5">
	<p class=" f14 wc fgray">暂无记录 </p>
	</td>
	</tr>
	</#if>    		
</table>
<input type="hidden" id="pageCode" value="${pageCount!}"/>  