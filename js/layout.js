$(document).ready(function() {
    /* // 비디오 로딩 이벤트
    $(window).on("load",function(){
        let mainVideo = $("#yt_player").get(0);
        let barSize = $(window).width();
        let progressbar = document.getElementById("progressbar");
        let updateBar;

        // 윈도우 로드 시 비디오 실행
        if(!mainVideo.paused && !mainVideo.ended){
            $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); });
            window.clearInterval(updateBar);
        }
        else{
            $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*'); });
            updateBar = setInterval(update,50);
        }

        // Progress Bar 비디오에 연결
        function update(){
            if(!mainVideo.ended){
                let size = parseInt(mainVideo.currentTime*barSize/mainVideo.duration);
                progressbar.style.width = size+"px"
            }
            else{
                progressbar.style.width = "0px"
                window.clearInterval(updateBar);
            }
        }
    }); */

    // DAP 데이터 연동
    function DAP_init(sheetId, sheetName, divName) {
        let base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        let query = encodeURIComponent('Select A,B,C,D');
        let url = `${base}&sheet=${sheetName}&tq=${query}`;

        fetch(url)
            .then(res => res.text())
            .then(rep => {
                // JSON만 추출
                let jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                let jsonItem = jsonData.table.rows;
                slideOneAlpha(divName, jsonItem);
                slideOneBravo(divName, jsonItem);
                slideOneCharlie(divName, jsonItem);
            })
            .then(() => { // Slick Slider 실행
                $('.' + divName + ' .content3-a-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    nextArrow:$('.' + divName + ' .content3-btn1-right'),
                    prevArrow:$('.' + divName + ' .content3-btn1-left'),
                    asNavFor:'.' + divName + ' .content3-b-slide, .' + divName + ' .content3-b-slide2',
                });
                $('.' + divName + ' .content3-b-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    fade:true,
                    arrows:false,
                    asNavFor:'.' + divName + '.content3-a-slide, .' + divName + ' .content3-b-slide2'
                });
                $('.' + divName + ' .content3-b-slide2').slick({
                    slidesToShow:5,
                    slidesToScroll:3,
                    infinite:true,
                    arrows:false,
                    focusOnSelect:true,
                    focusOnChange:true,
                    asNavFor:'.' + divName + ' .content3-a-slide, .' + divName + ' .content3-b-slide',
                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 1080,
                            settings: {
                                slidesToShow: 10,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 720,
                            settings: {
                                slidesToShow: 6,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        }
                    ]
                });
            });
    }

    //슬라이더 1 슬라이드 전 이벤트
    $(".content3-1 .content3-a-slide").on('beforeChange',function(event,slick,currentSlide,nextSlide){
        //이동할 슬라이드의 번호 숫자를 전체 슬라이드 -1로 나누고 백을 곱해서 백분율 값을 구한다.
        let calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
        
        //progress bar의 배경 가로 사이즈에 계산한 백분율 값을 넣는다.
        $(".content3-1 .content3-b-slide3>span")
        .css("background-size", calc + '% 100%')
        .attr('aria-valuenow', calc);
        
        //progress bar의 아이콘의 가로 좌표값에 계산한 백분율 값을 넣는다.
        $(".content3-1 .content3-b-slide3>div>svg").css("left", calc + "%");
    });

    // 슬라이더 1-1
    function slideOneAlpha(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-a-slide').append(
                '<div><img src="'+item[i].c[3].v+'"/></div>'
            );
        }
    }

    // 슬라이더 1-2
    function slideOneBravo(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide').append(
                '<div>'
                    +'<h2>'+item[i].c[1].v+'</h2>'
                    +'<h3>'+item[i].c[2].v+'</h3>'
                    +'<a href="#">Find store'
                        +'<div><img src="./img/i_arrow_black.png"/></div>'
                    +'</a>'
                +'</div>'
            );
        }
    }

    // 슬라이더 1-3
    function slideOneCharlie(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide2').append(
                '<div><img src="'+item[i].c[3].v+'"/><h2>'+item[i].c[1].v+'</h2></div>'
            );
        }
    }

    // Headphones 데이터 연동
    function HP_init(sheetId, sheetName, divName) {
        let base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        let query = encodeURIComponent('Select A,B,C,D');
        let url = `${base}&sheet=${sheetName}&tq=${query}`;

        fetch(url)
            .then(res => res.text())
            .then(rep => {
                // JSON만 추출
                let jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                let jsonItem = jsonData.table.rows;
                slideTwoAlpha(divName, jsonItem);
                slideTwoBravo(divName, jsonItem);
                slideTwoCharlie(divName, jsonItem);
            })
            .then(() => { // Slick Slider 실행
                $('.' + divName + ' .content3-a-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    nextArrow:$('.' + divName + ' .content3-btn1-right'),
                    prevArrow:$('.' + divName + ' .content3-btn1-left'),
                    asNavFor:'.' + divName + ' .content3-b-slide, .' + divName + ' .content3-b-slide2'
                });
                $('.' + divName + ' .content3-b-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    fade:true,
                    arrows:false,
                    asNavFor:'.' + divName + '.content3-a-slide, .' + divName + ' .content3-b-slide2'
                });
                $('.' + divName + ' .content3-b-slide2').slick({
                    slidesToShow:5,
                    slidesToScroll:3,
                    infinite:true,
                    arrows:false,
                    focusOnSelect:true,
                    focusOnChange:true,
                    asNavFor:'.' + divName + ' .content3-a-slide, .' + divName + ' .content3-b-slide',
                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 1080,
                            settings: {
                                slidesToShow: 10,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 720,
                            settings: {
                                slidesToShow: 6,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        }
                    ]
                });
            });
    }

    // 슬라이드 2 슬라이드 전 이벤트
    $(".content3-2 .content3-a-slide").on('beforeChange',function(event,slick,currentSlide,nextSlide){
        //이동할 슬라이드의 번호 숫자를 전체 슬라이드 -1로 나누고 백을 곱해서 백분율 값을 구한다.
        let calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
        
        //progress bar의 배경 가로 사이즈에 계산한 백분율 값을 넣는다.
        $(".content3-2 .content3-b-slide3>span")
        .css("background-size", calc + '% 100%')
        .attr('aria-valuenow', calc);
        
        //progress bar의 아이콘의 가로 좌표값에 계산한 백분율 값을 넣는다.
        $(".content3-2 .content3-b-slide3>div>svg").css("left", calc + "%");
    });

    // 슬라이더 2-1
    function slideTwoAlpha(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-a-slide').append(
                '<div><img src="'+item[i].c[3].v+'"/></div>'
            );
        }
    }

    // 슬라이더 2-2
    function slideTwoBravo(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide').append(
                '<div>'
                    +'<h2>'+item[i].c[1].v+'</h2>'
                    +'<h3>'+item[i].c[2].v+'</h3>'
                    +'<a href="#">Find store'
                        +'<div><img src="./img/i_arrow_black.png"/></div>'
                    +'</a>'
                +'</div>'
            );
        }
    }

    // 슬라이더 2-3
    function slideTwoCharlie(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide2').append(
                '<div><img src="'+item[i].c[3].v+'"/><h2>'+item[i].c[1].v+'</h2></div>'
            );
        }
    }

    // Home Audio 데이터 연동
    function HA_init(sheetId, sheetName, divName) {
        let base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        let query = encodeURIComponent('Select A,B,C,D');
        let url = `${base}&sheet=${sheetName}&tq=${query}`;

        fetch(url)
            .then(res => res.text())
            .then(rep => {
                // JSON만 추출
                let jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                let jsonItem = jsonData.table.rows;
                slideThreeAlpha(divName, jsonItem);
                slideThreeBravo(divName, jsonItem);
                slideThreeCharlie(divName, jsonItem);
            })
            .then(() => { // Slick Slider 실행
                $('.' + divName + ' .content3-a-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    nextArrow:$('.' + divName + ' .content3-btn1-right'),
                    prevArrow:$('.' + divName + ' .content3-btn1-left'),
                    asNavFor:'.' + divName + ' .content3-b-slide, .' + divName + ' .content3-b-slide2'
                });
                $('.' + divName + ' .content3-b-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    fade:true,
                    arrows:false,
                    asNavFor:'.' + divName + '.content3-a-slide, .' + divName + ' .content3-b-slide2'
                });
                $('.' + divName + ' .content3-b-slide2').slick({
                    slidesToShow:5,
                    slidesToScroll:3,
                    infinite:true,
                    arrows:false,
                    focusOnSelect:true,
                    focusOnChange:true,
                    asNavFor:'.' + divName + ' .content3-a-slide, .' + divName + ' .content3-b-slide',
                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 1080,
                            settings: {
                                slidesToShow: 10,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 720,
                            settings: {
                                slidesToShow: 6,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        }
                    ]
                });
            });
    }

    // 슬라이드 3 슬라이드 전 이벤트
    $(".content3-3 .content3-a-slide").on('beforeChange',function(event,slick,currentSlide,nextSlide){
        //이동할 슬라이드의 번호 숫자를 전체 슬라이드 -1로 나누고 백을 곱해서 백분율 값을 구한다.
        let calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
        
        //progress bar의 배경 가로 사이즈에 계산한 백분율 값을 넣는다.
        $(".content3-3 .content3-b-slide3>span")
        .css("background-size", calc + '% 100%')
        .attr('aria-valuenow', calc);
        
        //progress bar의 아이콘의 가로 좌표값에 계산한 백분율 값을 넣는다.
        $(".content3-3 .content3-b-slide3>div>svg").css("left", calc + "%");
    });

    // 슬라이더 3-1
    function slideThreeAlpha(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-a-slide').append(
                '<div><img src="'+item[i].c[3].v+'"/></div>'
            );
        }
    }

    // 슬라이더 3-2
    function slideThreeBravo(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide').append(
                '<div>'
                    +'<h2>'+item[i].c[1].v+'</h2>'
                    +'<h3>'+item[i].c[2].v+'</h3>'
                    +'<a href="#">Find store'
                        +'<div><img src="./img/i_arrow_black.png"/></div>'
                    +'</a>'
                +'</div>'
            );
        }
    }

    // 슬라이더 3-3
    function slideThreeCharlie(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide2').append(
                '<div><img src="'+item[i].c[3].v+'"/><h2>'+item[i].c[1].v+'</h2></div>'
            );
        }
    }

    // Accesories 데이터 연동
    function ACC_init(sheetId, sheetName, divName) {
        let base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        let query = encodeURIComponent('Select A,B,C,D');
        let url = `${base}&sheet=${sheetName}&tq=${query}`;

        fetch(url)
            .then(res => res.text())
            .then(rep => {
                // JSON만 추출
                let jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                let jsonItem = jsonData.table.rows;
                slideFourAlpha(divName, jsonItem);
                slideFourBravo(divName, jsonItem);
                slideFourCharlie(divName, jsonItem);
            })
            .then(() => { // Slick Slider 실행
                $('.' + divName + ' .content3-a-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    nextArrow:$('.' + divName + ' .content3-btn1-right'),
                    prevArrow:$('.' + divName + ' .content3-btn1-left'),
                    asNavFor:'.' + divName + ' .content3-b-slide, .' + divName + ' .content3-b-slide2'
                });
                $('.' + divName + ' .content3-b-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    fade:true,
                    arrows:false,
                    asNavFor:'.' + divName + '.content3-a-slide, .' + divName + ' .content3-b-slide2'
                });
                $('.' + divName + ' .content3-b-slide2').slick({
                    slidesToShow:5,
                    slidesToScroll:3,
                    infinite:true,
                    arrows:false,
                    focusOnSelect:true,
                    focusOnChange:true,
                    asNavFor:'.' + divName + ' .content3-a-slide, .' + divName + ' .content3-b-slide',
                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 1080,
                            settings: {
                                slidesToShow: 10,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 720,
                            settings: {
                                slidesToShow: 6,
                                autoplay: false
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 4,
                                autoplay: false
                            }
                        }
                    ]
                });
            });
    }

    // 슬라이드 4 슬라이드 전 이벤트
    $(".content3-4 .content3-a-slide").on('beforeChange',function(event,slick,currentSlide,nextSlide){
        //이동할 슬라이드의 번호 숫자를 전체 슬라이드 -1로 나누고 백을 곱해서 백분율 값을 구한다.
        let calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
        
        //progress bar의 배경 가로 사이즈에 계산한 백분율 값을 넣는다.
        $(".content3-4 .content3-b-slide3>span")
        .css("background-size", calc + '% 100%')
        .attr('aria-valuenow', calc);
        
        //progress bar의 아이콘의 가로 좌표값에 계산한 백분율 값을 넣는다.
        $(".content3-4 .content3-b-slide3>div>svg").css("left", calc + "%");
    });

    // 슬라이더 4-1
    function slideFourAlpha(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-a-slide').append(
                '<div><img src="'+item[i].c[3].v+'"/></div>'
            );
        }
    }

    // 슬라이더 4-2
    function slideFourBravo(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide').append(
                '<div>'
                    +'<h2>'+item[i].c[1].v+'</h2>'
                    +'<h3>'+item[i].c[2].v+'</h3>'
                    +'<a href="#">Find store'
                        +'<div><img src="./img/i_arrow_black.png"/></div>'
                    +'</a>'
                +'</div>'
            );
        }
    }

    // 슬라이더 4-3
    function slideFourCharlie(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide2').append(
                '<div><img src="'+item[i].c[3].v+'"/><h2>'+item[i].c[1].v+'</h2></div>'
            );
        }
    }

    // 데이터 로딩 체크
    var DAP_check,
        HP_check,
        HA_check,
        ACC_check;

    function dataListOnCheck() {
        if( $("input[id=content3-slide1]").is(":checked") ) {
            DAP_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','DAP', 'content3-1');
            DAP_check = true;
        }
        else if( $("input[id=content3-slide2]").is(":checked") ) {
            HP_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','Headphones', 'content3-2');
            HP_check = true;
        }
        else if( $("input[id=content3-slide3]").is(":checked") ) {
            HA_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','Home Audio', 'content3-3');
            HA_check = true;
        }
        else {
            ACC_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','Accesories', 'content3-4');
            ACC_check = true;
        }
    }
    dataListOnCheck();

    // 데이터 클릭 이벤트
    $("input[id=content3-slide1]").on("click",function() {
        if(DAP_check) { return; }
        else { DAP_check = true; DAP_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','DAP', 'content3-1'); }
    });

    $("input[id=content3-slide2]").on("click",function() {
        if(HP_check) { return; }
        else { HP_check = true; HP_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','Headphones', 'content3-2'); }
    });

    $("input[id=content3-slide3]").on("click",function() {
        if(HA_check) { return; }
        else { HA_check = true; HA_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','Home Audio', 'content3-3'); }
    });

    $("input[id=content3-slide4]").on("click",function() {
        if(ACC_check) { return; }
        else { ACC_check = true; ACC_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','Accesories', 'content3-4'); }
    });

    /* --------------------------------------------------------------------- */
    /* --------------------------------------------------------------------- */
    /* --------------------------------------------------------------------- */

    //버튼 클릭 시 비디오 제어
    $(".content1-2>div:nth-of-type(1)").on("click",function(){ $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*'); }); });
    $(".content1-2>div:nth-of-type(2)").on("click",function(){ $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); }); });

    //헤더 gnb 호버 이벤트
    $(".menu>div>ul:nth-of-type(1)>a").hover(
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(1)").css("background","black"); }},
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(1)").css("background","white"); }}
    );
    $(".menu>div>ul:nth-of-type(2)>a").hover(
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(2)").css("background","black"); }},
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(2)").css("background","white"); }}
    );
    $(".menu>div>ul:nth-of-type(3)>a").hover(
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(3)").css("background","black"); }},
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(3)").css("background","white"); }}
    );
    $(".menu>div>ul:nth-of-type(4)>a").hover(
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(4)").css("background","black"); }},
        function() { if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(4)").css("background","white"); }}
    );
    $(".menu>div>ul:nth-of-type(5)>a").hover(
        function(){ if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(5)").css("background","black"); }},
        function(){ if(window.innerWidth > 1400) { $(".menu>div>span:nth-of-type(5)").css("background","white"); }}
    );

    //헤더 호버시 이벤트
    $(".gnb-menu > li").hover(
        function(){
            $("header").css({
                "background":"white",
                "border-bottom":"1px solid #ddd"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid white",
                "color":"black"
            }),
            $(".gnb-menu>li:hover .gnb-main").css({
                "color":"#d81334",
                "border-bottom":"2px solid #d81334"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"black"
            }),
            $("#searchbar .cls-1").css({
                "fill":"black"
            }),
            $("#logo .cls-1").css({
                "fill":"black"
            })
        },
        function(){
            $("header").css({
                "background":"black",
                "border-bottom":"1px solid rgba(255,255,255,0.1)"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid black",
                "color":"white"
            }),
            $(".gnb-menu>li:hover .gnb-main").css({
                "color":"white",
                "border-bottom":"2px solid black"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"white"
            }),
            $("#searchbar .cls-1").css({
                "fill":"white"
            }),
            $("#logo .cls-1").css({
                "fill":"white"
            })
        }
    );

    //헤더 스크롤 이벤트
    $(window).scroll(function(event){
        let windowTop = $(window).scrollTop();
        let contentTop = $(".content1").scrollTop();

        if(windowTop == contentTop) { //스크롤이 맨위에 있을 때
            $("header").css({
                "background":"black",
                "border-bottom":"1px solid rgba(255,255,255,0.1)"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid black",
                "color":"white"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"white"
            }),
            $("input[id='menu']:checked+label span:nth-of-type(3)").css({
                "background":"black"
            }),
            $("#searchbar .cls-1").css({
                "fill":"white"
            }),
            $("#logo .cls-1").css({
                "fill":"white"
            })
        }
        else {
            $("header").css({
                "background":"white",
                "border-bottom":"1px solid #ddd"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid white",
                "color":"black"
            }),
            $(".gnb-menu>li:hover .gnb-main").css({
                "color":"#d81334",
                "border-bottom":"2px solid #d81334"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"black"
            }),
            $("#searchbar .cls-1").css({
                "fill":"black"
            }),
            $("#logo .cls-1").css({
                "fill":"black"
            })
        }
    });
});