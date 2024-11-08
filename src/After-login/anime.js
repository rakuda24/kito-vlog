import './anime.css'
const container = document.querySelector(".container")
        for(var i=0; i<=100; i++) {
            const blocks = document.createElement("div")
            blocks.classList.add("block");
            container.appendChild(blocks);
        }
        function animateBlocks() {
            anime({
                targets: ".block",
                translateX: function () {
                    return anime.random(-900, 900);
                },
                translateY: function () {
                    return anime.random(-500, 500)
                },
                scale: function() {
                    return anime.random(0.5, 2)
                },
                duration: 2500,
                delay: anime.stagger(2),
                complete: animateBlocks,
            });
        }