//? 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			location.reload();
		},
		error: function () {
			alert('用户添加失败')
		}
	})
	// 阻止表单的默认提交行为
	return false;
});

//?头像上传及展示功能（需用事件委托）
$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success:function(response){
            // 实现头像预览功能
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar)
        }
    })
})

//?获取用户信息
$.ajax({
    type:'get',
    url:'/users',
    success:function(data){
        // console.log(data);   
		var html = template('userTpl',{data})
		$('#userlist').html(html);
    }
})


//todo 修改功能
//?修改用户
$('#userlist').on('click', '.edit', function () {
	// 获取被点击用户的id值
	var id = $(this).attr('data-id');
	
	
	// 根据id获取用户的详细信息
	$.ajax({
		type: 'get',
		url : '/users/' + id,
		success: function (response) {
			// console.log(response)
			var html = template('modifyTpl', response);
			$('#modifyBox').html(html);
		}
		
	})
});


//? 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的那个用户的id值
	var id = $(this).attr('data-id');
	// 发送请求 修改用户信息
	$.ajax({
		type: 'put',
		url: '/users/' + id,
		data: formData,
		success: function (response) {
			// 修改用户信息成功 重新加载页面
			location.reload()
		},
		error:function(xhr){
			var obj = JSON.parse(xhr.responseText)
			alert(obj.message)
		}
	})

	// 阻止表单默认提交
	return false;
});


//todo 删除功能
//?点击删除按钮
$('#userlist').on('click','.remove',function(){
	//获取需要删除的用户id
	var id = $(this).attr('data-id')
	// console.log(id);
	if(confirm('你确定要删除吗？')){
		$.ajax({
			type:'delete',
			url:'/users/' + id,
			success: function (response) {
				// console.log(response)
				location.reload()
			}
		})
	}
	
})

//?批量删除
//获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');

//当全选按钮被选中时
selectAll.on('change',function(){
	//获取全选按钮的状态
	var status = $(this).prop('checked')
	if(status){
		deleteMany.removeClass('disabled')
	}else{
		deleteMany.addClass('disabled')
	}
	// 获取到所有的用户并将用户的状态和全选按钮保持一致
	$('#userlist').find('input').prop('checked', status);
})

//当单选按钮发生改变时
$('#userlist').on('change', '.userStatus', function () {
	//获取所有的单选框
	var inputs = $('#userlist').find('input')
	//如果被选中的单选框个数=单选框的总个数，则证明所有用户被选中了
	if(inputs.length==inputs.filter(':checked').length){
		// console.log('true');
		selectAll.prop('checked',true)	
	}else{
		// console.log('false');	
		selectAll.prop('checked',false)			
	}
	//改变批量删除按钮的状态
	if (inputs.filter(':checked').length > 0){
		deleteMany.removeClass('disabled')
	}else{
		deleteMany.addClass('disabled')
	}
})

//点击批量删除按钮
deleteMany.on('click',function(){
	//定义一个空数组用来存储需要删除的用户的id
	var arr = [];
	//获取所有需要删除的用户
	var users = $('#userlist').find('input').filter(':checked')
	// console.log(users);
	//遍历获取他们的data-id
	users.each(function (index, element) {
		arr.push($(element).attr('data-id'));
	});
	// console.log(arr);
	if(confirm('你确定要删除选中的用户吗？')){
		$.ajax({
			type: 'delete',
			url: '/users/' + arr.join('-'),
			success: function () {
				location.reload();
			}
		})
	}
})
