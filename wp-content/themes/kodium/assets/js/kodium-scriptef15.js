/* Resize */
var $kodium_res='no-resize';
var $kodium_res_int_step=100;
jQuery(window).resize(function(){$kodium_res=1000;});
setInterval(function(){
    if($kodium_res!=='no-resize'){
        $kodium_res-=$kodium_res_int_step;
        if($kodium_res<=0){
            $kodium_res='no-resize';
            kodium_resize();
        }
    }
},$kodium_res_int_step);

/* Resize */
function kodium_resize(){
    "use strict";
    /* Portfolio Swiper */
    jQuery('.swiper-navigator').each(function(){
        var $cSwNav=jQuery(this);
        var $art=$cSwNav.siblings('.swiper-wrapper').find('article').first();
        $cSwNav.css({'width':$art.width(),'height':$art.height()});
        $cSwNav.siblings('.swiper-wrapper').css('margin-top',jQuery(window).width()<=480?$art.height():'');
    });
    /* map-contact */
    jQuery('.kodium-map-contact').each(function(){
        var $c=jQuery(this);
        $c.css({'height':'auto','max-height':'none'});
        var $cH=$c.height()+kodiumItemTB($c);
        var $cCon=$c.closest('.kodium-map');
        var $cConH=$cCon.height()+kodiumItemTB($cCon);
        if($cH>$cConH){
            $cCon.height($cH);
        }
        jQuery(this).css({'height':'','max-height':''});
    });
    /* Redraw */
    jQuery('.kodium-redraw').each(function() {
        var $curr = jQuery(this);
        if (!$curr.hasClass('not-drawed')) {
            $curr.trigger('kodium-animate');
        }
    });

    /* Size Dimention */
    jQuery('.kodium-size').each(function(){
        var $curr = jQuery(this);
        var $currW = parseInt($curr.data('width'),10);
        var $currH = parseInt($curr.data('height'),10);
        var $currD = $currW / $currH;
        var $currNW = $curr.width();
        var $currNH = $currNW / $currD;
        $curr.height($currNH).attr('aaa',$currNH);
    });
    /* Mega Menu Resize */
    try{
        var $megaHeader    =jQuery('.header-inner>.container>.row');
        var $megaHeaderLeft=0;
        var $megaHeaderWidth=0;
        if(jQuery('body').hasClass('theme-boxed')){
            $megaHeaderLeft=jQuery('#theme-layout').offset().left;
            $megaHeaderWidth=jQuery('#theme-layout').width();
        }else{
            $megaHeaderLeft =$megaHeader.closest('.container').offset().left+parseInt($megaHeader.closest('.container').css('padding-left').replace('px', ''), 10);
            $megaHeaderWidth=$megaHeader.closest('.container').width();
        }
        jQuery('.kodium-mega-menu').each(function(){
            var $currMega=jQuery(this);
            var $currMegaWidth=0;
            var $liW=0;
            var $rem=0;
            var $currMegaLeft=0;
            var $colCnt  =parseInt($currMega.data('col').replace('column-', ''), 10);
            $currMega.css({'display':'block','opacity':'0','width':''});
            jQuery('>li',$currMega).each(function(){
                jQuery(this).css('width','');
                if(jQuery(this).width()>$liW){
                    $liW=jQuery(this).width();
                }
            }).promise().done(function(){
                $currMega.css('margin-left','0px').css('left','0px');
                $currMegaLeft=$currMega.offset().left;
                if($colCnt<=3){
                    $currMegaWidth=$liW*$colCnt;
                    $rem=($megaHeaderLeft+$megaHeaderWidth)-($currMegaLeft+$currMegaWidth);
                }else{
                    $currMegaWidth=$megaHeaderWidth;
                    $liW=$currMegaWidth/$colCnt;
                    $rem=$megaHeaderLeft-$currMegaLeft;
                }
                jQuery('>li',$currMega).width($liW);
                $currMega.width($currMegaWidth);
                
                if($rem<0){
                    $currMega.css('margin-left',$rem+'px');
                }else{
                    $currMega.css('margin-left','').css('left','');
                }
                
                $currMega.css({'display':'none','opacity':'','visibility':'hidden'});
            });
        });
    }catch(err){}
    /* Full Element Resize */
    /* ------------------------------------------------------------------- */
    jQuery('.kodium-full-element').each(function(){
        var $currentWavesFullElement=jQuery(this);
        var $w=jQuery(window).width();
        if(!jQuery('body').hasClass('theme-boxed') || (1183<=$w && $w<=1242) || $w<=974){
            $currentWavesFullElement.css('margin-left','0px').css('margin-right','0px').css('padding-left','0px').css('padding-right','0px').css('width','');
            var $currLayoutWidth = jQuery(window).width();
            var $marginLeft=$currentWavesFullElement.offset().left*-1;
            $currentWavesFullElement.css('margin-left',$marginLeft+'px');
            $currentWavesFullElement.css('width',($currLayoutWidth)+'px');
        }else{
            $currentWavesFullElement.css('margin-left','').css('margin-right','').css('padding-left','').css('padding-right','').css('width','');
        }
    });
}
jQuery(document).ready(function($){
    "use strict";
    /* Portfolio Gallery */
    jQuery(document).on("click",".kodium-fixed-gallery-header>.title",function(e){e.preventDefault();
        $('body').toggleClass('fixed-gallery-opened');
        return false;
    });
    jQuery(document).on("click",".kodium-fixed-gallery-content .close-button",function(e){e.preventDefault();
        $('body').removeClass('fixed-gallery-opened');
        return false;
    });
    /* Search Form Animation */
    jQuery('.kodium-header .search-btn').click(function (e) {
        //$('.search-box').show().css('opacity', '1');
        $('body').addClass('search-box-opened');
    });
    jQuery('.search-box .close-search').click(function () {
        $('body').removeClass('search-box-opened');
    });
    /* Widget instagram */
    if ($().owlCarousel !== undefined && $().owlCarousel !== 'undefined') {
        $('.null-instagram-feed>.owl-carousel').each(function () {
            var $cOwl = $(this);
            var $singleItem = $cOwl.closest('.bottom-area').hasClass('bottom-area') ? false : true;
            var $items = $cOwl.closest('.bottom-area').hasClass('bottom-area') ? 6 : 1;
            var $pagination = $cOwl.closest('.bottom-area').hasClass('bottom-area') ? false : true;
            var $navigation = $cOwl.closest('.bottom-area').hasClass('bottom-area') ? true : false;
            var $autoPlay = $cOwl.data('auto-play');
            if ($autoPlay === '') {
                $autoPlay = false;
            }
            $cOwl.owlCarousel({
                autoPlay: $autoPlay,
                navigationText: ["<i class='ion-ios-arrow-left'></i>", "<i class='ion-ios-arrow-right'></i>"],
                navigation: $navigation,
                pagination: $pagination,
                items: $items,
                singleItem: $singleItem
            });
        });
    }
    /* Animated Background Colors */
    $('.btn-border').each(function(){
        var $color = $(this).css('color');
        var $bcolor = $(this).css('border-color');
        $(this).hover(function(){ 
                $(this).css('color',($color.replace(/ /gi,'')==='rgb(255,255,255)'||$color==='#ffffff'||$color==='#fff'?'#1f1f1f':'#fff'));
                $(this).css('background-color', $color);
                $(this).css('border-color', $color);
            },function(){
                $(this).css('color', $color);
                $(this).css('border-color', $bcolor);
                $(this).css('background-color', '');
            }
        );
    });
    $('.btn-flat').each(function(){
        var $bcolor = $(this).css('background-color');
        var $color = $(this).css('color');
        $(this).hover(function(){ 
                $(this).css('color',$bcolor);
                $(this).css('border-color',$bcolor);
                $(this).css('background-color', 'transparent');
            },function(){
                $(this).css('color', $color);
                $(this).css('background-color', $bcolor);
            }
        );
    });
    
    /* Animated Buttons on Animation Page please remove it after */
    jQuery('.animations a').click(function() {
        var $cls=jQuery(this).attr('id');
        jQuery('#animate-object').removeAttr('class');
            setTimeout(function(){jQuery('#animate-object').addClass($cls).addClass('animated');},10);
    });

    /* ThemeWaves Animate General - Init */
    $('.kodium-animate-gen').each(function() {
        var $curr = $(this);
        var $currChild = $curr.children().eq(-1);
        if ($currChild.attr('id') === 'sidebar' || $currChild.hasClass('kodium-pricing') || $currChild.hasClass('kodium-our-team') || $currChild.hasClass('kodium-blog')) {
            $currChild.children().addClass('kodium-animate-gen').attr('data-animation', $curr.attr('data-animation')).attr('data-animation-delay', $curr.attr('data-animation-delay')).attr('data-animation-offset', $curr.attr('data-animation-offset')).css('opacity', '0');
            $curr.removeClass('kodium-animate-gen').attr('data-animation', '').attr('data-animation-delay', '').attr('ddata-animation-offset', '').css('opacity', '');
        }
        if ($currChild.hasClass('carousel-anim')) {
            $currChild.find('ul.kodium-carousel>li').css('opacity', '0');
            $curr.css('opacity', '');
        }
    });
    /* --------------- */
});
jQuery(window).load(function() {
    "use strict";
    /* Google Map Style */
    jQuery('.kodium-map').each(function(i){
        var $currMapID='kodium-map-styled-'+i;
        var $currMap=jQuery(this);
        var $currMapStyle=$currMap.data('style');
        var $currMapMouse=$currMap.data('mouse');
        var $currMapLat=$currMap.data('lat');
        var $currMapLng=$currMap.data('lng');
        var $currMapZoom=$currMap.data('zoom');
        var $currMapArea=$currMap.children('.map').attr('id',$currMapID);
        
        var $map;
        var $center = new google.maps.LatLng($currMapLat,$currMapLng);
        var MY_MAPTYPE_ID = 'custom_style_'+i;
        $map = new google.maps.Map(
            document.getElementById($currMapID),
            {
                zoom: $currMapZoom,
                center: $center,
                mapTypeControlOptions:{
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                },
                mapTypeId: MY_MAPTYPE_ID
            }
        );
        $map.setOptions({scrollwheel:$currMapMouse});
        var $featureOpts = eval($currMap.data('json'));
        
        $map.mapTypes.set(MY_MAPTYPE_ID, new google.maps.StyledMapType($featureOpts,{name: $currMapStyle}));
        /* markers */
        if(jQuery().waypoint!==undefined&&jQuery().waypoint!=='undefined'){
            $currMap.waypoint(function() {
                $currMapArea.siblings('.map-markers').children('.map-marker').each(function(j){
                    var $currMar=jQuery(this);
                    var $currMarTitle=$currMar.data('title');
                    var $currMarLat=$currMar.data('lat');
                    var $currMarLng=$currMar.data('lng');
                    var $currMarIconSrc=$currMar.data('iconsrc');
                    var $currMarIconWidth=$currMar.data('iconwidth');
                    var $currMarIconHeight=$currMar.data('iconheight');

                    var markerOp={
                        position: new google.maps.LatLng($currMarLat,$currMarLng),
                        map: $map,
                        title: $currMarTitle,
                        animation: google.maps.Animation.DROP,
                        zIndex: j
                    };
                    if($currMarIconSrc&&$currMarIconWidth&&$currMarIconHeight){
                        markerOp.icon={
                            url: $currMarIconSrc,
                            size: new google.maps.Size($currMarIconWidth, $currMarIconHeight),
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(parseInt($currMarIconWidth,10)/2,$currMarIconHeight)
                        };
                    }
                    setTimeout(function() {
                        var marker = new google.maps.Marker(markerOp);
                        var infowindow = new google.maps.InfoWindow({content: $currMar.html()});
                        google.maps.event.addListener(marker, 'click', function() {
                            if(infowindow.getMap()){
                                infowindow.close();
                            }else{
                                infowindow.open($map,marker);
                                jQuery('.gm-style-iw').parent().addClass('kodium-iw-container');
                            }
                        });
                    }, j * 300);
                });
            }, {triggerOnce: true, offset: 'bottom-in-view'});
        }
    });
    /*----------------------------Initial Functions-----------------------------------------------*/
    kodiumReInit(jQuery('#theme-layout'));
    kodium_carousel();
    /* ThemeWaves Animate General - Bind */
    jQuery('.kodium-animate-gen').each(function() {
        var $curr = jQuery(this);
        var $currChild = $curr.children().eq(-1);
        var $removeClass = true;
        if ($curr.data('animation') === 'pulse' || $curr.data('animation') === 'floating' || $curr.data('animation') === 'tossing') {
            $removeClass = false;
        }
        $curr.bind('kodium-animate', function() {
            var $currDelay = parseInt($curr.attr('data-animation-delay'), 10);
            if($currDelay<0){$currDelay=0;}
            setTimeout(function(){
                if ($currChild.hasClass('carousel-anim')) {
                    $currChild.find('ul.kodium-carousel>li').each(function(i) {
                        var $currLi = jQuery(this);
                        setTimeout(function() {
                            $currLi.css('opacity', '');
                            $currLi.addClass('animated ' + $curr.data('animation'));
                            if ($removeClass) {
                                setTimeout(function() {
                                    $currLi.removeClass('animated');
                                    $currLi.removeClass($curr.data('animation'));
                                }, 3000);
                            }
                        }, 300 * i);
                    });
                } else {
                    $curr.css('opacity', '');
                    $curr.addClass('animated ' + $curr.data('animation'));
                    if ($removeClass) {
                        setTimeout(function() {
                            $curr.removeClass('animated');
                            $curr.removeClass($curr.data('animation'));
                        }, 3000);
                    }
                }
            },$currDelay);
        });
    });
    /* ThemeWaves Animate General and Custom */
    jQuery('.kodium-animate-gen,.kodium-animate').each(function() {
        var $curr = jQuery(this);
        var $currOffset = $curr.attr('data-animation-offset');
        if ($currOffset === '' || $currOffset === 'undefined' || $currOffset === undefined) {
            $currOffset = 'bottom-in-view';
        }
        if ($currOffset === 'none') {
            $curr.trigger('kodium-animate');
        } else {
            if(jQuery().waypoint!==undefined&&jQuery().waypoint!=='undefined'){
                $curr.waypoint(function() {
                    $curr.trigger('kodium-animate');
                }, {triggerOnce: true, offset: $currOffset});
            }
        }
    });
    kodium_resize();
    jQuery(window).scroll();
});

