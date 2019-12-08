//?轮播图片展示
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // console.log(response);
        var html = template('swipeTpl', {
            response
        })
        $('#swipeBox').html(html)
        //图片轮播
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//?最新发布展示
//获取文章
$.ajax({
    type:'get',
    url:'/posts/lasted',
    success:function(response){
        // console.log(response);      
        var html = template('wenzhangTpl',{response})
        $('#articleBox').html(html)
    }
})


//?随机推荐文章展示
//获取随机推荐的文章
$.ajax({
    type:'get',
    url:'/posts/random',
    success:function(response){
        // console.log(response);
        
        var html = template('randomTpl',{response})
        $('#randomBox').html(html)
    }
})

//?最新评论
$.ajax({
    type:'get',
    url:'/comments/lasted',
    success:function(response){
        // console.log(response);
        var html = template('comTpl',{response})
        $('#comBox').html(html)
    }
})

//?热门推荐
$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(response){
        // console.log(response);
        var html = template('recommendTpl',{response})
        $('#recommendBox').html(html)
    }
})

//?侧边栏分类
//获取分类
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        // console.log(response);
        var html = template('cateTpl',{response})
        $('#cateBox').html(html)
    }
})
