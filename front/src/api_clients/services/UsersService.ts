/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UserUpdate } from '../models/UserUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Create User
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static createUserApiV1UsersCreatePost(
requestBody: UserCreate,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read User Me
     * @returns User Successful Response
     * @throws ApiError
     */
    public static readUserMeApiV1UsersGetMyProfileGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/get_my_profile',
        });
    }

    /**
     * Update User Me
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static updateUserMeApiV1UsersUpdatePut(
requestBody: UserUpdate,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
