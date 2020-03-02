/**
 * WHAT IS THIS?
 * This is a Manually create type files tha shold be replaced in the decorators.d.ts file in final version
 * 
 */


import { ObjectSchema } from "yup";


export declare function isYupSchema(testObject: any): boolean;

export declare function validateWithSchema(schema: any, object: any): any;


export declare const BodyValidator: (schema: (ObjectSchema<Object> | ((data: Object) => any))[]  ) => any;

export declare const QueryValidator: (schema: (ObjectSchema<Object> | ((data: Object) => any))[]  ) => any;
