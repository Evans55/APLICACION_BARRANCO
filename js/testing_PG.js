// JavaScript Document

function onBodyLoad(){
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);
}

	

function onDeviceReady(){
	
	playAudio('file:///android_asset/www/audio/intro.mp3');
}



 // Audio player
        //
        var my_media = null;
        var mediaTimer = null;
	

        // Play audio
        //
        function playAudio(src) {
		
	var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    absolutePath='file://' + path;
	//alert(absolutePath);
	
	/*if (device.platform == 'Android'){
     src='/android_asset/'+src;
 }*/
			
            // Create Media object from src
      if (my_media == null) {  my_media = new Media(src, onSuccess, onError); }

            // Play audio
            my_media.play();


            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
																				
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
			
        }

        // Pause audio
        //
        function pauseAudio() {
			
            if (my_media) {
                my_media.pause();
				
            }
			
        }

        // Stop audio
        //
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }

        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        // Set audio position
        //
		
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }


       function onBackKeyDown() {
    var active_page = $( ":mobile-pagecontainer" ).pagecontainer( "getActivePage" );
    var id =active_page.page().attr('id');
    if (id==='page') {
        if (confirm('¿Seguro que quieres cerrar la aplicación?')==true){
            navigator.app.exitApp();
        }
    }
    else{
    navigator.app.backHistory();
    }
}