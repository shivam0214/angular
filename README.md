# Demo2

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


Angular offers two primary approaches to handling forms: template-driven and reactive. They differ significantly in how they are defined, managed, and used.

1)Template-Driven Forms
- Definition: Defined primarily in the HTML template using directives like ngModel.
- Data Handling: Employs two-way data binding with ngModel to synchronize data between the template and the component.
- Logic Location: Form logic and validation are mostly handled within the template.
- Asynchronous Nature: Template-driven forms operate asynchronously.
- Simplicity: Suitable for simple forms with minimal validation requirements.
- Module: Uses FormsModule.
- Testing: Testing can be more challenging due to the asynchronous nature and reliance on the template.


2) Reactive Forms
- Definition: Defined programmatically in the component class using FormGroup and FormControl.
- Data Handling: Manages data flow synchronously using observable streams.
- Logic Location: Form logic, validation, and data manipulation are centralized in the component class.
- Synchronous Nature: Reactive forms operate synchronously.
- Scalability: Well-suited for complex and dynamic forms. Dynamic forms creation based on the inputs
Module: Uses ReactiveFormsModule.
Testing: Easier to test due to the synchronous nature and separation of concerns.
- It is having the defined Validators to define the validations for various Formcontrol elements
