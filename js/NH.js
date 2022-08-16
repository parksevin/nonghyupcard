(($)=>{

    class NH {
        init (){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.footer();
            this.quick();
        }

        header(){

            // $('.main-btn').on({
            //     mouseover: function(e){
            //         e.stopPropagation();
            //         $('.bg-black').show();
            //         if($('.sub-box').is(':visible')){
            //             $('.sub-box').fadeOut(0);
            //             $(this).next().fadeIn(0);
            //         }
            //         else{
            //             $('.sub-box').fadeOut(0);
            //             $(this).next().slideDown(300);
            //         }
            //     }
            // });

            // $('.left-box').on({
            //     mouseout: function(e){
            //         e.stopPropagation();
            //         $('.bg-black').hide();
            //         $('.sub-box').slideUp(300);
            //         $('.main-btn').removeClass('on');
            //     }
            
            // });

            $('.gnb-search').on({
                click: function(){
                    $('.sch-box').toggle();
                    $('.bg-black').toggle();
                    $('.gnb-search').toggleClass('on');
                }
            });


            // $('.main-btn').on({
            //     mouseenter: function(){
            //         $('.main-btn').removeClass('on');
            //         $(this).addClass('on');
            //     }
            // });

            //호버스 메뉴바 슬라이드

            const target = document.querySelector('.d1bar');
            const links = document.querySelectorAll('.main-btn');
            const menu = document.querySelector('.main-menu-box');

            for(let i = 0; i<links.length; i++){
                links[i].addEventListener('click', (e) => e.preventDefault());
                links[i].addEventListener('mouseenter', mouseenterFunc);
                menu.addEventListener('mouseleave', mouseleaveFunc);
            }
            

            function mouseenterFunc(e){
                e.stopPropagation();

                    $('.bg-black').show();
                    if($('.sub-box').is(':visible')){
                        $('.sub-box').fadeOut(0);
                        $(this).next().fadeIn(0);
                    }
                    else{
                        $('.sub-box').fadeOut(0);
                        $(this).next().slideDown(300);
                    }

                if(!this.classList.contains('active')){
                    for(let i = 0; i<links.length; i++){
                        if(links[i].parentNode.classList.contains('active')){
                            links[i].parentNode.classList.remove('active');
                        }
                        links[i].style.color ='#333333';
                    }//마우스가 올라가지 않은 다른 메뉴들마다 할 일
                }

                this.parentNode.classList.add('active');
                this.style.color ='#0051c7';
                target.style.width = '100%';
                //target.style.left = 'auto';
    

            // a.getBoundingClientRect().width() 해당요소의 너비
                const width = this.getBoundingClientRect().width; 
                const left = this.getBoundingClientRect().left + width/2; 
                //console.log(left);

                //ES5 target.style.width = width + 'px'
                target.style.width = `${width}px`;
                target.style.left = `${left}px`;

                console.log(target);

            }

            
            function mouseleaveFunc(e){
               e.stopPropagation();

               for (let i = 0; i < links.length; i++) {
                if(links[i].parentNode.classList.contains('active')){
                    links[i].parentNode.classList.remove('active');
                    $('.sub-box').fadeOut(0);
                    $('.bg-black').hide();
                }
                links[i].style.color ='#333333';
                target.style.width = '0';
            }

            
            }
        

            //스크롤

            let result = '';
            let newTop = $(window).scrollTop();
            let oldTop = newTop; 

            $(window).scroll(()=>{

                newTop = $(window).scrollTop();
                result = oldTop-newTop > 0 ? 'up': 'down';
                oldTop = newTop;

                if(result==='down'){
                    $('#header').addClass('fixed');
                    $('.quick').addClass('topvisvle');

                    const active = document.querySelector('.main-menu.active')
                    if( active ) {
                        const width = active.getBoundingClientRect().width;
                        const left = active.getBoundingClientRect().left + width/2;
                        target.style.width = `${width}px`;  
                        target.style.left = `${left}px`;
                    }

                    // $('.sub-box').fadeOut(0);
                    // $('.bg-black').hide();
                }

                if($(window).scrollTop()===0) {
                    $('#header').removeClass('fixed');
                    $('.quick').removeClass('topvisvle');
                    const active = document.querySelector('.main-menu.active')
                    if( active ) {
                        const width = active.getBoundingClientRect().width;
                        const left = active.getBoundingClientRect().left + width/2;
                        target.style.width = `${width}px`;
                        target.style.left = `${left}px`;
                    }
                    
                }

            });

        }
        section1(){

            //터치슬라이드
            let winW = $('.slide-container').width();
            let touchStart = null;
            let touchEnd = null;
            let result = '';
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;

                $('.slide-container').on({
                    mousedown: function(e){ 
                        e.preventDefault();
                        pausefn();
                        touchStart = e.clientX;
                        dragStart = e.clientX-$('.slide-wrap').offset().left-winW;  
                        mouseDown = true;
          
                      },
                      mouseup: function(e){ 
                        e.preventDefault();
                        touchEnd = e.clientX;
                        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
          
                        if( Math.abs(touchStart-touchEnd) > 0){
                           if(result==='PREV'){
                               if(!$('.slide-wrap').is(':animated')){
                                  prevCount();
                                  pausefn();
                               }            
                             }
                           if(result==='NEXT'){
                               if(!$('.slide-wrap').is(':animated')){
                                  nextCount();
                                  pausefn();         
                               }
                             }
                        }         
                        mouseDown = false;         
                      },
                      mouseleave: function(e){ 
                        e.preventDefault();
                        if(!mouseDown) {return;}
          
                          touchEnd = e.clientX;
                          result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
          
                          if(Math.abs(touchStart-touchEnd) > 0){
                              if(result==='PREV'){
                                  if(!$('.slide-wrap').is(':animated')){
                                      prevCount(); 
                                      pausefn(); 
                                  }                
                                }
                              if(result==='NEXT'){
                                  if(!$('.slide-wrap').is(':animated')){  
                                      nextCount();  
                                      pausefn();         
                                  }
                                }
                           }
                           mouseDown = false;      
                      },
                      mousemove: function(e){
                        e.preventDefault();
                        if(!mouseDown) return; 
                        dragEnd = e.clientX;
                        $('.slide-wrap').css({left: dragEnd-dragStart }); 
                      }
                  });




            //메인슬라이드
            let cnt = 0;
            let setId = 0;
            let setId2 = 0;
            var totalPage = $('.slide-wrap li').length-2;

            function mainSlide(){
                $('.slide-wrap').stop().animate({left: `${-100*cnt}%`},600, function(){
                    cnt > 4 ? cnt=0 : cnt;
                    cnt < 0 ? cnt=4 : cnt;
                    $('.slide-wrap').stop().animate({left: `${-100*cnt}%`}, 0 );
                });
                countSlides();
                pageBtn();
            }

            function nextCount(){
                cnt++;
                mainSlide();
            }
            function prevCount(){
                cnt--;
                mainSlide();
            }
            function autoTimer(){
                setId = setInterval(nextCount,2000);
            }
            autoTimer();


            //페이지버튼
            function pageBtn(){
                $('.page-btn span').removeClass('on');
                $('.page-btn span').eq(cnt>4?0:cnt).addClass('on');
            }

            $('.page-btn span').each(function(idx){
                $(this).click(function(){
                    pausefn();
                    cnt=idx;
                    mainSlide();
                    countSlides();
                });
        
            
            });

            //화살표

            $('.next-btn').click(function(){
                    if( $('.slide-wrap').is(':animated')){
                        return;
                    }
                    pausefn();
                    nextCount();
            });
            $('.prev-btn').click(function(){
                if( $('.slide-wrap').is(':animated')){
                    return;
                }
                pausefn();
                prevCount();
            });

            //정지/플레이

            $('.btn-stop').on({
                click: function(){
                    $('.btn-stop').removeClass('on');
                    $('.btn-play').addClass('on');
                }
            });

            $('.btn-play').on({
                click: function(){
                    $('.btn-play').removeClass('on');
                    $('.btn-stop').addClass('on');   
                }
            });


            $('.btn-ctl').click(function(){
                if( $('.btn-play').hasClass('on') ){
                    pausefn(); 
                } 
                else{
                    playfn();
                }
            
            });
            
            function pausefn(){
                $('.btn-play').addClass('on');
                $('.btn-stop').removeClass('on');

                clearInterval(setId);
                clearInterval(setId2);
                // $('.btn-play').removeClass('on');
                // $('.btn-stop').addClass('on');
        
                let count = 0;
                setId2 = setInterval(function(){
                    count++;
                    if( count>5 ){ 
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextCount();
                        playfn();
                    }
                },1000); 
            
            }
        
            function playfn(){
                $('.btn-stop').addClass('on');
                $('.btn-play').removeClass('on');
                autoTimer();
            }
        
        
            //숫자

            function countSlides(){
                cnt > 4 ? cnt=0 : cnt;
                cnt < 0 ? cnt=4 : cnt;
                $('.idx').html(cnt+1);
                $('.t-idx').html(totalPage);
            }



        //     //모바일버전

        //     //메인슬라이드

        //     let cntM = 0;
        //     let setIdM = 0;
        //    // let setId2 = 0;

        //     function mainSlideM(){
        //         $('.Mslide-wrap').stop().animate({left: `${-100*cntM}%`},600, function(){
        //             cntM > 3 ? cntM=0 : cntM;
        //             cntM < 0 ? cntM=3 : cntM;
        //             $('.Mslide-wrap').stop().animate({left: `${-100*cntM}%`}, 0 );
        //         });
        //         //pageBtn();
        //         console.log(cntM);
        //     }

        //     function nextCountM(){
        //         cntM++;
        //         mainSlideM();
        //     }
        //     function prevCountM(){
        //         cntM--;
        //         mainSlideM();
        //     }
        //     function autoTimerM(){
        //         setIdM = setInterval(nextCountM,2000);
        //     }
        //     autoTimerM();












        }
        section2(){


            $('.tab').on({
                click: function(){
                    $('.tab').removeClass('on');
                    $(this).addClass('on');
                }
            });
            $('#tab_01').on({
                click: function(){
                    $('.tab-cont').removeClass('on');
                    $('.tab-slide1').addClass('on');
                }
            });
            $('#tab_02').on({
                click: function(){
                    $('.tab-cont').removeClass('on');
                    $('.tab-slide2').addClass('on');
                }
            });
            $('#tab_03').on({
                click: function(){
                    $('.tab-cont').removeClass('on');
                    $('.tab-slide3').addClass('on');
                }
            });
            $('#tab_04').on({
                click: function(){
                    $('.tab-cont').removeClass('on');
                    $('.tab-slide4').addClass('on');
                }
            });


            let cnt = 0;

            function sec2Slide(){
                $('.tab-menu-wrap').stop().animate({left: `${-43*cnt}%`},300, function(){
                    if(cnt===2){
                        $('.tab-menu-wrap').stop().animate({left: `${-69}%`},300 );
                        $('.tab-menu-wrap')[0].setAttribute("disabled",'true');
                        $('.tab-bar').css('transform','scaleX(1)');
                    }
                    if(cnt===1){
                        $('.tab-bar').css('transform','scaleX(0.666667)');
                    }
                    if(cnt===0){
                        $('.tab-menu-wrap')[0].setAttribute("disabled",'true');
                        $('.tab-bar').css('transform','scaleX(0.333333)');
                    }
                });
            }

            function nextCount(){
                if(cnt<2) {
                    cnt++;
                    sec2Slide();
                }
            }
            function prevCount(){
                if(cnt>0) {
                    cnt--;
                    sec2Slide();
                }
            }



            //터치슬라이드

            let touchStart = null;
            let touchEnd = null;
            let result = '';
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;

                $('.tab-cont').on({
                    mousedown: function(e){ 
                        e.preventDefault();
                        touchStart = e.clientX;
                        dragStart = e.clientX-$('.tab-menu-wrap').offset().left-(`${-43*cnt}%`);  
                        mouseDown = true;

                      },
                      mouseup: function(e){ 
                        e.preventDefault();
                        touchEnd = e.clientX;
                        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
          
                        if( Math.abs(touchStart-touchEnd) > 0){
                           if(result==='PREV'){
                               if(!$('.tab-menu-wrap').is(':animated')){
                                  prevCount();
                               }            
                             }
                           if(result==='NEXT'){
                               if(!$('.tab-menu-wrap').is(':animated')){
                                  nextCount();       
                               }
                             }
                        }         
                        mouseDown = false;         
                      },
                      mouseleave: function(e){ 
                        e.preventDefault();
                        if(!mouseDown) {return;}
          
                          touchEnd = e.clientX;
                          result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
          
                          if(Math.abs(touchStart-touchEnd) > 0){
                              if(result==='PREV'){
                                  if(!$('.tab-menu-wrap').is(':animated')){
                                      prevCount(); 
                                  }                
                                }
                              if(result==='NEXT'){
                                  if(!$('.tab-menu-wrap').is(':animated')){  
                                      nextCount();      
                                  }
                                }
                           }
                           mouseDown = false;      
                      },
                      mousemove: function(e){
                        e.preventDefault();
                        if(!mouseDown) return; 
                        dragEnd = e.clientX;
                        $('.tab-menu-wrap').css({left: dragEnd-dragStart }); 
                      }
                  });



        }
        section3(){

            $('.card').on({
                mouseenter: function(){
                    $('.over').removeClass('on');
                    $(this).find('div:eq(3)').addClass('on');
                },
                mouseleave: function(){
                    $('.over').removeClass('on');
                }
            });
            


        }
        footer(){
            
            $('.family-group').on({
                click: function(){
                    $('.active').toggleClass('on');
                    $('.familyList').slideToggle()();
                }
            });
        }
        quick(){
            $('.btn-top').on({
                click: function(){
                    $('html, body').stop().animate({scrollTop: 0 }, 300);
                }
              });
        }
    }

    const newNH = new NH();
    newNH.init();

})(jQuery);