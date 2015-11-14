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
    return <form method="post" action={"/menu/update"}>
      <fieldset>
        <input type="hidden" name="menu[_id]" value={this.props.id} />

        <label htmlFor="menu[css]">Custom CSS:</label>
        <textarea id="css-code" name="menu[css]" value={this.state.css} onChange={this.changeCSS}>
        </textarea>
      </fieldset>
      <style>{this.state.css}</style>

      <input type="submit" value="Save CSS" />
    </form>;
  },

  componentDidMount: function() {
    var _this = this;

    CodeMirror.fromTextArea(document.getElementById('css-code'), {
      mode: "css",
      lineNumbers: true,
      theme: "midnight"
    }).on("change", function(doc, obj){
      _this.setState({ css: doc.getValue() });
    });
  }
});

module.exports = MenuCSSForm;
