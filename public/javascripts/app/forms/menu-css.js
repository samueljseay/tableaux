var React = require('react'),
    ReactDOM = require('react-dom'),
    CodeMirror = require('codemirror'),
    cssMode = require('codemirror/mode/css/css');

require('../../../stylesheets/codemirror.css');

var MenuCSSForm = React.createClass({
  getInitialState: function() {
    return {
      css: this.props.css || ''
    };
  },

  changeCSS: function(e) {
    this.setState({css: e.target.value});
  },

  render: function() {
    return <form method="post" action={"/menu/" + this.props.action}>
      <fieldset>
        <input type="hidden" name="menu[_id]" value={this.props.id} readOnly/>

        <label htmlFor="menu[css]">Custom CSS:</label>
        <textarea id="css-code" name="menu[css]" value={this.state.css} >
        </textarea>
      </fieldset>

      <input type="submit" value="Save CSS" />
    </form>;
  },

  componentDidMount: function() {
    CodeMirror.fromTextArea(document.getElementById('css-code'), {
      mode: "css",
      lineNumbers: true,
      theme: "midnight"
    });
  }
});

module.exports = MenuCSSForm;
