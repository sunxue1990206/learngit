<table id="table" cellpadding="0" cellspacing="0" width="100%">
	<tr class="f14">
    	<th class="wb15 wl ml10"><span>项目ID</span></th>
        <th class="wb9 wl pn"><span>结清时间</span></th>
        <th class="wb13 wr pn"><span>借款金额</span></th>
        <th class="wb13 wr pn" ><span>借款年利率</span></th>
        <th class="wb15" ><span>还款方式</span></th>
        <th class="wb8 pn wr"><span>实还期数</span></th>
        <th class="wr wb15"><span>实还总额</span></th>
        <th ><span>操作</span></th>
    </tr>
    <#if obj?? &&  obj?size gt 0>
    <#list obj as obj>
	   	<#if obj_index % 2 ==0>
	  		<tr>
		<#else>
	  		<tr class="tbg">
		</#if> 
        <td class="wl"><span><a class="fblue" target="_blank" href="${Request["invControllerAddress"]}/lend/findDetailByProductNo/${obj.loanNo!}">${obj.loanNo!}</a></span></td>
        <td class="wl pn" ><span>${(obj.settleTime?string("yyyy-MM-dd"))?default("")!}</span></td>
        <td class="wr pn"><span>${obj.planLoanAmount?string(",##0.00#")!}</span></td>
        <td class="wr pn"><span>${obj.rate?string(",##0.00#")!}%</span></td>
        <td><span>${obj.repaymentWay.name!}</span></td>
        <td class="pn wr"><span>${obj.competeNumber!}</span></td>
        <td class="wr"><span>${obj.competeAmount?string(",##0.00#")!}</span></td>
        <td><span><a id="t1" href="${Request["brwControllerAddress"]}/account/returnPlan/${(obj.id)!}" class="fblue">还款计划</a>&nbsp;|&nbsp;<a id="t2"  href="" class="fblue">协议</a> </span></td>
    </tr>	
    </#list>
	<#else>
	<tr>
	<td style="line-height:150px;" colspan="8">
	<p class=" f14 wc fgray">暂无记录 </p>
	</td>
	</tr>
	</#if>        
</table>
<input type="hidden" id="pageCode" value="${pageCount!}"/>  