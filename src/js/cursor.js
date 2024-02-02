// import { gsap } from "gsap";

let mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - 15;
    mouse.y = e.clientY - 15;
})
export default class mouseMotion {
    constructor(el) {
        this.cursor =  el;
        this.items = document.querySelectorAll('.activate');
        this.doc = document.querySelector('body');
        this.mouseMove();
        this.ItemsHover();
        this.MouseClick();
    }
    mouseMove () {
        this.cursor.style.left = mouse.x;
        this.cursor.style.top = mouse.y;
        requestAnimationFrame(() => { this.mouseMove() });
    }
    ItemsHover () {
        this.items.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                this.ScaleCursor(this.cursor, 4, 0);
            });
            item.addEventListener("mouseleave", () => {
                this.ScaleCursor(this.cursor, 1, 0);
            });
        })
    }
    ScaleCursor(el, amount, delay) {
        gsap.to(el, {
          duration: 0.6,
          scale: amount,
          ease: "Power3.easeOut",
          delay: delay
        });
    }
    MouseClick () {
        this.doc.addEventListener('click', () => {
            this.ScaleCursor(this.cursor, 3, 0)
            this.ScaleCursor(this.cursor, 1, 0.3)
        })
    }
}



