import { registerEnumType } from '@nestjs/graphql';

export enum SourceDevice {
  smartphone = 'smartphone',
  desktop = 'desktop',
}
registerEnumType(SourceDevice, {
  name: 'SourceDevice',
});
