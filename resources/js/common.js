//팝업 공통 열기
var emebe;
function openpop(obj){
	var pops = $(obj).attr("data-link");
	var $top = $(obj).offset().top;
	var $scroll = $(window).scrollTop();
	$(pops).addClass("is-opened");
	$("html").addClass("is-opened");
	if($(pops).hasClass("layer-tip")){
		$(pops).css("top",$top - $scroll);
	};
	if($(pops).hasClass("layer-over")){
		$("html").addClass("over");
	};
	if($(obj).hasClass("btn-over")){
		$("html").addClass("over");
		$(pops).addClass("layer-over");
	};
	if($(obj).hasClass("btn-over2")){
		$("html").addClass("over2");
		$(pops).addClass("layer-over2");
	};
	if($(pops).hasClass("type-vd")){
		var embed = $(obj).attr("data-url");
		var frame = $(pops).find(".video-wrap");
		frame.html('<iframe src="' + embed +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
	};
};
//팝업 공통닫기
function closepop(obj){
	var pops = $(obj).closest(".layerpop");
	$(pops).removeClass("is-opened");
	if($(pops).hasClass("layer-over")){
		$("html").removeClass("over");
	}else if($(pops).hasClass("layer-over2")){
		$("html").removeClass("over2");
	}else{
		$("html").removeClass("is-opened");
	};
	if($(pops).hasClass("type-alert")){
		$("html").removeClass("is-opened over over2");
		$(".layerpop").each(function(){
			$(this).removeClass("is-opened");
		});
	};
	// $("input").prop("checked", false);
};
//privacy chekck
function getAgree(obj){
	if($("input:checkbox[name=misAgree1]").is(':checked')){
		//동의
		openpop(obj);
	}else{
		//동의안함
		alert("개인정보 수집에 동의해주십시오")
	}
};
$(function(){
	//팝업 열기 버튼 공통
	$(".btn-layer").each(function(e){
		$(this).off("click").on("click" , function(e){
			e.preventDefault();
			openpop(this);
		});
	});
	//팝업 닫기 버튼 공통
	$(".layer-close").each(function(){
		$(this).off("click").on("click" , function(e){
			e.preventDefault();
			closepop(this);
			if($(this).hasClass("close-all")){
				$("html").removeClass("is-opened over over2");
				$(".layerpop").each(function(){
					$(this).removeClass("is-opened");
				});
			};
			if($(this).closest(".layerpop").hasClass("type-vd")){
				embed = $(this).attr("data-link");
				$(this).closest(".layerpop").find(".video-wrap").html("");
			};
		});
	});
	//dim 클릭시 팝업 닫기
	$(".dim").each(function(){
		$(this).off("click").on("click" , function(e){
			e.preventDefault();
			$("html").removeClass("is-opened over over2");
			$(".layerpop").each(function(){
				$(this).removeClass("is-opened");
			});
		});
	});
	//유의사항
	$(".notice-list dt").off("click").on("click" , function(e){
		e.preventDefault();
		$(this).toggleClass("active");
	});

	/*$(".v-motion").each(function(){
		var wh = $(window).outerHeight(),
		$top = $(this).offset().top,
		$bottom = $top + $(this).outerHeight()*0.6;
		if(wh>= $bottom){
			$(this).addClass("active");
		};
		$(window).scroll( function(){
			var wh = $(window).outerHeight(),
			$scWn = $(window).scrollTop();
			$(".v-motion").each( function(){
				var $top = $(this).offset().top,
				$bottom = $top + $(this).outerHeight()*0.6,
				$trigger = $top - wh/2;
				if($scWn >= $trigger && $scWn <= $bottom){
					$(this).addClass("active");
				}else{
					if($bottom >= wh || $scWn >= $top*0.6 ){
						$(this).removeClass("active");
					}
				};
			});
		});
	}); */

	//메인모션
	$(".v-motion").each(function(){
		var wh = $(window).innerHeight(),
		$st = $(window).scrollTop(),
		$top = $(this).offset().top,
		$bottom = $top + $(this).outerHeight()*0.6;
		if($st >= $top - wh){
			$(this).addClass("active");
		};

		$(window).scroll( function(){
			var wh = $(window).innerHeight(),
			$st = $(window).scrollTop();
			$(".v-motion").each( function(){
				var $top = $(this).offset().top,
				$bottom = $top + $(this).outerHeight()*0.6,
				$trigger = $top - wh*0.6;
				if($st >= $trigger){
					$(this).addClass("active");
				}else{
					if($st < $top - wh){
						$(this).removeClass("active");
					}
				};
			});
		});
	});
});
