var app = {};

app.init = function() {
    $("#addItem").on('click', app.addItem);
    $(document).on('click', '.delete', app.deleteItem);
};

app.addItem = function() {
    var text = $("#addToList").val();
    if ($("#addToList").val() !== "") {
        $("#todoList").append('<li class="list-group-item">' + text + ' ' +
        '<button class="btn btn-danger delete pull-right">Delete</button></li>').hide().fadeIn();
        $("#addToList").val("");
    }
};

app.deleteItem = function() {
    $(this).parent().fadeOut(function() {
      $(this).remove();
    });
};

app.init();
