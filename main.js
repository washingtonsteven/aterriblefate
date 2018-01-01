var numberStrings = {
  1:"first",
  2:"second",
  3:"third",
  4:"fourth",
  5:"fifth",
  6:"sixth",
  7:"seventh",
  8:"eighth",
  9:"ninth",
  10:"tenth",
  11:"eleventh",
  12:"twelveth",
  13:"thirteenth",
  14:"fourteenth",
  15:"fifteenth",
  16:"sixteenth",
  17:"seventeenth",
  18:"eighteenth",
  19:"nineteenth",
  20:["twenty", "twentieth"],
  30:["thirty", "thirtieth"],
  40:["fourty", "fourtieth"],
  50:["fifty", "fiftieth"],
  60:["sixty", "sixtieth"],
  70:["seventy", "seventieth"],
  80:["eighty", "eightieth"],
  90:["ninety", "ninetieth"],
  100:["one-hundred", "one-hundredth"],
  200:["two-hundred", "two-hundredth"],
  300:["three-hundred", "three-hundreth"]
};

var timeOfDayStrings = {
  morning:"Dawn of",
  afternoon:"Afternoon of",
  night:"Night of"
}

var ATF = function(elems) {
  this.date = new Date();
  var days = this.daysOfYear();
  var timeOfDay = this.timeOfDay();

  if (elems.timeOfDayElem) {
    elems.timeOfDayElem.innerHTML = timeOfDayStrings[timeOfDay] || "";
  }

  if (elems.daysElapsedElem) {
    elems.daysElapsedElem.innerHTML = "The "+days.daysElapsedString+" Day";
  }

  if (elems.daysRemainingElem) {
    if (timeOfDay === "morning") days.daysRemaining += 1;
    if (days.daysRemaining === 1)
      elems.daysRemainingElem.innerHTML = "- "+days.daysRemaining+" day remains -";
    else 
      elems.daysRemainingElem.innerHTML = "- "+days.daysRemaining+" days remain -";
  }
}

ATF.prototype.daysOfYear = function() {
  var start = new Date(this.date.getFullYear(), 0, 1);
  var end = new Date(this.date.getFullYear() + 1, 0, 1)
  var diffElapsed = this.date - start;
  var diffRemaining = end - this.date;

  console.log(end);

  var dayMult = 1 / (1000 * 60 * 60 * 24);
  var daysElapsed = Math.ceil(diffElapsed * dayMult);
  var daysRemaining = Math.floor(diffRemaining * dayMult);

  return {
    daysElapsed: daysElapsed,
    daysElapsedString: this.numberToText(daysElapsed).replace(/^[a-z]/, function(s) { return s.toUpperCase(); }),
    daysRemaining: daysRemaining
  }
}

ATF.prototype.timeOfDay = function() {
  var h = this.date.getHours();
  if (h < 12) {
    return "morning";
  }
  if (h < 18) {
    return "afternoon";
  }
  return "night";
}

ATF.prototype.numberToText = function(n) {
  var h = Math.floor(n / 100);
  var t = Math.floor(n % 100);
  var o = Math.floor(n % 10);

  var s = [];

  // Hundreds
  if (h > 0) {
    if (t == 0 && o == 0) {
      s[0] = numberStrings[h * 100][1] + " ";
    } else {
      s[0] = numberStrings[h * 100][0] + " ";
    }
  } else {
    s[0] = "";
  }

  //tens and ones
  if (t < 20) {
    s[1] = numberStrings[t];
  } else {
    t = Math.floor(t / 10);

    if (o == 0) {
      s[1] = numberStrings[t * 10][1]
    } else {
      s[1] = numberStrings[t * 10][0] + "-";
      s[2] = numberStrings[o];
    }
  }

  console.log(s);
  console.log("\t"+h+" "+t+" "+o+" "+n);

  return s.join("");
}

window.onload = function() {
  var atf = new ATF({
    timeOfDayElem:document.getElementById('time-of-day'),
    daysElapsedElem:document.getElementById('days-elapsed'),
    daysRemainingElem:document.getElementById('days-remaining')
  });
}