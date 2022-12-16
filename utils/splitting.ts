export class SplitText {
  el: HTMLElement;
  options: {
    type: string;
    wordClass: string;
    wordWrapperClass: string;
    charClass: string;
    wordGap: string;
    wordDelimiter: string;
    tag: string;
    doubleWrap: boolean;
  };
  innerEl: HTMLSpanElement;
  textContent: string;
  lineIndex: undefined | number;
  lineTop: undefined | number;
  characterIndex: number;
  wordIndex: number;
  splitType: string[];
  chars: HTMLElement[][];
  words: HTMLElement[];
  lines: {
    words: HTMLElement[];
    chars: HTMLElement[];
  }[];

  constructor(el, options) {
    this.el = el;
    this.options = {
      type: "word",
      wordClass: "word",
      wordWrapperClass: "word-wrapper",
      charClass: "char",
      wordGap: "12px",
      wordDelimiter: " ",
      tag: "span",
      doubleWrap: false,
      ...options,
    };
    this.splitType = ["word"];
    this.innerEl;
    this.textContent = "";
    this.lineIndex;
    this.lineTop;
    this.characterIndex = 0;
    this.wordIndex = 0;

    this.chars = [];
    this.words = [];
    this.lines = [];

    if (!this.el || this.options.type === "none") return;

    this.splitText();
  }

  splitText() {
    // Get split types
    this.getSplitType();
    // If options.type is equal to char, splitByChar. Else splitbyWord
    if (this.splitType.includes("char")) {
      this.splitByChar();
    } else if (this.splitType.includes("word")) {
      this.splitByWord();
    }
  }

  private getSplitType() {
    // Split options.type by ,
    this.splitType = this.options.type.split(",");
  }

  private splitByWord() {
    // Get text content from element
    this.textContent = this.el.textContent;
    // Remove text content from element
    this.el.textContent = "";

    // Create inner text element to hold split words
    this.createInnerTextEl();

    // Split text content by word delimiter and trim whitespace from start and end
    const splitText = this.textContent.split(this.options.wordDelimiter);
    this.trimWhitespace(splitText);

    // Loop through splitText array
    splitText.forEach((word, index) => {
      // Create span for word
      const node = this.createSpan(word, index, "word", this.options.wordClass);

      if (this.options.doubleWrap) {
        // Create wrapper span
        const wrapperNode = this.createWrapperSpan(
          this.options.wordWrapperClass
        );
        // Append word span to wrapper span
        wrapperNode.append(node);
        // Append new span to inner text element
        this.innerEl.append(wrapperNode);
      } else {
        // Append new span to inner text element
        this.innerEl.append(node);
      }
    });

    this.setIndexes();
  }

  private splitByChar() {
    // Get text content from element
    this.textContent = this.el.textContent;
    // Remove text content from element
    this.el.textContent = "";

    // Create inner text element to hold split words
    this.createInnerTextEl();

    // Split text content by word delimiter and trim whitespace from start and end
    const splitText = this.textContent.split(this.options.wordDelimiter);
    this.trimWhitespace(splitText);

    // Loop through splitText array
    splitText.forEach((word, index) => {
      // Create empty span for word
      const wordNode = this.createSpan(
        null,
        index,
        "word",
        this.options.wordClass
      );
      this.chars.push([]);

      // Split word by character
      const splitWord = word.split("");
      this.trimWhitespace(splitWord);

      // Loop through split word array
      splitWord.forEach((char, index) => {
        // Create span for character
        const charNode = this.createSpan(
          char,
          this.wordIndex,
          "char",
          this.options.charClass
        );

        // Append character span to word span
        wordNode.append(charNode);
      });
      // Append word span to inner text element
      this.innerEl.append(wordNode);

      this.wordIndex++;
    });

    // Append inner text element to main element
    this.el.append(this.innerEl);

    this.setIndexes();
  }

  private createInnerTextEl() {
    // Create span for inner text element
    this.innerEl = document.createElement(this.options.tag);

    // Create styles object for inner text element
    const innerElStyles = {
      display: "flex",
      flexWrap: "wrap",
      gap: `0px ${this.options.wordGap}`,
    };

    // Assign styles to inner text element
    Object.assign(this.innerEl.style, innerElStyles);
    // Append inner text element to main element
    this.el.append(this.innerEl);
  }

  private trimWhitespace(text: string[]) {
    // If first item in array is an empty string, remove it
    if (text[0] === "") {
      text.shift();
    }

    // If last item in array is an empty string, remove it
    if (text[text.length - 1] === "") {
      text.pop();
    }
  }

  private createSpan(
    text: string,
    index: number,
    type: "word" | "char",
    className: string
  ): HTMLSpanElement {
    // Create span element
    const node = document.createElement(this.options.tag);
    // Set span display to inline-block
    node.style.display = "inline-block";
    // Set span textContent to text
    node.textContent = text;
    // Add classname to new span's classList
    node.classList.add(className);
    // Set index CSS variable
    // node.style.setProperty(`--${type}-index`, index.toString());

    // Add element to word or chars array
    if (type === "word") {
      this.words.push(node);
    } else if (type === "char") {
      this.chars[index].push(node);
    }
    return node;
  }

  private createWrapperSpan(className) {
    // Create span element
    const node = document.createElement(this.options.tag);
    // Set span display to inline-block
    node.style.display = "inline-block";
    // Add classname to new span's classList
    node.classList.add(className);

    return node;
  }

  setIndexes() {
    let wordIndex = 0;
    let charIndex = 0;
    let lineIndex = 0;
    let charLineIndex = 0;
    let charWordIndex = 0;
    let wordLineIndex = 0;

    let currentLineTop = 0;

    this.words.forEach((word) => {
      // Only calculate current line if split type includes line
      if (this.splitType.includes("line")) {
        // Rest character index for this word
        charWordIndex = 0;
        // Get offset top of word
        const offsetTop = word.offsetTop;
        // If offsetTop is higher than previous word, increase line index and reset character line index
        if (offsetTop > currentLineTop) {
          lineIndex++;
          charLineIndex = 0;
          wordLineIndex = 0;
        }
        // Set current line top value to equal words offset top
        currentLineTop = offsetTop;
      }

      // Only set character indexes if split type includes char
      if (this.splitType.includes("char")) {
        // Loop through current words characters
        this.chars[wordIndex].forEach((char) => {
          // Set character, character word and character line index CSS variables
          char.style.setProperty("--char-index", charIndex.toString());
          char.style.setProperty("--word-char-index", charWordIndex.toString());

          // Only set line character index if split type includes line
          if (this.splitType.includes("line")) {
            char.style.setProperty(
              "--line-char-index",
              charLineIndex.toString()
            );
          }

          // Increment character, character word and character line indexes
          charIndex++;
          charWordIndex++;
          charLineIndex++;
        });
      }

      // Set word, word line and line indexes for word
      word.style.setProperty("--word-index", wordIndex.toString());

      // Only set line word and line index if split type includes line
      if (this.splitType.includes("line")) {
        word.style.setProperty("--line-word-index", wordLineIndex.toString());
        word.style.setProperty("--line-index", lineIndex.toString());
      }

      // Increment word index
      wordIndex++;
      wordLineIndex++;
    });
  }

  revert() {
    // Set element innerHTML to be original textContent
    this.el.innerHTML = this.textContent;
  }
}
