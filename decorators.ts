import { BadRequestException, createParamDecorator } from '@nestjs/common';
import { Schema } from 'yup';



/**
 * Tests if a object is a you schema.
 * Returns true if its the case.
 * @param testObject The object that will be tested
 */
export function isYupSchema(testObject): boolean {
  if (!testObject)
    throw "ERR => Wrong input. Expected a array with functions or schemas for the validations";


  return Boolean(testObject.isValidSync) && Boolean(testObject.cast)
}

/**
 * Validate a object with a given schema. Throws an error if the object is not valid
 * @param schema Validation schema 
 * @param object Object with data
 */
export function validateWithSchema(schema: any, object): any {

  if (!schema.isValidSync(object))
    throw schema.validateSync(object, { abortEarly: false })

  return schema.validateSync(object)
}

/**
 * Validate/transform the body of a requisition and stores the result in a object.
 * You may use a yup schema or a function.
 */
export const BodyValidator = createParamDecorator((
  validationFunctions: Array<Schema<any> | ((body: any) => any)>,
  req,
) => {
  return validateObject(validationFunctions, req, 'body')
});

/**
 * Validate/transform the query string parameters passed in the url of a requisition and stores the result in a object.
 * You may use a yup schema or a function.
 */
export const QueryValidator = createParamDecorator((
  validationFunctions: Array<Schema<any> | ((body: any) => any)>,
  req,
) => {
  return validateObject(validationFunctions, req, 'string-query')
});

/**
 * Execute the validation with the functions/schemas that was passed * 
 */
function validateObject(validationFunctions: Array<Schema<any> | ((body: any) => any)>, req: any, validationType: 'string-query' | 'body') {
  let finalResult = { ...(validationType === 'body' ? req.body : req.query) }
  let funcList = []

  // Convert input to array
  if (Array.isArray(validationFunctions)) {
    funcList = [...validationFunctions]
  } else {
    funcList.push(validationFunctions)
  }

  try {
    // apply the validations
    funcList.forEach(validation => {
      // if the validation is a yup schema
      if (isYupSchema(validation)) {
        finalResult = validateWithSchema(validation, finalResult)

        // if the validation is a custom function
      } else {
        finalResult = validation(finalResult)

      }
    })

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = err.errors.map((message: string) => (' ' + message)).toString()

      throw new BadRequestException(errors, err)
    }
    else {
      console.error(err);
      throw err
    }


  }

  return finalResult
}


