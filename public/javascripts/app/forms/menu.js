var React = require('react'),
    ReactDOM = require('react-dom');

var MenuForm = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name || '',
      sections: this.props.sections || []
    };
  },

  changeName: function(e) {
    this.setState({name: e.target.value});
  },

  render: function() {
    return <form method="post" action="/menu/create">
      <fieldset>
        <label htmlFor="menu[name]">Menu Name:</label>
        <input type="text" name="menu[name]" value={this.state.name} onChange={this.changeName} />
        {this.state.sections.map(this.renderSection)}
        <div>
          <a href="#" onClick={this.addSection}>Add a section</a>
        </div>
      </fieldset>

      <input type="submit" value="Submit" />
    </form>;
  },

  addSection: function() {
    this.state.sections.push({ name: 'test section' });
    this.setState({ sections: this.state.sections });
  },

  renderSection: function(section, index) {
    return <MenuForm.Section index={index} name={section.name} items={section.items} key={index}/>;
  }
});

MenuForm.Section = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name || '',
      items: this.props.items || [{
        name: '',
        description: '',
        price: ''
      }]
    };
  },

  changeName: function(e) {
    this.setState({ name: e.target.value });
  },

  renderSectionItem: function(item, index, sectionIndex) {
    return <MenuForm.SectionItem key={index} item={item} index={index} sectionIndex={sectionIndex} />;
  },

  addItem: function() {
    var items = this.state.items.slice(0);

    items.push({ name: '', description: '', price: '' });

    this.setState({ items: items });
  },

  render: function() {
    return <fieldset>
      <label htmlFor={"menu[sections][" + this.props.index +"][name]"}>Section Name (e.g. Entrees):</label>
      <input type="text" name={"menu[sections][" + this.props.index +"][name]"} value={this.state.name} onChange={this.changeName}/>
      <p>Items</p>
      <a href="#" onClick={this.addItem} >Add menu item</a>
      {
        this.state.items.map(function(it, i) {
          return this.renderSectionItem(it, i, this.props.index);
        }, this)
      }
    </fieldset>;
  }
});

MenuForm.SectionItem = React.createClass({
  getInitialState: function() {
    var item = this.props.item || {};

    return {
      item: {
        name: item.name || '',
        description: item.description || '',
        price: item.price || ''
      }
    };
  },

  changeName: function(e) {
    var item = this.state.item;
    this.setState({ item: { name: e.target.value, description: item.description, price: item.price } });
  },

  changeDesc: function(e) {
    var item = this.state.item;
    this.setState({ item: { description: e.target.value, name: item.name, price: item.price } });
  },

  changePrice: function(e) {
    var item = this.state.item;
    this.setState({ item: { price: e.target.value , name: item.name, description: item.description } });
  },

  render: function() {
    return <fieldset>
      <label htmlFor={"menu[sections][" + this.props.sectionIndex + "][items][" + this.props.index + "][name]"}>Item name:</label>
      <input type="text" onChange={this.changeName} value={this.state.item.name} name={"menu[sections][" + this.props.sectionIndex + "][items][" + this.props.index + "][name]"} />

      <label htmlFor={"menu[sections][" + this.props.sectionIndex + "][items][" + this.props.index + "][description]"} >Item description:</label>
      <input type="text" onChange={this.changeDesc} value={this.state.item.description} name={"menu[sections][" + this.props.sectionIndex + "][items][" + this.props.index + "][description]"} />

      <label htmlFor={"menu[sections][" + this.props.sectionIndex + "][items][" + this.props.index + "][price]"} >Item price:</label>
      <input type="text" onChange={this.changePrice} value={this.state.item.price} name={"menu[sections][" + this.props.sectionIndex + "][items][" + this.props.index + "][price]"} />
    </fieldset>;
  }
});

module.exports = MenuForm;
