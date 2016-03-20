# React Shortcut Chooser

This is a React component that lets the user choose a keyboard shortcut. Native Mac apps have nice input fields that, when focused, capture all keyboard events and display the chosen keyboard shortcut in a nice string format. There was no equivalent JavaScript UI component for that, so I developed this library.

It's based on the [key-event-to-string](https://github.com/florian/key-event-to-string/) library that converts an event object into a readable format.


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

```
$ npm install --save react-shortcut-chooser
```

## Usage

```js
var ShortcutChooser = require('react-shortcut-chooser')
ReactDOM.render(<ShortcutChooser onChange={callback} />, el)
```

`ShortcutChooser` accepts a bunch of options:

| key | value | default value |
|:--|:--|:--|
| `modifierNeeded` |  Are only shortcuts with modifiers valid? Modifiers are cmd, ctrl, alt and shift | `true` |
| `keyNeeded` |  Is a key, other than a modifier, needed? | `true` |
| `onChange` |  A callback that's called with the new value and the old value | None, it's required |
| `onInvalid` |  Depending on `modifierNeeded` / `keyNeeded` some keyboard shortcuts will be rejected. This callback will be called with the invalid keyboard shortcut if that happens. Could e.g. be used to display an error message | Empty function |
| `modifierChars` | Can be used to change the format according to the [key-event-to-string](https://github.com/florian/key-event-to-string#options) options. Could e.g. be used to get a Mac style | `{}`

All other properties will be passed straight to the underlying input element. This is especially useful for setting a default value and styling it:

```js
<ShortcutChooser onChange={callback} defaultValue="Ctrl + A" className="shortcutInput" />
```
