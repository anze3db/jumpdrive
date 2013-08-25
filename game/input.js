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
                G.restartLevel();
            });
            
        },
        initKeys : function(){
            $(window).keypress(function(e){
                if(e.charCode == 99){ // c
                    G.camera.nextState();
                }
                if(e.charCode == 32){ // space
                    G.restartLevel();
                }
            });
        }
    });
    return Input;
});