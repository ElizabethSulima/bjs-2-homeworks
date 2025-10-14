class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (time === undefined || callback === undefined) {
      throw new Error("Отсутствуют обязательные аргументы");
    }

    if (this.alarmCollection.some((alarm) => alarm.time === time)) {
      console.warn("Уже присутствует звонок на это же время");
    }

    const newAlarm = {
      time,
      callback,
      canCall: true,
    };

    this.alarmCollection.push(newAlarm);
  }

  removeClock(time) {
    if (time === undefined) {
      throw new Error("Отсутствуют обязательные аргументы");
    }
    this.alarmCollection = this.alarmCollection.filter(
      (alarm) => alarm.time !== time
    );
  }

  getCurrentFormattedTime() {
    const now = new Date();
    return now.toLocaleString("ru-Ru", { hour: "2-digit", minute: "2-digit" });
    // const hours = now.getHours().toString().padStart(2, "0");
    // const minutes = now.getMinutes().toString().padStart(2, "0");
    // return `${hours}:${minutes}`;
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach((alarm) => {
        if (alarm.time === currentTime && alarm.canCall === true) {
          alarm.callback();
          alarm.canCall = false;
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach((alarm) => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}
