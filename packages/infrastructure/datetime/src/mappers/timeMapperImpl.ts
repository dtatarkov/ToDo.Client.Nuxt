import { Time } from "@internationalized/date";
import { hourInMilliseconds, minuteInMilliseconds, secondInMilliseconds } from '../constants/dateConstants';
import { TimeMapper } from './timeMapper';

export class TimeMapperImpl extends TimeMapper
{
  map(value: number): Time
  {
    let availableMilliseconds = value;

    const hours = Math.floor(availableMilliseconds / hourInMilliseconds);
    availableMilliseconds -= hours * hourInMilliseconds;

    const minutes = Math.floor(availableMilliseconds / minuteInMilliseconds);
    availableMilliseconds -= minutes * minuteInMilliseconds;

    const seconds = Math.floor((availableMilliseconds) / secondInMilliseconds);
    availableMilliseconds -= seconds * secondInMilliseconds;

    const time = new Time(hours, minutes, seconds, availableMilliseconds);

    return time;
  }

  mapReverse(time: Time): number
  {
    const hours = time.hour * 60 * 60 * 1000;
    const minutes = time.minute * 60 * 1000;
    const seconds = time.second * 1000;

    const result = hours + minutes + seconds + time.millisecond;

    return result;
  }

}