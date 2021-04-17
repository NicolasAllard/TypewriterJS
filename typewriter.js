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
var TypeWriter = /** @class */ (function () {
    /**
     * @param target: string - Selector for the target in which the necessary elements will be added
     * @param text: string - Text for the typewriter to write
     * @param delay: int - Time, in milliseconds, inbetween each keystroke
     * @param classname: string - Optional classname to be added to the generated wrapper
     * @param showCursor: boolean - Whether or not the typying cursor will be shown
     * @param typeEvent: function - Function called on each keystroke
     * @param callback: function - Function called after finishing typing the text
     */
    function TypeWriter(target, text, delay, classname, showCursor, typeEvent, callback) {
        if (showCursor === void 0) { showCursor = true; }
        this.target = target;
        this.text = text;
        this.delay = delay;
        this.classname = classname;
        this.showCursor = showCursor;
        this.typeEvent = typeEvent;
        this.callback = callback;
        this.currentIndex = 0;
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
    TypeWriter.prototype.setTarget = function (selector) {
        if (document.querySelector(this.target) != undefined) {
            this.target = selector;
            this.wrapper = document.querySelector(this.target);
            this.wrapper.className = "tw-wrapper " + this.classname;
            var textBlock = document.createElement("div");
            textBlock.className = "tw-text";
            var cursor = document.createElement("div");
            cursor.className = "tw-cursor";
            this.wrapper.appendChild(textBlock);
            this.wrapper.appendChild(cursor);
        }
        else {
            throw Error("The target element could not be found.");
        }
    };
    /**
     * Set text for the typewritter to write
     * @param text: string from which the typewriter will get each characters to type.
     */
    TypeWriter.prototype.setText = function (str) {
        this.text = str;
    };
    /**
     * Set delay between each characters.
     * @param milliseconds: integer representing the amount of milliseconds to wait before typing each character.
     */
    TypeWriter.prototype.setDelay = function (milliseconds) {
        this.delay = milliseconds;
    };
    /**
     * Set classname
     * @param classname: class name to be added to the text wrapper
     */
    TypeWriter.prototype.setClass = function (classname) {
        this.classname = classname;
    };
    /**
     * Set showCursor
     * @param bool: set the cursor as visible (true) or hidden (false)
     */
    TypeWriter.prototype.setShowCursour = function (bool) {
        this.showCursor = bool;
    };
    /**
     * Set type event method
     * @param typeEvent: function that get called on each keypress
     */
    TypeWriter.prototype.setTypeEvent = function (func) {
        this.typeEvent = func;
    };
    /**
     * Set callback method
     * @param func: callback function to run when typewriter finishes writting.
     */
    TypeWriter.prototype.setCallback = function (func) {
        this.callback = func;
    };
    //Get text that was set for the typewriter
    TypeWriter.prototype.getText = function () {
        return this.text;
    };
    //Start the typewriter
    TypeWriter.prototype.start = function () {
        if (this.isTyping() == false) {
            if (this.wrapper != undefined) {
                var cursor = this.wrapper.querySelector(".tw-cursor");
                cursor.classList.toggle("visible", this.showCursor);
            }
            this.type(this.currentIndex);
        }
        else {
            throw Error("The typewriter is already typing.");
        }
    };
    //Stop the typewriter
    TypeWriter.prototype.stop = function () {
        if (this.wrapper != undefined) {
            var cursor = this.wrapper.querySelector(".tw-cursor");
            cursor.classList.toggle("visible", false);
        }
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    //Reset the typewriter;
    TypeWriter.prototype.reset = function () {
        this.stop();
        this.currentIndex = 0;
        //Reset text
        if (this.wrapper != undefined) {
            var paper = this.wrapper.querySelector(".tw-text");
            paper.textContent = "";
        }
    };
    //Returns true or false depending on if the typewritter is typing.
    TypeWriter.prototype.isTyping = function () {
        if (this.timeout == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     *
     * @param index: Index of the character in the set text to type.
     */
    TypeWriter.prototype.type = function (index) {
        var _this = this;
        if (index <= this.getText().length - 1) {
            this.timeout = setTimeout(function () { return _this.addCharacter(index); }, this.delay);
        }
        else {
            if (this.callback != undefined) {
                this.stop();
                this.callback();
            }
        }
    };
    /**
     *
     * @param index: Index of the character in the set text to type.
     */
    TypeWriter.prototype.addCharacter = function (index) {
        //Reset text
        if (this.wrapper != undefined) {
            var paper = this.wrapper.querySelector(".tw-text");
            paper.textContent += (this.getText()[index] == " " ? " " : this.getText()[index]);
        }
        this.typeEvent();
        this.currentIndex += 1;
        this.type(this.currentIndex);
    };
    return TypeWriter;
}());
