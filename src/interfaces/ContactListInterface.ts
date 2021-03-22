export interface ComponentProps {
    count: number,
    style?: object
}

export interface ComponentState {
    list: ListItem[];
    loading: boolean;
    data: ListItem[];
    page: number;
    lastNationality: string;
}

export interface ListItem {
    loading: boolean;
    popoverVisible: boolean;
    name: {
        title: string;
        first: string;
        last: string;
    };
    login: {
        username: string;
        uuid: string;
    },
    email: string;
    nat: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    },
    location: {
        street: {
            number: number;
            name: string;
        },
        city: string,
        state: string,
        country: string,
        postcode: string,
        coordinates: {
            latitude: number,
            longitude: number
        }
    },
    phone: string,
    cell: string,
    gender: string
}

export interface ResponseType {
    results: ListItem[];
}

export interface CallbackType {
    (myArgument: ResponseType): void
}
