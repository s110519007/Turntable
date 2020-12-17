$(document).ready(function () {
    // 轉盤開始<->停止
    var click;
    click=true;
    var result= setTimeout(stop,1000);
    $('.btn').on('click', function () {
        if (click==true) {
            click=false;
            spin();
            $('.btn').addClass('btn-click');
            $('.btn').removeClass('btn');
            $('.form-wrap-m').removeClass('form-wrap-m');
        } else {
            click=true;
            $('.btn-click').addClass('btn');
            $('.btn-click').removeClass('btn-click');
            // 停止時延遲0.5秒才停
            setTimeout(stop,500);
            $('.form-wrap-m').removeClass('form-wrap-m');
        }
    });
    // 清除延遲
    window.clearTimeout(result);
    var num;
    $('#num').keypress(function (e) { 
        var code = e.keyCode || e.which;
        if(code == 13) { //Enter keycode
            createTurntable();
        }
    });
    function createTurntable() {
        //取得選項數量
        const form = document.getElementById("form");
        const option_num = form[0].value;
        //限制最少2個選項,最多8個選項
        if (option_num<2) {
            $('#num').val(2);
            num = 2;
            createParts(num);
        }
        else if(option_num>8){
            $('#num').val(8);
            num = 8;
            createParts(num);
        }
        else{
            num = option_num;
            createParts(num);
        }
        
        $('#num').attr('readonly', 'readonly');
        $('#name:nth-child(1)').focus();
        //設定圓盤字大小
        if (num<4) {
            $('span').css('font-size','3vw');
        }
        else if(num==4) {
            $('span').css('font-size','2vw');
        }
        else if(num>4 && num<=6) {
            $('span').css('font-size','1.5vw');
        }
        else{
            $('span').css('font-size','1vw');
        }
    }
    $('.num_change').click(function () { 
        $('#num').focus();
        $('#num').select();
        $('#num').removeAttr('readonly');
        for (let n = 1; n <= num; n++) {
            $('#name').remove();
            $('.cover').remove();    
        }
    });
    $('#num').focus(function () { 
        $('.form-wrap').addClass('form-wrap-m');
        $('.btn').addClass('start');
    });
});
function stop() {
    $('.option-bg').css({
        'animation-play-state': 'paused',
    });
}
function spin() {
    $('.option-bg').css({
        'animation-play-state': 'running',
    });
}
function createParts(num) {
    for (let n = 1; n <= num; n++) {
        // 建立圓盤
        var cover = document.createElement('div');
        cover.className="cover";
        var part = document.createElement('div');
        part.className="part";
        var name = document.createElement('div');
        name.className="name";
        var name_span = document.createElement('span');
        $('.option-bg').css('background-color','none');
        $('.option-bg').append(cover);
        cover.appendChild(part);
        cover.appendChild(name);
        name.appendChild(name_span);

        // 建立選項
        var option = document.createElement('input');
        option.type="text";
        option.id="name";
        option.name="option";
        option.placeholder="選項"+n;
        option.required="required";
        option.maxLength="6";
        option.autocomplete="off";
        $('.options').append(option);

        var rotateDeg=(360/num)*(-1+n);
        $('.cover:nth-child('+n+')').css({
            'transform': 'rotate('+rotateDeg+'deg)',
        });
        var v_bgc = 20;
        var part_bg = 255-v_bgc*(-1+n);
        var part_rotate = 180-360/num;
        $('.cover:nth-child('+n+') .part').css({
            'background-color': 'rgba('+part_bg+','+part_bg+','+part_bg+',1)',
            '-webkit-transform':'rotate('+part_rotate+'deg)',
            'transform':'rotate('+part_rotate+'deg)',
        });
        var name_rotate = (180-360/num)/2;
        $('.cover:nth-child('+n+') span').css({
            '-webkit-transform':'rotate('+name_rotate+'deg)',
            'transform':'rotate('+name_rotate+'deg)',
        });

        var w=$(window).width();
        if (w<768) {
            if (num<8) {
                option.maxLength='6';
            }
            else{
                option.maxLength='5';
            }
        }
        //取得選項值
        var option_name =[];
        $('#name:nth-child('+n+')').on("change", function () {
            option_name[n-1] = this.value;
            console.log(option_name);
            $('.cover:nth-child('+n+') span').empty();
            $('.cover:nth-child('+n+') span').append(option_name[n-1]);
        });

        $('#name:nth-child('+n+')').keypress(function (e) { 
            var code = e.keyCode || e.which;
            if(code == 13) { //Enter keycode
                $('#name:nth-child('+(n+1)+')').focus();
            }
        });
    }
}