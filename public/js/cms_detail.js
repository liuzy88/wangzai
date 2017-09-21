if (window.history.state) {
    $('.ads-list').html(window.history.state.list);
}

// 详情隐藏显示

function hideDetail() {
    $('#detail-top-menu').removeClass('show');
}
$('body').click(function(e) {
    if ($('#detail-top-menu').hasClass('show')) {
        hideDetail();
    } else {
        if (e.target.id == "mui-action-menu") {

            $('#detail-top-menu').addClass('show');
        }
    }
});

function ReplaceAll(str, sptr, sptr1) {
    while (str.indexOf(sptr) >= 0) {
        str = str.replace(sptr, sptr1);
    }
    return str;
}

//图文详情
var isLoad = false;
var goodsId = $('.pic-detail-btn').data('goodsid');
$('.pic-detail-btn span.pic-detail-btn-span').click(function() {
    if ($('.pic-detail-show').css('display') == 'none') {
        $('.pic-detail-show').css('display', 'block');
    } else {
        $('.pic-detail-show').css('display', 'none');
    }
    if (isLoad) {
        return;
    }
    $.get('/detail?goodsId=' + goodsId, function(data) {
        $('span.loadding-lab').fadeOut(300);
        $('.pic-detail-show').html(data);
        isLoad = true;
    });
    // if(!isLoad){
    //     $('span.loadding-lab').fadeIn(300);
    //     setTimeout(function(){
    //         $.ajax({
    //             type: "get",
    //             async: false,
    //             url: 'http://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?&data={"item_num_id":"'+goodsId+'"}&type=jsonp',
    //             dataType: "jsonp",
    //             jsonp: "callback",
    //             jsonpCallback:"showTuwen",
    //             success: function(jsonp){

    //                 $('span.loadding-lab').fadeOut(300);
    //                 if(jsonp.data.images.length>0){
    //                     for(var i = 0 ; i < jsonp.data.images.length ; i++){
    //                         $('.pic-detail-show').append('<p><img src="'+jsonp.data.images[i]+'"/></p>');
    //                     }
    //                 }

    //                 isLoad = true;
    //             },
    //             error: function(){
    //             }
    //         });
    //     },300);
    // }
});

$(".keycope").on("click", function() {
    $('.copy_dom').html($(this).attr('aria-label'));
});

//微信点击站外链接弹出提示
$('.weixin-cover').click(function() {
    $('.weixin-tip').css('display', 'none');
    $('.tkl').css('display', 'block');
    $('.buy-wrapper').css('display', 'block');
});
$(".img .ui-link").click(function(event) {
    var _url = $(this).attr('href') ? $(this).attr('href') : $(this).data('href');
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        event.preventDefault();
        $('.weixin-tip').css('display', 'block');
        $('.tkl').css('display', 'none');
        $('.buy-wrapper').css('display', 'none');

        if ($(this).data("href")) {
            var _url = $(this).data("href");
        } else {
            var _url = $(this).attr("href");
        }
        if (/iphone|ipad|ipod/.test(ua)) {
            $('.wechat-brow').addClass('iosChat');
        } else if (/android|adr|linux/.test(ua)) {
            $('.wechat-brow').addClass('androidChat');
        }

    } else {
        // window.location.href = _url;
        // return false;
    }

});

$(function() {
    var kycopy = 1,
        ios = 1;

    function isIOS10() {
        //获取固件版本
        var getOsv = function() {
            var reg = /OS ((\d+_?){2,3})\s/;
            if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
                var osv = reg.exec(navigator.userAgent);
                if (osv.length > 0) {
                    return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
                }
            } else {
                ios = 0;
            }
            return '';
        };
        var osv = getOsv();
        var osvArr = osv.split('.');
        //初始化显示ios9引导
        if (osvArr && osvArr.length > 0) {
            if (parseInt(osvArr[0]) >= 10) {
                return true
            }
        }
        return false
    }

    //ios版本

    if (isIOS10()) {
        kycopy = 1;
    } else {
        kycopy = 0
    }
    //文字输入
    function iptNum(ths, sta) {
        if (sta) {
            taoKeyNum = ths.value;
        }
        if (ths.value != taoKeyNum) {
            ths.value = taoKeyNum;
        }
    }

    //不支持clip
    if (kycopy == 0 && ios == 1) {
        $('.tkl-code').removeClass('yjfz_copy');
        $('.keycope').remove();
        document.addEventListener("selectionchange", function(e) {
            if (window.getSelection().anchorNode.parentNode.id == 'code1_ios' && document.getElementById('code1_ios').innerText != window.getSelection()) {
                var key = document.getElementById('code1_ios');
                window.getSelection().selectAllChildren(key);
            }
            if (window.getSelection().anchorNode.parentNode.id == 'code2_ios' && document.getElementById('code2_ios').innerText != window.getSelection()) {
                var key = document.getElementById('code2_ios');
                window.getSelection().selectAllChildren(key);
            }
        }, false);
    } else {

        if (ios == 1) {
            var clipboard = new Clipboard('.keycope', {
                //动态设置复制内容
                target: function() {
                    // return trigger.getAttribute('aria-label');
                    return document.querySelector('.copy_dom');
                }
            });

            clipboard.on('success', function(e) {
                $('.copy_dom').html('');

                e.trigger.innerHTML = "已复制";
                e.trigger.style.background = "#67cf84";
                e.trigger.parentNode.style.borderColor = "#67cf84";
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
                e.clearSelection();
            });

            clipboard.on('error', function(e) {
                $('.copy_dom').html('');
                e.trigger.style.background = "#f47171";
                e.trigger.parentNode.style.borderColor = "#f47171";
                e.trigger.innerHTML = "复制失败";
            });

            $('.yjfz_copy textarea').remove();
        } else {

            //一键复制!ios
            var dseClip = new Clipboard('.keycope', {
                text: function(trigger) {
                    return trigger.getAttribute('aria-label');
                }
            });
            dseClip.on('success', function(e) {
                e.trigger.style.background = "#67cf84";
                e.trigger.parentNode.style.borderColor = "#67cf84";
                e.trigger.innerHTML = "已复制";
                e.clearSelection();
            });
            dseClip.on('error', function(e) {

                e.trigger.style.background = "#f47171";
                e.trigger.parentNode.style.borderColor = "#f47171";
                e.trigger.innerHTML = "复制失败";
                e.clearSelection();
            });
        }

    }
});