function kodium_carousel() {
    "use strict";
    if(jQuery().owlCarousel!==undefined&&jQuery().owlCarousel!=='undefined'){
        jQuery('.kodium-carousel-container').each(function() {
            var $currCrslCont=jQuery(this);
            var $items = parseInt($currCrslCont.data('items'),10)?parseInt($currCrslCont.data('items'),10):1;
            var $itemsDesktop = false;     /*[1199,4]*/
            var $itemsDesktopSmall = [979,2];/*[979,3]*/
            var $itemsTablet = [768,1];      /*[768,2]*/
            var $itemsTabletSmall = false; /*false or [768,2]*/
            var $itemsMobile = [479,1];    /*[479,1]*/
            var $itemsCustom = false;      /*false or [479,1]*/
            var $singleItem = false;
            var $auto = $currCrslCont.data('autoplay')===''?false:$currCrslCont.data('autoplay');
            var $navigation = false;
            var $pagination = true;
            var $navigationText = ["<i class='ion-ios-arrow-left'></i>","<i class='ion-ios-arrow-right'></i>"];
            var $currentCrsl = $currCrslCont.find('.kodium-carousel');
            if (jQuery(this).hasClass('kodium-post-carousel')) {
                $items = 3;
            } else if ($currCrslCont.hasClass('image-slide-container')) {
                $currCrslCont.addClass('verif');
                $itemsDesktopSmall = [979,1];
            }
            $currentCrsl.owlCarousel({
                items : $items,
                itemsDesktop :     $itemsDesktop,
                itemsDesktopSmall :$itemsDesktopSmall,
                itemsTablet:       $itemsTablet,
                itemsTabletSmall:  $itemsTabletSmall,
                itemsMobile :      $itemsMobile,
                itemsCustom :      $itemsCustom,
                autoPlay: $auto,
                singleItem:$singleItem,
                slideSpeed:800,
                pagination:$pagination,
                paginationSpeed:900,
                rewindSpeed:500,
                navigationText : $navigationText,
                autoHeight : false,
                navigation : $navigation,
                afterAction : function(elem){
    /*              kodium Custom Auto Height */
                    var $max=0;
                    var $visItems=this.owl.visibleItems;
                    var n=$visItems.length;
                    setTimeout(function(){
                        jQuery('.kodium-post-carousel .no-thumb').each(function(){
                            var $currIcon=jQuery(this);
                            var $currWidth=$currIcon.width();
                            var $diff=parseInt($currIcon.data('kodiumwidth'),10)/parseInt($currIcon.data('kodiumheight'),10);
                            $currIcon.height($currWidth/$diff);
                        });
                        jQuery('>.owl-wrapper-outer>.owl-wrapper>.owl-item',elem).removeClass('owl-visible-first').removeClass('owl-visible').removeClass('owl-visible-last');
                        for (var i = 0; i < n; i++) {
                            var $curr=jQuery('>.owl-wrapper-outer>.owl-wrapper>.owl-item',elem).eq($visItems[i]).addClass('owl-visible');
                            if($curr.height()>$max){$max=$curr.height();}
                            if(i===0){$curr.addClass('owl-visible-first');}
                            if((i+1)===n){$curr.addClass('owl-visible-last');}
                        }
                        jQuery('>.owl-wrapper-outer',elem).animate({height:$max},500);
                    },100);
                }
            });
        });
    }
}

