export interface FormData {
    title: string;
    launchdate: string;
    author: string;
    image_lnk: string;
    description: string;
}

export interface TouchedFields {
    [key: string]: boolean;
}

export interface Props {
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}