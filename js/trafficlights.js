class Light {
  constructor(colour) {
  this.baseClass = 'light'; this.colorClass = this.baseClass + '-' + colour; this.onClass = this.baseClass + '-on'; this.offClass = this.baseClass + '-off'; this.blinkClass = this.baseClass + '-blink'; this.element = document.createElement('div')
    $(this.element).addClass(this.baseClass).addClass(this.colorClass).addClass(this.offClass)
  }
  getElement() { return this.element }
  turnOn() { $(this.element).removeClass(this.offClass).removeClass(this.blinkClass).addClass(this.onClass) }
  turnOff() { $(this.element).removeClass(this.onClass).removeClass(this.blinkClass).addClass(this.offClass) }
  blink() { $(this.element).removeClass(this.offClass).removeClass(this.onClass).addClass(this.blinkClass) }
}
class TrafficLight {
  constructor(containerElementID) { this.container = $('#' + containerElementID); $(this.container).addClass('light-container'); this.redLight = new Light('red'); this.greenLight = new Light('green'); $(this.container).append(this.redLight.getElement()); $(this.container).append(this.greenLight.getElement()) }
  red() { this.greenLight.turnOff(); this.redLight.turnOn() }
  green() { this.redLight.turnOff(); this.greenLight.turnOn() }
  blinkRed() { this.greenLight.turnOff(); this.redLight.blink() }
  blinkGreen() { this.redLight.turnOff(); this.greenLight.blink() }
}
class Pinger {
  constructor(url, timeout) { this.url = url; this.timeout = timeout || 5; this.status = null }
  ping() { return $.ajax({ url: this.url, timeout: this.timeout * 1000, context: this }) }
}
class TrafficLightWidget extends Pinger {
  constructor(containerElementID, url, timeout) { super(url, timeout); this.frequency = 10; this.trafficLight = new TrafficLight(containerElementID); this.start() }
  setLights(status) { if (status === 200) { this.trafficLight.green() } else { this.trafficLight.blinkRed() } }
  ping() { var request = super.ping(); request.done(function (rs, textStatus, xhr) { this.status = xhr.status }).fail(function () { this.status = -1 }).always(function () { this.setLights(this.status) }) }
  start() { this.ping(); if (this.frequency > 0) { this.timer = setInterval(function () { this.ping() }.bind(this), this.frequency * 1000) } }
  stop() { clearInterval(this.timer) }
}