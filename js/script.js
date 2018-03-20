
var CurrentChannel; 
currentLocation = {longitude: 51.5033640, latitude: -0.1276250 , what3words : 'blatt.benutzt.klein' };



function sendMessage(){
  
  console.log(new Message("Hallo Chatter"));
  var message = createMessageElement(new Message("Hallo Chatter"));   
    
  $('#messages').append(message);   
  $("input[id=message_input]").val(''); 
   

}

function Message(text){
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    
   
    this.createdOn = new Date();
    
    var aktuelle_Zeit = new Date();
    var i = aktuelle_Zeit.getTime();

    this.expiresOn = new Date( i  + (1000 * 60 * 15));
    
    
    this.text = text; 
    
    this.own = true; 
    
}

function createMessageElement(messageObject){
     
    
     var expiresIn = Math.round((messageObject.expiresOn.getTime() - messageObject.createdOn.getTime()) / 60000); 
     var text = $("input[id=message_input]").val();
     
    var message_string = 
         "<div class='message'>" + 
            "<h3><a href='" + messageObject.createdBy + "' target='_blank'><strong>" + messageObject.createdBy + "</strong></a>" +
               messageObject.createdOn.toDateString() + "<em>" + expiresIn + "min. left</em></h3>"+
            "<p>" + text + "</p><button>+5 min.</button>"+
         "</div>" 
         
     console.log(message_string);
     return(message_string); 
}



/* #6 start the #external #action and say hello */
console.log("App is alive");

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelName) {
    
    CurrentChannel = channelName ;
    
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelName.createdBy + '" target="_blank"><strong>' + channelName.createdBy + '</strong></a>';

    
    /* #6 #liking channels on #click */
    $('#channel-staro').attr('class', channelName.starred? 'fa fa-star' : 'fa fa-star-o');
    

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');
    
    
}

/* #6 #liking a channel on #click */
function star() {
    $('#channel-staro').toggleClass('fa fa-star');
    $('#channel-staro').toggleClass('fa fa-star-o');
    
    CurrentChannel.starred = !CurrentChannel.starred; 
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}
