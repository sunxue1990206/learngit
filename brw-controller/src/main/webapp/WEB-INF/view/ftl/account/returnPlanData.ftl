<table id="table" cellpadding="0" cellspacing="0" width="100%">
	<tr class="f14">
    	<th class="wb15 wl ml10"><span>项目ID</span></th>
        <th class="wb11 wl pn"><span>应还时间</span></th>
        <th class="wb8 pn"><span>期次</span></th>
        <th class="wb18 wr"><span>应还金额</span></th>
        <th class="wb18 wr pn" ><span>应还本金</span></th>
        <th class="wb15" ><span>应还利息</span></th>
        <th class=""><span>状态</span></th>
    </tr>
    <#if obj?? &&  obj?size gt 0>
    <#list obj as obj>    
       	<#if obj_index % 2 ==0>
      		<tr>
 		<#else>
      		<tr class="tbg">
   		</#if>
        <td class="wl"><span><a class="fblue" target="_blank" href="${Request["invControllerAddress"]}/lend/findDetailByProductNo/${obj.loanNo!}">${obj.loanNo!}</a></span></td>
        <td class="wl pn" ><span>${(obj.planRepaymentDate?string("yyyy-MM-dd"))?default("")!}</span></td>
        <td class="pn"><span>${obj.currentRepaymentNumber!0}/${obj.totalRepaymentNumber!0}</span></td>
        <td class="wr"><span>${(obj.planRepaymentPrincipal+obj.planRepaymentInterest)?string(",##0.00#")!}</span></td>
        <td class="wr pn"><span>${obj.planRepaymentPrincipal?string(",##0.00#")!}</span></td>
        <td><span>${obj.planRepaymentInterest?string(",##0.00#")!}</span></td>
        <#if obj.status.code=="08" || obj.status.code=="09" || obj.status.code=="10" || obj.status.code=="11" || obj.status.code=="12">
        	<td class="pln"><span>未还款</span></td>
        <#else>
       		<td class="pln"><span>${obj.status.name!}</span></td>
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