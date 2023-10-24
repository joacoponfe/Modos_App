// Enable SimpleKeyboard
let selectedInput;

const Keyboard = window.SimpleKeyboard.default;
const KeyboardLayouts = window.SimpleKeyboardLayouts.default;

const keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  inputName: "initials_input",
//   tabCharOnTab: false,
//   useTouchEvents: true,
//   autoUseTouchEvents: true,
  display: {
    '{bksp}': 'BORRAR',
    '{enter}': '< Enter',
    '{tab}': 'Tab',
    '{shift}': '^',
    '{lock}': 'Bloq Mayús',	
  },
  physicalKeyboardHighlight: true,
//   physicalKeyboardHighlightPress: true,
  maxLength: {
    'initials_input': 3,
    'DNI_input': 4,
  },
  // Use an expression for a specific input, in case you are using the "inputName" option
  inputPattern: {
    'initials_input': /^[a-zA-Z]+$/,
    'DNI_input': /^\d+$/,
  },
  layout: {
    'default': [
        '1 2 3 4 5 6 7 8 9 0 {bksp}',
        'Q W E R T Y U I O P',
        ' A S D F G H J K L Ñ ',
        '  Z X C V B N M  ',
      ],
  }
})

document.querySelectorAll(".input").forEach(input => {
    input.addEventListener("focus", onInputFocus);
    input.addEventListener("input", onInputChange);
})

function onInputFocus(event) {
    selectedInput = `#${event.target.id}`;
  
    keyboard.setOptions({
      inputName: event.target.id
    });
}

function onInputChange(event) {
    keyboard.setInput(event.target.value, event.target.id);
}

function onChange(input) {
    console.log("Input changed", input);
    document.querySelector(selectedInput || ".input").value = input;
    // // Set character limit at three
    // if (document.querySelector(selectedInput || ".input").value.length > 3) {
    //     document.querySelector(selectedInput || ".input").value = document.querySelector(selectedInput || ".input").value.slice(0,3);
    // }

}

function onKeyPress(button) {
    console.log("Button pressed", button);
  
    /**
     * Shift functionality
     */
    if (button === "{lock}" || button === "{shift}") handleShiftButton();
}

function handleShiftButton() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";
  
    keyboard.setOptions({
      layoutName: shiftToggle
    });
}

// End SimpleKeyboard