/* Item Right Left Width */
/* ------------------------------------------------------------------- */
function kodiumReInit($selector){
    "use strict";
    /* PrettyPhoto */
    jQuery("a[rel^='prettyPhoto']",$selector).prettyPhoto({
        deeplinking: false,
        social_tools: false,
        default_width: 720,
        default_height: 410
    });
    /* Milestones */
    jQuery('.kodium-milestones-box',$selector).each(function() {
        var $curr = jQuery(this);
        var $delay = 100;
        $curr.bind('kodium-animate', function() {
            setTimeout(function(){
                jQuery('>.kodium-milestones-content>.kodium-milestones-count>.kodium-milestones-show.number', $curr).each(function() {
                    var $currCntr=jQuery(this);
                    var $count=parseInt($currCntr.data('count'),10);
                    var $i=$count;
                    var $ml = setInterval(function(){
                        $currCntr.removeClass('not-animated');/* important here for animation */
                        if(++$i>9){$i=0;}
                        $currCntr.text($i);
                        if($i===$count){clearInterval($ml);}
                    },80);
                });
            }, $delay);
            return false;
        });
    });
    /* Video Responsive */
    jQuery('.kodium-container iframe').each(function(){
        if(!jQuery(this).closest('.ls-slide').hasClass('ls-slide')&&!jQuery(this).hasClass('fluidvids-elem')){
            jQuery(this).addClass('makeFluid');
        }
    });
    Fluidvids.init({
        selector: '.kodium-container iframe.makeFluid',
        players: ['www.youtube.com', 'player.vimeo.com']
    });
    jQuery('.kodium-container iframe').removeClass('makeFluid');
    /* PrettyPhoto */
    if (jQuery().slick !== undefined && jQuery().slick !== 'undefined') {
        jQuery('.kodium-product-images').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<i class="ion-ios-arrow-thin-left"></i>',
            nextArrow: '<i class="ion-ios-arrow-thin-right"></i>',
            fade: true,
            adaptiveHeight: false,
            asNavFor: '.kodium-product-thumbs'
        });
        jQuery('.kodium-product-thumbs').slick({
            arrows: false,
            slidesToShow: 6,
            asNavFor: '.kodium-product-images',
            dots: false,
            vertical: true,
            centerMode: false,
            focusOnSelect: true
        });
    }
}

