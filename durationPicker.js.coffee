# durationPicker.js
# https://github.com/dreamfall/durationPicker
# version 0.1

$ = jQuery

$.fn.extend
  durationPicker: (options) ->
    settings =
      durations: ['00:00', '00:15', '00:30', '00:45', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '48:00']

    settings = $.extend settings, options

    _setValue = (input, option, wrapper) ->
      input = ($ input)
      input.val ($ option).text()
      input.trigger 'change'
      do input.focus
      do wrapper.hide

    _extractMinutes = (value) ->
      hours = parseInt(value.split(':')[0])
      minutes = parseInt(value.split(':')[1])

      if (hours == 0 || hours) && (minutes == 0 || minutes) # rejects undefined, NaN, null, etc.
        hours * 60 + minutes

    _timeToString = (minutes) ->
      hoursString = Math.floor(minutes/60)
      hoursString = '0' + hoursString if hoursString < 10
      minutesString = minutes % 60
      minutesString = '0' + minutesString if minutesString < 10

      "#{hoursString}:#{minutesString}"

    _durationPicker = (element, settings) ->
      wrapper = ($ '<div class="duration-picker"></div>')
      wrapperOver = false
      optionsList = ($ '<ul></ul>')

      for duration in settings.durations
        optionsList.append("<li>#{duration}</li>")

      durationsInMinutes = settings.durations.map (duration) ->
        _extractMinutes duration


      wrapper.append optionsList
      wrapper.appendTo('body').hide();

      ($ "li", optionsList).mouseover( ->
        ($ @).addClass 'selected'
      ).mouseout( ->
        ($ @).removeClass 'selected'
      ).click( ->
        _setValue(element, @, wrapper)
      )

      wrapper.mouseover(->
        wrapperOver = true
      ).mouseout(->
        wrapperOver = false
      )

      showPicker = ->
        if wrapper.is(":visible")
           return false

        ($ 'li', wrapper).removeClass('selected')

        elementOffset = ($ element).offset()
        wrapper.css(top: elementOffset.top + element.offsetHeight, left: elementOffset.left)

        duration = if element.value then _extractMinutes(element.value) else 0

        closest = null

        for d in durationInMinutes
          if duration < d
            closest = d
            break

        closestMin = durationsInMinutes[durationsInMinutes.indexOf(closest) - 1]

        do wrapper.show

        if closestMin && (closestOption = ($ "li:contains(#{_timeToString(closestMin)})", wrapper)).length
          closestOption.addClass 'selected'
          wrapper[0].scrollTop = closestOption[0].offsetTop

      ($ element).focus(showPicker).click(showPicker)

      ($ element).blur ->
        if !wrapperOver
          do wrapper.hide


    @each ->
      _durationPicker(@, settings)
