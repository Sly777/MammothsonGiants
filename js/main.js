(function($, window, document) {
    $(window).load(function() {
        $('.loadingScreen').fadeOut("slow");
        website();
    });
})($, window, document);

function animateAll($el, arrOption, success) {
    var $sections = $el.find(">p");
    $sections.each(function(index) {
        $(this).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
            if($sections.length == index+1) {
                if(arrOption[index].delay == true) {
                    window.setTimeout(success, arrOption[index].delayTime);
                } else {
                    success();
                }

            } else {
                $sections.eq(index + 1).addClass("animated " + arrOption[index+1].animationName);
            }
        });
    });
    $sections.eq(0).addClass("animated " + arrOption[0].animationName);
}

function showLyric() {
    $(".bolumler").find("p").lettering();

    window.mog = new Audio('');
    window.mog = new Audio('song/mog1.mp3');

    window.mog.addEventListener('loadedmetadata', function() {
        window.mog.play();

        animateAll($(".bolum1"), [{ animationName: "expandOpenIn" }, { animationName: "fadeInDown" }, { animationName: "expandOpenIn" }, { animationName: "fadeInUp", delay: true, delayTime: 1000 }], function() {
            $(".bolum1").addClass("animated fadeOutDown");

            animateAll($(".bolum2"), [{ animationName: "fadeInLeft" }, { animationName: "fadeInRight" }, { animationName: "bounceIn", delay: true, delayTime: 3800 }], function() {
                $(".bolum2").addClass("animated fadeOutDown");

                animateAll($(".bolum3"), [{ animationName: "expandOpenIn" }, { animationName: "fadeInDown" }, { animationName: "expandOpenIn" }, { animationName: "fadeInUp" }], function() {
                    $(".bolum3").addClass("animated fadeOutDown");
                });
            });
        });
    }, false);
}

function website() {
    $('#scene').parallax();

    var resources = {
        dev: { translation: { 'downloadAlbum': 'Download', 'streamAlbum': "Listen" } },
        en: { translation: { 'downloadAlbum': 'Download', 'streamAlbum': "Listen" } },
        tr: { translation: { 'downloadAlbum': 'Yükle', 'streamAlbum': "Dinle" } },
        'en-US': { translation: { 'downloadAlbum': 'Download', 'streamAlbum': "Listen" } },
        'tr-TR': { translation: { 'downloadAlbum': 'Yükle', 'streamAlbum': "Dinle" } }
    };

    i18n.init({ resStore: resources }, function(t) {
        $(".mogcontain").i18n();
    });

    $('.moglink:eq(1)').on("click", function() {
        $.colorbox({html:'<iframe style="border: 0; width: 350px; height: 560px;" src="https://bandcamp.com/EmbeddedPlayer/album=1783703321/size=large/bgcol=333333/linkcol=e99708/transparent=true/" seamless><a href="http://mammothsongiants.bandcamp.com/album/desolated-2">Desolated by Mammoths on Giants</a></iframe>'});

        return false;
    });
}