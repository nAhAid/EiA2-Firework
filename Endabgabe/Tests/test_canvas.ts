namespace Endabgabe_test {
    enum Test {
        circle = "Circle",
        star = "Star",
        cross = "Cross"
    }

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    let background: ImageData;
    let index: number = 1;

    window.addEventListener("load", handleLoad);


    let test: Test = Test.star;

    console.log(test);

    function handleLoad(): void {
        console.log("Load");
        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
        drawCircle(250, 300, 1, 1);
        drawStar(400, 150, 1, 1);
        drawCross(600, 400, 1, 1);
        //window.setInterval(update, 30);

    }

    function update(): void {
        cc2.putImageData(background, 0, 0);
        drawCircle(250, 300, index, 1);
        drawStar(400, 150, index, 1);
        drawCross(600, 400, index, 1);

        if (index >= 130) {
            index = 1;
        }
        else {
            index++;
        }
    }

    function drawBackground(): void {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }
    function drawCircle(_positionX: number, _positionY: number, _lifespan: number, _size: number): void {
        console.log("Draw Circle");
        let radiusParticle: number = 10 * _size;
        let circle: number = 1;

        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        let start: DOMMatrix = cc2.getTransform();
        cc2.translate(_positionX, _positionY);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

        for (let k: number = 3; k >= 0; k--) {
            cc2.save();
            cc2.scale(1 - (k / 5), 1 - (k / 5));
            gradient.addColorStop(0, "HSLA(0, 100%, 100%," + (0.6 - (k / 10)) + ")");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%," + (0.3 - (k / 10)) + ")");
            cc2.fillStyle = gradient;
            for (let j: number = 0; j < 18; j++) {
                cc2.save();
                cc2.rotate(j * 20 * Math.PI / 180);
                let radius: number = circle * _lifespan;
                cc2.translate(radius, 0);
                cc2.fill(particle);
                cc2.restore();
            }
            cc2.restore();
        }
        cc2.setTransform(start);

    }
    function drawCross(_positionX: number, _positionY: number, _lifespan: number, _size: number): void {
        console.log("Draw Cross");
        let radiusParticle: number = 10 * _size;
        let cross: number = 1;

        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        let start: DOMMatrix = cc2.getTransform();
        cc2.translate(_positionX, _positionY);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

        for (let k: number = 3; k >= 0; k--) {
            cc2.save();
            cc2.scale(1 - (k / 5), 1 - (k / 5));
            gradient.addColorStop(0, "HSLA(0, 100%, 100%," + (0.6 - (k / 10)) + ")");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%," + (0.3 - (k / 10)) + ")");
            cc2.fillStyle = gradient;
            for (let j: number = 0; j < 4; j++) {
                cc2.save();
                cc2.rotate(j * 90 * Math.PI / 180);
                let radius: number = cross * _lifespan;
                cc2.translate(radius, 0);
                cc2.fill(particle);
                cc2.save();
                cc2.translate(0, -radius / 10);
                cc2.fill(particle);
                cc2.restore();
                cc2.save();
                cc2.translate(0, radius / 10);
                cc2.fill(particle);
                cc2.restore();
                cc2.restore();
            }
            cc2.restore();
        }
        cc2.setTransform(start);

    }
    function drawStar(_positionX: number, _positionY: number, _lifespan: number, _size: number): void {
        console.log("Draw Star");
        let radiusParticle: number = 10 * _size;
        let starCircle: number = 1;
        let starHelper: number;

        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        let start: DOMMatrix = cc2.getTransform();
        cc2.translate(_positionX, _positionY);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

        for (let k: number = 3; k >= 0; k--) {
            cc2.save();
            cc2.scale(1 - (k / 10), 1 - (k / 10));
            gradient.addColorStop(0, "HSLA(0, 100%, 100%," + (0.6 - (k / 10)) + ")");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%," + (0.3 - (k / 10)) + ")");
            cc2.fillStyle = gradient;
            for (let i: number = 0; i < 5; i++) {
                cc2.save();
                cc2.rotate(i * 72 * Math.PI / 180);
                for (let j: number = 0; j < 4; j++) {
                    cc2.save();
                    cc2.rotate(j * 18 * Math.PI / 180);
                    let radius: number = starCircle * _lifespan;
                    switch (j) {
                        case 0:
                            starHelper = 2;
                            break;
                        case 1:
                            starHelper = 1.5;
                            break;
                        case 2:
                            starHelper = 1;
                            break;
                        case 3:
                            starHelper = 1.5;
                            break;
                        default:
                            starHelper = 1;
                            break;
                    }
                    cc2.translate(radius * starHelper, 0);
                    cc2.fill(particle);
                    cc2.restore();
                }
                cc2.restore();
            }
            cc2.restore();
        }
        cc2.setTransform(start);

    }
}