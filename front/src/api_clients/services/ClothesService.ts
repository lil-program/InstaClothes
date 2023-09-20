/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Clothes } from '../models/Clothes';
import type { ClothesCreate } from '../models/ClothesCreate';
import type { ClothesDelete } from '../models/ClothesDelete';
import type { ClothesUpdate } from '../models/ClothesUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClothesService {

    /**
     * Create Clothes
     * @param closetId 
     * @param requestBody 
     * @returns Clothes Successful Response
     * @throws ApiError
     */
    public static createClothesApiV1ClothesCreateClosetIdPost(
closetId: string,
requestBody: ClothesCreate,
): CancelablePromise<Clothes> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/clothes/create/{closet_id}',
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
     * Read Clothes
     * @param closetId
     * @returns Clothes Successful Response
     * @throws ApiError
     */
    public static readClothesApiV1ClothesGetMyClothesClosetIdGet(
closetId: string,
): CancelablePromise<Array<Clothes>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/clothes/get_my_clothes/{closet_id}',
            path: {
                'closet_id': closetId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Clothes
     * @param clothesId 
     * @param requestBody 
     * @returns Clothes Successful Response
     * @throws ApiError
     */
    public static updateClothesApiV1ClothesUpdateClothesIdPut(
clothesId: string,
requestBody: ClothesUpdate,
): CancelablePromise<Clothes> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/clothes/update/{clothes_id}',
            path: {
                'clothes_id': clothesId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Clothes
     * @param requestBody 
     * @returns Clothes Successful Response
     * @throws ApiError
     */
    public static deleteClothesApiV1ClothesDeleteDelete(
requestBody: ClothesDelete,
): CancelablePromise<Array<Clothes>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/clothes/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
