// Add fade in/out effects
// Add Complete task button
// Add task due date functionality

var app = {};

app.init = function() {

    app.isDone = false;
    // If the todos array contains elements in local storage, parse them
    if (localStorage.todos) {
        app.todos = JSON.parse(localStorage.todos);
    } else {
        // Otherwise todos is an empty array
        app.todos = [];
    }
    // Invoke addItem function on click of button
    $("#addItem").on('click', app.addItem);
    // Invoke addItem function if enter is pressed while input is focused
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
    /*
    Add fade in/out effect with isNew variable:

    var todo = { text: text, isNew:true };

    */
    // Push the text value into an object in the todos array
    app.todos.push({
        text: text
    });
    // Invoke the render function
    app.render();
    // Empty the text input
    $("#addToList").val("");
};

app.doneItem = function() {
    // Move to bottom of list
    // Change background color and opacity
    var li = $(this).parent();

    if (app.isDone === false) {
        li.css("text-decoration", "line-through");
        app.isDone = true;
    } else {
        li.css("text-decoration", "none");
        app.isDone = false;
    }
};

// deleteItem function used to delete items from the to do list
app.deleteItem = function() {
    // Assign the to do list elements to a variable
    var li = $(this).parent();
    // ???
    var i = li.data('index');
    // Delete to do list item according to index
    app.todos.splice(i, 1);
    // Invoke render function
    app.render();
};

// A rendering function that displays the to do list items
app.render = function() {
    // Assign the the to do list div to a variable
    var todosElem = $("#todoList");
    // Empty the div contents
    todosElem.empty();

    // Loop through the to do array of objects
    app.todos.forEach(function(todo, index) {
        // Assign HTML list element to a variable
        var li = $("<li></li>");
        // ???
        li.data('index', index);
        // Assign the li elements the css bootstrap list class
        li.addClass("list-group-item");
        // Assign li elements with the text from the to do array of objects
        li.text(todo.text);
        // Add the delete button to the end of each li element
        li.append('<button class="btn btn-success done pull-right"><i class="fa fa-check"></i></button>');
        li.append('<button class="btn btn-danger delete pull-right"><i class="fa fa-trash"</button>');
        // Add each li element to the to do list div
        todosElem.append(li);
    });

    // Turn the to do objects into strings
    var jsonTodos = JSON.stringify(app.todos);
    // Assign the strings to a variable
    localStorage.todos = jsonTodos;
};

app.init();
