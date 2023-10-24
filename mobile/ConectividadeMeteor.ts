import Meteor from '@meteorrn/core';
import { settings } from './imports/config/settings';

Meteor.connect(settings.METEOR_URL);

Meteor.absoluteUrl = { defaultOptions: { rootUrl: settings.METEOR_URL } };
process.env.ROOT_URL = settings.METEOR_URL;
process.env.MOBILE_ROOT_URL = settings.METEOR_URL;
process.env.MOBILE_DDP_URL = settings.METEOR_URL;
process.env.DDP_DEFAULT_CONNECTION_URL = settings.METEOR_URL;
