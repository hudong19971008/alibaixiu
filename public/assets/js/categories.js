//?添加分类
$('#cateForm').on('submit',function(){
    var formdata = $(this).serialize();
    // console.log(formdata);
    $.ajax({
        type:'post',
        url:'/categories',
        data:formdata,
        success:function(){
            location.reload();
        },
        error:function(xhr){
            var obj = JSON.parse(xhr.responseText)
            alert(obj.message)
        }
    })
    return false;
})

//?展示分类
$.ajax({
    type:'get',
    url:'/categories',
    success:function(data){      
        var html = template('cateTpl',{data})
        $('#cateContent').html(html);
    }
})


//todo 修改
//?修改分类
$('#cateContent').on('click','.edit',function(){
    //获取需要修改用户的id
    var id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
        type:'get',
        url: '/categories/' + id,
        success:function(response){
            // console.log(response);
            
            var html = template('editTpl', response);
			$('#cateBox').html(html);
        }
    })
})

//?点击修改按钮
$('#cateBox').on('submit','#cateForm',function(){
    var formdata = $(this).serialize();
    // console.log(formdata);
    // 获取要修改的分类id
	var id = $(this).attr('data-id');
	// 发送请求 修改分类数据
	$.ajax({
		type: 'put',
		url: '/categories/' + id,
		data: formdata,
		success: function () {
			location.reload();
        },
        error:function(xhr,text,data){           
            var obj = JSON.parse(xhr.responseText)           
            alert(obj.message)
        }
	})
    return false;
})

//todo 删除
//?点击删除按钮
$('#cateContent').on('click','.delete',function(){
    //获取需要删除的用户的id
    var id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
        type:'delete',
        url:'/categories/' + id,
        success:function(){
            location.reload()
        }
    })
    
})

