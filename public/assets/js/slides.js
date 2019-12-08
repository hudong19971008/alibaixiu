//?上传文件
$('#file').on('change',function(){
    //获取用户选择的文件
    var files =this.files[0];
    //创建处理文件上传对象
    var formData = new FormData();
    formData.append('image',files)
    //实现图片上传功能，将图片上传到本地文件夹
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData: false,
		contentType: false,
        success:function(response){
            console.log(response[0].image);
            //将图片路径赋值给隐藏域的value
            $('#image').val(response[0].image)
        }
    })
})

//?实现添加功能
$('#slidesForm').on('submit',function(){
    //获取用户输入在表单中的内容
    var formdata = $(this).serialize()
    // console.log(formdata);
    //像服务器发送请求，添加数据
    $.ajax({
        type:'post',
        url:'/slides',
        data:formdata,
        success:function(){
            location.reload()
        }
    })
    return false;
})

//?展示图片轮播列表数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(response){
        // console.log(response);
        var html = template('slidesTpl',{response})
        $('#slidesBox').html(html)
    }
})

//?删除图片轮播列表数据功能
$('#slidesBox').on('click','.delete',function(){
    //获取需要删除的图片的id
    var id = $(this).attr('data-id')
    // console.log(id);
    
    $.ajax({
        type:'delete',
        url:'/slides/'+ id,
        success:function(){
            location.reload()
        }
    })
})
