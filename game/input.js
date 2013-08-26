define(function(){
   
    var Input = Class.extend({
        init : function(){
            this.initMouseEvents();
            this.initKeys();
        },
        initMouseEvents : function(){

            $(window).mousemove(function(e) {
                if(e.button != 0) return;
                e.preventDefault();
                G.player.eventMouseMove(e);
            });
            $(window).mousedown(function(e) {
                if(e.button != 0) return;
                e.preventDefault();
                G.player.eventMouseDown(e);
            });
            $(window).mouseup(function(e) {
                if(e.button != 0) return;
                e.preventDefault();
                G.player.eventMouseUp();
            });
            Hammer(window).on("tap", function(event) {
                if(!G.start){
                    G.start = true;
                }
                G.restartLevel();
            });
            Hammer(window).on("hold", function(event) {
                if(G.ended){
                    console.log("enabling hardcore");
                    $('#end').fadeOut('slow', function() {});
                    $('#gstats').fadeOut('slow', function() {});
                    G.hardcore = true;
                    G.ended = false;
                    G.currentLevel = 0;
                    G.player.damage = 0;
                    G.traveled = 0;
                    G.collisions = 0;
                    G.deaths;
                    G.loadLevel();
                }
            });
            
        },
        initKeys : function(){
            $(window).keypress(function(e){
//                console.log(e);
                if(!G.start){
                    G.start = true;
                    return
                }
                if(e.charCode == 99){ // c
                    G.camera.nextState();
                }
                if(e.charCode == 32){ // space
                    G.restartLevel();
                }
                if(e.charCode == 110){ // n
                    G.startZoomOut(); 
                }
            });
        }
    });
    return Input;
});