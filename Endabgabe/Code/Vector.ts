namespace CustomFirework {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }

        random(_minLength: number, _maxLength: number, _directions?: string): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);


            if (_directions == "y") {
                let direction: number = 0.5 * Math.PI;
                this.set(Math.cos(direction), Math.sin(direction));
                this.scale(length);
            }
            else if (_directions == "-y") {
                let direction: number = -0.5 * Math.PI;
                this.set(Math.cos(direction), Math.sin(direction));
                this.scale(length);
            }
            else if (_directions == "x") {
                let direction: number = 1 * Math.PI;
                this.set(Math.cos(direction), Math.sin(direction));
                this.scale(length);
            }
            else if (_directions == "-x") {
                let direction: number = -2 * Math.PI;
                this.set(Math.cos(direction), Math.sin(direction));
                this.scale(length);
            }
            else {
                let direction: number = Math.random() * 2 * Math.PI;
                this.set(Math.cos(direction), Math.sin(direction));
                this.scale(length);
            }
        }
        copy(): Vector {
            return new Vector(this.x, this.y);
        }
    }
}