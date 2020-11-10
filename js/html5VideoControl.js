	// INITIALIZE
	var trpActiveVideo=null;           // 비디오
    var trpVideoController = null;     // 비디오 테그 wrap
	function trpVideo_set($video_id, $video_wrap){
        trpActiveVideo = null;
        trpVideoController = null;
        trpVideoSet = true;

        trpActiveVideo = $($video_id);
        trpVideoController = $($video_wrap);  // trpActiveVideo.siblings(".vedio-player");

        //remove default control when JS loaded ( JS로드시 기본 컨트롤 제거 )
        trpActiveVideo[0].removeAttribute("controls");
        /* loging-on */

        //before everything get started ( 모든 것이 시작되기 전에 )
        trpActiveVideo.on('loadedmetadata', function() {
            // 시간
            trpVideoController.find('.trpVideoTimebar-box .trpVideoCurrentTime').text(timeFormat(0));
            trpVideoController.find('.trpVideoTimebar-box .trpVideoTotalTime').text(timeFormat(trpActiveVideo[0].duration));

            // 볼륨 설정
            trpVideo_updateVolume(0, 0.7);

            //start to get video buffering data  (비디오 버퍼링 데이터 가져 오기 시작)
            setTimeout(startBuffer, 150);
        });

        //display current video play time
        trpActiveVideo.on('timeupdate', function() {
            var currentPos = trpActiveVideo[0].currentTime;
            var maxduration = trpActiveVideo[0].duration;
            var perc = 100 * currentPos / maxduration;
            trpVideoController.find('.trpVideo_slider .progress_bar').css('width',perc+'%');
            trpVideoController.find('.trpVideoTimebar-box .trpVideoCurrentTime').text(timeFormat(currentPos));
            if( trpActiveVideo[0].duration ){
                trpVideoController.find('.trpVideoTimebar-box .trpVideoTotalTime').text(timeFormat(trpActiveVideo[0].duration));
            }
        });


        //VIDEO EVENTS
        //video canplay event ( 재생 준비 되면 )
        trpActiveVideo.on('canplay', function() {
            /* loging-off */
        });


        //video canplaythrough event ( 동영상재생가능! )
        //solve Chrome cache issue
        var completeloaded = false;
        trpActiveVideo.on('canplaythrough', function() {
            completeloaded = true;
        });

        //video ended event ( 동영상 종료 )
        trpActiveVideo.on('ended', function() {
            trpActiveVideo[0].pause();
            video_stop();
            trpActiveVideo.load();
        });


        //video seeking event ( 비디오 검색 )
        trpActiveVideo.on('seeking', function() {
            //if video fully loaded, ignore loading screen
            if(!completeloaded) {
                /* loging-on */
            }
        });

        //video seeked event
        trpActiveVideo.on('seeked', function() { });

        //video waiting for more data event (더 많은 데이터 이벤트를 기다리는 비디오)
        trpActiveVideo.on('waiting', function() { /* loging-off */ });

    }// trpVideo_play



	//display video buffering bar
    var _bufferTimeOut;
	var startBuffer = function() {
        var currentBuffer = trpActiveVideo[0].buffered.end(0);
        var maxduration = trpActiveVideo[0].duration;
        var perc = 100 * currentBuffer / maxduration;
        trpVideoController.find('.trpVideo_slider .buffer_bar').css('width',perc+'%');

        if(currentBuffer < maxduration) {
            if(_bufferTimeOut){
                clearTimeout(_bufferTimeOut);
                _bufferTimeOut = null;
            }
            _bufferTimeOut = setTimeout(startBuffer, 500);
        }
	};



	//CONTROLS EVENTS
	//video screen and play button clicked
    var trpVideo_play = function() {trpActiveVideo[0].play();};

    var trpVideo_pause = function() {trpActiveVideo[0].pause();};

    // 재생/일시정지
	var trpVideo_playpause = function() {
        var _state;
		if(trpActiveVideo[0].paused || trpActiveVideo[0].ended) {
			trpActiveVideo[0].play();
            _state = true;
		}else{
			trpActiveVideo[0].pause();
            _state = false;
		}
        return _state;
	};

    // 멈춤
    var trpVideo_stop = function()  {
        if (!trpActiveVideo){return;}
		trpVideo_updatebar(trpVideoController.find('.trpVideo_slider').offset().left);
		trpActiveVideo[0].pause();
        trpActiveVideo.load();
	};

	//speed text clicked  : fastfowrd(3); // 3배 빨리 감기
	var trpVideo_fastfowrd = function(spd) {
		trpActiveVideo[0].playbackRate = spd;
		trpActiveVideo[0].play();
	};


	//fullscreen button clicked 풀스크린
	var trpVideo_fullscreen = function(){
		if($.isFunction(trpActiveVideo[0].webkitEnterFullscreen)) {
			trpActiveVideo[0].webkitEnterFullscreen();
		}
		else if ($.isFunction(trpActiveVideo[0].mozRequestFullScreen)) {
			trpActiveVideo[0].mozRequestFullScreen();
		}
		else {
			alert('Your browsers doesn\'t support fullscreen');
		}
	};



	//VIDEO PROGRESS BAR
	//when video timebar clicked
	var trpVideo_timeDrag = false;	/* check for drag event */
	var trpVideo_progress = function(obj, e){
		trpVideo_timeDrag = true;
        var evtobj=window.event? event : e;
		trpVideo_updatebar(evtobj.pageX);
	};
	$(document).on('mouseup', function(e) {
		if(trpVideo_timeDrag) {
			trpVideo_timeDrag = false;
			trpVideo_updatebar(e.pageX);
		}
	});
	$(document).on('mousemove', function(e) {
		if(trpVideo_timeDrag) {
			trpVideo_updatebar(e.pageX);
		}
	});
	var trpVideo_updatebar = function(x) {
        if(!trpActiveVideo[0].currentTime){return;}
		var progress = trpVideoController.find('.trpVideo_slider');

		//calculate drag position
		//and update video currenttime
		//as well as progress bar
		var maxduration = trpActiveVideo[0].duration;
		var position = x - progress.offset().left;
		var percentage = 100 * position / progress.width();
		if(percentage > 100) {percentage = 100;}
		if(percentage < 0) {percentage = 0;}

		trpVideoController.find('.trpVideo_slider .progress_bar').css('width',percentage+'%');
		trpActiveVideo[0].currentTime = maxduration * percentage / 100;
	};


	//VOLUME BAR
	//volume bar event
	var trpVideo_volumeDrag = false;
    var trpVideo_volume = function(obj, e){
		trpVideo_volumeDrag = true;
		trpActiveVideo[0].muted = false;
		var evtobj=window.event? event : e;
		trpVideo_updateVolume(evtobj.pageX);
    };
	$(document).on('mouseup', function(e) {
		if(trpVideo_volumeDrag) {
			trpVideo_volumeDrag = false;
			trpVideo_updateVolume(e.pageX);
		}
	});
	$(document).on('mousemove', function(e) {
		if(trpVideo_volumeDrag) {
			trpVideo_updateVolume(e.pageX);
		}
	});
	var trpVideo_updateVolume = function(x, vol) {
		var volume = trpVideoController.find('.trpVideo_volumeSlider');
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
		trpVideoController.find('.trpVideo_volumeSlider .progress_bar').css('width',percentage+'%');
		trpActiveVideo[0].volume = percentage / 100;
	};

    //sound button video_sound ON/OFF
	var trpVideo_soundonoff = function(){
        var _state;
		trpActiveVideo[0].muted = !trpActiveVideo[0].muted;
		if(trpActiveVideo[0].muted) {
			trpVideoController.find('.trpVideo_volumeSlider .progress_bar').css('width',0);
            _state = true;
		}else{
			trpVideoController.find('.trpVideo_volumeSlider .progress_bar').css('width', trpActiveVideo[0].volume*100+'%');
            _state = false;
		}
        return _state;
    };


    var trpVideo_changeVolume = function($number, $direction){
        var _volume;
        // 음량이 0인지 확인하고, 음량이 0 이상인지 확인합니다.
        if(trpActiveVideo[0].volume >= 0 && $direction == "down"){
            _volume = trpActiveVideo[0].volume - ($number / 100);
            if(_volume < 0){ _volume = 0;}
        }
        // 음량이 1에 있는지 확인하고, 음량이 높지 않은지 확인합니다.
        if(trpActiveVideo[0].volume <= 1 && $direction == "up"){
            _volume = trpActiveVideo[0].volume + ($number / 100);
            if(_volume > 1){ _volume = 1;}
        }
        trpActiveVideo[0].volume = _volume;

        var percentageOfVolume =  trpActiveVideo[0].volume / 1;
        var volumeW = (percentageOfVolume*100) + "%";
        trpVideoController.find('.trpVideo_volumeSlider .progress_bar').css({ width: volumeW });

    };


    var trpVideoOff = function(){
        if(!trpActiveVideo){return;}
        trpActiveVideo.off('loadedmetadata');
        trpActiveVideo.off('timeupdate');
        trpActiveVideo.off('canplay');
        trpActiveVideo.off('canplaythrough');
        trpActiveVideo.off('ended');
        trpActiveVideo.off('seeking');
        trpActiveVideo.off('seeked');
        trpActiveVideo.off('waiting');
        clearTimeout(_bufferTimeOut);
        _bufferTimeOut = null;
        trpActiveVideo = null;
    }


	//Time format converter - 00:00
	var timeFormat = function(seconds){
		var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
		var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
		return m+":"+s;
	};
