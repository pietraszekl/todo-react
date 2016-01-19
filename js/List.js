var List = React.createClass({
  propTypes: {
    count: function(){
      if(typeof props[propName] !== "number"){
        return new Error("The count property must be anumber");
      }
      if(props[propName] > 100) {
        return new Error("Creating " + props[propName] + " notes is ridiculus");
      }
    }
  },
  getInitialState: function(){
      return {
        notes: []
      }
  },
  nextId: function(){
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
  },
  // componentWillMount: function(){
  //   var self = this;
  //   if(this.props.count) {
  //     $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
  //     this.props.count + "&start-with-lorem=1&callback=?",
  //     function(results){
  //       results[0].split('. ').forEach(function(sentence){
  //         self.add(sentence.substring(0,40));
  //       });
  //     });
  //   }
  // },
  componentWillMount: function(){
    var self = this;
    if(this.props.count) {
      $.getJSON("/api/todos.json",
      function(results){
        results.forEach(function(todo){
          self.add(todo.text);
        });
      });
    }
  },
  componentDidMount: function(){
    $( ".todo-list" ).sortable();
    $( ".todo-list" ).disableSelection();
  },
  add: function(text){
    var arr = this.state.notes;
    arr.push({
      id: this.nextId(),
      note: text
    });
    this.setState({
      notes: arr
    })
  },
  update: function(newText,i){
    var arr = this.state.notes;
    arr[i].note = newText;
    this.setState({
      notes: arr
    })
  },
  remove: function(i){
    var arr = this.state.notes;
    arr.splice(i, 1);
    this.setState({
      notes: arr
    })
  },
  done: function(){

  },
  eachNote: function(note, i){
    return (
      <Item
        key={note.it}
        index={i}
        onChange={this.update}
        onRemove={this.remove}>
        {note.note}
      </Item>
    )
  },
  render: function(){
    return (<div>
      <ul className="todo-list">
      {this.state.notes.map(this.eachNote)}
    </ul>
    <button className="btn-new-order" onClick={this.add.bind(null, "New Order")} >+ Order another Drink</button>
  </div>);
  }
});
