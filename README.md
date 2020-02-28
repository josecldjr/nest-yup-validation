# Yup Validation for next

## Introduction
##### The problem
Nest js is an awesome ndoejs framework for building scalable aplications with clean and reusable code ( my favorite). However it has some problems with its current 
validation system. While it can be easy to use an intuitive for some people, for other it can be frustrating o limiting. The actual validation system is really good
( im my opinion ), but nestjs lack of alternatives for requisition validation.

##### The idea
Yup is a schema builder for validating and parsing objects. Its simple, lightweight and easy to use. Even that it may not be so powerfull as class-validator, it may be helpfull in some cases, making easy and fast to validate query string and body objects from requisitions.

##### The purpose
 Ofer an alternative to class-validator with a package to integrate NestJS and Yup, wich may not be as powerfull as the current validation system but can it can be really handfull and simple to use. Also offer some manual validation option, with in some cases may be usefull.
 
## How to use
##### Installation
 In you project directory
```sh
$ npm install nestjs-yup-validator --save
```
##### Creating a validation
######  With schema:
 
 
 
```
    // Creating  a yup schema
    export const SaveUserValidation  = yup.object({
        username: yup.string().required().min(3).max(15),
        mail: yup.string().required().email(),
        password: yup.string().required().min(8).max(16),
        age: yup.number().min(1)
    })
```
Optional DTO usage (for typescript)
```
    // request dto
    export class SaveUserReqDTO {
        username: string
        mail: string
        password: string
        age: number
    }
    
    // validation schema
    export const SaveUserValidation  = yup.object<SaveUserReqDTO>({
        username: yup.string().required().min(3).max(15),
        mail: yup.string().required().email(),
        password: yup.string().required().min(8).max(16),
        age: yup.number().min(1)
    })
```
######  With custom function:
```
    export function SaveUserValidation(body) {
        validateUserObject(body)
        const validatedUserObject = transformUserObject()
        
        // the returned value will be passed to the object
        return {
            requestTime: new Date().toString(),
            ...validatedUserObject
        }
    }
```
#### Validating
##### Applying on body requests

You may apply the validation using a Decorator on the controller. Use BodyValidator (for post, put, fetch and delete) or QueryValidator (for get) with the schema, a function or even both of them.

See the example bellow:

```
      @Post('post')
      createPost(@BodyValidator([SavePostValidation]) body: SaveUserReqDTO) {
        const newPost  = this.postService.save(body)
      
        return newPost
      }
      
      @Get('querystring-validation') 
      queryValidation(@QueryValidator([ListThisValidation]) listFilter: ListThigsDTO) {
        return this.thisgsService.find(listFilter)
      }
      
      @Post('some-complex-request-validation') 
      someComplexValidation(@QueryValidator([ValidationSchema, validationFunction, anotheValidationFunction]) listFilter: ListThigsDTO) {
        return this.thisgsService.find(listFilter)
      }
```
#### Notes
- This package only add a easy way to integrate yup validation with NestJS validation. All the validation and hard work is made by Yup lib.
- The aim of this package its not to replace body-validator. You may still use body-validator and Nest-Yup-Validation in the same aplication.


#### Information
- Check Yup documentation for more info about validation (https://github.com/jquense/yup)
- Check NestJS documentation about Custom route decorators (https://docs.nestjs.com/custom-decorators)

License
----
MIT