import { IReceiveMessage } from './IReceiveMessage';

export interface IAvailableChat {
    user: string;
    messages: IReceiveMessage[];
}
