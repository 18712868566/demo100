/*wlo:Cflower*/
$(function() {

	//关闭
	$(document).on("click", "#alertInfo .close", dialog.closeDiv);
	/*---------------------------------------------------------------------------------------------------------------------*/
	/*------以下是相关弹出窗口实例，仅供参考-------------------------------------------------------------------------------------*/
	/*---------------------------------------------------------------------------------------------------------------------*/
	//登录实例
	$(".dlbtn").click(function(event) {
		event.preventDefault();
		dialog.alertLog("请登录", "dialog.alertMsg(\"提示\",\"登陆失败！\",\"dialog.closeDiv()\",\"s\")");
	});

	/*---------------------------------------------------------------------------------------------------------------------*/
	/*$('.icon_videoPlay').on('click', function() {
		// alert('a')
		var close = '<span class="close" title="关闭视频"></span>'
		var wlg_v = '<embed class="wlg_v" width="100%" height="100%" src="http://yuntv.letv.com/bcloud.swf?uu=661c07e19e&vu=0d11e61e4f&auto_play=1&gpcflag=1&lang=zh_CN" allowscriptaccess="always" allowfullscreen="true" wmode="opaque">';
		$('.video').append(wlg_v, close);

		$('.video .close').on('click', function() {
			$('.close, .wlg_v').remove();
		})

	});*/



	$(".content_5").mCustomScrollbar({
		horizontalScroll: true,
		mouseWheel: {
			enable: false
		},
		advanced: {
			autoExpandHorizontalScroll: true
		},
		theme: "dark-thin"
	});
	$('.content_5').mCustomScrollbar('scrollTo', 'left');

	// 选择战队
	argumentsTab('.tabList li');
	// 赛事进程
	argumentsTab('.tabEvent_list li', '.tabBox .box');

	$(document).on("click", ".vBtn", function() {
		var url = $(this).attr("data-url");
		var vuId = getQueryString(url).vu;
		var _ww = $("#wrapper").width(),
			video_w = 640,
			video_h = 360,
			player = new CloudVodPlayer();

		if (_ww < 640) {
			video_w = _ww;
			video_h = _ww * 360 / 640
		}
		dialog.showInfo("<div id='vInfo' class='vInfo' style='height:" + video_h + "px'></div>");
		$("#maskLayer").addClass("close");
		player.init({
			"uu": "661c07e19e",
			"vu": vuId,
			"auto_play": 1,
			"pu": "5dd4aa0351",
			"width": video_w,
			"height": video_h,
			"lang": "zh_CN"
		}, "vInfo");
	})

	function getQueryString(url) {
		var qs = url;
		var args = {};
		var items = qs.split("&");
		var ite = null;
		var name = null;
		var value = null;
		for (var i = 0; i < items.length; i++) {
			//ite=items[i].split("=");
			var firstEqual = items[i].indexOf("=")
			name = items[i].substring(0, firstEqual);
			value = items[i].substring(firstEqual + 1);
			args[name] = value;
		}
		return args;
	}
})

function navClick(obj, btn) {
	$(btn).click(function(event) {
		event.preventDefault();
		if ($(btn).attr('class') == 'menubtn menuclose') {
			$(this).removeClass('menuclose').addClass('nav');
		} else {
			$(this).removeClass('nav').addClass('menuclose');
		}
		$(obj).slideToggle();
	});
}

function argumentsTab(tabList, tabbox, fn) {
	if (!$(tabList + ":first-child").hasClass('curr')) {
		$(tabList + ":first-child").removeClass('curr').addClass('curr');
	}
	$(tabbox + ":first-child").css({
		'display': 'block'
	});
	var $div_li = $(tabList);
	$div_li.click(function() {
		$(this).addClass('curr').siblings().removeClass('curr');
		var index = $div_li.index(this);
		//alert(index);
		$(tabbox).eq(index).fadeIn(360).siblings().fadeOut(360);
		// $(tabbox).eq(index).addClass("curr").stop().animate({opacity:1},"360").siblings().removeClass("curr").stop().animate({opacity:0},"360");
		//$(".tabbox").show();
		//var h =$(tabbox).eq(index).offset().top;
		//$( "html,body").animate({ "scrollTop" : h },300);  //滚动到指定位置
	}).eq(0).click();
}


// css3常用动画+动画库
// http://www.cnblogs.com/starof/p/4968769.html