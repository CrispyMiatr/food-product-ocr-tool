import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { ocrWindowService, type OcrWindowType } from '~/shared';

type UploadOcrImagesOptions = Omit<UseMutationOptions<OcrWindowType, Error, File[]>, 'mutationFn'>;

export const useUploadOcrImages = (options?: UploadOcrImagesOptions) => {
    return useMutation({
        mutationFn: (files: File[]) => ocrWindowService.uploadImages(files),

        ...options,
    });
};