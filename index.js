var _ = require("underscore");
var moment = require("moment");

var _question_date = function(question_date) {
  if (typeof question_date == "undefined") return moment();
  return moment(question_date);
}

var _start_date = function(start_date) {
  return moment(start_date);
}

var _date_spans = function(start_date, monthly_interval, question_date) {
  start_date = _start_date(start_date);
  question_date = _question_date(question_date);
  var date_spans = [];

  date_spans.push({
    "start": moment(start_date).set('hour', 00).set('minute', 00).set('second', 00).set('millisecond', 00),
    "end": moment(start_date).add("days", monthly_interval - 2).set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 59)
  })

  for (var i = 0; i < date_spans.length; i++) {
    var date_span = date_spans[i];
    var diff = question_date.diff(date_span.end);
    if (diff > 0) {
      date_spans.push({
        "start": date_span.end.clone().add("days", 1).set('hour', 00).set('minute', 00).set('second', 00).set('millisecond', 00),
        "end": date_span.end.clone().add("month", 1).set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 59)
      });
    }
  }

  return date_spans;
};

var _format_spans = function(date_spans) {
  return _.map(date_spans, function(date_span) {
    return {
      "start": date_span.start.format(),
      "end": date_span.end.format()
    };
  });
}

var is_between = function(dates, date) {
  var isAfter = moment(date).isAfter(dates.start);
  var isSameStart = moment(date).isSame(dates.start);
  var isBefore = moment(date).isBefore(dates.end);
  var isSameEnd = moment(date).isSame(dates.end);
  return (isAfter && isBefore || isSameStart || isSameEnd);
}

module.exports = function(start_date, monthly_interval, question_date) {
  question_date = _question_date(question_date);
  start_date = _start_date(start_date);
  //if (question_date.diff(start_date) < 0) return new Error("The date provided is before the subscription start date, no batch number.");
  var date_spans = _date_spans(start_date, monthly_interval, question_date);
  var _span = 0;
  _.each(date_spans, function(date_span, span) {
    var isBetween = is_between(date_span, question_date);
    if (isBetween) _span = span + 1;
  });
  return _span;
}