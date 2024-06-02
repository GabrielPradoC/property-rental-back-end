// Libs
import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponseOptions,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// TODO: Add all response statuses
const ApiResponsesMap = {
  [HttpStatus.OK]: ApiOkResponse,
  [HttpStatus.UNAUTHORIZED]: ApiUnauthorizedResponse,
  [HttpStatus.BAD_REQUEST]: ApiBadRequestResponse,
  [HttpStatus.CREATED]: ApiCreatedResponse,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ApiInternalServerErrorResponse,
  [HttpStatus.NOT_FOUND]: ApiNotFoundResponse,
  [HttpStatus.NO_CONTENT]: ApiNoContentResponse,
};

/**
 * ApiResponses
 *
 * Returns a method decorator containing multiple swagger docs for all informed endpoint statuses
 *
 * @param responses - Object where a key is a response status and the value is the swagger doc for that response status
 * @returns Method decorator
 */
export function ApiResponses(
  responses: Partial<Record<HttpStatus, ApiResponseOptions>>,
): MethodDecorator {
  return applyDecorators(
    ...Object.keys(responses).map<MethodDecorator>((statusCode) => {
      return ApiResponsesMap[statusCode](responses[statusCode]);
    }),
  );
}
