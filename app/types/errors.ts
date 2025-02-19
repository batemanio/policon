export type dbError = {
    code: string;
    details: string;
    hint: string;
    message: string;
};

export type apiError = {
    type: string;
    error?: any;
    content?: any;
};
