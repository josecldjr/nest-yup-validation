import { Schema } from "yup";

/**
 * Tests if a object is a you schema.
 * Returns true if its the case.
 * @param testObject The object that will be tested
 */
export declare function isYupSchema(testObject: any): boolean;
/**
 * Validate a object with a given schema. Throws an error if the object is not valid
 * @param schema Validation schema
 * @param object Object with data
 */
export declare function validateWithSchema(schema: any, object: any): any;
/**
 * Validate/transform the body of a requisition and stores the result in a object.
 * You may use a yup schema or a function.
 */
export declare function BodyValidator(schema: Schema<any> | ((data: Object) => any)  ): ParameterDecorator;
/**
 * Validate/transform the query string parameters passed in the url of a requisition and stores the result in a object.
 * You may use a yup schema or a function.
 */
export declare function QueryValidator(schema: Schema<any> | ((data: Object) => any)  ): ParameterDecorator;
