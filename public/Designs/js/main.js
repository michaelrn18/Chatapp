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