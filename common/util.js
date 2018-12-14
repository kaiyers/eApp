function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
function newDate(value, type) {
  var dataTime = "";
  var data = new Date();
  data.setTime(value);
  var year = data.getFullYear();
  var month = data.getMonth() + 1;
  var day = data.getDate();
  var hour = data.getHours();
  var minute = data.getMinutes();
  var second = data.getSeconds();
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  hour = hour > 9 ? hour : '0' + hour;
  minute = minute > 9 ? minute : '0' + minute;
  second = second > 9 ? second : '0' + second;
  if (type == "YMD") {
    dataTime = year + "年" + month + "月" + day + "日";
  } else if (type == "YMDHMS") {
    dataTime = year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second;
  } else if (type == "HMS") {
    dataTime = hour + ":" + minute + ":" + second;
  } else if (type == "YM") {
    dataTime = year + "年" + month + "月";
  } else if (type == "Y-M") {
    dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  } else if (type == "MM-SS") {
    dataTime = minute + "分" + second + "秒";
  } else if (type == "Y.M.D") {
    dataTime = year + "." + month + "." + day;
  } else if (type == "HM") {
    dataTime = hour + ":" + minute;
  }
  return dataTime;//将格式化后的字符串输出到前端显示
};
module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	newDate:newDate
}
