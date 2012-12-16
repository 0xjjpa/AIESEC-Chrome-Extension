ko.bindingHandlers.chosen = {
    update: function(element, valueAccessor, allBindingsAccessor, viewModel)  {
        $(element).chosen();
        $(element).trigger("liszt:updated");
    }
}