//?获取用户评论信息
$.ajax({
    type:'get',
    url:'/comments',
    success:function(response){
        // console.log(response);      
        var html = template('commentsTpl',{response})
        $('#commentsBox').html(html)
        var pageHTML = template('pageTpl', {response});
		$('#pageBox').html(pageHTML)
    }
})

//? 实现分页
function changePage (page) {
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			page: page
		},
		success: function (response) {
			console.log(response)
			var html = template('commentsTpl', {response});
			$('#commentsBox').html(html);
            var pageHTML = template('pageTpl', {response});
            // console.log(pageHTML);
            
			$('#pageBox').html(pageHTML)
		}
	})
}

//?点击审核/驳回按钮时
$('#commentsBox').on('click','.status',function(){
    //获取按钮中的data-status属性的值
    var status = $(this).attr('data-status')
    // console.log(status);
    //获取按钮中的data-id属性的值
    var id = $(this).attr('data-id')
    //发送请求
    $.ajax({
        type:'put',
        url:'/comments/'+ id,
        data:{
            //改变文章的状态
            state: status==0 ? 1 : 0
        },
        success:function(){
            location.reload()
        }
    })
    
})

//? 删除功能
$('#commentsBox').on('click','.delete',function(){
    //获取需要删除的按钮的data-id
    var id = $(this).attr('data-id')
    //发送请求
    $.ajax({
        type:'delete',
        url:'/comments/' + id,
        success:function(){
            location.reload()
        }
    })
})