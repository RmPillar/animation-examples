<script setup lang="ts">
// Set initial observer value
const observer = ref(null);

// Callback function for Intersection Observer
const observerCallback = (entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    // Check if observed element is 'intersecting' the viewport
    if (isIntersecting) {
      // If so add onscreen class and unobserve element
      target.classList.add("onscreen");
      observer.value.unobserve(target);
    }
  });
};

onMounted(() => {
  // Create intersection observer
  observer.value = new IntersectionObserver(observerCallback, {
    // Observed element needs to 50% into the viewport before the callback is fired
    threshold: 0.5,
  });

  const headings = document.querySelectorAll(".heading");

  headings.forEach((heading) => {
    // observe all heading elements
    observer.value.observe(heading);
  });
});
</script>

<template>
  <StructureScroller>
    <section>
      <div
        class="flex h-screen w-screen flex-col items-center justify-center bg-red-500"
      >
        <GsapFreeZoneHeading
          text="This is a GSAP-free zone"
          type="char"
          class="swipeCharsAlternate text-center"
        />
      </div>

      <div
        class="flex h-screen w-screen flex-col items-center justify-center bg-purple-500"
      >
        <GsapFreeZoneHeading
          text="The smooth scrolling is handled by Lenis Scroller"
          type="char"
          class="fadeInChars"
        />
      </div>
      <div
        class="flex h-screen w-screen flex-col items-center justify-center bg-orange-500"
      >
        <GsapFreeZoneHeading
          text="And the animations are triggered using the Intersection Observer API"
          type="char"
          class="swipeCharsDow !leading-[1.13]"
        />
      </div>
      <div
        class="flex h-screen w-screen flex-col items-center justify-center bg-blue-500"
      >
        <GsapFreeZoneHeading
          text="This text has been split into words and lines without using GSAP"
          type="word,line"
          class="swipeUpWordsByLine"
        />
      </div>

      <div
        class="flex h-screen w-screen flex-col items-center justify-center bg-green-500"
      >
        <GsapFreeZoneHeading
          text="This text has been split into characters, words and lines without using GSAP"
          type="char,line"
          class="swipeUpCharsByLine"
        />
      </div>
    </section>
  </StructureScroller>
</template>

<style lang="postcss">
.fadeInChars {
  .char {
    opacity: 0;
    transform: scale(2) rotate(15deg);
    transition: transform 0.5s ease-in-out calc((0.025s * var(--char-index))),
      opacity 0.5s ease-in-out calc((0.025s * var(--char-index)));
  }
}

.swipeUpCharsByLine {
  .word {
    overflow: hidden;
  }
  .char {
    transform: translateY(100%) rotate(10deg);
    transition: transform 0.7s cubic-bezier(0.8, 0.5, 0.2, 1.4)
      calc((0.2s * var(--line-index)) + (0.02s * var(--line-char-index)));
  }
}

.swipeUpWordsByLine {
  .word-wrapper {
    overflow: hidden;
  }
  .word {
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4)
      calc((0.1s * var(--line-index)) + (0.05s * var(--line-word-index)));
  }
}

.swipeCharsAlternate {
  .word {
    overflow: hidden;
    span {
      transform: translateY(-100%);
      transition: transform 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4)
        calc((0.03s * var(--char-index)));
    }
    span:nth-of-type(2n) {
      transform: translateY(100%);
      transition: transform 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4)
        calc((0.03s * var(--char-index)));
    }
  }
}

.swipeCharsDown {
  .word {
    overflow: hidden;
  }
  .char {
    transform: translateY(-100%);
    transition: transform 0.7s cubic-bezier(0.8, 0.5, 0.2, 2)
      calc((0.025s * var(--char-index)));
  }
}

.onscreen {
  &.fadeInChars {
    .char {
      transform: scale(1) rotate(0);
      opacity: 1;
    }
  }
  &.swipeUpCharsByLine {
    .char {
      transform: translateY(0%) rotate(0);
    }
  }
  &.swipeUpWordsByLine {
    .word {
      transform: translateY(0%);
    }
  }
  &.swipeCharsAlternate {
    .word {
      span {
        transform: translateY(0);
      }
    }
  }
  &.swipeCharsDown {
    .char {
      transform: translateY(0%);
    }
  }
}
</style>
