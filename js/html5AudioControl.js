var trpActiveAudio = null;           // 오디오
var trpAudioController = null;       // 오디오 테그 wrap
// 노래를 재생합니다. 그냥 오디오 요소의 ID를 전달.
function trpAudio_set($video_id, $video_wrap){
    // 활성 곡을 재생중인 곡으로 설정합니다. 다른 모든 기능은 이것에 의존합니다.
    trpActiveAudio = document.getElementById($video_id);
    trpAudioController = $($video_wrap);
    // 오디오 태그에 정의 된 노래를 재생합니다.
    //trpActiveAudio.play();

    // 노래의 시작 비율을 계산합니다.
    var percentageOfVolume = trpActiveAudio.volume / 1;
    var percentageOfVolumeSlider = $(".trpPlayer .volumeMeter").innerWidth() * percentageOfVolume;
        ///document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;

    // 볼륨 상태 표시 줄을 채움.
    $(".trpPlayer .volumeStatus").width( Math.round(percentageOfVolumeSlider) + "px" );
    ///document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
}
function trpAudio_play(){

    // 오디오 태그에 정의 된 노래를 재생합니다.
    trpActiveAudio.play();

    // 노래의 시작 비율을 계산합니다.
    var percentageOfVolume = trpActiveAudio.volume / 1;
    var percentageOfVolumeSlider = $(".trpPlayer .volumeMeter").innerWidth() * percentageOfVolume;
        ///document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;

    // 볼륨 상태 표시 줄을 채움.
    $(".trpPlayer .volumeStatus").width( Math.round(percentageOfVolumeSlider) + "px" );
    ///document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";

}
// 활성 노래를 일시 중지.
function trpAudio_pause(){
    trpActiveAudio.pause();
}

// 현재 시간을 0으로 설정하고 노래를 일시 중지하여 노래를 중지.
function trpAudio_stop(){
    trpActiveAudio.currentTime = 0;
    trpActiveAudio.pause();
}

// 토글형태 play/pause.
function trpAudio_playpause(){

    // 노래가 일시 중지되었는지 확인하고, 중지 된 부분부터 재생합니다. 그렇지 않으면 일시 중지합니다.
    if (trpActiveAudio.paused){
         trpActiveAudio.play();
    }else{
         trpActiveAudio.pause();
    }
}

function trpAudio_updateTime(){
    var currentSeconds = (Math.floor(trpActiveAudio.currentTime % 60) < 10 ? '0' : '') + Math.floor(trpActiveAudio.currentTime % 60);
    var currentMinutes = (Math.floor(trpActiveAudio.currentTime / 60)  < 10 ? '0' : '') + Math.floor(trpActiveAudio.currentTime / 60);
    if(Math.floor(trpActiveAudio.currentTime / 60) > 59){
    	currentMinutes = (Math.floor((trpActiveAudio.currentTime / 60) /59) < 10 ? '0' : '') + Math.floor((trpActiveAudio.currentTime / 60) /60) + ":" + (Math.floor((trpActiveAudio.currentTime / 60) %60) < 10 ? '0' : '') + Math.floor((trpActiveAudio.currentTime / 60) %60);
    }

    var currentTime = currentMinutes + ":" + currentSeconds;
    var totalMin = Math.floor(trpActiveAudio.duration / 60);
    if(totalMin > 60){
    	totalMin = (Math.floor((trpActiveAudio.duration / 60) /60) < 10 ? '0' : '') + Math.floor((trpActiveAudio.duration / 60) /60) + ":" + (Math.floor((trpActiveAudio.duration / 60) %60) < 10 ? '0' : '') + Math.floor((trpActiveAudio.duration / 60) %60);
    }
    var totalSec = (Math.floor(trpActiveAudio.duration % 60) < 10 ? '0' : '') + Math.floor(trpActiveAudio.duration % 60);
    var totalTiem = totalMin + ":" + totalSec;
    $(".trpAudioTimebar-box .trpAudioCurrentTime").html(currentTime);
    $(".trpAudioTimebar-box .trpAudioTotalTime").html(totalTiem);

    // 적절한 위치로 슬라이더를 채움.
    var percentageOfSong = (trpActiveAudio.currentTime/trpActiveAudio.duration);
    var percentageOfSlider = $(".trpAudio_slider").innerWidth() * percentageOfSong;

    // 트랙 진행률 div를 업데이트합니다.
    var progressW = (percentageOfSong*100) + "%";
    $('.trpAudio_slider .progress_bar').css({ width:progressW })
}

// 트랙의 볼륨을 받아(0~100) 업데이트합니다.
function trpAudio_volumeUpdate(number){
    trpActiveAudio.volume = number / 100;   // 0 ~ 1

    var percentageOfVolume = trpActiveAudio.volume / 1;
    var percentageOfVolumeSlider = $('.trpAudioVolumeSlider').innerWidth() * percentageOfVolume;

    ///var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;

    var volumeW = (percentageOfVolume*100) + "%";
    $('.trpAudio_volumeSlider .progress_bar').css({ width: volumeW});
    ///document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
}

