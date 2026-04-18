import { Time } from "@internationalized/date";
import { ValueMapper } from '../interfaces/valueMapper';
import { DatesService } from '@shared/interfaces/datesService';

export class TimeMapperImpl extends ValueMapper<number, Time>
{
  constructor(
    private datesService: DatesService
  )
  {
    super();
  }

  map(value: number): Time
  {
    let availableMilliseconds = value;

    const hours = Math.floor(availableMilliseconds / this.datesService.hourInMilliseconds);
    availableMilliseconds -= hours * this.datesService.hourInMilliseconds;

    const minutes = Math.floor(availableMilliseconds / this.datesService.minuteInMilliseconds);
    availableMilliseconds -= minutes * this.datesService.minuteInMilliseconds;

    const seconds = Math.floor((availableMilliseconds) / this.datesService.secondInMilliseconds);
    availableMilliseconds -= seconds * this.datesService.secondInMilliseconds;

    const time = new Time(hours, minutes, seconds, availableMilliseconds);

    return time;
  }

  mapReverse(time: Time): number
  {
    const hours   = time.hour * 60 * 60 * 1000;
    const minutes = time.minute * 60 * 1000;
    const seconds = time.second * 1000;

    const result = hours + minutes + seconds + time.millisecond;

    return result;
  }

}