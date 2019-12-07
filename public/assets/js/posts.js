//?查询所有文章并展示
$.ajax({
    type:'get',
    url:'/posts',
    success:function(data){
        console.log(data);
        
        var html = template('articleTpl',{data})
		$('#articleShow').html(html);
    }
})