place = function () {
    var offset = (component || element).offset(),
        vertical = options.widgetPositioning.vertical,
        horizontal = options.widgetPositioning.horizontal,
        parent,
        position;

    if (options.widgetParent) {
        parent = options.widgetParent.append(widget);
    } else if (element.is('input')) {
        parent = element.after(widget).parent();
    } else if (options.inline) {
        parent = element.append(widget);
        return;
    } else {
        parent = element;
        element.children().first().after(widget);
    }

    // Top and bottom logic
    if (vertical === 'auto') {
        if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() &&
            widget.height() + element.outerHeight() < offset.top) {
            vertical = 'top';
        } else {
            vertical = 'bottom';
        }
    }

    // Left and right logic
    if (horizontal === 'auto') {
        if (element.width() < offset.left + widget.outerWidth() / 2 &&
            offset.left + widget.outerWidth() > $(window).width()) {
            horizontal = 'right';
        } else {
            horizontal = 'left';
        }
    }

    if (vertical === 'top') {
        widget.addClass('top').removeClass('bottom');
    } else {
        widget.addClass('bottom').removeClass('top');
    }

    if (horizontal === 'right') {
        widget.addClass('pull-right');
    } else {
        widget.removeClass('pull-right');
    }

    // find the first parent element that has a relative css positioning
    if (parent.css('position') !== 'relative') {
        parent = parent.parents().filter(function () {
            return $(this).css('position') === 'relative';
        }).first();
    }

    if (parent.length === 0) {
        throw new Error('datetimepicker component should be placed within a relative positioned container');
    }

    position = {
        left: (component || element).offset().left - $(parent).offset().left,
        top: (component || element).offset().top - $(parent).offset().top
    };

    widget.css({
        top: vertical === 'top' ? position.top - (component || element).height()/2 - widget.outerHeight() : position.top + (component || element).outerHeight(),
        left: horizontal === 'left' ? position.left : position.left + (component || element).outerWidth() - widget.outerWidth()
    });
},
