class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, cb) {
    if (time === undefined || cb === undefined) {
      throw new Error("Отсутствуют обязательные аргументы");
    }

    if (this.alarmCollection.find((alarm) => alarm.time === time)) {
      console.warn("Уже присутствует звонок на это же время");
    }

    const newAlarm = {
      time: time,
      callback: cb,
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
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach((alarm) => {
        if (alarm.time === currentTime && alarm.canCall === true) {
          try {
            alarm.callback();
          } catch (e) {
            console.error("Ошибка в коллбеке будильника:", e);
          }
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
