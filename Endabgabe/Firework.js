"use strict";
var CustomFirework;
(function (CustomFirework) {
    class Firework {
        position;
        colour;
        size;
        lifespan;
        expendable = false;
        iLifetime = 1;
        constructor(_position, _colour, _size, _lifespan) {
            this.position = _position.copy();
            this.colour = _colour;
            this.size = _size;
            this.lifespan = _lifespan;
        }
        explode() {
            console.log("Update iLifetime");
            if (this.iLifetime <= this.lifespan) {
                this.iLifetime++;
            }
            else {
                this.expendable = true;
            }
        }
    }
    CustomFirework.Firework = Firework;
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=Firework.js.map