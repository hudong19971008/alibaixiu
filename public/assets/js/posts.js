//?查询所有文章并展示
$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        // console.log(data);
        
        var html = template('articleTpl',{response})
        $('#articleShow').html(html);
        var page = template('pageTpl', {response});
		$('#page').html(page);
    }
})

//?筛选分类
//先获取文章分类
$.ajax({
    type:'get',
    url: '/categories',
    success: function (response) {
		// console.log(response)
		var html = template('categoryTpl',  {response});
		$('#categoryShow').html(html);
	}
})
//提交筛选表单
$('#filterForm').on('submit',function(){
    var formData = $(this).serialize();
    // console.log(formData);
    //向服务器端发送请求 根据条件索要文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: formData,
		success: function (response) {
			var html = template('articleTpl', {response});
			$('#articleShow').html(html);
			var page = template('pageTpl', {response});
			$('#page').html(page);
		}
	});
    return false;
})

//?分页功能
function changePage (page) {
    // console.log(page);
	// 向服务器端发送请求 获取文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: {
			page: page
		},
		success: function (response) {
            // console.log(response);
            
			var html = template('articleTpl', {response});
			$('#articleShow').html(html);
            var page = template('pageTpl', {response});
            $('#page').html(page);
            
		}
	});
}

//?文章删除功能
$('#articleShow').on('click','.delete',function(){
    //获取需要删除的文章的id
    var id = $(this).attr('data-id');
    if(confirm('你确定要删除该文章吗？')){
        $.ajax({
            type:'delete',
            url:'/posts/' + id,
            success:function(){
                location.reload()
            }
        })
    }
})