/**
 * @name TypewritterJS
 * @author Nicolas Allard
 * @version 1.0
 * @license MIT
 
 * Copyright (c) 2021 Nicolas Allard
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class TypeWriter {
    timeout: number | undefined;
    currentIndex: number = 0;
    wrapper: HTMLElement | undefined;

    /**
     * @param target: string - Selector for the target in which the necessary elements will be added
     * @param text: string - Text for the typewriter to write
     * @param delay: int - Time, in milliseconds, inbetween each keystroke
     * @param classname: string - Optional classname to be added to the generated wrapper
     * @param showCursor: boolean - Whether or not the typying cursor will be shown
     * @param typeEvent: function - Function called on each keystroke
     * @param callback: function - Function called after finishing typing the text
     */
    constructor(private target: string, private text: string, private delay: number, private classname: string, private showCursor: boolean = true, private typeEvent: () => void, private callback: () => void) {
        this.setText(text);
        this.setDelay(delay);
        this.setClass(classname);
        this.setShowCursour(showCursor);
        this.setTarget(target);
        this.setTypeEvent(typeEvent);
        this.setCallback(callback);
    }

    /**
     * Set target
     * @param selector: string representing the selector of the DOM element on which the typewriter types.
    */
    setTarget(selector: string) {

        if (document.querySelector(this.target) != undefined) {
            this.target = selector;

            this.wrapper = document.querySelector(this.target) as HTMLElement;
            this.wrapper.className = "tw-wrapper " + this.classname;

            let textBlock = document.createElement("div");
            textBlock.className = "tw-text";

            let cursor = document.createElement("div");
            cursor.className = "tw-cursor";

            this.wrapper.appendChild(textBlock);
            this.wrapper.appendChild(cursor);
        }
        else {
            throw Error("The target element could not be found.")
        }

    }

    /**
     * Set text for the typewritter to write
     * @param text: string from which the typewriter will get each characters to type.
     */
    setText(str: string) {
        this.text = str;
    }

    /**
     * Set delay between each characters.
     * @param milliseconds: integer representing the amount of milliseconds to wait before typing each character.
     */
    setDelay(milliseconds: number) {
        this.delay = milliseconds;
    }

    /**
     * Set classname
     * @param classname: class name to be added to the text wrapper
     */
    setClass(classname: string) {
        this.classname = classname;
    }

    /**
     * Set showCursor
     * @param bool: set the cursor as visible (true) or hidden (false)
     */
    setShowCursour(bool: boolean) {
        this.showCursor = bool;
    }

    /**
     * Set type event method
     * @param typeEvent: function that get called on each keypress
     */
    setTypeEvent(func: () => void) {
        this.typeEvent = func;
    }

    /**
     * Set callback method
     * @param func: callback function to run when typewriter finishes writting.
     */
    setCallback(func: () => void) {
        this.callback = func;
    }

    //Get text that was set for the typewriter
    getText(): string {
        return this.text;
    }

    //Start the typewriter
    start() {

        if (this.isTyping() == false) {

            if (this.wrapper != undefined) {
                let cursor: HTMLElement = this.wrapper.querySelector(".tw-cursor") as HTMLElement;
                cursor.classList.toggle("visible", this.showCursor);
            }

            this.type(this.currentIndex);
        }
        else {
            throw Error("The typewriter is already typing.");
        }

    }

    //Stop the typewriter
    stop() {
        if (this.wrapper != undefined) {
            let cursor: HTMLElement = this.wrapper.querySelector(".tw-cursor") as HTMLElement;
            cursor.classList.toggle("visible", false);
        }

        clearTimeout(this.timeout);
        this.timeout = undefined;
    }

    //Reset the typewriter;
    reset() {
        this.stop();
        this.currentIndex = 0;

        //Reset text
        if (this.wrapper != undefined) {
            let paper: HTMLElement = this.wrapper.querySelector(".tw-text") as HTMLElement;
            paper.textContent = "";
        }

    }

    //Returns true or false depending on if the typewritter is typing.
    isTyping(): Boolean {
        if (this.timeout == undefined) {
            return false;
        }
        else {
            return true;
        }
    }

    private type(index: number) {
        if (index <= this.getText().length - 1) {
            this.timeout = setTimeout(() => this.addCharacter(index), this.delay)
        }
        else {
            if (this.callback != undefined) {
                this.stop();
                this.callback();
            }
        }
    }

    private addCharacter(index: number) {
        //Reset text
        if (this.wrapper != undefined) {
            let paper: HTMLElement = this.wrapper.querySelector(".tw-text") as HTMLElement;
            paper.textContent += (this.getText()[index] == " " ? " " : this.getText()[index]);
        }
        this.typeEvent();

        this.currentIndex += 1

        this.type(this.currentIndex);
    }
}