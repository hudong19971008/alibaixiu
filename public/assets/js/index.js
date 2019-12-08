//?查询文章
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(response){
        // console.log(response);
        $('#articleShow').html(`<strong>${response.postCount}</strong>篇文章（<strong>${response.draftCount}</strong>篇草稿）`)
    }
})

//?查询分类
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(response){
        // console.log(response);
        
        $('#categoryShow').html(`<strong>${response.categoryCount}</strong>个分类`)
    }
})

//?查询评论
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(response){
        // console.log(response);
        $('#commentsShow').html(`<strong>${response.commentCount}</strong>条评论`)
    }
})