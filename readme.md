# Moment Spans

```
npm install moment-spans --save
```

A span is a period between two dates where subsciptions take place. The subscribers between these dates are labeled within a specific span number. The initial span number starts on the month that subscriptions started. A subscriber can only be in one span.

## Arguments

* start date
* monthly interval
* date

## Example

* april 1st - april 14th span 1
* april 15th - may 14th span 2
* may 15th - june 14th span 3

## Example Arguments

* 2014-04-01
* 15
* 2014-05-16
* output: 3