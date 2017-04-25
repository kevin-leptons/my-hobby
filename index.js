Reveal.initialize({
    history: true,
    dependencies: [
        { src: 'plugin/markdown/marked.js' },
        { src: 'plugin/markdown/markdown.js' },
        { src: 'plugin/notes/notes.js', async: true },
        { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        { src: 'plugin/external/external.js', condition: function() { return !!document.querySelector( '[data-external]' ); } }
    ]
})

Reveal.addEventListener('slidechanged', function(evt) {
    playVideo(evt.currentSlide)
});

var isFulling = false
function playVideo(elem) {
    var media = elem.getElementsByTagName('video')[0]
    if (!media) {
        document.webkitCancelFullScreen()
        isFulling = false
        return
    }
    media.onended = function () {
        document.webkitCancelFullScreen()
        isFulling = false
        Reveal.next()
    }
    if (!isFulling) {
        media.webkitRequestFullscreen()
        isFulling = true
    }
    media.play()
}

window.addEventListener("mousedown", handleClick, false);
window.addEventListener("contextmenu", function(e) { e.preventDefault(); }, false);

function handleClick(e) {
	e.preventDefault();
	if(e.button === 0) Reveal.next();
	if(e.button === 2) Reveal.prev();
}
