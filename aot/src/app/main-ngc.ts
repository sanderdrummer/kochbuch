import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

declare var process: any;

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
