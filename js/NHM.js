(($)=>{

    class NHM {
        init (){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.footer();
            this.quick();
        }

        header(){
        }
        section1(){

            $(window).resize(function(){  
                MwinW = $(window).width();
                return MwinW;                   
            });

            let MwinW = $('.Mslide-view').width();
            let MtouchStart = null;
            let MtouchEnd = null;
            let Mresult = '';
            let MdragStart = null;
            let MdragEnd = null;
            let MmouseDown = false;

                $('.Mslide-view').on({
                    mousedown: function(e){ 
                        e.preventDefault();
                       // pausefn();
                        MtouchStart = e.clientX;
                        MdragStart = e.clientX-$('.Mslide-wrap').offset().left-MwinW;  
                        MmouseDown = true;
          
                      },
                      mouseup: function(e){ 
                        e.preventDefault();
                        MtouchEnd = e.clientX;
                        Mresult = MtouchStart-MtouchEnd > 0 ? 'NEXT' : 'PREV';
          
                        if( Math.abs(MtouchStart-MtouchEnd) > 0){
                           if(Mresult==='PREV'){
                               if(!$('.Mslide-wrap').is(':animated')){
                                  prevCountM();
                                  //pausefn();
                               }            
                             }
                           if(Mresult==='NEXT'){
                               if(!$('.Mslide-wrap').is(':animated')){
                                  nextCountM();
                                 // pausefn();         
                               }
                             }
                        }         
                        MmouseDown = false;         
                      },
                      mouseleave: function(e){ 
                        e.preventDefault();
                        if(!MmouseDown) {return;}
          
                          MtouchEnd = e.clientX;
                          Mresult = MtouchStart-MtouchEnd > 0 ? 'NEXT' : 'PREV';
          
                          if(Math.abs(MtouchStart-MtouchEnd) > 0){
                              if(Mresult==='PREV'){
                                  if(!$('.Mslide-wrap').is(':animated')){
                                      prevCountM(); 
                                     // pausefn(); 
                                  }                
                                }
                              if(Mresult==='NEXT'){
                                  if(!$('.Mslide-wrap').is(':animated')){  
                                      nextCountM();  
                                     // pausefn();         
                                  }
                                }
                           }
                           MmouseDown = false;      
                      },
                      mousemove: function(e){
                        e.preventDefault();
                        if(!MmouseDown) return; 
                        MdragEnd = e.clientX;
                        $('.Mslide-wrap').css({left: MdragEnd-MdragStart }); 
                      }
                  });



            //메인슬라이드
            let cntM = 0;
            let setIdM = 0;
           // let setId2 = 0;

            function mainSlideM(){
                $('.Mslide-wrap').stop().animate({left: `${-100*cntM}%`},600, function(){
                    cntM > 3 ? cntM=0 : cntM;
                    cntM < 0 ? cntM=3 : cntM;
                    $('.Mslide-wrap').stop().animate({left: `${-100*cntM}%`}, 0 );
                });
                MpageBtn();
            }

            function nextCountM(){
                cntM++;
                mainSlideM();
            }
            function prevCountM(){
                cntM--;
                mainSlideM();
            }
            function autoTimerM(){
                setIdM = setInterval(nextCountM,2000);
            }
            autoTimerM();


            //페이지버튼
            function MpageBtn(){
                $('.Mpage-btn li').removeClass('on');
                $('.Mpage-btn li').eq(cntM>3?0:cntM).addClass('on');
            }

            $('.Mpage-btn li').each(function(idx){
                $(this).click(function(){
                    //pausefn();
                    cntM=idx;
                    mainSlideM();
                });
        
            
            });

            //정지/플레이

            $('.play-pause').on({
                click: function(){
                    $('.play-pause').toggleClass('on');
                }
            });



            // $('.btn-ctl').click(function(){
            //     if( $('.btn-play').hasClass('on') ){
            //         pausefn(); 
            //     } 
            //     else{
            //         playfn();
            //     }
            
            // });
            
            // function pausefn(){
            //     $('.btn-play').addClass('on');
            //     $('.btn-stop').removeClass('on');

            //     clearInterval(setId);
            //     clearInterval(setId2);
            //     // $('.btn-play').removeClass('on');
            //     // $('.btn-stop').addClass('on');
        
            //     let count = 0;
            //     setId2 = setInterval(function(){
            //         count++;
            //         if( count>4 ){ 
            //             clearInterval(setId);
            //             clearInterval(setId2);
            //             nextCount();
            //             playfn();
            //         }
            //     },1000); 
            
            // }
        
            // function playfn(){
            //     $('.btn-stop').addClass('on');
            //     $('.btn-play').removeClass('on');
            //     autoTimer();
            // }
        
    


        }
        section2(){
        }
        section3(){
        }
        footer(){
        }
        quick(){
        }
    }

    const newNHM = new NHM();
    newNHM.init();

})(jQuery);