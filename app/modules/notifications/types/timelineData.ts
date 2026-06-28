import type { AppNotification } from '../entities/appNotification';

export type TimelineData = {
    notifications: readonly AppNotification[];
};
