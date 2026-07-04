import type { AppRootNotification } from '../entities/appRootNotification';

export type TimelineData = {
    notifications: readonly AppRootNotification[];
};
