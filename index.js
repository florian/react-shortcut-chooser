var React = require('react')

var EventStringifier = require('key-event-to-string')

module.exports = React.createClass({
  displayName: 'ShortcutChooser',

  getDefaultProps: function () {
    return {
      onChange: function () {},
      onInvalid: function () {},
      modifierNeeded: true,
      keyNeeded: true,
      modifierChars: {}
    }
  },

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onInvalid: React.PropTypes.func,
    modifierNeeded: React.PropTypes.bool,
    keyNeeded: React.PropTypes.bool,
    modifierChars: React.PropTypes.object
  },

  render: function () {
    return React.createElement("input", React.__spread({type: "text"},  this.props, {onKeyDown: this.keyDown, onFocus: this.select, onChange: this.noop}))
  },

  keyDown: function (e) {
    var event2string = EventStringifier(this.props.modifierChars)
    var eventDetails = EventStringifier.details

    var oldValue = e.target.value
    var newValue = event2string(e)
    var details = eventDetails(e)

    var isValid = (!this.props.keyNeeded || details.hasKey) && (!this.props.modifierNeeded || details.hasModifier)

    if (isValid) {
      e.target.value = newValue
      if (newValue !== oldValue) this.props.onChange(newValue, oldValue)
    } else {
      this.props.onInvalid(newValue)
    }

    this.select(e)

    e.preventDefault()
    e.stopPropagation()
  },

  select: function (e) {
    e.target.select()
  },

  noop: function () {}
})
