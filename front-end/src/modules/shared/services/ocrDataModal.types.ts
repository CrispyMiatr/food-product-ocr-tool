import type { AiTextData } from "./ocrWindow";

export interface OcrDataModalType {
    data: AiTextData;
    onClose: () => void;
}