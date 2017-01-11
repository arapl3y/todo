// Add better complete item functionality
// Add fade in/out effects
// Add task due date functionality

var app = {};

app.init = function() {

  // If the todos array contains elements in local storage,
  // parse them
  if (localStorage.todos) {
    app.todos = JSON.parse(localStorage.todos);
  } else {
    // Otherwise todos is an empty array
    app.todos = [];
  }

  // Invoke addItem function on click of button
  $("#addItem").on('click', app.addItem);

  // Invoke addItem function if enter is pressed while input is
  // focused
  $("#addToList").keypress(function(e) {
    if ((e.keyCode || e.which) == '13') {
      app.addItem();
    }
  });

  // Invoke the doneItem function if done button is clicked
  $(document).on('click', '.done', app.doneItem);

  // Invoke deleteItem function if delete button is clicked
  $(document).on('click', '.delete', app.deleteItem);

  // Invoke render function
  app.render();
};

// addItem function used to add text value within input to to do list
app.addItem = function() {

	// Assign text value of input to a variable
  var text = $("#addToList").val();

	// If the text input is empty end the function
  if (text === "") {
    return;
  }

  // Create new todo object
  var newTodo = {
    text: text,
    isDone: false,
  };

  // Push the newTodo object into the todos array
  app.todos.push(newTodo);

  // Invoke the render function
  app.render();

	// Empty the text input
  $("#addToList").val("");
};

// doneItem function used to indicate when a task has been completed
app.doneItem = function() {

  // Move to bottom of list
  // Change background color and opacity
  var li = $(this).parent();

	// Give each todo li element a variable as a way to access the data
  var todo = li.data('todo');

 	if (todo.isDone) {
		todo.isDone = false;
	} else {
		todo.isDone = true;
	}

	// Invoke the render function
  app.render();
};

// deleteItem function used to delete items from the to do list
app.deleteItem = function() {

  // Assign the to do list elements to a variable
  var li = $(this).parent();

  // Gives each to do element access to the appropriate object
  var todo = li.data('todo');

  // Assigns the index number of each to do element to a variable
  var index = app.todos.indexOf(todo);

  // Delete to do list item according to index
  app.todos.splice(index, 1);

  // Invoke render function
  app.render();
};

// A rendering function that displays the to do list items
app.render = function() {

  // Assign the the to do list div to a variable
  var todoList = $("#todoList");

  // Empty the div contents
  todoList.empty();


  // Loop through the to do array of objects with for loop
  for (var i = 0; i < app.todos.length; i++) {
    // Assign each individual object within the array to a variable
    var todo = app.todos[i];

    // Assign HTML list element to a variable
    var li = $("<li></li>");

    // Setting index from array to variable
    li.data('todo', todo);

    // If the isDone variable is set to true, apply CSS rules
    if (todo.isDone) {
      li.css('text-decoration', 'line-through');
    } else {
      li.css('text-decoration', 'none');
    }


    // Assign the li elements the css bootstrap list class
    li.addClass("list-group-item");

    // Assign li elements with the text from the to do array of objects
    li.text(todo.text);

    // Add the delete button to the end of each li element
    li.append('<button class="btn btn-success done pull-right"><i class="fa fa-check"></i></button>');
    li.append('<button class="btn btn-danger delete pull-right"><i class="fa fa-trash"</button>');

    // Add each li element to the to do list div
    todoList.append(li);


    // Turn the to do objects into strings
    var jsonTodos = JSON.stringify(app.todos);

    // Assign the strings to a variable
    localStorage.todos = jsonTodos;
  }
};

// Initialise program
app.init();
