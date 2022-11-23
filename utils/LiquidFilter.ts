import * as PIXI from "pixi.js";
import { DisplacementFilter } from "@pixi/filter-displacement";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import throttle from "lodash.throttle";
import Lenis from "@studio-freight/lenis";
import { PixiFilter } from "./PixiFilter";

gsap.registerPlugin(ScrollTrigger);

export class LiquidFilter extends PixiFilter {
  filter: DisplacementFilter;
  displacementTimeline: GSAPTimeline;
  constructor(el, canvas, scroller) {
    super(el, canvas, scroller);

    this.canvas.style.opacity = "0";

    this.createDisplacementHover();

    this.getDisplacementImage();
    this.createDisplacementTimeline();
    this.createDisplacementScroll(this.scroller);
  }

  getDisplacementImage() {
    const displacementMapFile = this.el.getAttribute("data-displacement-map");
    const displacementMap = PIXI.Sprite.from(displacementMapFile);
    this.filter = new PIXI.filters.DisplacementFilter(displacementMap);

    this.container.filterArea = this.pixiApp.screen;
    this.container.filters = [this.filter];
    this.container.addChild(displacementMap);

    // Set displacement image dimensions
    this.setImageDimensions(displacementMap, displacementMapFile);
  }

  createDisplacementTimeline() {
    this.displacementTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.el,
        start: "top center",
        once: true,
      },
    });

    this.displacementTimeline
      .fromTo(
        this.canvas,
        {
          autoAlpha: 0,
        },
        {
          duration: 0.7,
          autoAlpha: 1,
          ease: "power2.out",
        },
        0
      )
      .fromTo(
        this.filter.scale,
        {
          x: 150,
          y: 150,
        },
        {
          duration: 1.5,
          x: 0,
          y: 0,
          ease: "power2.out",
        },
        0
      );
  }

  createDisplacementHover() {
    this.el.addEventListener(
      "mousemove",
      this.handleDisplacementHover.bind(this)
    );
    this.el.addEventListener("mouseleave", this.resetDisplacement.bind(this));
  }

  destroyDisplacementHover() {
    this.el.removeEventListener(
      "mousemove",
      this.handleDisplacementHover.bind(this)
    );
    this.el.removeEventListener(
      "mouseleave",
      this.resetDisplacement.bind(this)
    );
  }

  handleDisplacementHover(e) {
    const x = Math.min(e.clientX / 20, 75);
    const y = Math.min(e.clientY / 20, 75);
    gsap.to(this.filter.scale, { x, y });
  }

  resetDisplacement() {
    gsap.to(this.filter.scale, { x: 0, y: 0 });
  }

  createDisplacementScroll(scroller: any) {
    this.createIntersectionObserver(0.1);

    scroller.on(
      "scroll",
      throttle(({ velocity }) => {
        if (this.intersecting) {
          gsap.to(this.filter.scale, {
            y: Math.min(velocity * 3, 100),
          });
        }
      }),
      100
    );
  }
}
