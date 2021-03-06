import 'bootstrap-sass';
import './scss/style.scss';

var url = window.location.href;
var roomArr = url.split('/');
var roomName = roomArr[roomArr.length-1];
var validRooms = ["chillout-place", "nightlife", "series-movies", "sports"];
var isCurrentRoom = validRooms.includes(roomName);

if (isCurrentRoom) {
    const room = roomName;
    const socket = io('/tech');
    $('form').submit(() => {
        let msg = $('#m').val();
        let user = localStorage.getItem('userName');

        socket.emit('message', { msg, room, user });
        $('#m').val('');
        return false;
    });

    socket.on('connect', () => {
        let user = localStorage.getItem('userName');
        //emitting to everybody
        socket.emit('join', { room: room, user:user });

        
    });

    socket.on('message', (data) => {
        let user = localStorage.getItem('userName');

        if(user == data.user){
            $('#messages').append($('<li class="message self">'+ '<span>' + data.user +'</span>'  + '<span class=""message-area">'+ data.msg +'</span>'+ '<span class="time">'+ data.time+ '</span>'+ '</li>'));

        }else{
            $('#messages').append($('<li class="message ">'+ '<span>' + data.user +'</span>'  + '<span class=""message-area">'+ data.msg +'</span>'+ '<span class="time">'+ data.time+ '</span>'+ '</li>'));
        }

    });

    socket.on('singleMessage', (msg) => {
        $('#messages').append($('<li class="other">').text(msg));
    });

    socket.on('historyChats', (data) => {
        let user = localStorage.getItem('userName');

        for (var i = 0; i < data.length; i++) {
            if(user == data[i].user_name){
                $('#messages').append($('<li class="mine">').text(data[i].chat_text+' - '+data[i].user_name));
            }else{
                $('#messages').append($('<li class="other">').text(data[i].chat_text+' - '+data[i].user_name));
            }
        }

    });
}

$( document ).ready(function() {
    $('.room-name').text(roomName);
    var title = $('title').html();
    $('title').html(title.replace("{{room}}",roomName));

    $('body').on('click','._saveUserName', (event) => {
        event.preventDefault();
        var userName = $('._userName').val();

        localStorage.setItem('userName',userName);

        window.location.href = '/rooms';
    });
});
if (window.innerWidth < 1024) {
    $(".room-item").click(() => {

        $("#rooms-container").fadeOut(0, (e) => {
            event.preventDefault(e);
            $(".fadeout").fadeOut(0)
            $(".chat-container").fadeIn(0)
            $(".chat-list").fadeIn(0)
            $(".fadein").fadeIn(0)
           });
    });

}