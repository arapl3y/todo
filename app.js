var app = {};

app.init = function() {
    $("#addItem").on('click', app.addItem);
    $(document).on('click', '.delete', app.deleteItem);
    $(document).on('click', '.done', app.finishItem);
};

app.addItem = function() {
    if ($("#addToList").val() !== "") {
        var text = $("#addToList").val();
        $("#todoList").append('<li class="list-group-item">' + text + ' ' + '<button class="btn btn-danger delete pull-right">Delete</button></li>');
        $("#addToList").val("");
    }
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
