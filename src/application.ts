import * as path from 'path';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {TypeORMBootMixin} from 'loopback-4-typeorm';

import {RestSequence} from './sequence';
import {ormconfig} from './configuration';
import {RepositoryMixin} from '@loopback/repository';

export class LoopbackPlaygroundApplication extends BootMixin(
  TypeORMBootMixin(ServiceMixin(RepositoryMixin(RestApplication))),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(RestSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../../public'));

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      typeorm: {
        /**
         * Pass ormconfig here.
         */
        ormconfig,
        /**
         * Show models directory to typeorm boot mixin.
         */
        modelsDir: 'src/models',
      },
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
