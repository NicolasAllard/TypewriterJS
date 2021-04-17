# TypewriterJS

![demo](https://github.com/NicolasAllard/TypewriterJS/blob/main/typewriter.gif?raw=true)
<br>
TypewriterJS is a small library made in TypeScript, that allows to create a typing animation.

### Implementation<hr>
Simply add the css file and the javascript file in the head tag of your html file, like so:<br>
`<link rel='stylesheet' src='typewriter.css'/>`<br>
`<script src='typewriter.js'></script>`

### How to use<hr>
1. Create a new instance of Typewriter like so:
`let typeWriter = new TypeWriter(target,  text,  delay,  classname,  showCursor,  typeEvent,  callback);`

|Parameter| Type | Description |
|--|--|--|
| target | String | Selector for the target in which the necessary elements will be added |
| text | String | Text for the typewriter to write |
| delay | Integer | Time, in milliseconds, inbetween each keystroke |
| classname | String | Optional classname to be added to the generated wrapper |
| showCursor | Boolean | Whether or not the typying cursor will be shown |
| typeEvent | Function | Function called on each keystroke |
| callback | Function | Function called after finishing typing the text |

### Methods<hr>
| Function | Type | Usage | Description |
|--|--|--|--|
| setTarget | void | typeWriter.setTarget(selector: string) | Set target |
| setText | void | typeWriter.setText(str: string) | Set text for the typewritter to write |
| setDelay | void | typeWriter.setDelay(milliseconds: number) | Set delay between each characters. |
| setClass | void | typeWriter.setClass(classname: string) | Set classname for the wrapper containing the text element and the cursor |
| setShowCursor | void | typeWriter.setShowCursour(bool:  boolean) | Set whether or not the typewriter should show the text cursor |
| setTypeEvent | void | typeWriter.setTypeEvent(func: () =>  void) | Set a method that will be called on each keystroke |
| setCallback | void | typeWriter.setCallback(func: () =>  void) | Set a method that will be called at the end of the text |
| getText | string | typeWriter.getText() | Get text that was set for the typewriter |
| start | void | typeWriter.start() | Start the typewriter |
| stop | void | typeWriter.stop() | Stop the typewriter |
| reset | void | typeWriter.reset() | Reset the typewriter |
| isTyping | boolean | typeWriter.isTyping() | Returns true or false depending on if the typewritter is typing. |
