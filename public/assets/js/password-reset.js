//?密码修改功能
$('#pwdForm').on('submit',function(){
    
    var formdata = $(this).serialize();
    // console.log(formdata);
    $.ajax({
        type:'put',
        url: '/users/password',
        data:formdata,
        success:function(){
            location.href = "/admin/login.html"
        },
        error:function(xhr,text,data){
            var obj = JSON.parse(xhr.responseText);
            alert(obj.message);
        }
    })


    return false;
})