/* Item Top Bottom Height */
/* ------------------------------------------------------------------- */
function kodiumItemTB($item) {
    "use strict";
    $item = jQuery($item);
    var $itemMarginTB = parseInt($item.css('margin-top').replace('px', ''), 10) + parseInt($item.css('margin-bottom').replace('px', ''), 10);
    var $itemPaddingTB = parseInt($item.css('padding-top').replace('px', ''), 10) + parseInt($item.css('padding-bottom').replace('px', ''), 10);
    var $itemBorderTB  = parseInt($item.css('border-top-width').replace('px',''),10) + parseInt($item.css('border-bottom-width').replace('px',''),10);
    var $itemTB = $itemMarginTB + $itemPaddingTB + $itemBorderTB;
    return $itemTB;
}
/* Item Right Left Width */
/* ------------------------------------------------------------------- */
function kodiumItemRL($item) {
    "use strict";
    $item = jQuery($item);
    var $itemMarginRL  = parseInt($item.css('margin-left').replace('px', '')      ,10) + parseInt($item.css('margin-right').replace('px', '')      ,10);
    var $itemPaddingRL = parseInt($item.css('padding-left').replace('px', '')     ,10) + parseInt($item.css('padding-right').replace('px', '')     ,10);
    var $itemBorderRL  = parseInt($item.css('border-left-width').replace('px', ''),10) + parseInt($item.css('border-right-width').replace('px', ''),10);
    var $itemRL = $itemMarginRL + $itemPaddingRL + $itemBorderRL;
    return $itemRL;
}
/* Item Right Left Width */
/* ------------------------------------------------------------------- */
function kodium_menu_lock($action,$item){
    if($action=='lock'){
        $item.addClass('menu-locker');
        jQuery('body').addClass('menu-locked');
        if(!jQuery('body').hasClass('header-small')){
            var $header = jQuery('.header-inner');
            var $headerH = $header.height();
            var $headerCOT=$header.offset().top;
            jQuery('body').addClass('header-small');
            $header.css('margin-top', ('-' + $headerH + 'px'));
            var $headerAOT=$header.offset().top;
            console.log('$headerCOT>$headerAOT : '+$headerCOT+'>'+$headerAOT);
            if($headerCOT>$headerAOT){
                console.log('hodhod');
                $header.css('margin-top', ('-' + ($headerH+($headerAOT-$headerCOT)) + 'px'));
            }
            $header.stop().animate({marginTop: 0}, 200, 'linear', function () {$header.css({'margin-top': ''});});
        }
    }else{
        $item.removeClass('menu-locker');
        if(!jQuery('menu-locker').length){
            jQuery('body').removeClass('menu-locked');
        }
    }
    
}