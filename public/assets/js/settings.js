//?文件上传功能
$('#logo').on('change',function(){
    //获取用户选择的图片
    var files = this.files[0]
    //创建处理文件上传对象
    var formdata = new FormData()
    formdata.append('logo',files)
    //发送请求,实现文件上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formdata,
        contentType:false,
        processData:false,
        success:function(response){
            // console.log(response[0]);           
            $('#hiddenLogo').val(response[0].logo)
            // 将logo图片显示在页面中
			$('#preview').attr('src', response[0].logo)
        }
    })
})
//?封装一个函数将数组转换为对象
function serializeObject (obj) {
    // 处理结果对象
    var result = {};
    // [{name: 'username', value: '用户输入的内容'}, {name: 'password', value: '123456'}]
    var params = obj.serializeArray();

    // 循环数组 将数组转换为对象类型
    $.each(params, function (index, value) {
        result[value.name] = value.value;
    })
    // 将处理的结果返回到函数外部
    return result;
}
//?点击保存设置
$('#settingsForm').on('submit',function(){
    //获取表单中输入的内容
    var formdata = serializeObject($(this))
    
    console.log(formdata);
    
    //增加一个对评论的判断  
    if(!formdata.comment){
        formdata.comment = false;       
    }
    if(!formdata.review){
        formdata.review = false;
    }
    //发送请求
    $.ajax({
		type: 'post',
		url: '/settings',
		data: formdata,
		success: function () {
			location.reload();
        },
        error:function(xhr){
            var obj = JSON.parse(xhr.responseText)
            // console.log(obj.message);
            
            alert(obj.message)
        }
	})
    return false;

})

//? 向服务器端发送请求 索要网站设置数据
$.ajax({
	type: 'get',
	url: '/settings',
	success: function (response) {
		// console.log(response)
		if (response) {
			// 将logo地址存储在隐藏域中
			$('#hiddenLogo').val(response.logo)
			// 将logo显示在页面中 
			$('#preview').attr('src', response.logo)
			// 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            //将站点描述显示在页面中
            $('textarea[name="description"]').val(response.description)
            //将站点关键词显示在页面中
            $('input[name="keywords"]').val(response.keywords)
			// 将是否开启评论功能显示在页面中
			$('input[name="comment"]').prop('checked', response.comment)
			// 将评论是否经过人工审核显示在页面中
			$('input[name="review"]').prop('checked', response.review)
		}
	}
})