var GOLDAY = function(e, t, a) {
    var n = "active", exports = {el: {},load: function(t, a) {//首页初始化加载
           var n = this;
            a = a || function() {};
            var r = document.createElement("script");
            r.onload = function() {
                r.isInited || (r.isInited = !0,
                a.call(n))
            },
            r.onreadystatechange = function() {
                !r.isInited && /^loaded|complete$/.test(r.readyState) && (r.isInited = !0,
                a.call(n))
            },
            r.src = t,
            e.getElementsByTagName("body")[0].appendChild(r)
        },scrollLoading: function(a) {
            var n = [];
            if (a && a.length) {
                a.each(function() {
                    if($(this).attr("data-load")){
                       n.push({
                            obj: this,
                            load: $(this).attr("data-load")
                        })
                    }else{
                        n.push({
                            obj: this,
                            imgsrc: $(this).attr("data-imgsrc")
                        })
                    }
                });
                var r = function() {
                    var e = $(t).height()
                      , a = $(t).width();
                    $.each(n, function(index,element) {
                        var r = element.obj;
                        if (r) {
                            var i = r.getBoundingClientRect();//当前元素在浏览器可视区域的位置
                            if (0 != i.left || 0 != i.top) {
                                var s = r.clientWidth//元素自身的宽高
                                  , o = r.clientHeight
                                  , l = !1;
                                i.top + o >= 0 && i.top < e && (l = !0);
                                var c = !1;
                                i.left + s >= 0 && i.left < a && (c = !0);
                                if(l && c ){
                                    if(!$(r).html() && $(r).attr("data-load")){
                                        _lA(element),r.removeAttribute("data-load");
                                    }else if($(r).attr("data-imgsrc")){
                                        _sI(element),r.removeAttribute("data-imgsrc");
                                    }
                                    n.obj = null
                                }
                            }
                        }
                    })
                }
                var _lA = function(o){
                    $.ajax({
                        url: o.load,
                        dataType: "json",
                        success: function(e) {
                            var html = '';
                            var data = e.data,code = e.code;
                            if( 0 == code){
                                for(var k=0 ; k<data.length;k++){
                                    html +="<li><a href='"+data[k].id+"' title='"+data[k].title+"'>"+data[k].title+"</a></li>";
                                }
                            }
                            $(o.obj).css("background-image","none");
                            $(o.obj).html(html);
                        },
                        error: function() {
                            $(o.obj).html('内容未获取成功，稍后重试')
                        }
                    })
                 }
                 var _sI = function(o){
                    o.obj.src= o.imgsrc;
                 }
                ;
                this.el.container.on("scroll", r),
                this.el.container.on("resize", r),
                r()
            }
        },slidePreload: function() {
            var e = this;
            return e.isPreload = !0, e
        },slideHomeHeader: function() {
            var a = this, r = a.el.header, i = a.el.dots, target,currentIndex= 0, elAs = $('#hdDotX a');
            if (r.length) {
                var s = function() {
                    a.gdTimerSlide || (a.gdTimerSlide = setInterval(function() {
                        var e = 1 * $("#hdDotX ." + n).data("index");
                        i[e] || (e = 0), i.eq(e-1).removeClass(n),i.eq(e).addClass(n).trigger("click");
                    }, 5e3))
                };
                r.on("mouseenter", function() {
                    clearInterval(a.gdTimerSlide), a.gdTimerSlide = null;
                }).on("mouseleave", function() {
                    s()
                }), $(e).on("mouseover", function() {
                    a.isPreload || (setTimeout(function() {
                        a.isPreload || a.slidePreload()
                    }, 4e3), setTimeout(function() {
                        s()
                    }, 5e3))
                });
                $(".gd-hd-dot-a").click(function(){
                    $(this).addClass(n).siblings().removeClass(n);
                     var index = $(this).index();
                      $(".gd-hd-slide-li").removeClass(n);
                        $("#hdSlide"+(index+1)).addClass(n);
                        target = $("#hdSlide"+(index+1)).find("s");
                        if(!target.attr('style')||target.attr('style').indexOf("base64") > -1){
                            var style= "background-image:url("+target.attr('data-src')+")";

                            target.attr('style',style).removeAttr('data-src');
                        }
                })
                $(".slider-next").click(function(){
                    elAs.each(function(index) {
                        if($(this).hasClass("active")){
                            if(index >= (elAs.length-1)){
                                currentIndex = 0;
                            }else{
                                currentIndex = index+1;
                            }
                        }
                    });
                    slidenp(currentIndex);
                })

                $(".slider-prev").click(function(){
                    elAs.each(function(index) {
                    if($(this).hasClass("active")){
                        if(0>=index){
                            currentIndex = (elAs.length-1);
                        }else{
                            currentIndex = index-1;
                        }
                    }
                    });

                    slidenp(currentIndex);
                })

                //左右点击滑动块封装
                function slidenp(currentIndex){
                    $(".gd-hd-dot-a").eq(currentIndex).click();
                }
            }
            return this
        },clickTaping: function(a){
            var _list = a.find("li"),_id = a.attr("data-id");
            _list.on("click", function() {
                    var e = $(this), t = e.index(),i='',r=null,x=null;
                    if (e.hasClass(n) === !1) {
                         i = a.find("." + n),
                         i.removeClass(n),
                         e.addClass(n),
                       r = $("#"+_id).find("." + n),
                       r.removeClass(n),
                       x = $("#"+_id).find(".newsbox").eq(t);
                       x.addClass(n);
                    }
            });
        },notice:function(){
            var a = this;
            var num = $('.notice_active').find('dd').length;
            if(num > 1){
                var i =0;
               var time=setInterval(timer,3500);
                $('.notice_active a').mousemove(function(){
                    clearInterval(time);
                }).mouseout(function(){
                    time = setInterval(timer,3500);
                });
            };
            function timer(){
                 $(".notice_active").find('dl').animate({
                marginTop : "-40px"
                },500,function(){
                $(this).css({marginTop : "0px"}).find("dd:first").appendTo(this);
                })
               }
        },textoverflow:function(classname,num){
            classname.each(function(){
            var maxwidth=num;
            if($(this).text().length>maxwidth){
                $(this).text($(this).text().substring(0,maxwidth));
                $(this).html($(this).html()+'…');
            }
            });
        },backToTop:function(){
            var o = $(window);
           var jstoTop = $(".jsBackToTop").on("click", function(j) {
             j.preventDefault();
             var n = o.scrollTop(),yi = function() { $('html,body').animate({scrollTop:0},'slow') };
           yi() });
            o.on("scroll", function() {
            var t = o.scrollTop(),
            e = o.height();
            return t > e ? void jstoTop.css({ opacity: 1, display: "block" }) : void jstoTop.css({ opacity: 0, display: "none" }) })
        },scrollBarFixed: function() {
            var a = this, s=$(".gd-bar-fixed"),m="fixed-active";
                    a.el.container.on("scroll", function() {
                        var t = $(this).scrollTop();
                        t>200 ? s.addClass(m) : s.removeClass(m);
                    });
        },calendar:function(){
            var tt =function (){
                    if (!$('#calendar').html()) {
                                    function timeStampToDate(seconds, f) {
                                    // 时间戳转日期
                                    var md = new Date(1e3 * parseInt(seconds));
                                    if (f == 'day') {
                                    return md.getFullYear() + "年" + (md.getMonth() + 1) + "月" + md.getDate() + '日';
                                    } else if (f == 1) {
                                    return (md.getMonth() + 1) + "-" + md.getDate();
                                    } else {
                                    return  (md.getHours()>9 ? md.getHours() : "0"+md.getHours())+ ":"+(md.getMinutes()>9 ? md.getMinutes() : "0"+md.getMinutes());
                                    }
                                    }
                                        $.ajax({
                                            type: 'GET',
                                            url:cjrlUrl,
                                            beforeSend:function(){
                                                $("#calendar").html('内容正在加载中，请稍等...')
                                            },
                                            success: function(e) {
                                                var str = '';
                                                 var data = eval('(' + e + ')').data;
                                                        data  = data.items;
                                                    for (var z = 1; z < 8; z++) {
                                                        var times=timeStampToDate(data[z].timestamp * 1000),country=data[z].country,title=data[z].title,stars=data[z].stars,forecast=data[z].forecast,actual=data[z].actual;

                                                       var star= '';
                                                            for(var j =0; j < stars;j++){
                                                            star+="<i class=\'star-full\'></i>";
                                                            }
                                                            for(var k =0; k < (5-stars);k++){
                                                            star+="<i class=\'star-empty\'></i>";
                                                            }
                                                            if(actual == null ||  actual == '' || actual == undefined){
                                                            actual = '- -';
                                                            }
                                                            if(forecast !== null || forecast !== undefined || forecast !== ''){
                                                            forecast =  '- -';
                                                            }
                                                            str+="<tr><td>"+times+"</td><td>"+country+"</td><td><p class=\'ell gd-cale-p\'>"+title+"</p></td>"+"<td class=\'tc\'>"+star+"</td><td>"+actual+"</td><td>"+forecast+"</td></tr>";
                                                    }
                                                     $("#calendar").css("background-image","none").html(str);
                                            },
                                            error: function() {
                                            $("#calendar").html('内容未获取成功，稍后重试')
                                            }
                                        })
                        }
                        }
                $("#cjrlload").hover(function(){
                    tt()
                });
        },noneradius:function(){
               $(".noneradius").mouseenter(function(){
                 $(this).parent().css("border-bottom-right-radius","0px");
            })
                 $(".noneradius").mouseleave(function(){
                 $(this).parent().css("border-bottom-right-radius","5px");
            })
        },chat:function(id){
              id.on("click",function(){
                 var url =  id.data("chat");
                  window.open (url, "newwindow", "height=460, width=580, toolbar =no, menubar=no,scrollbars=no, resizable=yes, location=no, status=no");
              })

        },eventsHome: function() {//调用内部函数
            var e = this;
            e.slideHomeHeader();
            e.scrollLoading($("[data-load]"));
            e.scrollLoading($("img[data-imgsrc]"));
           e.clickTaping($(".newsNav"));
            e.scrollBarFixed();
            e.textoverflow($(".text_overflow"),78);
            e.backToTop();
            e.noneradius();
            e.chat($("#livekefu"));
             $(".video-lnk").click(function(){
                var videoInit = $(this).attr("data-videoInit");
                $(this).hide();
                $("#playerswf").show();
                $("#playerswf").get(0).play();
            })
        },init: function() {//初始化
            var e = this;
            return e.el.container = $(t),e.el.header = $("#gdHeader"),e.el.dots = $("#hdDotX a"),e.eventsHome(),e.calendar(),e.notice(),e
        }};
    return exports
}(document, window);
