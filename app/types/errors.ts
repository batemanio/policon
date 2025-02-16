export type dbError = {
    code: string;
    details: string;
    hint: string;
    message: string;
};

export type apiError = {
    type: string;
    error?: string | dbError;
    content?: any;
};
