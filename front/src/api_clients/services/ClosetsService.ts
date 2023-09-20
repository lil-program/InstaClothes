/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Closet } from '../models/Closet';
import type { ClosetCreate } from '../models/ClosetCreate';
import type { ClosetDelete } from '../models/ClosetDelete';
import type { ClosetUpdate } from '../models/ClosetUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClosetsService {

    /**
     * Create Closet
     * @param requestBody 
     * @returns Closet Successful Response
     * @throws ApiError
     */
    public static createClosetApiV1ClosetsCreatePost(
requestBody: ClosetCreate,
): CancelablePromise<Closet> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/closets/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Closets
     * @returns Closet Successful Response
     * @throws ApiError
     */
    public static readClosetsApiV1ClosetsGetMyClosetsGet(): CancelablePromise<Array<Closet>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/closets/get_my_closets',
        });
    }

    /**
     * Update Closet
     * @param closetId
     * @param requestBody
     * @returns Closet Successful Response
     * @throws ApiError
     */
    public static updateClosetApiV1ClosetsUpdateClosetIdPut(
closetId: string,
requestBody: ClosetUpdate,
): CancelablePromise<Closet> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/closets/update/{closet_id}',
            path: {
                'closet_id': closetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Closet
     * @param requestBody 
     * @returns Closet Successful Response
     * @throws ApiError
     */
    public static deleteClosetApiV1ClosetsDeleteDelete(
requestBody: ClosetDelete,
): CancelablePromise<Array<Closet>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/closets/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Closet
     * @param closetId 
     * @returns Closet Successful Response
     * @throws ApiError
     */
    public static readClosetApiV1ClosetsGetClosetIdGet(
closetId: string,
): CancelablePromise<Closet> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/closets/get/{closet_id}',
            path: {
                'closet_id': closetId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
