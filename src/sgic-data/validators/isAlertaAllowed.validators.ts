import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAlertaAllowed(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAlertaAllowed',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          return object.caseTipo === 'Alerta' ? value !== undefined : true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'alertaNumber debe estar presente si caseTipo es "Alerta Alba-Keneth"';
        },
      },
    });
  };
}