//sound button video_sound ON/OFF
var trpAudio_soundonoff = function(){
    var _state;
    trpActiveAudio.muted = !trpActiveAudio.muted;
    if(trpActiveAudio.muted) {
        trpAudioController.find('.trpAudio_volumeSlider .progress_bar').css('width',0);
        _state = true;
    }else{
        trpAudioController.find('.trpAudio_volumeSlider .progress_bar').css('width', trpActiveAudio.volume*100+'%');
        _state = false;
    }
    return _state;
};


// 트랙의 볼륨을 받아(0~100) 현재 값에서 증감 업데이트합니다.
function trpAudio_changeVolume(number, direction){
    var _volume;
    // 음량이 0인지 확인하고, 음량이 0 이상인지 확인합니다.
    if(trpActiveAudio.volume >= 0 && direction == "down"){
        _volume = trpActiveAudio.volume - (number / 100);
        if(_volume < 0){ _volume = 0;}
    }
    // 음량이 1에 있는지 확인하고, 음량이 높지 않은지 확인합니다.
    if(trpActiveAudio.volume <= 1 && direction == "up"){
        _volume = trpActiveAudio.volume + (number / 100);
        if(_volume > 1){ _volume = 1;}
    }
    trpActiveAudio.volume = _volume;

    // 볼륨의 백분율을 찾아 이에 따라 볼륨 미터를 설정합니다.
    var percentageOfVolume = trpActiveAudio.volume / 1;
    var percentageOfVolumeSlider = $('.trpAudio_volumeSlider').innerWidth() * percentageOfVolume;
    ///var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;

    var volumeW = (percentageOfVolume*100) + "%";
    $('.trpAudio_volumeSlider .progress_bar').css({ width: volumeW });
    ///document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
}

// 클릭 한 슬라이더의 백분율을 기준으로 노래의 위치를 설정합니다.
function trpAudio_setLocation(percentage){
    trpActiveAudio.currentTime = trpActiveAudio.duration * percentage;
}
/*
그에 따라 노래 위치를 설정하기 위해 슬라이더에서 클릭의 비율을 가져옵니다..
Source for Object event and offset: http://website-engineering.blogspot.com/2011/04/get-x-y-coordinates-relative-to-div-on.html
*/
var trpAudio_timeDrag = false;	/* check for drag event */
function trpAudio_progress(obj, e){
    trpAudio_timeDrag = true;
    var evtobj=window.event? event : e;
    trpAudio_updatebar(evtobj.pageX);
};
$(document).on('mouseup', function(e) {
    if(trpAudio_timeDrag) {
        trpAudio_timeDrag = false;
        trpAudio_updatebar(e.pageX);
    }
});
$(document).on('mousemove', function(e) {
    if(trpAudio_timeDrag) {
        trpAudio_updatebar(e.pageX);
    }
});
var trpAudio_updatebar = function(x) {
    if(!trpActiveAudio.currentTime){return;}
    var progress = trpAudioController.find('.trpAudio_slider');

    //calculate drag position
    //and update video currenttime
    //as well as progress bar
    var maxduration = trpActiveAudio.duration;
    var position = x - progress.offset().left;
    var percentage = 100 * position / progress.width();
    if(percentage > 100) {percentage = 100;}
    if(percentage < 0) {percentage = 0;}
    console.log("percentage: " +percentage)
    trpAudioController.find('.trpAudio_slider .progress_bar').css('width',percentage+'%');
    trpActiveAudio.currentTime = maxduration * percentage / 100;
};


// 사용자 클릭을 기준으로 총 볼륨의 백분율로 볼륨을 설정합니다.
function trpAudio_setVolume(percentage){
    trpActiveAudio.volume =  percentage;

    var percentageOfVolume = trpActiveAudio.volume / 1;
    var percentageOfVolumeSlider = $('.trpAudioVolumeSlider').innerWidth() * percentageOfVolume;
    ///var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;

    var volumeW = (percentageOfVolume*100) + "%";
    $('.trpAudioVolumeSlider .progress_bar').css({ width: volumeW });
    ///document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
}


//VOLUME BAR
//volume bar event
var trpAudio_volumeDrag = false;
function trpAudio_volume(obj,e){
    trpAudio_volumeDrag = true;
    trpActiveAudio.muted = false;
    var evtobj = window.event? event: e;
    trpAudio_updateVolume(evtobj.pageX);
};
$(document).on('mouseup', function(e) {
    if(trpAudio_volumeDrag) {
        trpAudio_volumeDrag = false;
        trpAudio_updateVolume(e.pageX);
    }
});
$(document).on('mousemove', function(e) {
    if(trpAudio_volumeDrag) {
        trpAudio_updateVolume(e.pageX);
    }
});
var trpAudio_updateVolume = function(x, vol) {
    var volume = trpAudioController.find('.trpAudio_volumeSlider');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if(vol) {percentage = vol * 100;
    }else {
        var position = x - volume.offset().left;
        percentage = 100 * position / volume.width();
    }
    if(percentage > 100) {percentage = 100;}
    if(percentage < 0) {percentage = 0;}

    //update volume bar and video volume
    trpAudioController.find('.trpAudio_volumeSlider .progress_bar').css('width',percentage+'%');
    trpActiveAudio.volume = percentage / 100;
};
