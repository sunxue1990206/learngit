<table id="table" cellpadding="0" cellspacing="0" width="100%">
	<tr class="f14">
    	<th class="wb15 wl ml10"><span>项目ID</span></th>
        <th class="wb18 wl"><span>发布时间</span></th>
        <th class="wb15 wr"><span>借款金额</span></th>
        <th class="wb15 wr" ><span>借款年利率</span></th>
        <th class="wb15" ><span>还款方式</span></th>
        <th class="wb10" ><span>借款期限</span></th>
        <th class="wc " ><span>状态</span></th>
    </tr>
    <#if obj?? &&  obj?size gt 0>
    <#list obj as obj>
	   	<#if obj_index % 2 ==0>
	  		<tr>
		<#else>
	  		<tr class="tbg">
		</#if> 
        <td class="wl"><span><a class="fblue" target="_blank" href="${Request["invControllerAddress"]}/lend/findDetailByProductNo/${obj.loanNo!}">${obj.loanNo!}</a></span></td>
        <td class="wl" ><span>${obj.planPublishTime!}</span></td>
        <td class="wr"><span>${obj.planLoanAmount?string(",##0.00#")!}</span></td>
        <td class="wr"><span>${obj.rate?string(",##0.00#")!}%</span></td>
        <td ><span>${obj.repaymentWay.name!}</span></td>
        <td ><span>${obj.loanPeriod!}个${obj.periodType.name!}</span></td>
        <#if obj.status.code=="06">
       		<td class="wc"><span>满标待审</td>
        <#else>
       		<td class="wc"><span>${obj.status.name!}</span></td>
        </#if>
    </tr>
	</#list>	
	<#else>
	<tr>
	<td style="line-height:150px;" colspan="7">
	<p class=" f14 wc fgray">暂无记录 </p>
	</td>
	</tr>
	</#if>    		
</table>
<input type="hidden" id="pageCode" value="${pageCount!}"/>  