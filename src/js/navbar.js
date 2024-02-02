class Navbar {
    constructor(){
        this.navBar();
    }
    navBar () {
        const line1 = document.querySelector('.menu-button .line-1');
        const line2 = document.querySelector('.menu-button .line-2');
        const line3 = document.querySelector('.menu-button .line-3');

        const buttonContainer = document.querySelector('.menu-button');

        buttonContainer.addEventListener('mouseenter', () => {
            gsap.to(line1, {duration:1, x: 50})
            gsap.to(line2, {duration:1, x: 30})
            gsap.to(line3, {duration:1, x: 10})
        })
        buttonContainer.addEventListener('mouseleave', () => {
            gsap.to(line1, {duration:1, x: 0})
            gsap.to(line2, {duration:1, x: 0})
            gsap.to(line3, {duration:1, x: 0})
        })
    }
    ScaleGsap (el, duration,amount) {
        gsap.to(el, {
            duration: duration,
            width: amount + '%',
            ease: "Power3.easeOut",
        });
    }
}

const instanceNavbar = new Navbar()