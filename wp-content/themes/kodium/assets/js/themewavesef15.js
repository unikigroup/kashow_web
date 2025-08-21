jQuery(window).load(function () {
    "use strict";
    /* One page */
    jQuery('body.page-template-template-onepage-php ul.sf-menu li,body.page-template-template-onepage-php nav#mobile-menu li').removeClass('current-menu-item').removeClass('current_page_item').removeClass('current-menu-ancestor').removeClass('sfHover');
    /* Standard Blog Infinite */
    jQuery('.kodium-infinite-scroll.simple').each(function (i) {
        var $currentInfinite = jQuery(this);
        var $currentNextLink = $currentInfinite.find('a.next');
        $currentNextLink.unbind('click').bind('click', function (e) {
            e.preventDefault();
            if ($currentInfinite.attr('data-has-next') === 'true' && $currentNextLink.hasClass('next')) {
                var $infiniteURL = $currentNextLink.attr('href');
                $currentInfinite.addClass('waiting');
                $currentInfinite.children('.next').hide();
                $currentInfinite.children('.loading').css({'display': 'flex', 'justify-content': 'center'});
                jQuery.ajax({
                    type: "POST",
                    url: $infiniteURL,
                    success: function (response) {
                        var $newElements = jQuery(response).find('.kodium-infinite-scroll.simple').eq(i).parent();
                        var $newURL = $newElements.find('.kodium-infinite-scroll>a.next').attr('href');
                        var $hasNext = $newElements.find('.kodium-infinite-scroll').attr('data-has-next');
                        $newElements.find('.kodium-infinite-scroll').remove();
                        $newElements.find('article').css('opacity','0').addClass('kodium-shw');
                        $newElements = $newElements.html();
                        if ($newElements) {
                            $currentInfinite.before($newElements);
                            if ($hasNext === 'false') {
                                $currentInfinite.attr('data-has-next', 'false');
                                $currentInfinite.children('.loading').hide();
                            } else {
                                $currentNextLink.attr('href', $newURL);
                                $currentInfinite.children('.loading').hide();
                            }
                        } else {
                            $currentInfinite.attr('data-has-next', 'false');
                            $currentInfinite.children('.loading').hide();
                        }
                        var $cShwCon=$currentInfinite.parent();
                        kodiumReInit($cShwCon);
                        $currentInfinite.removeClass('waiting');
                        $cShwCon.find('.kodium-shw').each(function(j){
                            var $cShw=jQuery(this);
                            var $shwInt=$cShwCon.data('animation-delay')?parseInt($cShwCon.data('animation-delay'),10):300;
                            var $shwAnm=$cShwCon.data('animation');
                            var $removeClass = ($shwAnm === 'pulse' || $shwAnm === 'floating' || $shwAnm === 'tossing')?false:true;
                            setTimeout(function(){
                                $cShw.css('opacity','').removeClass('kodium-shw');
                                $cShw.addClass('animated ' + $shwAnm);
                                if ($removeClass) {
                                    setTimeout(function() {
                                        $cShw.removeClass('animated');
                                        $cShw.removeClass($shwAnm);
                                    }, 3000);
                                }
                            },$shwInt*j);
                        });
                    }
                });
            }
        });
        if ($currentInfinite.hasClass('infinite-auto')) {
            jQuery(window).scroll(function () {
                var $lnkAllH = $currentNextLink.offset().top + $currentNextLink.height();
                var $wndAllH = jQuery(window).scrollTop() + jQuery(window).height();
                if (!$currentInfinite.hasClass('waiting') && $lnkAllH < $wndAllH) {
                    $currentNextLink.click();
                }
            });
        }
    });
    jQuery(window).resize();
});
jQuery(document).ready(function ($) {
    "use strict";
    /* Message Dismiss */
    $('.kodium-message>div>i').click(function () {
        $(this).closest('.kodium-message').fadeOut();
    });

    /*  Goto Link */
    jQuery('a').click(function (e) {
        if ($(this).attr('href') && !$(this).hasClass('ui-tabs-anchor') && !$(this).parent().hasClass('vc_tta-tab') && !$(this).parent().hasClass('vc_tta-panel-title') && !$(this).closest('.wc-tabs').hasClass('wc-tabs')) {
            /* get current */
            var targetSection = $(this).attr('href').split("#")[1];
            if (targetSection || targetSection !== '') {
                targetSection = '#' + targetSection;
                if ($(targetSection).attr('id') !== '' && $(targetSection).attr('id') !== 'undefined' && $(targetSection).attr('id') !== undefined) {
                    e.preventDefault();
                    /* get pos of target section */
                    var targetOffset = $(targetSection).offset().top;
                    if (jQuery('body').hasClass('admin-bar')) {
                        targetOffset -= jQuery('#wpadminbar').height();
                    }

                    /* scroll */
                    $('html,body').animate({scrollTop: targetOffset}, 1000);
                    $('.mobile-menu-icon.active').click();
                }
            }
        }
    });
    
    /* Mobile Menu Action */
    jQuery('.mobile-menu-icon').click(function () {
        if (jQuery(this).hasClass('active')) {
            jQuery(this).removeClass('active');
            jQuery('body').removeClass('show-mobile-menu');
        } else {
            jQuery(this).addClass('active');
            jQuery('body').addClass('show-mobile-menu');
        }
        return false;
    });
    jQuery('.tw-mobile-menu-overlay').click(function () {
        jQuery('.mobile-menu-icon.active').click();
    });

    /* navigation */
    $('ul.sf-menu').superfish({
        delay: 10,
        animation: {
            opacity: 'show'
        },
        speed: 'normal',
        autoArrows: false,
        dropShadows: false
    });
    /* Mobile Menu - Sub Menu Action */
    var $mobMen = $('.kodium-no-mobile-menu');
    $mobMen.addClass('sf-mobile-menu').find('.children').addClass('sub-menu');
    $mobMen.find('.page_item_has_children').addClass('menu-item-has-children');
    $('.sf-mobile-menu ul.sub-menu').each(function () {
        var $subMenu = $(this);
        var $parMenuLink = $subMenu.siblings('a');
        $parMenuLink.attr('href', '#').click(function (e) {
            e.preventDefault();
            var $parMenu = $(this).closest('li');
            $parMenu.siblings('li.menu-open').removeClass('menu-open').children('.sub-menu').slideUp('fast');
            $parMenu.toggleClass('menu-open');
            if ($parMenu.hasClass('menu-open')) {
                $parMenu.children('.sub-menu').slideDown('fast');
            } else {
                $parMenu.children('.sub-menu').slideUp('fast');
            }
            return false;
        });
    });
    /* Scroll Up Menu */
    var $scrollTopOld = jQuery(window).scrollTop();
    var $scrollUpMax = 100;
    var $scrollUp = 0;
    var $scrollDownMax = 50;
    var $scrollDown = 0;
    jQuery(window).scroll(function () {
        if(!$('body').hasClass('menu-locked')){
            var $header = jQuery('.kodium-menu-container');
            var $headerClone = $header.siblings('.header-clone');
            var $headerCloneOT = $headerClone.offset().top;
            var $scrollTop = jQuery(window).scrollTop();
            /* START - Header resize */
            /* Important - Is HeaderScrollUp Check First */
            if (jQuery('#wpadminbar').attr('id') === 'wpadminbar') {
                $headerCloneOT -= jQuery('#wpadminbar').height();
            }
            var $diff = $scrollTopOld - $scrollTop;
            if ($diff > 0) {/* Scroll Up */
                $scrollUp += $diff;
                $scrollDown = 0;
            } else {/* Scroll Down */
                $scrollUp = 0;
                $scrollDown -= $diff;
            }
            $scrollTopOld = $scrollTop;
            if ($scrollUpMax <= $scrollUp && $scrollTop > 0 && $headerCloneOT < $scrollTop && !jQuery('body').hasClass('header-small')) {
                jQuery('body').addClass('header-small');
                $header.css('margin-top', ('-' + $header.height() + 'px'));
                $header.stop().animate({marginTop: 0}, 200, 'linear', function () {
                    $header.css({'margin-top': ''});
                });
            } else if (($scrollDownMax <= $scrollDown || $scrollTop === 0 || $headerCloneOT > $scrollTop) && jQuery('body').hasClass('header-small') && !$header.hasClass('hidding')) {
                if ($scrollTop === 0 || $headerCloneOT > $scrollTop) {
                    jQuery('body').removeClass('header-small').removeClass('hidding');
                } else {
                    $header.stop().addClass('hidding').animate({marginTop: ('-' + $header.height() + 'px')}, 200, 'linear', function () {
                        jQuery('body').removeClass('header-small');
                        $header.css({'margin-top': ''}).removeClass('hidding');
                    });
                }
            }
            /* END   - Header resize */
            if (jQuery(this).scrollTop() > $header.height()) {
                jQuery('#scrollUp').fadeIn();
            } else {
                jQuery('#scrollUp').fadeOut();
            }
        }
    });
    jQuery(window).scroll();
    /* -------------------- */
    jQuery('#scrollUp').click(function () {
        jQuery("html, body").animate({scrollTop: 0}, 500);
        return false;
    });

    /* portfolio like */
    jQuery('.likeit').live('click', function (e) {
        e.preventDefault();
        var $this = jQuery(this);
        jQuery.post($this.data('ajaxurl'), {liked_pid: $this.data('pid')})
            .done(function (response) {
                var $aa = jQuery(response).find('#post_liked');
                if ($aa.attr('id') == 'post_liked') {
                    $this.addClass('liked');
                    var $val = $aa.text();
                    $this.find('span>span').text($val);
                }
            });
    });
    
    $('.entry-share').on('click', function(){
        if($(this).siblings('.share-icons').hasClass('open-icons')){
            $(this).siblings('.share-icons').removeClass('open-icons');
        }else{
            $(this).siblings('.share-icons').addClass('open-icons');
        }
    });

    $('.close-share').on('click', function(){
        if($(this).parent('.share-icons').hasClass('open-icons')){
            $(this).parent('.share-icons').removeClass('open-icons');
        }else{
            $(this).parent('.share-icons').addClass('open-icons');
        }
    });

    $('.entry-share a').click(function (e) {
        e.preventDefault();
        jQuery.post($(this).data('ajaxurl'), {social_pid: $(this).data('id'),social_name:$(this).data('social')});
        switch($(this).data('social')){
            case'facebook':
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + jQuery(this).attr('href'), "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0");
            break;
            case'twitter':
                window.open('http://twitter.com/intent/tweet?text=' + $(this).data('title') + ' ' + jQuery(this).attr('href'), "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0");
            break;
            case'pinterest':
                window.open('http://pinterest.com/pin/create/button/?url=' + jQuery(this).attr('href') + '&media=' + $(this).closest('article').find('img').first().attr('src') + '&description=' + $('article h1').text(), "pinterestWindow", "height=640,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0");
            break;
            case'googleplus':
                window.open('https://plus.google.com/share?url={' + jQuery(this).attr('href') + '}', "googleWindow", "height=640,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0");
            break;
        }
        
        
        return false;
    });
    
    $('.kodium-iconbox .iconbox-item').hover(function(){
       $(this).toggleClass('hover'); 
    });
    

});