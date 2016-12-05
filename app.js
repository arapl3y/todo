var app = {};

app.init = function() {
    $("#addItem").on('click', app.addItem);
    $(document).on('click', '.delete', app.deleteItem);
    $(document).on('click', '.done', app.finishItem);
};

app.addItem = function() {
    var text = $("#addToList").val();
    $("#todoList").append('<li><input class="done" type="checkbox">' + text + ' ' + '<button class="delete">Delete</button></li>');
    $("#addToList").val("");
};

app.deleteItem = function() {
  $(this).parent().remove();
};

app.finishItem = function() {
  if ($(this).parent().css('text-decoration') === 'line-through') {
    $(this).parent().css('text-decoration', 'none');
  } else {
  $(this).parent().css("text-decoration", "line-through");
  }
};

app.init();
