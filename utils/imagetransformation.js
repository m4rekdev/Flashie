const { CanvasRenderingContext2D } = require('canvas');

module.exports = {
    /**
     * @param {CanvasRenderingContext2D} canvas 
     * @param {object} info 
     * @param {object} style 
     */
    drawText: (canvas, info, style = { fontSize: 20, fontFamily: 'Arial', color: 'black', textAlign: 'left', textBaseline: 'top' }) => {
        const { text, x, y } = info;
        const { fontSize, fontFamily, color, textAlign, textBaseline } = style;

        canvas.beginPath();
        canvas.font = `${fontSize}px ${fontFamily}`;
        canvas.textAlign = textAlign;
        canvas.textBaseline = textBaseline;
        canvas.fillStyle = color;
        canvas.fillText(text, x, y);
        canvas.stroke();
    },

    /**
     * @param {CanvasRenderingContext2D} canvas
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} width
     */
    roundImage: (canvas, x, y, width, height, radius) => {
        canvas.beginPath();
        canvas.moveTo(x + radius, y);
        canvas.lineTo(x + width - radius, y);
        canvas.quadraticCurveTo(x + width, y, x + width, y + radius);
        canvas.lineTo(x + width, y + height - radius);
        canvas.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        canvas.lineTo(x + radius, y + height);
        canvas.quadraticCurveTo(x, y + height, x, y + height - radius);
        canvas.lineTo(x, y + radius);
        canvas.quadraticCurveTo(x, y, x + radius, y);
        canvas.closePath();
    },
};