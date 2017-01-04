// hide fade in affecting all
// Add local storage functionality
// Add Complete task button
// Add task due date functionality

var app = {};

app.init = function() {
    if(localStorage.todos) {
      app.todos = JSON.parse(localStorage.todos);
    } else {
      app.todos = [];
    }
    $("#addItem").on('click', app.addItem);
    $("#addToList").keypress(function(e) {
      if ((e.keyCode || e.which) == '13') {
        app.addItem();
      }
    });
    $(document).on('click', '.delete', app.deleteItem);
    app.render();
};

app.addItem = function() {
    var text = $("#addToList").val();
    if (text === "") {
      return;
    }
  	app.todos.push({ text: text });
  	app.render();
    $("#addToList").val("");
};

app.deleteItem = function() {
  var li = $(this);
  var i = li.data('index');
  app.todos.splice(i, 1);
  app.render();
};

app.render = function() {
  var todosElem = $("#todoList");
  todosElem.empty();

  app.todos.forEach(function(todo, index) {
    var li = $("<li></li>");
    li.data('index', index);
    li.addClass("list-group-item");
    li.text(todo.text);
    li.append('<button class="btn btn-danger delete pull-right">Delete</button>');
		//.hide().fadeIn();
    todosElem.append(li);
  });

  var jsonTodos = JSON.stringify(app.todos);
  localStorage.todos = jsonTodos;
};

app.init();
