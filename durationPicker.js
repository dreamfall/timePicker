// durationPicker.js
// https://github.com/dreamfall/durationPicker
// version 0.1

var $;

$ = jQuery;

$.fn.extend({
  durationPicker: function(options) {
    var settings, _durationPicker, _extractMinutes, _setValue, _timeToString;
    settings = {
      durations: ['00:00', '00:15', '00:30', '00:45', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '48:00']
    };
    settings = $.extend(settings, options);
    _setValue = function(input, option, wrapper) {
      input = $(input);
      input.val(($(option)).text());
      input.trigger('change');
      input.focus();
      return wrapper.hide();
    };
    _extractMinutes = function(value) {
      var hours, minutes;
      hours = parseInt(value.split(':')[0]);
      minutes = parseInt(value.split(':')[1]);
      if ((hours === 0 || hours) && (minutes === 0 || minutes)) {
        return hours * 60 + minutes;
      }
    };
    _timeToString = function(minutes) {
      var hoursString, minutesString;
      hoursString = Math.floor(minutes / 60);
      if (hoursString < 10) {
        hoursString = '0' + hoursString;
      }
      minutesString = minutes % 60;
      if (minutesString < 10) {
        minutesString = '0' + minutesString;
      }
      return "" + hoursString + ":" + minutesString;
    };
    _durationPicker = function(element, settings) {
      var duration, durationsInMinutes, optionsList, showPicker, wrapper, wrapperOver, _i, _len, _ref;
      wrapper = $('<div class="duration-picker"></div>');
      wrapperOver = false;
      optionsList = $('<ul></ul>');
      _ref = settings.durations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        duration = _ref[_i];
        optionsList.append("<li>" + duration + "</li>");
      }
      durationsInMinutes = settings.durations.map(function(duration) {
        return _extractMinutes(duration);
      });
      wrapper.append(optionsList);
      wrapper.appendTo('body').hide();
      ($("li", optionsList)).mouseover(function() {
        return ($(this)).addClass('selected');
      }).mouseout(function() {
        return ($(this)).removeClass('selected');
      }).click(function() {
        return _setValue(element, this, wrapper);
      });
      wrapper.mouseover(function() {
        return wrapperOver = true;
      }).mouseout(function() {
        return wrapperOver = false;
      });
      showPicker = function() {
        var closest, closestMin, closestOption, d, elementOffset, _j, _len1;
        if (wrapper.is(":visible")) {
          return false;
        }
        ($('li', wrapper)).removeClass('selected');
        elementOffset = ($(element)).offset();
        wrapper.css({
          top: elementOffset.top + element.offsetHeight,
          left: elementOffset.left
        });
        duration = element.value ? _extractMinutes(element.value) : 0;
        closest = null;
        for (_j = 0, _len1 = durationsInMinutes.length; _j < _len1; _j++) {
          d = durationsInMinutes[_j];
          if (duration < d) {
            closest = d;
            break;
          }
        }
        closestMin = durationsInMinutes[durationsInMinutes.indexOf(closest) - 1];
        wrapper.show();
        if (closestMin && (closestOption = $("li:contains(" + (_timeToString(closestMin)) + ")", wrapper)).length) {
          closestOption.addClass('selected');
          return wrapper[0].scrollTop = closestOption[0].offsetTop;
        }
      };
      ($(element)).focus(showPicker).click(showPicker);
      return ($(element)).blur(function() {
        if (!wrapperOver) {
          return wrapper.hide();
        }
      });
    };
    return this.each(function() {
      return _durationPicker(this, settings);
    });
  }
});
