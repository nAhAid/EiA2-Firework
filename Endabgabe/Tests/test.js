"use strict";
var Endabgabe_test;
(function (Endabgabe_test) {
    let Test;
    (function (Test) {
        Test["circle"] = "Circle";
        Test["star"] = "Star";
        Test["cross"] = "Cross";
    })(Test || (Test = {}));
    let canvas = document.querySelector("canvas");
    let cc2 = canvas.getContext("2d");
    let background;
    let index = 1;
    window.addEventListener("load", handleLoad);
    let test = Test.circle;
    console.log(test);
    function handleLoad() {
        console.log("Load");
        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
        drawCircle(250, 300, 1, 1);
        window.setInterval(update, 30);
    }
    function update() {
        cc2.putImageData(background, 0, 0);
        drawCircle(250, 300, index, 1);
        if (index >= 130) {
            index = 1;
        }
        else {
            index++;
        }
    }
    function drawBackground() {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }
    function drawCircle(_positionX, _positionY, _lifespan, _size) {
        console.log("Draw Circle");
        let radiusParticle = 10 * _size;
        let radiusCircle = 1;
        let particle = new Path2D();
        let gradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        let start = cc2.getTransform();
        cc2.translate(_positionX, _positionY);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        cc2.fillStyle = gradient;
        for (let index = 0; index < 80; index++) {
            let angle = (index / 10) * 360;
            let radius = radiusCircle * _lifespan;
            let xPosition = radius * Math.cos(angle);
            let yPosition = radius * Math.sin(angle);
            cc2.save();
            cc2.translate(xPosition, yPosition);
            cc2.fill(particle);
            cc2.restore();
        }
        cc2.setTransform(start);
    }
})(Endabgabe_test || (Endabgabe_test = {}));
//# sourceMappingURL=test.js.map